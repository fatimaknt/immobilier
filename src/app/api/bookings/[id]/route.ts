import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params
        const body = await request.json()
        const { status } = body

        if (!status || !['pending', 'confirmed', 'cancelled'].includes(status)) {
            return NextResponse.json({ error: 'Statut invalide' }, { status: 400 })
        }

        const { data, error } = await supabaseAdmin
            .from('bookings')
            .update({ status })
            .eq('id', id)
            .select()

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json(data[0])
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la réservation:', error)
        return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 })
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params

        const { error } = await supabaseAdmin
            .from('bookings')
            .delete()
            .eq('id', id)

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Erreur lors de la suppression de la réservation:', error)
        return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 })
    }
}
