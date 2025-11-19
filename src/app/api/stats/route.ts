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

export async function GET() {
    try {
        // Récupérer les statistiques des appartements
        const apartmentsCount = await query('SELECT COUNT(*) as count FROM apartments')
        const totalApartments = apartmentsCount[0]?.count || 0

        // Récupérer les statistiques des voitures
        const carsCount = await query('SELECT COUNT(*) as count FROM cars')
        const totalCars = carsCount[0]?.count || 0

        // Récupérer les statistiques des réservations
        const bookingsData = await query('SELECT status, total_amount, created_at FROM bookings')

        // Récupérer les statistiques des messages
        const messagesData = await query('SELECT status, created_at FROM contact_messages')

        // Récupérer les statistiques des témoignages
        const testimonialsData = await query('SELECT approved, created_at FROM testimonials')

        // Calculer les statistiques des réservations
        const totalBookings = bookingsData?.length || 0
        const pendingBookings = bookingsData?.filter((b: BookingRow) => b.status === 'pending').length || 0
        const totalRevenue = bookingsData?.reduce((sum: number, b: BookingRow) => sum + (Number(b.total_amount) || 0), 0) || 0

        // Calculer les statistiques des messages
        const totalMessages = messagesData?.length || 0
        const newMessages = messagesData?.filter((m: MessageRow) => m.status === 'new').length || 0

        // Calculer les statistiques des témoignages
        const approvedTestimonials = testimonialsData?.filter((t: TestimonialRow) => t.approved).length || 0
        const pendingTestimonials = testimonialsData?.filter((t: TestimonialRow) => !t.approved).length || 0

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
        const apartmentsThisMonthData = await query(
            'SELECT COUNT(*) as count FROM apartments WHERE created_at >= ? AND created_at < ?',
            [currentMonthStart, currentMonthEnd]
        )
        const apartmentsThisMonth = apartmentsThisMonthData[0]?.count || 0

        // Voitures ajoutées ce mois
        const carsThisMonthData = await query(
            'SELECT COUNT(*) as count FROM cars WHERE created_at >= ? AND created_at < ?',
            [currentMonthStart, currentMonthEnd]
        )
        const carsThisMonth = carsThisMonthData[0]?.count || 0

        // Revenus ce mois
        const revenueThisMonth = await query(
            'SELECT total_amount FROM bookings WHERE created_at >= ? AND created_at < ?',
            [currentMonthStart, currentMonthEnd]
        )
        const currentMonthRevenue = revenueThisMonth?.reduce((sum: number, b: BookingRow) => sum + (Number(b.total_amount) || 0), 0) || 0

        // Revenus du mois précédent
        const revenueLastMonth = await query(
            'SELECT total_amount FROM bookings WHERE created_at >= ? AND created_at < ?',
            [lastMonthStart, lastMonthEnd]
        )
        const lastMonthRevenue = revenueLastMonth?.reduce((sum: number, b: BookingRow) => sum + (Number(b.total_amount) || 0), 0) || 0

        // Calculer le pourcentage de croissance des revenus
        const revenueGrowth = lastMonthRevenue > 0
            ? Math.round(((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100)
            : 0

        const stats = {
            totalApartments: Number(totalApartments) || 0,
            totalCars: Number(totalCars) || 0,
            totalBookings,
            pendingBookings,
            totalRevenue: Math.round(totalRevenue),
            totalMessages,
            newMessages,
            approvedTestimonials,
            pendingTestimonials,
            trends: {
                apartmentsThisMonth: Number(apartmentsThisMonth) || 0,
                carsThisMonth: Number(carsThisMonth) || 0,
                revenueGrowth
            }
        }

        return NextResponse.json(stats)
    } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error)
        return NextResponse.json({ error: 'Erreur lors du chargement des statistiques' }, { status: 500 })
    }
}
