"use client"

import { Section } from "@/components/ui/section"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"
import { useState, useEffect } from "react"

const testimonials = [
    {
        name: "Nguyen Van Hung",
        role: "CEO at TechCorp",
        content: "Dai is an exceptional engineer. His ability to automate complex workflows saved us hundreds of hours.",
    },
    {
        name: "Le Thi Bich Ngoc",
        role: "Marketing Director",
        content: "The data pipelines Dai built gave us real-time insights that completely changed our marketing strategy.",
    },
    {
        name: "John Doe",
        role: "Product Manager",
        content: "Professional, fast, and high-quality work. Highly recommend Dai for any data engineering tasks.",
    },
]

export function Testimonials() {
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % testimonials.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    return (
        <Section id="testimonials" className="bg-secondary/20">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4">
                        Đánh <span className="text-neon-purple">Giá</span>
                    </h2>
                    <div className="h-1 w-20 bg-gradient-to-r from-neon-purple to-neon-blue mx-auto rounded-full" />
                </motion.div>

                <div className="max-w-4xl mx-auto relative h-[300px] flex items-center justify-center">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8, x: 100 }}
                            animate={{
                                opacity: index === current ? 1 : 0,
                                scale: index === current ? 1 : 0.8,
                                x: index === current ? 0 : 100,
                                zIndex: index === current ? 10 : 0
                            }}
                            transition={{ duration: 0.5 }}
                            className="absolute w-full"
                            style={{ pointerEvents: index === current ? 'auto' : 'none' }}
                        >
                            <Card className="bg-card/50 border-white/10 backdrop-blur-sm">
                                <CardContent className="p-8 text-center">
                                    <Quote className="h-12 w-12 text-neon-purple/20 mx-auto mb-6" />
                                    <p className="text-xl md:text-2xl font-medium mb-8 leading-relaxed">
                                        "{item.content}"
                                    </p>
                                    <div>
                                        <h4 className="font-bold text-neon-blue">{item.name}</h4>
                                        <p className="text-sm text-muted-foreground">{item.role}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="flex justify-center gap-2 mt-8">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`w-3 h-3 rounded-full transition-colors ${index === current ? "bg-neon-blue" : "bg-white/20 hover:bg-white/40"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </Section>
    )
}
