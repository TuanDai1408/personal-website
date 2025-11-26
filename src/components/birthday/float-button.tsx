"use client"

import { motion } from "framer-motion"
import { Gift } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function BirthdayFloatButton() {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <Link href="/birthday">
            <motion.div
                className="fixed bottom-8 right-8 z-50 flex items-center justify-center"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, type: "spring" }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
            >
                {/* Ripple Effect */}
                <div className="absolute inset-0 bg-neon-purple rounded-full animate-ping opacity-20" />

                <motion.div
                    className="relative flex items-center bg-gradient-to-r from-neon-purple to-neon-blue p-4 rounded-full shadow-[0_0_20px_rgba(176,38,255,0.5)] cursor-pointer border border-white/20"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                        y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                        default: { duration: 0.2 }
                    }}
                >
                    <Gift className="w-6 h-6 text-white" />

                    <motion.div
                        initial={{ width: 0, opacity: 0, marginLeft: 0 }}
                        animate={isHovered ? { width: "auto", opacity: 1, marginLeft: 12 } : { width: 0, opacity: 0, marginLeft: 0 }}
                        className="overflow-hidden whitespace-nowrap"
                    >
                        <span className="text-white font-bold text-sm pr-2">Món quà bí mật</span>
                    </motion.div>
                </motion.div>
            </motion.div>
        </Link>
    )
}
