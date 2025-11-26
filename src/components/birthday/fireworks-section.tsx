"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Home, Share2 } from "lucide-react"

export function FireworksSection() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const duration = 15 * 1000
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
        <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black">
            <div className="absolute inset-0 z-0">
                {/* Fireworks canvas handled by canvas-confetti global instance, but we can add extra overlay here */}
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
            </div>

            <div className="relative z-10 text-center space-y-8 p-4">
                <motion.h1
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, type: "spring" }}
                    className="text-5xl md:text-8xl font-bold font-space-grotesk text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-white to-neon-blue animate-pulse-glow"
                >
                    Happy Birthday!
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
                >
                    Cảm ơn bạn đã ghé thăm và cùng chia sẻ khoảnh khắc này.
                </motion.p>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    {/* <Button size="lg" className="bg-white text-black hover:bg-white/90" onClick={() => {
                        window.location.href = "http://localhost:4000/#contact";
                    }}>
                        <Share2 className="mr-2 w-4 h-4" /> Gửi lời chúc
                    </Button> */}

                    <Link href="/#contact" scroll={true}>
                        <Button size="lg" className="bg-white text-black hover:bg-white/90">
                            <Share2 className="mr-2 w-4 h-4" /> Gửi lời chúc
                        </Button>
                    </Link>

                    <Link href="/">
                        <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10 w-full">
                            <Home className="mr-2 w-4 h-4" /> Quay về trang chủ
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}
