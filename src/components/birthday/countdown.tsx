"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock } from "lucide-react"

interface CountdownProps {
    targetDate: Date
    onReset: () => void
}

export function Countdown({ targetDate, onReset }: CountdownProps) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    })

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date()
            const currentYear = now.getFullYear()
            let nextBirthday = new Date(targetDate)
            nextBirthday.setFullYear(currentYear)

            if (nextBirthday < now) {
                nextBirthday.setFullYear(currentYear + 1)
            }

            const difference = nextBirthday.getTime() - now.getTime()

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                })
            }
        }

        const timer = setInterval(calculateTimeLeft, 1000)
        calculateTimeLeft()

        return () => clearInterval(timer)
    }, [targetDate])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-blue/10 rounded-full blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 text-center space-y-12"
            >
                <div>
                    <div className="inline-block p-4 rounded-full bg-secondary/50 mb-6 animate-bounce-slow">
                        <Clock className="w-12 h-12 text-neon-blue" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold font-space-grotesk mb-4">
                        Sắp đến sinh nhật rồi!
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Chỉ còn một chút thời gian nữa thôi...
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {Object.entries(timeLeft).map(([unit, value]) => (
                        <div key={unit} className="flex flex-col items-center">
                            <div className="w-24 h-24 md:w-32 md:h-32 bg-card/50 backdrop-blur border border-white/10 rounded-2xl flex items-center justify-center shadow-lg">
                                <span className="text-4xl md:text-6xl font-bold text-neon-blue font-mono">
                                    {value.toString().padStart(2, '0')}
                                </span>
                            </div>
                            <span className="mt-4 text-sm uppercase tracking-widest text-muted-foreground font-medium">
                                {unit}
                            </span>
                        </div>
                    ))}
                </div>

                <Button
                    variant="outline"
                    onClick={onReset}
                    className="mt-12 border-white/10 hover:bg-white/5"
                >
                    <ArrowLeft className="mr-2 w-4 h-4" /> Chọn ngày khác
                </Button>
            </motion.div>
        </div>
    )
}
