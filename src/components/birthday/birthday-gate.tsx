"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, ArrowRight } from "lucide-react"

import { birthdayConfig } from "@/config/birthday"

interface BirthdayGateProps {
    onEnter: (date: Date) => void
}

export function BirthdayGate({ onEnter }: BirthdayGateProps) {
    const [date, setDate] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!date) {
            setError("Vui lòng chọn ngày sinh nhật của bạn!")
            return
        }

        const enteredDate = new Date(date)
        const configDate = new Date(birthdayConfig.date)

        // Validate day and month
        if (enteredDate.getDate() !== configDate.getDate() || enteredDate.getMonth() !== configDate.getMonth()) {
            // For demo purposes, we might want to allow any date to enter the "Countdown" phase,
            // but if we want to be strict about "Identity", we could check here.
            // However, the prompt implies "personalization", so let's assume the user enters *their* birthday.
            // If it matches today, they get celebration. If not, countdown.
            // The logic in page.tsx handles the "is today" check.
            // Here we just pass the date.
        }

        onEnter(new Date(date))
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-20 left-20 w-72 h-72 bg-neon-purple/20 rounded-full blur-[100px] animate-pulse-glow" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-neon-blue/20 rounded-full blur-[100px] animate-pulse-glow delay-1000" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-md p-8 bg-card/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl"
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto bg-secondary rounded-full flex items-center justify-center mb-4 text-neon-purple">
                        <Calendar className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-bold font-space-grotesk mb-2">
                        Birthday Magic Journey
                    </h1>
                    <p className="text-muted-foreground">
                        Nhập ngày sinh của bạn để bắt đầu hành trình kỳ diệu.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        {/* <Input
                            type="text"
                            value={date}
                            placeholder="Nhập ngày sinh của bạn"
                            onChange={(e) => {
                                setDate(e.target.value)
                                setError("")
                            }}
                            className="bg-secondary/50 border-white/10 text-lg py-6 text-center"
                        /> */}

                        <Input
                            type="text"
                            placeholder="Chọn ngày sinh của bạn"
                            value={date}
                            onFocus={(e) => (e.target.type = "date")}
                            onBlur={(e) => {
                                if (!date) e.target.type = "text"
                            }}
                            onChange={(e) => {
                                setDate(e.target.value)
                                setError("")
                            }}
                            className="bg-secondary/50 border-white/10 text-lg py-6 text-center"
                        />

                        {error && (
                            <p className="text-red-500 text-sm text-center animate-pulse">
                                {error}
                            </p>
                        )}
                    </div>
                    <Button
                        type="submit"
                        className="w-full h-12 text-lg bg-neon-purple hover:bg-neon-purple/80 text-white shadow-[0_0_20px_rgba(176,38,255,0.3)]"
                    >
                        Khám phá ngay <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </form>
            </motion.div>
        </div>
    )
}
