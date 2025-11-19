import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/mysql'
import { randomUUID } from 'crypto'

interface BookingRow {
    start_date?: string;
    end_date?: string;
    total_amount?: number | string;
    created_at?: string;
    [key: string]: unknown;
}

export async function GET() {
    try {
        console.log('Récupération des réservations...');

        const bookings = await query(
            'SELECT * FROM bookings ORDER BY created_at DESC'
        );

        console.log('Résultat de la requête réservations:', { bookings: bookings?.length || 0 });

        // Nettoyer les données pour éviter les erreurs d'affichage
        const cleanedBookings = bookings.map((booking: BookingRow) => ({
            ...booking,
            start_date: booking.start_date || '',
            end_date: booking.end_date || '',
            total_amount: Number(booking.total_amount) || 0,
            created_at: booking.created_at || new Date().toISOString()
        }));

        console.log('Réservations récupérées avec succès:', cleanedBookings.length);
        return NextResponse.json(cleanedBookings)
    } catch (error) {
        console.error('Erreur lors de la récupération des réservations:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const id = randomUUID()

        await query(
            `INSERT INTO bookings (id, type, entity_id, user_name, user_email, user_phone, start_date, end_date, total_amount, status, payment_method, notes) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                id,
                body.type,
                body.entity_id,
                body.user_name,
                body.user_email,
                body.user_phone,
                body.start_date,
                body.end_date,
                body.total_amount,
                body.status || 'pending',
                body.payment_method,
                body.notes || null
            ]
        )

        const [booking] = await query('SELECT * FROM bookings WHERE id = ?', [id])

        return NextResponse.json(booking, { status: 201 })
    } catch (error) {
        console.error('Erreur lors de la création de la réservation:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
