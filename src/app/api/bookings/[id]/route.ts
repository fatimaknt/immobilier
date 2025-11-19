import { NextRequest, NextResponse } from 'next/server'
import { queryOne, update, remove } from '@/lib/mysql'

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await request.json()
        const { status } = body

        if (!status || !['pending', 'confirmed', 'cancelled'].includes(status)) {
            return NextResponse.json({ error: 'Statut invalide' }, { status: 400 })
        }

        const affectedRows = await update(
            'UPDATE bookings SET status = ? WHERE id = ?',
            [status, id]
        )

        if (affectedRows === 0) {
            return NextResponse.json({ error: 'Réservation non trouvée' }, { status: 404 })
        }

        const booking = await queryOne('SELECT * FROM bookings WHERE id = ?', [id])

        return NextResponse.json(booking)
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la réservation:', error)
        return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 })
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        const affectedRows = await remove('DELETE FROM bookings WHERE id = ?', [id])

        if (affectedRows === 0) {
            return NextResponse.json({ error: 'Réservation non trouvée' }, { status: 404 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Erreur lors de la suppression de la réservation:', error)
        return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 })
    }
}
