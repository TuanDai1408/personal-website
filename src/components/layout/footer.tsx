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
                        Data Management • Marketing Analyst • AI Automator
                    </p>
                </div>

                {/* <div className="flex gap-6">
                    {[Facebook, Github, Linkedin].map((Icon, i) => (
                        <a
                            key={i}
                            href="#"
                            className="text-muted-foreground hover:text-neon-blue transition-colors"
                        >
                            <Icon className="h-5 w-5" />
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

                <div className="text-center md:text-right text-sm text-muted-foreground">
                    <p>© 2025 Tran Tuan Dai. All rights reserved.</p>
                    <p>Designed & Built with Next.js & Tailwind</p>
                </div>
            </div>
        </footer>
    )
}
