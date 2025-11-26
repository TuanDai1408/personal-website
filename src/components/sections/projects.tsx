"use client"

import { Section } from "@/components/ui/section"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, ExternalLink, Github } from "lucide-react"



const projects = [
    {
        id: 1,
        title: "Customer Retention Analysis",
        category: "Data Analysis",
        image: "bg-gradient-to-br from-purple-900 to-blue-900",
        tags: ["BigQuery", "Python", "Looker"],
        description: "Phân tích hành vi khách hàng để tối ưu hóa tỷ lệ giữ chân.",
        details: {
            goal: "Tăng tỷ lệ giữ chân khách hàng thêm 15%.",
            problem: "Khách hàng rời bỏ dịch vụ sau 3 tháng đầu cao.",
            solution: "Xây dựng mô hình dự đoán churn và đề xuất giải pháp marketing.",
            tech: "BigQuery, Python (Scikit-learn), Looker Studio.",
            result: "Giảm tỷ lệ churn 10% sau 3 tháng triển khai."
        }
    },
    {
        id: 2,
        title: "Marketing Tracking AI Pipeline",
        category: "Data Engineering",
        image: "bg-gradient-to-br from-blue-900 to-cyan-900",
        tags: ["Facebook API", "GCP", "BigQuery"],
        description: "Pipeline tự động thu thập dữ liệu quảng cáo từ Facebook về BigQuery.",
        details: {
            goal: "Tự động hóa báo cáo marketing.",
            problem: "Tốn 4h/ngày để làm báo cáo thủ công.",
            solution: "ETL pipeline tự động chạy mỗi giờ.",
            tech: "Python, Cloud Functions, BigQuery.",
            result: "Tiết kiệm 20h làm việc mỗi tuần."
        }
    },
    {
        id: 3,
        title: "Real-time Streaming Demo",
        category: "Big Data",
        image: "bg-gradient-to-br from-green-900 to-emerald-900",
        tags: ["Kafka", "Flink", "Delta Lake"],
        description: "Hệ thống xử lý dữ liệu thời gian thực với Kafka và Flink.",
        details: {
            goal: "Xử lý 1 triệu sự kiện/giây.",
            problem: "Hệ thống cũ bị trễ 15 phút.",
            solution: "Kiến trúc Lambda với Kafka và Flink.",
            tech: "Kafka, Flink, Docker.",
            result: "Độ trễ giảm xuống dưới 1 giây."
        }
    },
    {
        id: 4,
        title: "AI Agent Zalo Automation",
        category: "Automation",
        image: "bg-gradient-to-br from-indigo-900 to-violet-900",
        tags: ["Python", "Zalo API", "OpenAI"],
        description: "Chatbot AI tự động trả lời và chăm sóc khách hàng trên Zalo.",
        details: {
            goal: "Tự động hóa CSKH 24/7.",
            problem: "Nhân viên quá tải tin nhắn.",
            solution: "Bot AI tích hợp GPT-4 xử lý tin nhắn.",
            tech: "Python, FastAPI, OpenAI API.",
            result: "Xử lý 80% tin nhắn tự động."
        }
    },
]

export function Projects() {
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

    return (
        <Section id="projects" className="bg-secondary/20">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4">
                        Dự Án <span className="text-neon-purple">Nổi Bật</span>
                    </h2>
                    <div className="h-1 w-20 bg-gradient-to-r from-neon-purple to-neon-blue mx-auto rounded-full" />
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -10 }}
                            onClick={() => setSelectedProject(project)}
                            className="cursor-pointer group"
                        >
                            <Card className="overflow-hidden border-white/10 bg-card/50 hover:border-neon-blue/50 transition-all duration-300 h-full">
                                <div className={`h-48 w-full ${project.image} relative overflow-hidden`}>
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                    {/* Placeholder content */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-white/50 font-bold text-2xl">{project.category}</span>
                                    </div>
                                </div>
                                <CardHeader>
                                    <CardTitle className="group-hover:text-neon-blue transition-colors">{project.title}</CardTitle>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {project.tags.map(tag => (
                                            <Badge key={tag} variant="secondary" className="bg-secondary/50">{tag}</Badge>
                                        ))}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{project.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <AnimatePresence>
                    {selectedProject && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                            onClick={() => setSelectedProject(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-background border border-white/10 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
                            >
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-4 top-4 z-10"
                                    onClick={() => setSelectedProject(null)}
                                >
                                    <X className="h-6 w-6" />
                                </Button>

                                <div className={`h-64 w-full ${selectedProject.image} relative`}>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <h3 className="text-4xl font-bold text-white shadow-black drop-shadow-lg">{selectedProject.title}</h3>
                                    </div>
                                </div>

                                <div className="p-8 space-y-8">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div>
                                            <h4 className="text-lg font-bold text-neon-blue mb-2">Mục tiêu</h4>
                                            <p className="text-muted-foreground">{selectedProject.details.goal}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-neon-purple mb-2">Vấn đề</h4>
                                            <p className="text-muted-foreground">{selectedProject.details.problem}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-bold text-white mb-2">Giải pháp</h4>
                                        <p className="text-muted-foreground">{selectedProject.details.solution}</p>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div>
                                            <h4 className="text-lg font-bold text-white mb-2">Công nghệ</h4>
                                            <p className="text-muted-foreground">{selectedProject.details.tech}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-white mb-2">Kết quả</h4>
                                            <p className="text-muted-foreground">{selectedProject.details.result}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 pt-4 border-t border-white/10">
                                        <Button className="bg-neon-blue hover:bg-neon-blue/80 text-black">
                                            <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                                        </Button>
                                        <a href="https://github.com/TuanDai1408/lc_coding_challenge_daitt5">
                                            <Button variant="outline">
                                                <Github className="mr-2 h-4 w-4" /> Source Code
                                            </Button>
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Section>
    )
}
