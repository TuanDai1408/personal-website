// API base URL - automatically uses production URL or local development
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://personal.api.daidataly.online'

export interface ContactFormData {
    name: string
    email: string
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

class ApiClient {
    private baseUrl: string

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
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
}

export const api = new ApiClient(API_BASE_URL)
