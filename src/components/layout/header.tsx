"use client"

import { useState } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Menu, X } from "lucide-react"
import Link from "next/link"

const navItems = [
    { name: "Về tôi", href: "#about" },
    { name: "Kỹ năng", href: "#skills" },
    { name: "Dự án", href: "#projects" },
    { name: "Kinh nghiệm", href: "#experience" },
    { name: "Liên hệ", href: "#contact" },
]

export function Header() {
    const { scrollY } = useScroll()
    const [hidden, setHidden] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0
        if (latest > previous && latest > 150) {
            setHidden(true)
        } else {
            setHidden(false)
        }
        setScrolled(latest > 50)
    })

    return (
        <motion.header
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
                }`}
        >
            <div className="container flex items-center justify-between h-16">
                <Link href="#" className="text-2xl font-bold font-space-grotesk tracking-tighter">
                    TD<span className="text-neon-blue">.</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="header-desktop-nav">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium text-muted-foreground hover:text-neon-blue transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                    <ThemeToggle />
                    <Button size="sm" className="bg-neon-purple hover:bg-neon-purple/80 text-white border-none">
                        Tải CV
                    </Button>
                </nav>

                {/* Mobile Menu Toggle */}
                <div className="header-mobile-toggle">
                    <ThemeToggle />
                    <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </Button>
                </div>
            </div>

            {/* Mobile Nav */}
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-background border-b border-white/10"
                    style={{ display: 'block' }}
                >
                    <nav className="container flex flex-col gap-4 py-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium py-2 hover:text-neon-blue transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Button className="w-full bg-neon-purple text-white">Tải CV</Button>
                    </nav>
                </motion.div>
            )}
        </motion.header>
    )
}
