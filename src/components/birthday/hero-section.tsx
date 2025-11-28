"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Gift } from "lucide-react"
import { birthdayConfig } from "@/config/birthday"

import { User } from "@/lib/api"

export function BirthdayHero({ onOpenGift, user }: { onOpenGift: () => void, user: User }) {
    useEffect(() => {
        const duration = 3 * 1000
        const animationEnd = Date.now() + duration
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now()

            if (timeLeft <= 0) {
                return clearInterval(interval)
            }

            const particleCount = 50 * (timeLeft / duration)
            confetti({
                ...defaults, particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            })
            confetti({
                ...defaults, particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            })
        }, 250)

        return () => clearInterval(interval)
    }, [])

    return (
        <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-20">
            {/* 3D Balloons (Simulated with CSS/Images) */}
            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 left-10 md:left-20 w-32 md:w-48 aspect-[3/4] opacity-80"
            >
                <div className="w-full h-full bg-gradient-to-br from-pink-400 to-purple-600 rounded-[50%] blur-sm opacity-50 absolute" />
                <div className="w-full h-full bg-gradient-to-br from-pink-400 to-purple-600 rounded-[50%] shadow-xl relative z-10" />
            </motion.div>

            <motion.div
                animate={{ y: [0, -30, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-40 right-10 md:right-20 w-24 md:w-36 aspect-[3/4] opacity-80"
            >
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-cyan-600 rounded-[50%] blur-sm opacity-50 absolute" />
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-cyan-600 rounded-[50%] shadow-xl relative z-10" />
            </motion.div>

            <div className="container relative z-10 text-center">
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", duration: 1 }}
                    className="relative w-40 h-40 md:w-56 md:h-56 mx-auto mb-8"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-neon-purple to-neon-blue rounded-full animate-spin-slow blur-md opacity-70" />
                    <div className="absolute inset-1 bg-background rounded-full p-1">
                        <div className="w-full h-full rounded-full overflow-hidden relative">
                            <Image
                                src={user.images?.[0]?.image_url || "https://github.com/shadcn.png"}
                                alt={user.full_name || user.username}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </motion.div>

                <div className="mb-8 relative">
                    <svg className="w-full max-w-3xl mx-auto h-24 md:h-32" viewBox="0 0 600 100">
                        <motion.text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="text-5xl md:text-7xl font-bold font-space-grotesk fill-transparent stroke-neon-purple stroke-2"
                            initial={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
                            animate={{ strokeDashoffset: 0 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        >
                            Happy Birthday
                        </motion.text>
                        <motion.text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="text-5xl md:text-7xl font-bold font-space-grotesk fill-neon-purple stroke-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2, duration: 0.5 }}
                        >
                            Happy Birthday
                        </motion.text>
                    </svg>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.5 }}
                        className="text-xl md:text-2xl text-muted-foreground mt-4"
                    >
                        Chúc {user.full_name || user.username} tuổi mới càng rực rỡ, thành công và hạnh phúc hơn nữa! 🎉
                    </motion.h2>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3 }}
                >
                    <Button
                        size="lg"
                        onClick={onOpenGift}
                        className="bg-neon-blue hover:bg-neon-blue/80 text-black font-bold text-lg px-8 py-6 rounded-full shadow-[0_0_30px_rgba(0,212,255,0.4)] animate-pulse"
                    >
                        <Gift className="mr-2 w-6 h-6" /> Khám phá món quà
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}
