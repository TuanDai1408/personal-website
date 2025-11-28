"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { birthdayConfig } from "@/config/birthday"

export function GallerySection({ images }: { images: string[] }) {
    const photos = images.length > 0 ? images : birthdayConfig.images.gallery
    return (
        <section className="py-20 bg-background">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold font-space-grotesk mb-4">
                        Khoảnh khắc đáng nhớ 📸
                    </h2>
                    <div className="p-6 bg-secondary/30 rounded-xl max-w-2xl mx-auto border border-white/10">
                        <p className="text-xl italic font-serif text-neon-purple">
                            "Tuổi mới, một chương mới — hãy viết nên những điều tuyệt vời nhất."
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {photos.map((src, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                            transition={{ duration: 0.3 }}
                            className={`relative aspect-[4/5] rounded-2xl overflow-hidden border-2 border-transparent hover:border-neon-blue hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}
                        >
                            <Image
                                src={src}
                                alt={`Memory ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
