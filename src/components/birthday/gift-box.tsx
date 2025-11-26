"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"

export function GiftBox({ onOpen }: { onOpen: () => void }) {
    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = () => {
        if (isOpen) return
        setIsOpen(true)

        // Confetti Explosion
        const duration = 2000
        const end = Date.now() + duration

        const frame = () => {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#b026ff', '#00d4ff', '#ffffff']
            })
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#b026ff', '#00d4ff', '#ffffff']
            })

            if (Date.now() < end) {
                requestAnimationFrame(frame)
            }
        }
        frame()

        setTimeout(onOpen, 1500)
    }

    return (
        <div className="relative w-64 h-64 mx-auto perspective-1000 cursor-pointer" onClick={handleOpen}>
            <motion.div
                className="w-full h-full relative preserve-3d"
                animate={isOpen ? { rotateX: 0, rotateY: 0 } : { rotateY: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
                {/* Box Body */}
                <div className="absolute inset-0 bg-gradient-to-br from-neon-purple to-purple-900 rounded-lg shadow-[0_0_50px_rgba(176,38,255,0.5)] flex items-center justify-center border border-white/20">
                    <div className="text-6xl">🎁</div>
                </div>

                {/* Lid (Simple representation) */}
                <motion.div
                    className="absolute top-0 left-0 right-0 h-10 bg-neon-blue rounded-t-lg origin-bottom"
                    initial={{ rotateX: 0 }}
                    animate={isOpen ? { rotateX: -120, y: -100, opacity: 0 } : { rotateX: 0 }}
                    transition={{ duration: 1 }}
                />
            </motion.div>

            {/* Glow Effect */}
            <div className={`absolute inset-0 bg-neon-purple/30 blur-[50px] -z-10 transition-all duration-500 ${isOpen ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`} />
        </div>
    )
}
