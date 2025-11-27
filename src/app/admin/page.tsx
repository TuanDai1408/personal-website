"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar
} from "recharts"
import { api, StatsResponse } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash2, Eye, TrendingUp, Users, MessageSquare, Activity } from "lucide-react"
import { toast } from "sonner"
import { motion } from "framer-motion"

export default function AdminDashboard() {
    const router = useRouter()
    const [stats, setStats] = useState<StatsResponse[]>([])
    const [contacts, setContacts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem("adminToken")
        if (!token) {
            router.push("/admin/login")
            return
        }

        const fetchData = async () => {
            const [statsRes, contactsRes] = await Promise.all([
                api.getAdminStats(),
                api.getAdminContacts()
            ])

            if (statsRes.data) setStats(statsRes.data)
            if (contactsRes.data) setContacts(contactsRes.data)

            setLoading(false)
        }

        fetchData()
    }, [router])

    const handleDeleteContact = async (id: number) => {
        if (!confirm("Bạn có chắc chắn muốn xóa liên hệ này?")) return

        const { error } = await api.deleteAdminContact(id)
        if (error) {
            toast.error("Xóa thất bại: " + error)
        } else {
            toast.success("Đã xóa liên hệ")
            setContacts(contacts.filter(c => c.id !== id))
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-100px)]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
            </div>
        )
    }

    const totalViews = stats.reduce((acc, curr) => acc + curr.views, 0)

    return (
        <div className="space-y-8">
            {/* Summary Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { title: "Total Views", value: totalViews, icon: Eye, color: "text-blue-500", trend: "+12.5%" },
                    { title: "Active Users", value: "1,234", icon: Users, color: "text-purple-500", trend: "+5.2%" },
                    { title: "Messages", value: contacts.length, icon: MessageSquare, color: "text-indigo-500", trend: "+2.1%" },
                    { title: "Conversion", value: "3.2%", icon: Activity, color: "text-emerald-500", trend: "+0.8%" },
                ].map((item, index) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="bg-slate-900/50 border-slate-800 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/10">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between space-y-0 pb-2">
                                    <p className="text-sm font-medium text-slate-400">{item.title}</p>
                                    <item.icon className={`h-4 w-4 ${item.color}`} />
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <div className="text-2xl font-bold text-white">{item.value}</div>
                                    <div className="flex items-center text-xs text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
                                        <TrendingUp className="h-3 w-3 mr-1" />
                                        {item.trend}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid gap-6 md:grid-cols-7">
                <Card className="col-span-4 bg-slate-900/50 border-slate-800">
                    <CardHeader>
                        <CardTitle className="text-white">Traffic Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={stats}>
                                    <defs>
                                        <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                    <XAxis
                                        dataKey="day"
                                        stroke="#64748b"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="#64748b"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `${value}`}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                                        itemStyle={{ color: '#6366F1' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="views"
                                        stroke="#6366F1"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorViews)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3 bg-slate-900/50 border-slate-800">
                    <CardHeader>
                        <CardTitle className="text-white">User Growth</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={stats}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                    <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        cursor={{ fill: '#1e293b' }}
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                                    />
                                    <Bar dataKey="views" fill="#A855F7" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Data Table */}
            <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                    <CardTitle className="text-white">Recent Messages</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="border-slate-800 hover:bg-slate-800/50">
                                <TableHead className="text-slate-400">Name</TableHead>
                                <TableHead className="text-slate-400">Email</TableHead>
                                <TableHead className="text-slate-400">Subject</TableHead>
                                <TableHead className="text-slate-400">Date</TableHead>
                                <TableHead className="text-right text-slate-400">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {contacts.map((contact) => (
                                <TableRow key={contact.id} className="border-slate-800 hover:bg-slate-800/50 transition-colors">
                                    <TableCell className="font-medium text-slate-200">{contact.name}</TableCell>
                                    <TableCell className="text-slate-400">{contact.email}</TableCell>
                                    <TableCell className="text-slate-400">{contact.subject}</TableCell>
                                    <TableCell className="text-slate-400">{new Date(contact.created_at).toLocaleDateString()}</TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDeleteContact(contact.id)}
                                            className="text-slate-500 hover:text-red-500 hover:bg-red-500/10"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {contacts.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center text-slate-500 py-8">
                                        No messages found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
