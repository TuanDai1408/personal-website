"use client"

import { Section } from "@/components/ui/section"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Code2, Database, LineChart } from "lucide-react"
import Image from "next/image"

export function About() {
    return (
        <Section id="about" className="bg-secondary/20">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4">
                        Về <span className="text-neon-purple">Tôi</span>
                    </h2>
                    <div className="h-1 w-20 bg-gradient-to-r from-neon-purple to-neon-blue mx-auto rounded-full" />
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-neon-blue/20 blur-3xl rounded-full" />
                            <Card className="relative overflow-hidden border-none bg-card/50 backdrop-blur-sm">
                                <CardContent className="p-0">
                                    <div className="aspect-[4/5] relative">
                                        <Image
                                            src="/about_me/about_me.jpg"
                                            alt="About Tran Tuan Dai"
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className="object-cover"
                                            priority
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <h3 className="text-2xl font-bold">
                            Data Engineer & Automation Expert
                        </h3>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Tôi là một Data Engineer với nền tảng vững về ETL/ELT, GCP, BigQuery, Dagster và Marketing Data Analytics.
                            Tôi đam mê tạo ra hệ thống dữ liệu tối ưu, tự động hóa quy trình và xây dựng giải pháp AI Agent hỗ trợ doanh nghiệp.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4 mt-8">
                            {[
                                { icon: Database, title: "Data Engineering", desc: "BigQuery, Kafka, Spark" },
                                { icon: Code2, title: "Programming", desc: "Python, SQL, Airflow" },
                                { icon: LineChart, title: "Analytics", desc: "GA4, Tracking, Segmentation" },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 p-4 rounded-lg bg-card/50 border border-white/5 hover:border-neon-purple/50 transition-colors">
                                    <div className="p-2 rounded-md bg-neon-purple/10 text-neon-purple h-fit">
                                        <item.icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold">{item.title}</h4>
                                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </Section>
    )
}
