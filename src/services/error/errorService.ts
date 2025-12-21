import { toast } from 'react-hot-toast';

export class ErrorService {
    /**
     * Handle errors globally
     */
    static handle(error: Error | unknown, context?: string): void {
        const errorMessage = this.getErrorMessage(error);

        // Log to console in development
        if (import.meta.env.DEV) {
            console.error(`[${context || 'Error'}]`, error);
        }

        // In production, you can send to monitoring service
        // Example: Sentry.captureException(error);

        // Show user-friendly message
        toast.error(this.getUserMessage(errorMessage), {
            duration: 4000,
            position: 'top-center',
        });
    }

    /**
     * Extract error message from various error types
     */
    private static getErrorMessage(error: unknown): string {
        if (error instanceof Error) {
            return error.message;
        }
        if (typeof error === 'string') {
            return error;
        }
        return 'Noma\'lum xatolik yuz berdi';
    }

    /**
     * Translate technical errors to user-friendly Uzbek messages
     */
    private static getUserMessage(errorMessage: string): string {
        // Network errors
        if (errorMessage.includes('Network') || errorMessage.includes('fetch')) {
            return 'Internet bilan bog\'lanishda xatolik. Iltimos, ulanishni tekshiring.';
        }

        // Timeout errors
        if (errorMessage.includes('timeout')) {
            return 'So\'rov vaqti tugadi. Qaytadan urinib ko\'ring.';
        }

        // Authentication errors
        if (errorMessage.includes('401') || errorMessage.includes('Unauthorized')) {
            return 'Tizimga kirish muddati tugagan. Qaytadan kiring.';
        }

        // Permission errors
        if (errorMessage.includes('403') || errorMessage.includes('Forbidden')) {
            return 'Sizda bu amalni bajarish uchun ruxsat yo\'q.';
        }

        // Server errors
        if (errorMessage.includes('500') || errorMessage.includes('Server')) {
            return 'Server xatosi yuz berdi. Keyinroq qaytadan urinib ko\'ring.';
        }

        // Not found errors
        if (errorMessage.includes('404') || errorMessage.includes('Not Found')) {
            return 'So\'ralgan ma\'lumot topilmadi.';
        }

        // Default message
        return 'Kutilmagan xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring.';
    }

    /**
     * Log info messages
     */
    static info(message: string, context?: string): void {
        if (import.meta.env.DEV) {
            console.info(`[${context || 'Info'}]`, message);
        }
    }

    /**
     * Log warning messages
     */
    static warn(message: string, context?: string): void {
        console.warn(`[${context || 'Warning'}]`, message);
    }
}
