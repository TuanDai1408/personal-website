// API base URL - automatically uses production URL or local development
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://personal-website-vercel-three.vercel.app'

export interface ContactFormData {
    name: string
    email: string
    phone?: string
    subject: string
    message: string
}

export interface NewsletterData {
    email: string
}

export interface ApiResponse<T> {
    data?: T
    error?: string
}

export interface LoginResponse {
    token: string
    message: string
}

export interface StatsResponse {
    day: string
    views: number
}

export interface UserImage {
    id: number
    image_url: string
    created_at: string
}

export interface User {
    id: number
    username: string
    email: string
    role: string
    full_name?: string
    dob?: string
    images?: UserImage[]
}

class ApiClient {
    private baseUrl: string

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<ApiResponse<T>> {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                return {
                    error: errorData.detail || `Request failed with status ${response.status}`,
                }
            }

            // Handle 204 No Content (DELETE operations)
            if (response.status === 204) {
                return { data: {} as T }
            }

            const data = await response.json()
            return { data }
        } catch (error) {
            return {
                error: error instanceof Error ? error.message : 'An unknown error occurred',
            }
        }
    }

    async submitContact(formData: ContactFormData): Promise<ApiResponse<any>> {
        return this.request('/api/contact/', {
            method: 'POST',
            body: JSON.stringify(formData),
        })
    }

    async subscribeNewsletter(email: string): Promise<ApiResponse<any>> {
        return this.request('/api/newsletter/subscribe', {
            method: 'POST',
            body: JSON.stringify({ email }),
        })
    }

    async checkHealth(): Promise<ApiResponse<any>> {
        return this.request('/api/health', {
            method: 'GET',
        })
    }

    async login(password: string, username: string = "admin"): Promise<ApiResponse<LoginResponse>> {
        return this.request('/api/admin/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        })
    }

    async getAdminStats(): Promise<ApiResponse<StatsResponse[]>> {
        return this.request('/api/admin/stats', {
            method: 'GET',
        })
    }

    async getAdminContacts(): Promise<ApiResponse<any[]>> {
        return this.request('/api/admin/contacts', {
            method: 'GET',
        })
    }

    async deleteAdminContact(id: number): Promise<ApiResponse<any>> {
        return this.request(`/api/admin/contacts/${id}`, {
            method: 'DELETE',
        })
    }

    // --- User API ---
    async getUsers(): Promise<ApiResponse<User[]>> {
        return this.request('/api/users/', { method: 'GET' })
    }

    async createUser(data: any): Promise<ApiResponse<any>> {
        return this.request('/api/users/', {
            method: 'POST',
            body: JSON.stringify(data)
        })
    }

    async updateUser(id: number, data: any): Promise<ApiResponse<any>> {
        return this.request(`/api/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        })
    }

    async deleteUser(id: number): Promise<ApiResponse<any>> {
        return this.request(`/api/users/${id}`, { method: 'DELETE' })
    }

    // --- Content API ---
    async getPosts(): Promise<ApiResponse<any[]>> {
        return this.request('/api/content/posts', { method: 'GET' })
    }

    async createPost(data: any): Promise<ApiResponse<any>> {
        return this.request('/api/content/posts', {
            method: 'POST',
            body: JSON.stringify(data)
        })
    }

    async updatePost(id: number, data: any): Promise<ApiResponse<any>> {
        return this.request(`/api/content/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        })
    }

    async deletePost(id: number): Promise<ApiResponse<any>> {
        return this.request(`/api/content/posts/${id}`, { method: 'DELETE' })
    }

    async getProjects(): Promise<ApiResponse<any[]>> {
        return this.request('/api/content/projects', { method: 'GET' })
    }

    async createProject(data: any): Promise<ApiResponse<any>> {
        return this.request('/api/content/projects', {
            method: 'POST',
            body: JSON.stringify(data)
        })
    }

    async updateProject(id: number, data: any): Promise<ApiResponse<any>> {
        return this.request(`/api/content/projects/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        })
    }

    async deleteProject(id: number): Promise<ApiResponse<any>> {
        return this.request(`/api/content/projects/${id}`, { method: 'DELETE' })
    }
}

export const api = new ApiClient(API_BASE_URL)
