"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Download, Briefcase, GraduationCap, Award } from "lucide-react"
import { Button } from "@/components/ui/button"

const resumeData = [
    {
        id: "experience",
        title: "Kinh nghiệm làm việc",
        icon: Briefcase,
        items: [
            {
                role: "Senior Data Engineer",
                company: "Tech Company A",
                period: "2023 - Present",
                description: "Xây dựng hệ thống ETL xử lý 10TB+ dữ liệu/tháng. Tối ưu hóa chi phí BigQuery giảm 40%."
            },
            {
                role: "Data Analyst",
                company: "Marketing Agency B",
                period: "2021 - 2023",
                description: "Phân tích hiệu quả chiến dịch marketing, xây dựng dashboard Real-time cho khách hàng."
            }
        ]
    },
    {
        id: "education",
        title: "Học vấn",
        icon: GraduationCap,
        items: [
            {
                role: "Cử nhân Khoa học Dữ liệu",
                company: "University X",
                period: "2017 - 2021",
                description: "Tốt nghiệp loại Giỏi. GPA: 3.8/4.0"
            }
        ]
    },
    {
        id: "certificates",
        title: "Chứng chỉ",
        icon: Award,
        items: [
            {
                role: "Google Cloud Professional Data Engineer",
                company: "Google",
                period: "2023",
                description: "Chứng chỉ chuyên nghiệp về thiết kế và quản lý hệ thống dữ liệu trên GCP."
            },
            {
                role: "Dagster Master Class",
                company: "Elementl",
                period: "2024",
                description: "Khóa học chuyên sâu về Orchestration với Dagster."
            }
        ]
    }
]

export function InteractiveResume() {
    const [openSection, setOpenSection] = useState<string | null>("experience")

    const toggleSection = (id: string) => {
        setOpenSection(openSection === id ? null : id)
    }

    return (
        <section className="py-20 bg-background">
            <div className="container max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4">
                        Hồ sơ năng lực
                    </h2>
                    <p className="text-muted-foreground">
                        Tóm tắt hành trình sự nghiệp và học vấn của tôi.
                    </p>
                </div>

                <div className="space-y-4">
                    {resumeData.map((section) => (
                        <div key={section.id} className="border border-border rounded-xl overflow-hidden bg-card">
                            <button
                                onClick={() => toggleSection(section.id)}
                                className="w-full flex items-center justify-between p-6 hover:bg-secondary/50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded-lg bg-secondary text-neon-blue">
                                        <section.icon className="w-6 h-6" />
                                    </div>
                                    <span className="text-xl font-bold">{section.title}</span>
                                </div>
                                <ChevronDown
                                    className={`w-5 h-5 transition-transform duration-300 ${openSection === section.id ? "rotate-180" : ""}`}
                                />
                            </button>

                            <AnimatePresence>
                                {openSection === section.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="p-6 pt-0 border-t border-border/50">
                                            <div className="space-y-8 mt-6">
                                                {section.items.map((item, index) => (
                                                    <div key={index} className="relative pl-8 border-l-2 border-border last:border-0">
                                                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-neon-blue" />
                                                        <div className="mb-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                                            <h4 className="text-lg font-bold">{item.role}</h4>
                                                            <span className="text-sm font-mono text-neon-purple bg-neon-purple/10 px-2 py-1 rounded">
                                                                {item.period}
                                                            </span>
                                                        </div>
                                                        <p className="text-muted-foreground font-medium mb-2">{item.company}</p>
                                                        <p className="text-sm text-muted-foreground/80 leading-relaxed">
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Button size="lg" className="bg-neon-blue hover:bg-neon-blue/80 text-black font-bold">
                        <Download className="mr-2 h-4 w-4" /> Tải CV đầy đủ (PDF)
                    </Button>
                </div>
            </div>
        </section>
    )
}
