"use client"

import { motion } from "framer-motion"
import { Database, TrendingUp, BarChart3, Zap } from "lucide-react"

const values = [
    {
        icon: Database,
        title: "Hệ thống ETL mạnh mẽ",
        description: "Xây dựng pipeline dữ liệu tự động, đảm bảo luồng dữ liệu sạch và ổn định."
    },
    {
        icon: TrendingUp,
        title: "Tối ưu Tracking",
        description: "Thiết lập tracking chính xác cho Marketing, đo lường mọi điểm chạm."
    },
    {
        icon: BarChart3,
        title: "Phân tích đa chiều",
        description: "Biến dữ liệu thô thành Insight rõ ràng, hỗ trợ ra quyết định chiến lược."
    },
    {
        icon: Zap,
        title: "Tự động hóa AI",
        description: "Ứng dụng AI để tự động hóa quy trình, tiết kiệm thời gian và chi phí."
    }
]

export function ValueProposition() {
    return (
        <section className="py-20 bg-background relative overflow-hidden">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group p-6 rounded-2xl bg-card border border-border hover:border-neon-blue/50 hover:shadow-[0_0_20px_rgba(0,212,255,0.1)] transition-all duration-300"
                        >
                            <div className="mb-4 p-3 rounded-xl bg-secondary w-fit group-hover:bg-neon-blue/10 transition-colors">
                                <item.icon className="w-8 h-8 text-foreground group-hover:text-neon-blue transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-neon-blue transition-colors">{item.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
