"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"
import { api, StatsResponse } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"

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

    const handleLogout = () => {
        localStorage.removeItem("adminToken")
        router.push("/admin/login")
    }

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
        return <div className="p-8 text-center">Loading...</div>
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <Button variant="destructive" onClick={handleLogout}>Đăng xuất</Button>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Tổng lượt xem</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">
                                {stats.reduce((acc, curr) => acc + curr.views, 0)}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Liên hệ mới</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">
                                {contacts.length}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Thống kê truy cập (Tuần qua)</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={stats}>
                                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                    <XAxis
                                        dataKey="day"
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `${value}`}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
                                        labelStyle={{ color: 'var(--foreground)' }}
                                    />
                                    <Bar dataKey="views" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Quản lý liên hệ</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Tên</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Chủ đề</TableHead>
                                    <TableHead>Ngày gửi</TableHead>
                                    <TableHead className="text-right">Hành động</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {contacts.map((contact) => (
                                    <TableRow key={contact.id}>
                                        <TableCell className="font-medium">{contact.name}</TableCell>
                                        <TableCell>{contact.email}</TableCell>
                                        <TableCell>{contact.subject}</TableCell>
                                        <TableCell>{new Date(contact.created_at).toLocaleDateString()}</TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDeleteContact(contact.id)}
                                                className="text-red-500 hover:text-red-700 hover:bg-red-100"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {contacts.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center text-muted-foreground">
                                            Chưa có liên hệ nào
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
