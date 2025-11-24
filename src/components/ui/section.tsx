"use client"

import { motion, useScroll, useTransform, HTMLMotionProps } from "framer-motion"
import { useRef } from "react"
import { cn } from "@/lib/utils"

interface SectionProps extends HTMLMotionProps<"section"> {
    children: React.ReactNode
    className?: string
    id?: string
}

export function Section({ children, className, id, ...props }: SectionProps) {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    })

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
    const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, 50])

    return (
        <motion.section
            ref={ref}
            id={id}
            style={{ opacity, y }}
            className={cn("min-h-screen py-20 relative", className)}
            {...props}
        >
            {children}
        </motion.section>
    )
}
