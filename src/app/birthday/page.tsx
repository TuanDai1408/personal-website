"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { api, User } from "@/lib/api"
import { BirthdayCelebration } from "@/components/birthday/birthday-celebration"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Suspense } from "react"

function BirthdayPageContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const userId = searchParams.get("id")
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!userId) {
            // If no ID, maybe redirect to select or show generic?
            // For now, let's redirect to select
            router.push("/birthday-select")
            return
        }

        const fetchUser = async () => {
            try {
                // Fetch all users and find (temp solution until getById is added to client)
                const { data } = await api.getUsers()
                if (data) {
                    const found = data.find(u => u.id === Number(userId))
                    if (found) setUser(found)
                }
            } finally {
                setLoading(false)
            }
        }
        fetchUser()
    }, [userId, router])

    if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>
    if (!user) return <div className="min-h-screen bg-black flex items-center justify-center text-white">User not found</div>

    // Pass user data to celebration component if needed, or just render it.
    // The existing BirthdayCelebration might be hardcoded. I should check it.
    // For now, I'll wrap it and maybe pass user name/images if I modify it.

    return (
        <main className="relative min-h-screen overflow-hidden">
            {/* Pass user info to celebration component */}
            <BirthdayCelebration user={user} />
        </main>
    )
}

export default function BirthdayPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>}>
            <BirthdayPageContent />
        </Suspense>
    )
}
