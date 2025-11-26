"use client"

import { useState } from "react"
import { BirthdayGate } from "@/components/birthday/birthday-gate"
import { Countdown } from "@/components/birthday/countdown"
import { BirthdayCelebration } from "@/components/birthday/birthday-celebration"

export default function BirthdayPage() {
    const [step, setStep] = useState<"gate" | "countdown" | "celebration">("gate")
    const [targetDate, setTargetDate] = useState<Date | null>(null)

    const handleDateEnter = (date: Date) => {
        setTargetDate(date)
        const today = new Date()

        // Check if it's birthday (ignore year)
        if (date.getDate() === today.getDate() && date.getMonth() === today.getMonth()) {
            setStep("celebration")
        } else {
            setStep("countdown")
        }
    }

    return (
        <main>
            {step === "gate" && <BirthdayGate onEnter={handleDateEnter} />}
            {step === "countdown" && targetDate && (
                <Countdown
                    targetDate={targetDate}
                    onReset={() => setStep("gate")}
                />
            )}
            {step === "celebration" && <BirthdayCelebration />}
        </main>
    )
}
