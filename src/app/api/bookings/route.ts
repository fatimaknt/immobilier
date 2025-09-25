import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
    try {
        console.log('🔍 Récupération des réservations...');

        // Requête complète avec tous les champs nécessaires
        const { data: bookings, error } = await supabaseAdmin
            .from('bookings')
            .select('*')
            .order('created_at', { ascending: false });

        console.log('📊 Résultat de la requête réservations:', { bookings: bookings?.length || 0, error });

        if (error) {
            console.error('❌ Erreur Supabase réservations:', error);
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        // Nettoyer les données pour éviter les erreurs d'affichage
        const cleanedBookings = (bookings || []).map(booking => ({
            ...booking,
            start_date: booking.start_date || '',
            end_date: booking.end_date || '',
            total_amount: Number(booking.total_amount) || 0,
            created_at: booking.created_at || new Date().toISOString()
        }));

        console.log('✅ Réservations récupérées avec succès:', cleanedBookings.length);
        return NextResponse.json(cleanedBookings)
    } catch (error) {
        console.error('❌ Erreur lors de la récupération des réservations:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        const { data, error } = await supabaseAdmin
            .from('bookings')
            .insert([{
                ...body,
                status: 'pending'
            }])
            .select()

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json(data[0], { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
