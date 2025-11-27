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
    X,
    Bell,
    Search,
    ChevronRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: Users, label: "Users", href: "/admin/users" },
    { icon: ShoppingCart, label: "Orders", href: "/admin/orders" },
    { icon: BarChart2, label: "Analytics", href: "/admin/analytics" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const pathname = usePathname()

    // Only apply layout to admin pages, excluding login
    if (pathname === "/admin/login") {
        return <>{children}</>
    }

    return (
        <div className="min-h-screen bg-[#0F172A] text-slate-100 flex">
            {/* Sidebar */}
            <motion.aside
                initial={{ width: 280 }}
                animate={{ width: isSidebarOpen ? 280 : 80 }}
                className="hidden md:flex flex-col border-r border-slate-800 bg-[#0F172A] relative z-20"
            >
                <div className="h-16 flex items-center px-6 border-b border-slate-800">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shrink-0">
                            <span className="font-bold text-white">TD</span>
                        </div>
                        {isSidebarOpen && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="font-bold text-lg whitespace-nowrap"
                            >
                                Admin Portal
                            </motion.span>
                        )}
                    </div>
                </div>

                <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link key={item.href} href={item.href}>
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
                                    {isSidebarOpen && (
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

                <div className="p-4 border-t border-slate-800">
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
                <header className="h-16 border-b border-slate-800 bg-[#0F172A]/80 backdrop-blur-md sticky top-0 z-10 px-6 flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="relative w-full max-w-md hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <Input
                                placeholder="Search..."
                                className="bg-slate-900/50 border-slate-700 pl-10 text-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20"
                            />
                        </div>
                        <Button variant="ghost" size="icon" className="md:hidden text-slate-400">
                            <Menu />
                        </Button>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        </Button>
                        <div className="h-8 w-[1px] bg-slate-800 mx-2" />
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium text-white">Admin User</p>
                                <p className="text-xs text-slate-400">Super Admin</p>
                            </div>
                            <Avatar className="h-9 w-9 border-2 border-indigo-500/20">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>AD</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 overflow-y-auto">
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
