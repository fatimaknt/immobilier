import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
    try {
        // Récupérer les statistiques des appartements
        const { count: totalApartments } = await supabaseAdmin
            .from('apartments')
            .select('*', { count: 'exact', head: true })

        // Récupérer les statistiques des voitures
        const { count: totalCars } = await supabaseAdmin
            .from('cars')
            .select('*', { count: 'exact', head: true })

        // Récupérer les statistiques des réservations
        const { data: bookingsData } = await supabaseAdmin
            .from('bookings')
            .select('status, total_amount, created_at')

        // Récupérer les statistiques des messages
        const { data: messagesData } = await supabaseAdmin
            .from('contact_messages')
            .select('status, created_at')

        // Récupérer les statistiques des témoignages
        const { data: testimonialsData } = await supabaseAdmin
            .from('testimonials')
            .select('approved, created_at')

        // Calculer les statistiques des réservations
        const totalBookings = bookingsData?.length || 0
        const pendingBookings = bookingsData?.filter(b => b.status === 'pending').length || 0
        const totalRevenue = bookingsData?.reduce((sum, b) => sum + (b.total_amount || 0), 0) || 0

        // Calculer les statistiques des messages
        const newMessages = messagesData?.filter(m => m.status === 'new').length || 0

        // Calculer les statistiques des témoignages
        const approvedTestimonials = testimonialsData?.filter(t => t.approved).length || 0
        const pendingTestimonials = testimonialsData?.filter(t => !t.approved).length || 0

        // Calculer les tendances (comparaison avec le mois précédent)
        const now = new Date()
        const currentMonth = now.getMonth()
        const currentYear = now.getFullYear()
        const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1
        const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear

        // Appartements ajoutés ce mois
        const { count: apartmentsThisMonth } = await supabaseAdmin
            .from('apartments')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', new Date(currentYear, currentMonth, 1).toISOString())
            .lt('created_at', new Date(currentYear, currentMonth + 1, 1).toISOString())

        // Voitures ajoutées ce mois
        const { count: carsThisMonth } = await supabaseAdmin
            .from('cars')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', new Date(currentYear, currentMonth, 1).toISOString())
            .lt('created_at', new Date(currentYear, currentMonth + 1, 1).toISOString())

        // Revenus ce mois
        const { data: revenueThisMonth } = await supabaseAdmin
            .from('bookings')
            .select('total_amount')
            .gte('created_at', new Date(currentYear, currentMonth, 1).toISOString())
            .lt('created_at', new Date(currentYear, currentMonth + 1, 1).toISOString())

        const currentMonthRevenue = revenueThisMonth?.reduce((sum, b) => sum + (b.total_amount || 0), 0) || 0

        // Revenus du mois précédent
        const { data: revenueLastMonth } = await supabaseAdmin
            .from('bookings')
            .select('total_amount')
            .gte('created_at', new Date(lastMonthYear, lastMonth, 1).toISOString())
            .lt('created_at', new Date(lastMonthYear, lastMonth + 1, 1).toISOString())

        const lastMonthRevenue = revenueLastMonth?.reduce((sum, b) => sum + (b.total_amount || 0), 0) || 0

        // Calculer le pourcentage de croissance des revenus
        const revenueGrowth = lastMonthRevenue > 0
            ? Math.round(((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100)
            : 0

        const stats = {
            totalApartments: totalApartments || 0,
            totalCars: totalCars || 0,
            totalBookings,
            pendingBookings,
            totalRevenue: Math.round(totalRevenue),
            newMessages,
            approvedTestimonials,
            pendingTestimonials,
            trends: {
                apartmentsThisMonth: apartmentsThisMonth || 0,
                carsThisMonth: carsThisMonth || 0,
                revenueGrowth
            }
        }

        return NextResponse.json(stats)
    } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error)
        return NextResponse.json({ error: 'Erreur lors du chargement des statistiques' }, { status: 500 })
    }
}
