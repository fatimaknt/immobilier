export const formatPrice = (price: number | string | undefined): string => {
    if (price === undefined || price === null) {
        return 'Prix non disponible';
    }

    const numPrice = typeof price === 'string' ? parseFloat(price) : price;

    if (isNaN(numPrice)) {
        return 'Prix non disponible';
    }

    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'XOF',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(numPrice);
};

export const formatDate = (date: string): string => {
    return new Intl.DateTimeFormat('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(new Date(date));
};

export const formatShortDate = (date: string): string => {
    return new Intl.DateTimeFormat('fr-FR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(new Date(date));
};

export const calculateDaysBetween = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const calculateTotalPrice = (
    pricePerDay: number,
    startDate: string,
    endDate: string
): number => {
    const days = calculateDaysBetween(startDate, endDate);
    return days * pricePerDay;
};

export const generateId = (): string => {
    return Math.random().toString(36).substr(2, 9);
};

export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^(\+221|00221)?[67][0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
};

export const slugify = (text: string): string => {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
};
