"use client"

import { Section } from "@/components/ui/section"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send } from "lucide-react"

// Missing Input and Textarea components, I'll define simple versions here or create them.
// I'll create them properly in the next step if needed, but for now I can inline or use standard HTML with classes.
// Actually, let's create them properly in `ui` folder after this, but for now I'll use standard HTML elements styled with Tailwind.

export function Contact() {
    return (
        <Section id="contact">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4">
                        Liên <span className="text-neon-blue">Hệ</span>
                    </h2>
                    <div className="h-1 w-20 bg-gradient-to-r from-neon-blue to-neon-purple mx-auto rounded-full" />
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <h3 className="text-2xl font-bold">Hãy kết nối với tôi</h3>
                        <p className="text-muted-foreground text-lg">
                            Tôi luôn sẵn sàng cho những cơ hội hợp tác mới. Hãy để lại tin nhắn và tôi sẽ phản hồi sớm nhất có thể.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-full bg-neon-purple/10 text-neon-purple">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold">Email</h4>
                                    <p className="text-muted-foreground">contact@trantuandai.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-full bg-neon-blue/10 text-neon-blue">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold">Phone</h4>
                                    <p className="text-muted-foreground">+84 123 456 789</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-full bg-white/5 text-white">
                                    <MapPin className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold">Location</h4>
                                    <p className="text-muted-foreground">Ho Chi Minh City, Vietnam</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Card className="bg-card/50 border-white/10 backdrop-blur-sm">
                            <CardContent className="p-8 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Họ và tên</label>
                                    <Input
                                        type="text"
                                        placeholder="Nhập họ tên của bạn"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email</label>
                                    <Input
                                        type="email"
                                        placeholder="Nhập email của bạn"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Nội dung</label>
                                    <Textarea
                                        placeholder="Bạn muốn trao đổi về vấn đề gì?"
                                        className="min-h-[120px]"
                                    />
                                </div>
                                <Button className="w-full bg-gradient-to-r from-neon-purple to-neon-blue text-white border-none hover:opacity-90">
                                    Gửi Tin Nhắn <Send className="ml-2 h-4 w-4" />
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </Section >
    )
}
