"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Upload, Trash2, Search, Image as ImageIcon, MoreVertical } from "lucide-react"
import { toast } from "sonner"
import { motion } from "framer-motion"

// Mock data for media files
const initialMedia = [
    { id: 1, name: "hero-bg.jpg", url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809", size: "1.2 MB", type: "image/jpeg" },
    { id: 2, name: "project-1.png", url: "https://images.unsplash.com/photo-1550439062-609e1531270e", size: "850 KB", type: "image/png" },
    { id: 3, name: "avatar.jpg", url: "https://github.com/shadcn.png", size: "120 KB", type: "image/jpeg" },
    { id: 4, name: "banner.jpg", url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f", size: "2.5 MB", type: "image/jpeg" },
]

export default function MediaPage() {
    const [media, setMedia] = useState(initialMedia)
    const [searchTerm, setSearchTerm] = useState("")

    const handleDelete = (id: number) => {
        if (confirm("Delete this file?")) {
            setMedia(media.filter(m => m.id !== id))
            toast.success("File deleted successfully")
        }
    }

    const handleUpload = () => {
        toast.info("Upload functionality coming soon!")
    }

    const filteredMedia = media.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()))

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-white">Media Library</h2>
                <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={handleUpload}>
                    <Upload className="mr-2 h-4 w-4" /> Upload File
                </Button>
            </div>

            <div className="flex items-center space-x-2">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
                    <Input
                        placeholder="Search files..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 bg-slate-900/50 border-slate-800 text-white"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredMedia.map((file, index) => (
                    <motion.div
                        key={file.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <Card className="bg-slate-900/50 border-slate-800 overflow-hidden group hover:border-indigo-500/50 transition-colors">
                            <CardContent className="p-0">
                                <div className="relative aspect-square">
                                    <img
                                        src={file.url}
                                        alt={file.name}
                                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                                            <ImageIcon className="h-5 w-5" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-red-400 hover:bg-red-500/20"
                                            onClick={() => handleDelete(file.id)}
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="p-3">
                                    <p className="text-sm font-medium text-slate-200 truncate" title={file.name}>{file.name}</p>
                                    <div className="flex items-center justify-between mt-1">
                                        <p className="text-xs text-slate-500">{file.size}</p>
                                        <p className="text-xs text-slate-500 uppercase">{file.type.split('/')[1]}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
