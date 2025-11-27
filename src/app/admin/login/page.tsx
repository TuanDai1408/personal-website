"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react"

export default function AdminLogin() {
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { data, error } = await api.login(password, username)

            if (error) {
                toast.error("Đăng nhập thất bại: " + error)
            } else if (data) {
                toast.success("Đăng nhập thành công!")
                localStorage.setItem("adminToken", data.token)
                router.push("/admin")
            }
        } catch (err) {
            toast.error("Có lỗi xảy ra")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen w-full flex bg-[#0F172A] overflow-hidden">
            {/* Left Panel - Visuals */}
            <div className="hidden lg:flex w-[60%] relative items-center justify-center overflow-hidden">
                {/* Animated Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-900 opacity-50" />

                {/* Floating Shapes */}
                <motion.div
                    animate={{
                        rotate: 360,
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        rotate: -360,
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl"
                />

                {/* Tech Mesh / Abstract Art */}
                <div className="relative z-10 p-12 text-white/90 max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h1 className="text-5xl font-bold font-space-grotesk mb-6 leading-tight">
                            Quản trị hệ thống <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                                Thông minh & Bảo mật
                            </span>
                        </h1>
                        <p className="text-lg text-slate-300 leading-relaxed">
                            Chào mừng quay trở lại. Truy cập vào dashboard để quản lý dữ liệu, xem thống kê và điều hành hệ thống của bạn một cách hiệu quả nhất.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Right Panel - Login Form */}
            <div className="w-full lg:w-[40%] flex items-center justify-center p-8 relative z-20">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    <div className="mb-8 text-center lg:text-left">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 mb-4"
                        >
                            <ShieldCheck className="w-6 h-6" />
                        </motion.div>
                        <h2 className="text-3xl font-bold text-white mb-2">Welcome back 👋</h2>
                        <p className="text-slate-400">Vui lòng đăng nhập để tiếp tục</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="username" className="text-slate-300">Tài khoản</Label>
                            <div className="relative group">
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="admin"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all duration-300"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-slate-300">Mật khẩu</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all duration-300 pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            <div className="flex justify-end">
                                <a href="#" className="text-sm text-indigo-400 hover:text-indigo-300 hover:underline transition-all">
                                    Quên mật khẩu?
                                </a>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium py-6 rounded-xl shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            ) : (
                                "Đăng nhập Dashboard"
                            )}
                        </Button>
                    </form>

                    <p className="mt-8 text-center text-sm text-slate-500">
                        Chưa có tài khoản?{" "}
                        <a href="#" className="text-indigo-400 hover:text-indigo-300 hover:underline">
                            Liên hệ quản trị viên
                        </a>
                    </p>
                </motion.div>
            </div>
        </div>
    )
}
