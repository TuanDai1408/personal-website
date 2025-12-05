"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
    LayoutDashboard,
    Users,
    ShoppingCart,
    BarChart2,
    Settings,
    LogOut,
    Menu,
    Bell,
    Search,
    ChevronRight,
    Image as ImageIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: BarChart2, label: "Analytics", href: "/admin/analytics" },
    { icon: ShoppingCart, label: "Content", href: "/admin/content" },
    { icon: ImageIcon, label: "Media", href: "/admin/media" },
    { icon: Users, label: "Users", href: "/admin/users" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const pathname = usePathname()

    // Only apply layout to admin pages, excluding login
    if (pathname === "/admin/login") {
        return <>{children}</>
    }

    return (
        <div className="min-h-screen bg-[#0F172A] text-slate-100 flex">
            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{
                    width: isSidebarOpen ? 280 : 80,
                    x: 0
                }}
                className={cn(
                    "fixed md:static inset-y-0 left-0 z-40 flex flex-col border-r border-slate-800 bg-[#0F172A] transition-all duration-300",
                    isMobileMenuOpen ? "translate-x-0 w-[280px]" : "-translate-x-full md:translate-x-0"
                )}
            >
                <div className="h-16 flex items-center px-6 border-b border-slate-800 justify-between md:justify-start">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shrink-0">
                            <span className="font-bold text-white">TD</span>
                        </div>
                        {(isSidebarOpen || isMobileMenuOpen) && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="font-bold text-lg whitespace-nowrap"
                            >
                                Admin Portal
                            </motion.span>
                        )}
                    </div>
                    {/* Close button for mobile */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden text-slate-400"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <ChevronRight className="rotate-180" />
                    </Button>
                </div>

                <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                                <div className={cn(
                                    "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group relative overflow-hidden",
                                    isActive
                                        ? "text-white bg-indigo-500/10"
                                        : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                                )}>
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-l-2 border-indigo-500"
                                        />
                                    )}
                                    <item.icon size={20} className={cn("shrink-0 relative z-10", isActive ? "text-indigo-400" : "group-hover:text-indigo-400")} />
                                    {(isSidebarOpen || isMobileMenuOpen) && (
                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="font-medium relative z-10"
                                        >
                                            {item.label}
                                        </motion.span>
                                    )}
                                </div>
                            </Link>
                        )
                    })}
                </div>

                <div className="p-4 border-t border-slate-800 hidden md:block">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-slate-800 text-slate-400 transition-colors"
                    >
                        {isSidebarOpen ? <ChevronRight className="rotate-180" /> : <ChevronRight />}
                    </button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Topbar */}
                <header className="h-16 border-b border-slate-800 bg-[#0F172A]/80 backdrop-blur-md sticky top-0 z-10 px-4 md:px-6 flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden text-slate-400 -ml-2"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu />
                        </Button>
                        <div className="relative w-full max-w-md hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <Input
                                placeholder="Search..."
                                className="bg-slate-900/50 border-slate-700 pl-10 text-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-slate-400 hover:text-white relative"
                            onClick={() => {
                                localStorage.removeItem("adminToken")
                                toast.success("Đăng xuất thành công")
                                window.location.href = "/admin/login"
                            }}
                        >
                            <LogOut size={20} />
                        </Button>

                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        </Button>
                        <div className="h-8 w-[1px] bg-slate-800 mx-2 hidden md:block" />
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium text-white">Admin User</p>
                                <p className="text-xs text-slate-400">Super Admin</p>
                            </div>
                            <Avatar className="h-8 w-8 md:h-9 md:w-9 border-2 border-indigo-500/20">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>AD</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 md:p-6 overflow-y-auto overflow-x-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={pathname}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    )
}
