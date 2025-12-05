"use client"

import { useEffect, useState } from "react"
import { api, User } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Search, Edit, Trash2, Shield, User as UserIcon, Calendar, Image as ImageIcon, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
    const [userToDelete, setUserToDelete] = useState<number | null>(null)
    const [isSaving, setIsSaving] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    // Form state
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        full_name: "",
        dob: "",
        role: "user",
        is_active: true,
        images: "" // comma separated urls
    })

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const { data, error } = await api.getUsers()
            if (data) setUsers(data)
            if (error) toast.error("Failed to fetch users: " + error)
        } catch (error) {
            toast.error("An error occurred")
        } finally {
            setLoading(false)
        }
    }

    const openDeleteConfirm = (id: number) => {
        setUserToDelete(id)
        setDeleteConfirmOpen(true)
    }

    const handleDelete = async () => {
        if (!userToDelete) return

        setIsDeleting(true)
        const { error } = await api.deleteUser(userToDelete)

        if (error) {
            toast.error("❌ Xóa user thất bại: " + error)
        } else {
            toast.success("✅ Đã xóa user thành công!")
            setUsers(users.filter(u => u.id !== userToDelete))
        }
        setIsDeleting(false)
        setDeleteConfirmOpen(false)
        setUserToDelete(null)
    }

    const handleSave = async () => {
        // Validate required fields
        if (!formData.username || !formData.email) {
            toast.error("Username và Email là bắt buộc!")
            return
        }

        setIsSaving(true)

        // Parse comma-separated image URLs
        const imageUrls = formData.images.split(',').map(s => s.trim()).filter(Boolean)

        const payload: any = {
            username: formData.username.trim(),
            email: formData.email.trim(),
            role: formData.role || "user",
            is_active: formData.is_active !== undefined ? formData.is_active : true,
            images: imageUrls  // Always send array (empty or with URLs)
        }

        // Only add optional fields if they have values
        if (formData.full_name && formData.full_name.trim()) {
            payload.full_name = formData.full_name.trim()
        }

        if (formData.dob && formData.dob.trim()) {
            payload.dob = formData.dob
        }

        if (selectedUser) {
            // Update existing user
            if (formData.password && formData.password.trim()) {
                // Only include password if it was entered
                payload.password = formData.password.trim()
            }

            const { error } = await api.updateUser(selectedUser.id, payload)
            if (error) {
                toast.error("Cập nhật thất bại: " + error)
            } else {
                toast.success("✅ Đã cập nhật user thành công!")
                fetchData()
                setIsDialogOpen(false)
            }
        } else {
            // Create new user - password is required
            if (!formData.password || !formData.password.trim()) {
                toast.error("Password là bắt buộc khi tạo user mới!")
                setIsSaving(false)
                return
            }
            payload.password = formData.password.trim()

            const { error } = await api.createUser(payload)
            if (error) {
                toast.error("Tạo user thất bại: " + error)
            } else {
                toast.success("✅ Đã tạo user thành công!")
                fetchData()
                setIsDialogOpen(false)
            }
        }
        setIsSaving(false)
    }

    const openEdit = (user: User) => {
        setSelectedUser(user)
        setFormData({
            username: user.username,
            email: user.email,
            password: "", // Don't show password
            full_name: user.full_name || "",
            dob: user.dob || "",
            role: user.role || "user",
            is_active: true, // Default to true since User interface doesn't have is_active
            images: user.images?.map((img) => img.image_url).join(', ') || ""
        })
        setIsDialogOpen(true)
    }

    const openCreate = () => {
        setSelectedUser(null)
        setFormData({
            username: "",
            email: "",
            password: "",
            full_name: "",
            dob: "",
            role: "user",
            is_active: true,
            images: ""
        })
        setIsDialogOpen(true)
    }

    const filteredUsers = users.filter(u =>
        u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (u.full_name && u.full_name.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-white">User Management</h2>
                <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={openCreate}>
                    <Plus className="mr-2 h-4 w-4" /> Add User
                </Button>
            </div>

            <div className="flex items-center space-x-2">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
                    <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 bg-slate-900/50 border-slate-800 text-white"
                    />
                </div>
            </div>

            <Card className="bg-slate-900/50 border-slate-800">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-slate-800 hover:bg-slate-800/50">
                                <TableHead className="text-slate-400">User</TableHead>
                                <TableHead className="text-slate-400">Full Name</TableHead>
                                <TableHead className="text-slate-400">Birthday</TableHead>
                                <TableHead className="text-slate-400">Role</TableHead>
                                <TableHead className="text-right text-slate-400">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <TableRow key={user.id} className="border-slate-800 hover:bg-slate-800/50">
                                    <TableCell className="font-medium text-slate-200">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={user.images?.[0]?.image_url || `https://avatar.vercel.sh/${user.username}`} />
                                                <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p>{user.username}</p>
                                                <p className="text-xs text-slate-500">{user.email}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-slate-300">{user.full_name || "-"}</TableCell>
                                    <TableCell className="text-slate-300">
                                        {user.dob ? (
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-3 w-3 text-slate-400" />
                                                {new Date(user.dob).toLocaleDateString()}
                                            </div>
                                        ) : "-"}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {user.role === 'admin' ? <Shield className="h-3 w-3 text-indigo-400" /> : <UserIcon className="h-3 w-3 text-slate-400" />}
                                            <span className="text-slate-300 capitalize">{user.role}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-indigo-400" onClick={() => openEdit(user)}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-slate-400 hover:text-red-400"
                                                onClick={() => openDeleteConfirm(user.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {loading && (
                        <div className="p-8 space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-4 animate-pulse">
                                    <div className="h-10 w-10 bg-slate-800 rounded-full"></div>
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 bg-slate-800 rounded w-1/4"></div>
                                        <div className="h-3 bg-slate-800 rounded w-1/3"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
                <DialogContent className="bg-slate-900 border-slate-800 text-white">
                    <DialogHeader>
                        <DialogTitle>Xác nhận xóa user</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <p className="text-slate-300">Bạn có chắc chắn muốn xóa user này không?</p>
                        <p className="text-sm text-slate-500 mt-2">Hành động này không thể hoàn tác.</p>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)} disabled={isDeleting} className="border-slate-700 text-slate-300 hover:bg-slate-800">
                            Hủy
                        </Button>
                        <Button onClick={handleDelete} disabled={isDeleting} className="bg-red-600 hover:bg-red-700">
                            {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Xóa
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="bg-slate-900 border-slate-800 text-white">
                    <DialogHeader>
                        <DialogTitle>{selectedUser ? "Edit User" : "Add User"}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} className="bg-slate-950 border-slate-800" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="bg-slate-950 border-slate-800" />
                        </div>
                        {!selectedUser && (
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="bg-slate-950 border-slate-800" />
                            </div>
                        )}
                        <div className="grid gap-2">
                            <Label htmlFor="full_name">Full Name</Label>
                            <Input id="full_name" value={formData.full_name} onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} className="bg-slate-950 border-slate-800" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="dob">Date of Birth</Label>
                            <Input id="dob" type="date" value={formData.dob} onChange={(e) => setFormData({ ...formData, dob: e.target.value })} className="bg-slate-950 border-slate-800" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="images">Images (URLs, comma separated)</Label>
                            <Textarea id="images" value={formData.images} onChange={(e) => setFormData({ ...formData, images: e.target.value })} className="bg-slate-950 border-slate-800" placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isSaving} className="border-slate-700 text-slate-300 hover:bg-slate-800">Cancel</Button>
                        <Button onClick={handleSave} disabled={isSaving} className="bg-indigo-600 hover:bg-indigo-700">
                            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
