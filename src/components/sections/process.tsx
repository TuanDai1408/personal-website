"use client"

import { motion } from "framer-motion"
import { ClipboardList, PenTool, Database, CheckCircle, Rocket, BarChart } from "lucide-react"

const steps = [
    {
        icon: ClipboardList,
        title: "Thu thập yêu cầu",
        description: "Lắng nghe, phân tích nhu cầu và xác định mục tiêu dữ liệu cụ thể."
    },
    {
        icon: PenTool,
        title: "Thiết kế kiến trúc",
        description: "Xây dựng mô hình dữ liệu, lựa chọn công nghệ phù hợp (BigQuery, Dagster...)."
    },
    {
        icon: Database,
        title: "Xây dựng ETL",
        description: "Code pipeline, transform dữ liệu, đảm bảo luồng dữ liệu sạch và tự động."
    },
    {
        icon: CheckCircle,
        title: "Kiểm thử",
        description: "Test kỹ lưỡng, validate dữ liệu, đảm bảo không có lỗi logic."
    },
    {
        icon: Rocket,
        title: "Triển khai",
        description: "Deploy lên production, thiết lập monitoring và alert."
    },
    {
        icon: BarChart,
        title: "Tối ưu",
        description: "Theo dõi hiệu năng, tinh chỉnh query và pipeline để tối ưu chi phí."
    }
]

export function Process() {
    return (
        <section className="py-20 bg-background relative">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4">
                        Quy trình làm việc
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Quy trình chuẩn hóa từ ý tưởng đến hệ thống dữ liệu hoàn chỉnh.
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-neon-purple/20 via-neon-blue/20 to-neon-purple/20 -translate-y-1/2 z-0" />

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="flex flex-col items-center text-center group"
                            >
                                <div className="w-16 h-16 rounded-full bg-card border border-border group-hover:border-neon-blue group-hover:shadow-[0_0_15px_rgba(0,212,255,0.3)] flex items-center justify-center mb-6 transition-all duration-300 relative">
                                    <step.icon className="w-8 h-8 text-muted-foreground group-hover:text-neon-blue transition-colors" />
                                    <div className="absolute -bottom-2 bg-background px-2 text-xs font-bold text-muted-foreground border border-border rounded-full">
                                        {index + 1}
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold mb-2 group-hover:text-neon-blue transition-colors">{step.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
