import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Storage bucket name
export const STORAGE_BUCKET = 'image_birhday'

// Helper function to get public URL for an image
export function getPublicUrl(path: string): string {
    const { data } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(path)
    return data.publicUrl
}

// Helper function to upload file
export async function uploadFile(file: File, folder: string = 'general') {
    const fileExt = file.name.split('.').pop()
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

    const { data, error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
        })

    if (error) {
        throw error
    }

    return {
        path: data.path,
        url: getPublicUrl(data.path)
    }
}

// Helper function to list files in a folder
export async function listFiles(folder: string = '') {
    const { data, error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .list(folder, {
            limit: 100,
            offset: 0,
            sortBy: { column: 'created_at', order: 'desc' }
        })

    if (error) {
        throw error
    }

    return data
}

// Helper function to delete file
export async function deleteFile(path: string) {
    const { error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .remove([path])

    if (error) {
        throw error
    }
}
