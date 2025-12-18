"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Plus, Search, Edit, Trash2, Eye, FileText, FolderGit2, Mail, ChevronDown, AlertTriangle } from "lucide-react"
import { toast } from "sonner"
import { motion } from "framer-motion"

export default function ContentPage() {
    const [posts, setPosts] = useState<any[]>([])
    const [projects, setProjects] = useState<any[]>([])
    const [contacts, setContacts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [expandedMessage, setExpandedMessage] = useState<number | null>(null)
    const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; type: 'post' | 'project' | 'contact' | null; id: number | null; item: any }>({
        open: false,
        type: null,
        id: null,
        item: null
    })

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const [postsRes, projectsRes, contactsRes] = await Promise.all([
                api.getPosts(),
                api.getProjects(),
                api.getAdminContacts()
            ])
            if (postsRes.data) setPosts(postsRes.data)
            if (projectsRes.data) setProjects(projectsRes.data)
            if (contactsRes.data) setContacts(contactsRes.data)
        } catch (error) {
            toast.error("Failed to fetch content")
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteClick = (type: 'post' | 'project' | 'contact', id: number, item: any) => {
        setDeleteDialog({ open: true, type, id, item })
    }

    const handleDeleteConfirm = async () => {
        if (!deleteDialog.type || !deleteDialog.id) return

        let result
        if (deleteDialog.type === 'post') {
            result = await api.deletePost(deleteDialog.id)
        } else if (deleteDialog.type === 'project') {
            result = await api.deleteProject(deleteDialog.id)
        } else {
            result = await api.deleteAdminContact(deleteDialog.id)
        }

        if (result.error) {
            toast.error("Delete failed: " + result.error)
        } else {
            toast.success("Đã xóa thành công !")
            if (deleteDialog.type === 'post') {
                setPosts(posts.filter(p => p.id !== deleteDialog.id))
            } else if (deleteDialog.type === 'project') {
                setProjects(projects.filter(p => p.id !== deleteDialog.id))
            } else {
                setContacts(contacts.filter(c => c.id !== deleteDialog.id))
            }
        }

        setDeleteDialog({ open: false, type: null, id: null, item: null })
    }

    const handleDeleteCancel = () => {
        setDeleteDialog({ open: false, type: null, id: null, item: null })
    }

    const filteredPosts = posts.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
    const filteredProjects = projects.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
    const filteredContacts = contacts.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.subject.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] space-y-4">
                <div className="relative">
                    <div className="h-16 w-16 rounded-full border-4 border-slate-700 border-t-indigo-500 animate-spin"></div>
                    <div className="absolute inset-0 h-16 w-16 rounded-full border-4 border-transparent border-t-purple-500 animate-spin" style={{ animationDuration: '1.5s' }}></div>
                </div>
                <p className="text-slate-400 text-sm animate-pulse">Đang tải dữ liệu...</p>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Content Management</h2>
                <Button className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto">
                    <Plus className="mr-2 h-4 w-4" /> Create New
                </Button>
            </div>

            <div className="flex items-center space-x-2">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
                    <Input
                        placeholder="Search content..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 bg-slate-900/50 border-slate-800 text-white"
                    />
                </div>
            </div>

            <Tabs defaultValue="posts" className="space-y-4">
                <TabsList className="bg-slate-900/50 border border-slate-800">
                    <TabsTrigger value="posts" className="data-[state=active]:bg-indigo-600">
                        <FileText className="mr-2 h-4 w-4" /> Posts
                    </TabsTrigger>
                    <TabsTrigger value="projects" className="data-[state=active]:bg-purple-600">
                        <FolderGit2 className="mr-2 h-4 w-4" /> Projects
                    </TabsTrigger>
                    <TabsTrigger value="contacts" className="data-[state=active]:bg-emerald-600">
                        <Mail className="mr-2 h-4 w-4" /> Contacts
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="posts">
                    <Card className="bg-slate-900/50 border-slate-800">
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-slate-800 hover:bg-slate-800/50">
                                            <TableHead className="text-slate-400">Title</TableHead>
                                            <TableHead className="text-slate-400">Status</TableHead>
                                            <TableHead className="text-slate-400">Views</TableHead>
                                            <TableHead className="text-slate-400">Date</TableHead>
                                            <TableHead className="text-right text-slate-400">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredPosts.map((post) => (
                                            <TableRow key={post.id} className="border-slate-800 hover:bg-slate-800/50">
                                                <TableCell className="font-medium text-slate-200">{post.title}</TableCell>
                                                <TableCell>
                                                    <span className={`px-2 py-1 rounded-full text-xs ${post.status === 'published' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-yellow-500/10 text-yellow-500'
                                                        }`}>
                                                        {post.status}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-slate-400">{post.views}</TableCell>
                                                <TableCell className="text-slate-400">{new Date(post.created_at).toLocaleDateString()}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-indigo-400">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="text-slate-400 hover:text-red-400"
                                                            onClick={() => handleDeleteClick('post', post.id, post)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {filteredPosts.length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={5} className="text-center text-slate-500 py-8">
                                                    No posts found
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="projects">
                    <Card className="bg-slate-900/50 border-slate-800">
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-slate-800 hover:bg-slate-800/50">
                                            <TableHead className="text-slate-400">Title</TableHead>
                                            <TableHead className="text-slate-400">Status</TableHead>
                                            <TableHead className="text-slate-400">Date</TableHead>
                                            <TableHead className="text-right text-slate-400">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredProjects.map((project) => (
                                            <TableRow key={project.id} className="border-slate-800 hover:bg-slate-800/50">
                                                <TableCell className="font-medium text-slate-200">{project.title}</TableCell>
                                                <TableCell>
                                                    <span className={`px-2 py-1 rounded-full text-xs ${project.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'
                                                        }`}>
                                                        {project.status}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-slate-400">{new Date(project.created_at).toLocaleDateString()}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-indigo-400">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="text-slate-400 hover:text-red-400"
                                                            onClick={() => handleDeleteClick('project', project.id, project)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {filteredProjects.length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={4} className="text-center text-slate-500 py-8">
                                                    No projects found
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="contacts">
                    <Card className="bg-slate-900/50 border-slate-800">
                        <CardContent className="p-0">
                            {/* Desktop Table View */}
                            <div className="hidden md:block overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-slate-800 hover:bg-slate-800/50">
                                            <TableHead className="text-slate-400">Name</TableHead>
                                            <TableHead className="text-slate-400">Email</TableHead>
                                            <TableHead className="text-slate-400">Subject</TableHead>
                                            <TableHead className="text-slate-400">Message</TableHead>
                                            <TableHead className="text-slate-400">Date</TableHead>
                                            <TableHead className="text-right text-slate-400">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredContacts.map((contact) => (
                                            <TableRow key={contact.id} className="border-slate-800 hover:bg-slate-800/50">
                                                <TableCell className="font-medium text-slate-200">{contact.name}</TableCell>
                                                <TableCell className="text-slate-400">{contact.email}</TableCell>
                                                <TableCell className="text-slate-400 max-w-[200px] truncate">{contact.subject}</TableCell>
                                                <TableCell className="text-slate-400 max-w-[300px]">
                                                    <div>
                                                        <p className={expandedMessage === contact.id ? "" : "line-clamp-2"}>
                                                            {contact.message}
                                                        </p>
                                                        {contact.message.length > 100 && (
                                                            <button
                                                                onClick={() => setExpandedMessage(expandedMessage === contact.id ? null : contact.id)}
                                                                className="text-indigo-400 hover:text-indigo-300 text-xs mt-1 flex items-center"
                                                            >
                                                                {expandedMessage === contact.id ? 'Show less' : 'Read more'}
                                                                <ChevronDown className={`ml-1 h-3 w-3 transition-transform ${expandedMessage === contact.id ? 'rotate-180' : ''}`} />
                                                            </button>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-slate-400">{new Date(contact.created_at).toLocaleDateString()}</TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-slate-400 hover:text-red-400"
                                                        onClick={() => handleDeleteClick('contact', contact.id, contact)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {filteredContacts.length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={6} className="text-center text-slate-500 py-8">
                                                    No contacts found
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>

                            {/* Mobile Card View */}
                            <div className="md:hidden space-y-4 p-4">
                                {filteredContacts.map((contact) => (
                                    <motion.div
                                        key={contact.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-slate-800/50 rounded-lg p-4 space-y-3 border border-slate-700 hover:border-emerald-500/50 transition-all"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-slate-200 mb-1">{contact.name}</h4>
                                                <p className="text-sm text-slate-400 break-all">{contact.email}</p>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDeleteClick('contact', contact.id, contact)}
                                                className="text-slate-500 hover:text-red-500 hover:bg-red-500/10 -mt-2 -mr-2"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        <div className="space-y-2">
                                            <div>
                                                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Subject</p>
                                                <p className="text-sm text-slate-300">{contact.subject}</p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Message</p>
                                                <p className={`text-sm text-slate-300 ${expandedMessage === contact.id ? '' : 'line-clamp-3'}`}>
                                                    {contact.message}
                                                </p>
                                                {contact.message.length > 100 && (
                                                    <button
                                                        onClick={() => setExpandedMessage(expandedMessage === contact.id ? null : contact.id)}
                                                        className="text-emerald-400 hover:text-emerald-300 text-xs mt-2 flex items-center font-medium"
                                                    >
                                                        {expandedMessage === contact.id ? 'Show less' : 'Read more'}
                                                        <ChevronDown className={`ml-1 h-3 w-3 transition-transform ${expandedMessage === contact.id ? 'rotate-180' : ''}`} />
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        <div className="pt-2 border-t border-slate-700">
                                            <p className="text-xs text-slate-500">
                                                {new Date(contact.created_at).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                                {filteredContacts.length === 0 && (
                                    <div className="text-center text-slate-500 py-12">
                                        <Mail className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                        <p>No contacts found</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialog.open} onOpenChange={(open) => !open && handleDeleteCancel()}>
                <DialogContent className="bg-slate-900 border-slate-800 text-white sm:max-w-md">
                    <DialogHeader>
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
                                <AlertTriangle className="h-6 w-6 text-red-500" />
                            </div>
                            <div>
                                <DialogTitle className="text-xl text-white">Xác nhận xóa !</DialogTitle>
                                <DialogDescription className="text-slate-400">
                                    Hành động này không thể hoàn tác
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="py-4">
                        {deleteDialog.type === 'contact' && deleteDialog.item && (
                            <div className="bg-slate-800/50 rounded-lg p-4 space-y-2 border border-slate-700">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <p className="text-sm text-slate-400">Họ và tên</p>
                                        <p className="font-semibold text-white">{deleteDialog.item.name}</p>
                                    </div>
                                    <Mail className="h-4 w-4 text-slate-500" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-slate-400">Email</p>
                                    <p className="text-slate-300 break-all">{deleteDialog.item.email}</p>
                                </div>
                            </div>
                        )}

                        {deleteDialog.type === 'post' && deleteDialog.item && (
                            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                                <p className="text-sm text-slate-400 mb-1">Post Title</p>
                                <p className="font-semibold text-white">{deleteDialog.item.title}</p>
                            </div>
                        )}

                        {deleteDialog.type === 'project' && deleteDialog.item && (
                            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                                <p className="text-sm text-slate-400 mb-1">Project Title</p>
                                <p className="font-semibold text-white">{deleteDialog.item.title}</p>
                            </div>
                        )}

                        <p className="text-sm text-slate-400 mt-4">
                            Bạn có chắc chắn muốn xóa {deleteDialog.type}? Hành động này không thể hoàn tác.
                        </p>
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button
                            variant="outline"
                            onClick={handleDeleteCancel}
                            className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700 hover:text-white"
                        >
                            Hủy
                        </Button>
                        <Button
                            onClick={handleDeleteConfirm}
                            className="bg-red-600 hover:bg-red-700 text-white"
                        >
                            Xóa
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
