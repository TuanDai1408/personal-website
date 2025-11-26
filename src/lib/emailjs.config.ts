// EmailJS Configuration
// Get your credentials from https://www.emailjs.com/

export const EMAILJS_CONFIG = {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
}

// Check if EmailJS is properly configured
export const isEmailJsConfigured = (): boolean => {
    return !!(
        EMAILJS_CONFIG.serviceId &&
        EMAILJS_CONFIG.templateId &&
        EMAILJS_CONFIG.publicKey
    )
}
