"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star } from "lucide-react"

const messages = [
    "Chúc bạn thành công! 🌟",
    "Vui vẻ mỗi ngày! 😄",
    "Gặp nhiều may mắn! 🍀",
    "Tràn đầy năng lượng! ⚡",
    "Tình yêu thăng hoa! ❤️",
    "Tiền vào như nước! 💰"
]

export function InteractiveStars() {
    const [activeStar, setActiveStar] = useState<number | null>(null)

    return (
        <section className="py-20 bg-black/20">
            <div className="container text-center">
                <h2 className="text-3xl font-bold mb-12 font-space-grotesk">
                    Bấm vào ngôi sao may mắn ⭐
                </h2>

                <div className="grid grid-cols-3 md:grid-cols-6 gap-8 justify-items-center">
                    {[...Array(6)].map((_, index) => (
                        <motion.button
                            key={index}
                            whileHover={{ scale: 1.2, rotate: 180 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setActiveStar(index)}
                            className="relative group"
                        >
                            <Star
                                className={`w-12 h-12 transition-colors duration-300 ${activeStar === index ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground group-hover:text-yellow-200'}`}
                            />
                            {activeStar === index && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: -10 }}
                                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-32 bg-white text-black text-sm font-bold py-2 rounded-lg shadow-xl z-20"
                                >
                                    {messages[index]}
                                </motion.div>
                            )}
                        </motion.button>
                    ))}
                </div>
            </div>
        </section>
    )
}
