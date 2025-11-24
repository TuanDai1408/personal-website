import { Github, Linkedin, Facebook } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-background border-t border-white/10 py-12">
            <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold font-space-grotesk mb-2">
                        Trần Tuấn <span className="text-neon-blue">Đại</span>
                    </h3>
                    <p className="text-muted-foreground text-sm">
                        Data Engineer • Marketing Analyst • AI Automator
                    </p>
                </div>

                <div className="flex gap-6">
                    {[Facebook, Github, Linkedin].map((Icon, i) => (
                        <a
                            key={i}
                            href="#"
                            className="text-muted-foreground hover:text-neon-blue transition-colors"
                        >
                            <Icon className="h-5 w-5" />
                        </a>
                    ))}
                </div>

                <div className="text-center md:text-right text-sm text-muted-foreground">
                    <p>© 2025 Tran Tuan Dai. All rights reserved.</p>
                    <p>Designed & Built with Next.js & Tailwind</p>
                </div>
            </div>
        </footer>
    )
}
