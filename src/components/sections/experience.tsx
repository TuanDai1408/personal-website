"use client"

import { Section } from "@/components/ui/section"
import { motion } from "framer-motion"
import { Calendar, Briefcase } from "lucide-react"

const experiences = [
    {
        year: "2023 - Present",
        role: "Data Engineer",
        company: "Company A",
        description: "Xây dựng hệ thống Data Warehouse trên GCP, tối ưu hóa pipeline ETL với Dagster.",
    },
    {
        year: "2021 - 2023",
        role: "Marketing Analyst",
        company: "Company B",
        description: "Phân tích dữ liệu marketing, xây dựng dashboard báo cáo hiệu quả chiến dịch.",
    },
    {
        year: "2020 - 2021",
        role: "Freelancer",
        company: "Self-employed",
        description: "Phát triển các tool automation, crawl data và chatbot cho khách hàng cá nhân.",
    },
]

export function Experience() {
    return (
        <Section id="experience">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4">
                        Kinh <span className="text-neon-blue">Nghiệm</span>
                    </h2>
                    <div className="h-1 w-20 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto rounded-full" />
                </motion.div>

                <div className="relative max-w-3xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-purple via-neon-blue to-transparent md:-translate-x-1/2" />

                    <div className="space-y-12">
                        {experiences.map((exp, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className={`relative flex flex-col md:flex-row gap-8 ${i % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-background border-2 border-neon-blue rounded-full translate-x-[-7px] md:translate-x-[-50%] mt-1.5 z-10 shadow-[0_0_10px_rgba(0,212,255,0.5)]" />

                                <div className="md:w-1/2 pl-8 md:pl-0 md:px-8">
                                    <div className={`p-6 rounded-xl bg-card/50 border border-white/5 hover:border-neon-purple/50 transition-colors ${i % 2 === 0 ? "md:text-left" : "md:text-right"
                                        }`}>
                                        <div className={`flex items-center gap-2 text-neon-blue mb-2 ${i % 2 === 0 ? "md:justify-start" : "md:justify-end"
                                            }`}>
                                            <Calendar className="h-4 w-4" />
                                            <span className="text-sm font-medium">{exp.year}</span>
                                        </div>
                                        <h3 className="text-xl font-bold mb-1">{exp.role}</h3>
                                        <div className={`flex items-center gap-2 text-muted-foreground mb-4 ${i % 2 === 0 ? "md:justify-start" : "md:justify-end"
                                            }`}>
                                            <Briefcase className="h-4 w-4" />
                                            <span>{exp.company}</span>
                                        </div>
                                        <p className="text-muted-foreground">{exp.description}</p>
                                    </div>
                                </div>
                                <div className="md:w-1/2" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    )
}
