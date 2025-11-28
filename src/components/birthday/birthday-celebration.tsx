"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BirthdayHero } from "./hero-section"
import { GiftBox } from "./gift-box"
import { ScrollSections } from "./scroll-sections"
import { InteractiveStars } from "./interactive-stars"
import { GallerySection } from "./gallery-section"
import { FireworksSection } from "./fireworks-section"

import { User } from "@/lib/api"

export function BirthdayCelebration({ user }: { user: User }) {
    const [giftOpened, setGiftOpened] = useState(false)

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <BirthdayHero user={user} onOpenGift={() => {
                const element = document.getElementById('gift-section')
                element?.scrollIntoView({ behavior: 'smooth' })
            }} />

            <section id="gift-section" className="min-h-screen flex flex-col items-center justify-center py-20 relative">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Món quà bí mật 🎁</h2>
                    <p className="text-muted-foreground">Chạm vào hộp quà để mở nhé!</p>
                </div>
                <GiftBox onOpen={() => setGiftOpened(true)} />
            </section>

            <AnimatePresence>
                {giftOpened && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 1 }}
                    >
                        <ScrollSections />
                        <InteractiveStars />
                        <GallerySection images={user.images?.map(img => img.image_url) || []} />
                        <FireworksSection />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
