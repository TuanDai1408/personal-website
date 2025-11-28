"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell
} from "recharts"
import { motion } from "framer-motion"
import { TrendingUp, Users, Clock, MousePointer } from "lucide-react"

const trafficData = [
    { name: 'Mon', views: 4000, visitors: 2400 },
    { name: 'Tue', views: 3000, visitors: 1398 },
    { name: 'Wed', views: 2000, visitors: 9800 },
    { name: 'Thu', views: 2780, visitors: 3908 },
    { name: 'Fri', views: 1890, visitors: 4800 },
    { name: 'Sat', views: 2390, visitors: 3800 },
    { name: 'Sun', views: 3490, visitors: 4300 },
]

const topContentData = [
    { name: 'Home', views: 4000 },
    { name: 'Projects', views: 3000 },
    { name: 'Blog', views: 2000 },
    { name: 'About', views: 2780 },
    { name: 'Contact', views: 1890 },
]

const sourceData = [
    { name: 'Organic', value: 400 },
    { name: 'Direct', value: 300 },
    { name: 'Social', value: 300 },
    { name: 'Referral', value: 200 },
]

const COLORS = ['#6366F1', '#A855F7', '#0EA5E9', '#10B981']

export default function AnalyticsPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-white">Analytics</h2>
            </div>

            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { title: "Total Views", value: "45.2k", icon: Users, color: "text-indigo-500", trend: "+12.5%" },
                    { title: "Bounce Rate", value: "42.3%", icon: TrendingUp, color: "text-purple-500", trend: "-2.4%" },
                    { title: "Avg. Time", value: "4m 12s", icon: Clock, color: "text-sky-500", trend: "+8.1%" },
                    { title: "Click Rate", value: "12.5%", icon: MousePointer, color: "text-emerald-500", trend: "+3.2%" },
                ].map((item, index) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="bg-slate-900/50 border-slate-800">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-slate-400">
                                    {item.title}
                                </CardTitle>
                                <item.icon className={`h-4 w-4 ${item.color}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-white">{item.value}</div>
                                <p className="text-xs text-slate-500 mt-1">
                                    <span className={item.trend.startsWith('+') ? "text-emerald-500" : "text-red-500"}>
                                        {item.trend}
                                    </span>{" "}
                                    from last month
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Main Charts */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 bg-slate-900/50 border-slate-800">
                    <CardHeader>
                        <CardTitle className="text-white">Traffic Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={trafficData}>
                                    <defs>
                                        <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                                    />
                                    <Area type="monotone" dataKey="views" stroke="#6366F1" fillOpacity={1} fill="url(#colorViews)" />
                                    <Area type="monotone" dataKey="visitors" stroke="#A855F7" fillOpacity={1} fill="url(#colorViews)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3 bg-slate-900/50 border-slate-800">
                    <CardHeader>
                        <CardTitle className="text-white">Traffic Sources</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={sourceData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {sourceData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="flex justify-center gap-4 mt-4">
                                {sourceData.map((entry, index) => (
                                    <div key={entry.name} className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                                        <span className="text-sm text-slate-400">{entry.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Top Content */}
            <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                    <CardTitle className="text-white">Top Content</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={topContentData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    cursor={{ fill: '#1e293b' }}
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                                />
                                <Bar dataKey="views" fill="#6366F1" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
