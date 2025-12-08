"use client"

import { useEffect, useState } from "react"
import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Edit, Trash2, Eye, FileText, FolderGit2 } from "lucide-react"
import { toast } from "sonner"
import { motion } from "framer-motion"

export default function ContentPage() {
    const [posts, setPosts] = useState<any[]>([])
    const [projects, setProjects] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const [postsRes, projectsRes] = await Promise.all([
                api.getPosts(),
                api.getProjects()
            ])
            if (postsRes.data) setPosts(postsRes.data)
            if (projectsRes.data) setProjects(projectsRes.data)
        } catch (error) {
            toast.error("Failed to fetch content")
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (type: 'post' | 'project', id: number) => {
        if (!confirm("Are you sure you want to delete this item?")) return

        const deleteFn = type === 'post' ? api.deletePost : api.deleteProject
        const { error } = await deleteFn(id)

        if (error) {
            toast.error("Delete failed: " + error)
        } else {
            toast.success("Item deleted successfully")
            if (type === 'post') {
                setPosts(posts.filter(p => p.id !== id))
            } else {
                setProjects(projects.filter(p => p.id !== id))
            }
        }
    }

    const filteredPosts = posts.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
    const filteredProjects = projects.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()))

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
                                                            onClick={() => handleDelete('post', post.id)}
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
                                                            onClick={() => handleDelete('project', project.id)}
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
            </Tabs>
        </div>
    )
}
