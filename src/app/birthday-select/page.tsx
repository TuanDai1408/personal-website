"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { api, User } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { ChevronDown, Gift, Calendar, User as UserIcon } from "lucide-react"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function BirthdaySelectPage() {
    const router = useRouter()
    const [users, setUsers] = useState<User[]>([])
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data, error } = await api.getUsers()
                if (data) {
                    // Filter users who have a DOB
                    setUsers(data.filter(u => u.dob))
                }
                if (error) toast.error("Failed to fetch users")
            } catch (err) {
                toast.error("An error occurred")
            } finally {
                setLoading(false)
            }
        }
        fetchUsers()
    }, [])

    const handleSelect = (user: User) => {
        setSelectedUser(user)
        setIsOpen(false)
    }

    const handleContinue = () => {
        if (!selectedUser || !selectedUser.dob) return

        const today = new Date()
        const dob = new Date(selectedUser.dob)

        // Check if today is birthday (ignore year)
        const isBirthday = today.getDate() === dob.getDate() && today.getMonth() === dob.getMonth()

        if (isBirthday) {
            router.push(`/birthday?id=${selectedUser.id}`)
        } else {
            router.push(`/birthday-countdown?id=${selectedUser.id}`)
        }
    }

    return (
        <main className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 10, repeat: Infinity, delay: 2 }}
                    className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[100px]"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="z-10 w-full max-w-md space-y-8 text-center"
            >
                <div className="space-y-2">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-xl mb-6"
                    >
                        <Gift className="w-10 h-10 text-white" />
                    </motion.div>
                    <h1 className="text-4xl font-bold text-white tracking-tight">
                        Birthday Corner
                    </h1>
                    <p className="text-slate-400">
                        Chọn một người bạn để xem điều bất ngờ nhé!
                    </p>
                </div>

                <div className="relative">
                    <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 flex items-center justify-between text-left hover:border-indigo-500 transition-colors group"
                    >
                        <div className="flex items-center gap-3">
                            {selectedUser ? (
                                <>
                                    <Avatar className="h-10 w-10 border-2 border-indigo-500/50">
                                        <AvatarImage src={selectedUser.images?.[0]?.image_url || `https://avatar.vercel.sh/${selectedUser.username}`} />
                                        <AvatarFallback>{selectedUser.username[0].toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium text-white">{selectedUser.full_name || selectedUser.username}</p>
                                        <p className="text-xs text-slate-400 flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(selectedUser.dob!).toLocaleDateString()}
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center">
                                        <UserIcon className="w-5 h-5 text-slate-400" />
                                    </div>
                                    <span className="text-slate-400">Chọn người nhận...</span>
                                </>
                            )}
                        </div>
                        <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </motion.button>

                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, height: 0 }}
                                animate={{ opacity: 1, y: 0, height: "auto" }}
                                exit={{ opacity: 0, y: -10, height: 0 }}
                                className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-2xl z-50 max-h-[300px] overflow-y-auto"
                            >
                                {loading ? (
                                    <div className="p-4 text-center text-slate-500">Loading...</div>
                                ) : users.length === 0 ? (
                                    <div className="p-4 text-center text-slate-500">No users found</div>
                                ) : (
                                    users.map((user) => (
                                        <motion.button
                                            key={user.id}
                                            whileHover={{ backgroundColor: "rgba(99, 102, 241, 0.1)" }}
                                            onClick={() => handleSelect(user)}
                                            className="w-full p-3 flex items-center gap-3 text-left border-b border-slate-800 last:border-0"
                                        >
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={user.images?.[0]?.image_url || `https://avatar.vercel.sh/${user.username}`} />
                                                <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium text-slate-200">{user.full_name || user.username}</p>
                                                <p className="text-xs text-slate-500">{new Date(user.dob!).toLocaleDateString()}</p>
                                            </div>
                                        </motion.button>
                                    ))
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-6 rounded-xl shadow-lg shadow-indigo-500/20"
                    disabled={!selectedUser}
                    onClick={handleContinue}
                >
                    Tiếp tục <Gift className="ml-2 w-5 h-5" />
                </Button>

                <p className="mt-8 text-center text-sm text-slate-500">
                    <a href="/" className="text-indigo-400 hover:text-indigo-300 hover:underline">
                        Quay lại trang chủ
                    </a>
                </p>
            </motion.div>
        </main>
    )
}
