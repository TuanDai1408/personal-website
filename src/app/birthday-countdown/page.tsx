"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { api, User } from "@/lib/api"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Suspense } from "react"

function BirthdayCountdownContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const userId = searchParams.get("id")
    const [user, setUser] = useState<User | null>(null)
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

    useEffect(() => {
        if (!userId) {
            router.push("/birthday-select")
            return
        }

        const fetchUser = async () => {
            // Since we don't have getUserById in api.ts yet (only getUsers), we filter.
            // Ideally we should add getUser(id) to api.ts
            const { data } = await api.getUsers()
            if (data) {
                const found = data.find(u => u.id === Number(userId))
                if (found) setUser(found)
            }
        }
        fetchUser()
    }, [userId, router])

    useEffect(() => {
        if (!user || !user.dob) return

        const calculateTimeLeft = () => {
            const today = new Date()
            const dob = new Date(user.dob!)
            let nextBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate())

            if (today > nextBirthday) {
                nextBirthday.setFullYear(today.getFullYear() + 1)
            }

            const difference = nextBirthday.getTime() - today.getTime()

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                })
            }
        }

        const timer = setInterval(calculateTimeLeft, 1000)
        calculateTimeLeft()

        return () => clearInterval(timer)
    }, [user])

    if (!user) return <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-white">Loading...</div>

    return (
        <main className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#0F172A] to-[#0F172A]" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="z-10 text-center space-y-8 max-w-2xl w-full"
            >
                <div className="flex justify-center">
                    <Avatar className="h-32 w-32 border-4 border-indigo-500/50 shadow-2xl">
                        <AvatarImage src={`https://avatar.vercel.sh/${user.username}`} />
                        <AvatarFallback className="text-4xl">{user.username[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-white">Chưa đến sinh nhật của {user.full_name || user.username} đâu!</h1>
                    <p className="text-slate-400">Hãy quay lại sau nhé...</p>
                </div>

                <div className="grid grid-cols-4 gap-4">
                    {[
                        { label: "Days", value: timeLeft.days },
                        { label: "Hours", value: timeLeft.hours },
                        { label: "Minutes", value: timeLeft.minutes },
                        { label: "Seconds", value: timeLeft.seconds },
                    ].map((item, index) => (
                        <motion.div
                            key={item.label}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 backdrop-blur-sm"
                        >
                            <div className="text-3xl font-bold text-indigo-400 font-mono">{String(item.value).padStart(2, '0')}</div>
                            <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">{item.label}</div>
                        </motion.div>
                    ))}
                </div>

                <Button
                    variant="ghost"
                    className="text-slate-400 hover:text-white"
                    onClick={() => router.push("/birthday-select")}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Chọn người khác
                </Button>
            </motion.div>
        </main>
    )
}

export default function BirthdayCountdownPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-white">Loading...</div>}>
            <BirthdayCountdownContent />
        </Suspense>
    )
}
