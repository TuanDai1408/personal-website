"use client"

import { motion } from "framer-motion"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
    { subject: 'Python', A: 120, fullMark: 150 },
    { subject: 'BigQuery', A: 110, fullMark: 150 },
    { subject: 'Dagster', A: 100, fullMark: 150 },
    { subject: 'Kafka', A: 80, fullMark: 150 },
    { subject: 'Spark', A: 70, fullMark: 150 },
    { subject: 'Flink', A: 60, fullMark: 150 },
    { subject: 'CI/CD', A: 50, fullMark: 150 },
    { subject: 'dbt', A: 90, fullMark: 150 },
];

export function TechRadar() {
    return (
        <section className="py-20 bg-secondary/10 overflow-hidden">
            <div className="container">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-6">
                            Tech Radar & <span className="text-neon-blue">Stack</span>
                        </h2>
                        <p className="text-muted-foreground mb-8 text-lg">
                            Tôi không ngừng học hỏi và mở rộng bộ kỹ năng của mình.
                            Dưới đây là biểu đồ thể hiện mức độ thành thạo các công nghệ chính.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-3 h-3 rounded-full bg-neon-blue shadow-[0_0_10px_#00d4ff]" />
                                <span className="font-medium">Vững (Expert): Python, BigQuery, Dagster</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-3 h-3 rounded-full bg-neon-purple shadow-[0_0_10px_#b026ff]" />
                                <span className="font-medium">Khá (Advanced): ETL, Analytics, dbt</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-3 h-3 rounded-full bg-neon-green shadow-[0_0_10px_#00ff9d]" />
                                <span className="font-medium">Đang học (Learning): Flink, CI/CD, AI Agents</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="h-[400px] w-full relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/10 to-neon-blue/10 rounded-full blur-3xl -z-10" />
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                                <Radar
                                    name="Skill Level"
                                    dataKey="A"
                                    stroke="#00d4ff"
                                    strokeWidth={3}
                                    fill="#00d4ff"
                                    fillOpacity={0.3}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                    itemStyle={{ color: '#00d4ff' }}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
