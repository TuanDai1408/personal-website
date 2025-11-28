"use client"

import { Section } from "@/components/ui/section"
import { motion } from "framer-motion"

const skills = [
    {
        category: "Data Management",
        items: [
            { name: "BigQuery", level: 90 },
            { name: "PowerBI", level: 85 },
            { name: "Tableau", level: 60 },
            { name: "ETL/ELT", level: 95 },
            { name: "Dagster", level: 85 },
        ],
    },
    {
        category: "Programming",
        items: [
            { name: "Python", level: 95 },
            { name: "SQL", level: 90 },
            { name: "Airflow API", level: 65 },
            { name: "Automation", level: 60 },
        ],
    },
    {
        category: "Marketing & Analytics",
        items: [
            { name: "GA4", level: 60 },
            { name: "Tracking", level: 85 },
            { name: "Attribution", level: 80 },
            { name: "Segmentation", level: 85 },
        ],
    },
]

export function Skills() {
    return (
        <Section id="skills">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4">
                        Kỹ <span className="text-neon-blue">Năng</span>
                    </h2>
                    <div className="h-1 w-20 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto rounded-full" />
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {skills.map((group, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="space-y-6"
                        >
                            <h3 className="text-xl font-bold text-center p-4 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
                                {group.category}
                            </h3>
                            <div className="space-y-6">
                                {group.items.map((skill, j) => (
                                    <div key={j} className="group">
                                        <div className="flex justify-between mb-2">
                                            <span className="font-medium group-hover:text-neon-blue transition-colors">
                                                {skill.name}
                                            </span>
                                            <span className="text-muted-foreground">{skill.level}%</span>
                                        </div>
                                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: 0.2 }}
                                                className="h-full bg-gradient-to-r from-neon-purple to-neon-blue rounded-full group-hover:shadow-[0_0_10px_rgba(0,212,255,0.5)] transition-all"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    )
}
