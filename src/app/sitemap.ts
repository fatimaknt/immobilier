import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://residencecedo.sn'

    // Static pages
    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/apartments`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/cars`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/booking`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: new Date(),
            changeFrequency: 'yearly' as const,
            priority: 0.3,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: new Date(),
            changeFrequency: 'yearly' as const,
            priority: 0.3,
        },
    ]

    // Dynamic apartment pages (you would fetch these from your data in a real app)
    const apartmentIds = [
        'apt-1', 'apt-2', 'apt-3', 'apt-4', 'apt-5',
        'apt-6', 'apt-7', 'apt-8', 'apt-9', 'apt-10'
    ] // Sample IDs

    const apartmentPages = apartmentIds.map(id => ({
        url: `${baseUrl}/apartments/${id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    // Dynamic car pages
    const carIds = [
        'car-1', 'car-2', 'car-3', 'car-4',
        'car-5', 'car-6', 'car-7', 'car-8'
    ] // Sample IDs

    const carPages = carIds.map(id => ({
        url: `${baseUrl}/cars/${id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    return [...staticPages, ...apartmentPages, ...carPages]
}
