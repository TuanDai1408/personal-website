"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"

const stats = [
    { value: 5, label: "Năm kinh nghiệm", suffix: "+" },
    { value: 30, label: "Dự án thực hiện", suffix: "+" },
    { value: 10, label: "Dữ liệu xử lý/ngày", suffix: "M+" },
    { value: 20, label: "Workflow Dagster", suffix: "+" },
]

const Counter = ({ value, suffix }: { value: number, suffix: string }) => {
    const [count, setCount] = useState(0)
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    useEffect(() => {
        if (isInView) {
            const duration = 2000 // 2 seconds
            const steps = 60
            const stepTime = duration / steps
            const increment = value / steps
            let current = 0

            const timer = setInterval(() => {
                current += increment
                if (current >= value) {
                    setCount(value)
                    clearInterval(timer)
                } else {
                    setCount(Math.floor(current))
                }
            }, stepTime)

            return () => clearInterval(timer)
        }
    }, [isInView, value])

    return (
        <span ref={ref} className="text-4xl md:text-5xl font-bold font-space-grotesk text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue">
            {count}{suffix}
        </span>
    )
}

export function Stats() {
    return (
        <section className="py-12 border-y border-white/5 bg-secondary/20">
            <div className="container">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <div className="mb-2">
                                <Counter value={stat.value} suffix={stat.suffix} />
                            </div>
                            <p className="text-sm md:text-base text-muted-foreground font-medium">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
