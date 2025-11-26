"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Flame } from "lucide-react"
import { birthdayConfig } from "@/config/birthday"

const wishes = birthdayConfig.messages

export function ScrollSections() {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], [0, -100])

    return (
        <div ref={containerRef} className="space-y-32 py-20">
            {/* Candles Section */}
            <section className="container text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex justify-center gap-4 mb-8"
                >
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                            className="relative"
                        >
                            <div className="w-4 h-16 bg-gradient-to-b from-pink-300 to-pink-500 rounded-md" />
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                                className="absolute -top-4 left-1/2 -translate-x-1/2 text-orange-400"
                            >
                                <Flame className="w-6 h-6 fill-orange-400" />
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
                <h3 className="text-2xl font-bold font-space-grotesk">Thổi nến ước nguyện nào! 🕯️</h3>
            </section>

            {/* Typing Wishes Section */}
            <section className="container max-w-2xl">
                <div className="space-y-8">
                    {wishes.map((wish, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.3 }}
                            className="p-6 rounded-xl bg-card/50 border border-white/10 backdrop-blur-sm shadow-lg"
                        >
                            <p className="text-xl md:text-2xl font-mono text-neon-blue">
                                {wish}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Floating Balloons Parallax */}
            <section className="relative h-[500px] overflow-hidden">
                <motion.div style={{ y }} className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-20 opacity-50">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="w-24 h-32 bg-gradient-to-br from-purple-500 to-blue-500 rounded-[50%]" />
                        ))}
                    </div>
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <h2 className="text-4xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Bay cao hơn nữa! 🎈
                    </h2>
                </div>
            </section>
        </div>
    )
}
