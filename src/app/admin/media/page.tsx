"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Upload, Trash2, Search, FolderPlus, Copy, Check, Loader2, X } from "lucide-react"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { supabase, STORAGE_BUCKET, getPublicUrl, uploadFile, listFiles, deleteFile } from "@/lib/supabase"

interface MediaFile {
    name: string
    path: string
    url: string
    size: number
    created_at: string
}

export default function MediaPage() {
    const [files, setFiles] = useState<MediaFile[]>([])
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [currentFolder, setCurrentFolder] = useState("general")
    const [folders, setFolders] = useState<string[]>(["general"])

    // Dialog states
    const [newFolderDialogOpen, setNewFolderDialogOpen] = useState(false)
    const [newFolderName, setNewFolderName] = useState("")
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [fileToDelete, setFileToDelete] = useState<MediaFile | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)

    // Copy URL state
    const [copiedUrl, setCopiedUrl] = useState<string | null>(null)

    // Load files from current folder
    const loadFiles = useCallback(async () => {
        try {
            setLoading(true)
            const data = await listFiles(currentFolder)

            const fileList: MediaFile[] = data
                .filter(item => item.id !== null) // Files have id, folders have id=null
                .map(item => ({
                    name: item.name,
                    path: `${currentFolder}/${item.name}`,
                    url: getPublicUrl(`${currentFolder}/${item.name}`),
                    size: item.metadata?.size || 0,
                    created_at: item.created_at || new Date().toISOString()
                }))

            setFiles(fileList)
        } catch (error) {
            console.error('Error loading files:', error)
            toast.error("Không thể tải danh sách file")
        } finally {
            setLoading(false)
        }
    }, [currentFolder])

    // Load folders
    const loadFolders = useCallback(async () => {
        try {
            const { data, error } = await supabase.storage
                .from(STORAGE_BUCKET)
                .list('', { limit: 100 })

            if (error) throw error

            const folderNames = data
                .filter(item => item.id === null) // Folders have id=null
                .map(item => item.name)

            setFolders(['general', ...folderNames.filter(f => f !== 'general')])
        } catch (error) {
            console.error('Error loading folders:', error)
        }
    }, [])

    useEffect(() => {
        loadFiles()
        loadFolders()
    }, [loadFiles, loadFolders])

    // Handle file upload
    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files
        if (!selectedFiles || selectedFiles.length === 0) return

        setUploading(true)
        let successCount = 0
        let errorCount = 0

        for (const file of Array.from(selectedFiles)) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                toast.error(`${file.name} không phải là ảnh`)
                errorCount++
                continue
            }

            // Validate file size (max 10MB)
            if (file.size > 10 * 1024 * 1024) {
                toast.error(`${file.name} quá lớn (max 10MB)`)
                errorCount++
                continue
            }

            try {
                await uploadFile(file, currentFolder)
                successCount++
            } catch (error) {
                console.error(`Error uploading ${file.name}:`, error)
                errorCount++
            }
        }

        setUploading(false)

        if (successCount > 0) {
            toast.success(`✅ Đã upload ${successCount} file thành công!`)
            loadFiles() // Reload files
        }

        if (errorCount > 0) {
            toast.error(`❌ ${errorCount} file upload thất bại`)
        }

        // Reset input
        event.target.value = ''
    }

    // Handle create folder
    const handleCreateFolder = async () => {
        if (!newFolderName.trim()) {
            toast.error("Tên folder không được để trống")
            return
        }

        try {
            // Create an empty file to create the folder
            const { error } = await supabase.storage
                .from(STORAGE_BUCKET)
                .upload(`${newFolderName}/.gitkeep`, new Blob(['']))

            if (error) throw error

            toast.success(`✅ Đã tạo folder "${newFolderName}"`)
            setNewFolderDialogOpen(false)
            setNewFolderName("")
            loadFolders()
        } catch (error) {
            console.error('Error creating folder:', error)
            toast.error("Không thể tạo folder")
        }
    }

    // Handle delete file
    const openDeleteDialog = (file: MediaFile) => {
        setFileToDelete(file)
        setDeleteDialogOpen(true)
    }

    const handleDeleteFile = async () => {
        if (!fileToDelete) return

        setIsDeleting(true)
        try {
            await deleteFile(fileToDelete.path)
            toast.success("✅ Đã xóa file thành công!")
            loadFiles()
            setDeleteDialogOpen(false)
            setFileToDelete(null)
        } catch (error) {
            console.error('Error deleting file:', error)
            toast.error("❌ Xóa file thất bại")
        } finally {
            setIsDeleting(false)
        }
    }

    // Copy URL to clipboard
    const copyUrl = async (url: string) => {
        try {
            await navigator.clipboard.writeText(url)
            setCopiedUrl(url)
            toast.success("✅ Đã copy URL!")
            setTimeout(() => setCopiedUrl(null), 2000)
        } catch (error) {
            toast.error("Không thể copy URL")
        }
    }

    const filteredFiles = files.filter(f =>
        f.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 B'
        const k = 1024
        const sizes = ['B', 'KB', 'MB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-white">Media Library</h2>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        className="border-slate-700"
                        onClick={() => setNewFolderDialogOpen(true)}
                    >
                        <FolderPlus className="mr-2 h-4 w-4" /> New Folder
                    </Button>
                    <Button
                        className="bg-indigo-600 hover:bg-indigo-700"
                        onClick={() => document.getElementById('file-upload')?.click()}
                        disabled={uploading}
                    >
                        {uploading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Uploading...
                            </>
                        ) : (
                            <>
                                <Upload className="mr-2 h-4 w-4" /> Upload
                            </>
                        )}
                    </Button>
                    <input
                        id="file-upload"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                    />
                </div>
            </div>

            <div className="flex gap-4">
                {/* Folder Sidebar */}
                <Card className="w-64 bg-slate-900/50 border-slate-800">
                    <CardContent className="p-4">
                        <h3 className="text-sm font-semibold text-slate-400 mb-3">Folders</h3>
                        <div className="space-y-1">
                            {folders.map(folder => (
                                <button
                                    key={folder}
                                    onClick={() => setCurrentFolder(folder)}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${currentFolder === folder
                                        ? 'bg-indigo-600 text-white'
                                        : 'text-slate-300 hover:bg-slate-800'
                                        }`}
                                >
                                    📁 {folder}
                                </button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Main Content */}
                <div className="flex-1 space-y-4">
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
                        <p className="text-sm text-slate-400">
                            {filteredFiles.length} files
                        </p>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map(i => (
                                <Card key={i} className="bg-slate-900/50 border-slate-800 animate-pulse">
                                    <CardContent className="p-0">
                                        <div className="aspect-square bg-slate-800"></div>
                                        <div className="p-3 space-y-2">
                                            <div className="h-4 bg-slate-800 rounded"></div>
                                            <div className="h-3 bg-slate-800 rounded w-2/3"></div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : filteredFiles.length === 0 ? (
                        <Card className="bg-slate-900/50 border-slate-800">
                            <CardContent className="p-12 text-center">
                                <p className="text-slate-400">No images in this folder</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filteredFiles.map((file, index) => (
                                <motion.div
                                    key={file.path}
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
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-white hover:bg-white/20"
                                                        onClick={() => copyUrl(file.url)}
                                                    >
                                                        {copiedUrl === file.url ? (
                                                            <Check className="h-5 w-5 text-green-400" />
                                                        ) : (
                                                            <Copy className="h-5 w-5" />
                                                        )}
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-red-400 hover:bg-red-500/20"
                                                        onClick={() => openDeleteDialog(file)}
                                                    >
                                                        <Trash2 className="h-5 w-5" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="p-3">
                                                <p className="text-sm font-medium text-slate-200 truncate" title={file.name}>
                                                    {file.name}
                                                </p>
                                                <a
                                                    href={file.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs text-indigo-400 hover:text-indigo-300 truncate block mt-1"
                                                    title={file.url}
                                                >
                                                    {file.url}
                                                </a>
                                                <p className="text-xs text-slate-500 mt-1">
                                                    {formatFileSize(file.size)}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Create Folder Dialog */}
            <Dialog open={newFolderDialogOpen} onOpenChange={setNewFolderDialogOpen}>
                <DialogContent className="bg-slate-900 border-slate-800 text-white">
                    <DialogHeader>
                        <DialogTitle>Tạo Folder Mới</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="folder-name">Tên Folder</Label>
                            <Input
                                id="folder-name"
                                value={newFolderName}
                                onChange={(e) => setNewFolderName(e.target.value)}
                                className="bg-slate-950 border-slate-800"
                                placeholder="my-folder"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setNewFolderDialogOpen(false)}
                            className="border-slate-700"
                        >
                            Hủy
                        </Button>
                        <Button onClick={handleCreateFolder} className="bg-indigo-600 hover:bg-indigo-700">
                            Tạo
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent className="bg-slate-900 border-slate-800 text-white">
                    <DialogHeader>
                        <DialogTitle>Xác nhận xóa file</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                        <p className="text-slate-300">
                            Bạn có chắc chắn muốn xóa file <strong>{fileToDelete?.name}</strong> không?
                        </p>
                        <p className="text-sm text-slate-500 mt-2">Hành động này không thể hoàn tác.</p>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setDeleteDialogOpen(false)}
                            disabled={isDeleting}
                            className="border-slate-700"
                        >
                            Hủy
                        </Button>
                        <Button
                            onClick={handleDeleteFile}
                            disabled={isDeleting}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Xóa
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
