"use client"

import { Section } from "@/components/ui/section"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { useState } from "react"
import emailjs from '@emailjs/browser'
import { EMAILJS_CONFIG, isEmailJsConfigured } from "@/lib/emailjs.config"
import { api } from "@/lib/api"

interface ContactFormData {
    name: string
    email: string
    phone: string
    subject: string
    message: string
}

export function Contact() {
    const [formData, setFormData] = useState<ContactFormData>({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<{
        type: 'success' | 'error' | null
        message: string
    }>({ type: null, message: '' })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus({ type: null, message: '' })

        // Check if EmailJS is configured
        if (!isEmailJsConfigured()) {
            setSubmitStatus({
                type: 'error',
                message: 'EmailJS chưa được cấu hình. Vui lòng liên hệ quản trị viên.'
            })
            setIsSubmitting(false)
            return
        }

        try {
            // Send email using EmailJS
            const result = await emailjs.send(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templateId,
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    phone: formData.phone,
                    subject: formData.subject,
                    message: formData.message,
                    to_email: 'trantuandai2508@gmail.com'
                },
                EMAILJS_CONFIG.publicKey
            )

            // 2️⃣ Sau đó lưu vào backend
            // await api.submitContact({
            //     name: formData.name,
            //     email: formData.email,
            //     subject: formData.subject,
            //     message: formData.message
            // })



            if (result.status === 200) {
                setSubmitStatus({
                    type: 'success',
                    message: 'Cảm ơn bạn đã liên hệ! Tôi sẽ phản hồi sớm nhất có thể.'
                })
                // Reset form
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    subject: "",
                    message: ""
                })
            } else {
                throw new Error('Failed to send email')
            }
        } catch (error) {
            console.error('EmailJS Error:', error)
            setSubmitStatus({
                type: 'error',
                message: 'Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.'
            })
        }

        setIsSubmitting(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
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
                                    <p className="text-muted-foreground">trantuandai2508@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-full bg-neon-blue/10 text-neon-blue">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold">Phone</h4>
                                    <p className="text-muted-foreground">+84 931 368 921</p>
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
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Card className="bg-card/50 border-white/10 backdrop-blur-sm">
                            <CardContent className="p-8 space-y-6">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Họ và tên</label>
                                        <Input
                                            type="text"
                                            name="name"
                                            placeholder="Nhập họ tên của bạn"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            minLength={2}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Email</label>
                                        <Input
                                            type="email"
                                            name="email"
                                            placeholder="Nhập email của bạn"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Số điện thoại</label>
                                        <Input
                                            type="tel"
                                            name="phone"
                                            placeholder="Nhập số điện thoại của bạn"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            pattern="[0-9]{10,11}"
                                            title="Vui lòng nhập số điện thoại hợp lệ (10-11 số)"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Chủ đề</label>
                                        <Input
                                            type="text"
                                            name="subject"
                                            placeholder="Chủ đề tin nhắn"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            minLength={3}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Nội dung</label>
                                        <Textarea
                                            name="message"
                                            placeholder="Bạn muốn trao đổi về vấn đề gì?"
                                            className="min-h-[120px]"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            minLength={10}
                                        />
                                    </div>

                                    {submitStatus.type && (
                                        <div className={`p-4 rounded-lg ${submitStatus.type === 'success'
                                            ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                                            : 'bg-red-500/10 text-red-500 border border-red-500/20'
                                            }`}>
                                            {submitStatus.message}
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-gradient-to-r from-neon-purple to-neon-blue text-white border-none hover:opacity-90 disabled:opacity-50"
                                    >
                                        {isSubmitting ? 'Đang gửi...' : 'Gửi Tin Nhắn'} <Send className="ml-2 h-4 w-4" />
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </Section >
    )
}
