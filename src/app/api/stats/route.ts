import { NextResponse } from 'next/server'
import { query } from '@/lib/mysql'

interface BookingRow {
    status?: string;
    total_amount?: number | string;
    [key: string]: unknown;
}

interface MessageRow {
    status?: string;
    [key: string]: unknown;
}

interface TestimonialRow {
    approved?: boolean;
    [key: string]: unknown;
}

interface CountResult {
    count: number | string;
    [key: string]: unknown;
}

export async function GET() {
    try {
        // Récupérer les statistiques des appartements
        const apartmentsCount = await query<CountResult>('SELECT COUNT(*) as count FROM apartments')
        const totalApartments = Number(apartmentsCount[0]?.count) || 0

        // Récupérer les statistiques des voitures
        const carsCount = await query<CountResult>('SELECT COUNT(*) as count FROM cars')
        const totalCars = Number(carsCount[0]?.count) || 0

        // Récupérer les statistiques des réservations
        const bookingsData = await query<BookingRow>('SELECT status, total_amount, created_at FROM bookings')

        // Récupérer les statistiques des messages
        const messagesData = await query<MessageRow>('SELECT status, created_at FROM contact_messages')

        // Récupérer les statistiques des témoignages
        const testimonialsData = await query<TestimonialRow>('SELECT approved, created_at FROM testimonials')

        // Calculer les statistiques des réservations
        const totalBookings = bookingsData?.length || 0
        const pendingBookings = bookingsData?.filter((b) => b.status === 'pending').length || 0
        const totalRevenue = bookingsData?.reduce((sum: number, b) => sum + (Number(b.total_amount) || 0), 0) || 0

        // Calculer les statistiques des messages
        const totalMessages = messagesData?.length || 0
        const newMessages = messagesData?.filter((m) => m.status === 'new').length || 0

        // Calculer les statistiques des témoignages
        const approvedTestimonials = testimonialsData?.filter((t) => t.approved).length || 0
        const pendingTestimonials = testimonialsData?.filter((t) => !t.approved).length || 0

        // Calculer les tendances (comparaison avec le mois précédent)
        const now = new Date()
        const currentMonth = now.getMonth()
        const currentYear = now.getFullYear()
        const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1
        const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear

        const currentMonthStart = new Date(currentYear, currentMonth, 1).toISOString().split('T')[0]
        const currentMonthEnd = new Date(currentYear, currentMonth + 1, 1).toISOString().split('T')[0]
        const lastMonthStart = new Date(lastMonthYear, lastMonth, 1).toISOString().split('T')[0]
        const lastMonthEnd = new Date(lastMonthYear, lastMonth + 1, 1).toISOString().split('T')[0]

        // Appartements ajoutés ce mois
        const apartmentsThisMonthData = await query<CountResult>(
            'SELECT COUNT(*) as count FROM apartments WHERE created_at >= ? AND created_at < ?',
            [currentMonthStart, currentMonthEnd]
        )
        const apartmentsThisMonth = Number(apartmentsThisMonthData[0]?.count) || 0

        // Voitures ajoutées ce mois
        const carsThisMonthData = await query<CountResult>(
            'SELECT COUNT(*) as count FROM cars WHERE created_at >= ? AND created_at < ?',
            [currentMonthStart, currentMonthEnd]
        )
        const carsThisMonth = Number(carsThisMonthData[0]?.count) || 0

        // Revenus ce mois
        const revenueThisMonth = await query<BookingRow>(
            'SELECT total_amount FROM bookings WHERE created_at >= ? AND created_at < ?',
            [currentMonthStart, currentMonthEnd]
        )
        const currentMonthRevenue = revenueThisMonth?.reduce((sum: number, b) => sum + (Number(b.total_amount) || 0), 0) || 0

        // Revenus du mois précédent
        const revenueLastMonth = await query<BookingRow>(
            'SELECT total_amount FROM bookings WHERE created_at >= ? AND created_at < ?',
            [lastMonthStart, lastMonthEnd]
        )
        const lastMonthRevenue = revenueLastMonth?.reduce((sum: number, b) => sum + (Number(b.total_amount) || 0), 0) || 0

        // Calculer le pourcentage de croissance des revenus
        const revenueGrowth = lastMonthRevenue > 0
            ? Math.round(((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100)
            : 0

        const stats = {
            totalApartments,
            totalCars,
            totalBookings,
            pendingBookings,
            totalRevenue: Math.round(totalRevenue),
            totalMessages,
            newMessages,
            approvedTestimonials,
            pendingTestimonials,
            trends: {
                apartmentsThisMonth,
                carsThisMonth,
                revenueGrowth
            }
        }

        return NextResponse.json(stats)
    } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error)
        return NextResponse.json({ error: 'Erreur lors du chargement des statistiques' }, { status: 500 })
    }
}
