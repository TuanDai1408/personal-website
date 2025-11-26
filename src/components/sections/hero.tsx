"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Download, Github, Linkedin, Facebook } from "lucide-react"
import { useEffect, useState } from "react"
import Image from "next/image"

const TypingEffect = ({ text }: { text: string }) => {
    const [displayedText, setDisplayedText] = useState("")
    const [index, setIndex] = useState(0)

    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text[index])
                setIndex((prev) => prev + 1)
            }, 100)
            return () => clearTimeout(timeout)
        }
    }, [index, text])

    return <span>{displayedText}</span>
}

export function Hero() {
    const { scrollY } = useScroll()
    const y1 = useTransform(scrollY, [0, 500], [0, 200])
    const y2 = useTransform(scrollY, [0, 500], [0, -150])

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12 px-4 md:px-6">
            {/* Background Particles (Simplified) */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-20 left-20 w-72 h-72 bg-neon-purple/20 rounded-full blur-[100px] animate-pulse-glow" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-neon-blue/20 rounded-full blur-[100px] animate-pulse-glow delay-1000" />
            </div>

            <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                    style={{ y: y1 }}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-lg md:text-xl lg:text-2xl font-medium text-neon-blue mb-4">
                        Xin chào, tôi là
                    </h2>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-space-grotesk mb-6 leading-tight">
                        Trần Tuấn <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue">Đại</span>
                    </h1>
                    <div className="text-base md:text-xl lg:text-2xl text-muted-foreground mb-8 min-h-[60px]">
                        <TypingEffect text="Data Management • Transform Data • AI Automation" />
                        <span className="animate-pulse">|</span>
                    </div>
                    <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-lg">
                        Tôi xây dựng pipeline dữ liệu, tự động hóa quy trình và biến dữ liệu thành hành động.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Button size="lg" className="bg-neon-purple hover:bg-neon-purple/80 text-white border-none shadow-[0_0_20px_rgba(176,38,255,0.3)]">
                            Xem Dự Án <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                        <Button size="lg" variant="outline" className="border-neon-blue text-neon-blue hover:bg-neon-blue/10">
                            Tải CV <Download className="ml-2 h-4 w-4" />
                        </Button>
                    </div>

                    {/* <div className="mt-12 flex gap-6">
                        {[Facebook, Github, Linkedin].map((Icon, i) => (
                            <a
                                key={i}
                                href="#"
                                className="p-3 rounded-full border border-white/10 hover:border-neon-blue hover:shadow-[0_0_15px_rgba(0,212,255,0.5)] transition-all group"
                            >
                                <Icon className="h-6 w-6 text-muted-foreground group-hover:text-neon-blue transition-colors" />
                            </a>
                        ))}
                    </div> */}
                    <div className="mt-12 flex gap-6">
                        {[Facebook, Github, Linkedin].map((Icon, i) => {
                            const links = [
                                "https://www.facebook.com/tran.tuan.ai.835268/",
                                "https://github.com/TuanDai1408",
                                "http://pam-dagster.daidataly.online/jobs"
                            ];

                            return (
                                <a
                                    key={i}
                                    href={links[i]}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-full border border-white/10 hover:border-neon-blue hover:shadow-[0_0_15px_rgba(0,212,255,0.5)] transition-all group"
                                >
                                    <Icon className="h-6 w-6 text-muted-foreground group-hover:text-neon-blue transition-colors" />
                                </a>
                            );
                        })}
                    </div>

                </motion.div>

                <motion.div
                    style={{ y: y2 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative hidden lg:block"
                >
                    <div className="relative w-[500px] h-[600px] mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-tr from-neon-purple to-neon-blue rounded-[2rem] rotate-6 opacity-20 blur-lg" />
                        <div className="absolute inset-0 bg-card/50 backdrop-blur-xl rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl">
                            <Image
                                src="/about_me/dai_avt.jpg"
                                alt="Tran Tuan Dai Avatar"
                                fill
                                sizes="(max-width: 768px) 100vw, 500px"
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Floating Elements */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -right-10 top-32 p-4 glass rounded-xl border border-neon-blue/30 shadow-lg"
                        >
                            <span className="text-neon-blue font-bold">ETL Pipeline</span>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            className="absolute right-20 top-80 p-4 glass rounded-xl border border-neon-blue/30 shadow-lg"
                        >
                            <span className="text-neon-blue font-bold">Trộm data</span>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 20, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -left-10 top-40 p-4 glass rounded-xl border border-neon-purple/30 shadow-lg"
                        >
                            <span className="text-neon-purple font-bold">AI Automation</span>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 20, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                            className="absolute left-20 bottom-32 p-4 glass rounded-xl border border-neon-purple/30 shadow-lg"
                        >
                            <span className="text-neon-purple font-bold">Code Dạo</span>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
