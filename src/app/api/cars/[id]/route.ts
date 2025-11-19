import { NextRequest, NextResponse } from 'next/server'
import { queryOne, update, remove } from '@/lib/mysql'

interface CarRow {
    images?: string | unknown;
    features?: string | unknown;
    [key: string]: unknown;
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const car = await queryOne<CarRow>('SELECT * FROM cars WHERE id = ?', [id])

        if (!car) {
            return NextResponse.json({ error: 'Voiture non trouvée' }, { status: 404 })
        }

        // Parser les champs JSON
        const result = {
            ...car,
            images: car.images ? (typeof car.images === 'string' ? JSON.parse(car.images) : car.images) : [],
            features: car.features ? (typeof car.features === 'string' ? JSON.parse(car.features) : car.features) : []
        }

        return NextResponse.json(result)
    } catch {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await request.json()

        // Préparer les champs JSON
        const images = body.images ? JSON.stringify(body.images) : undefined
        const features = body.features ? JSON.stringify(body.features) : undefined

        // Construire la requête dynamiquement
        const fields: string[] = []
        const values: unknown[] = []

        Object.keys(body).forEach(key => {
            if (key !== 'images' && key !== 'features' && key !== 'id') {
                fields.push(`${key} = ?`)
                values.push(body[key])
            }
        })

        if (images !== undefined) {
            fields.push('images = ?')
            values.push(images)
        }
        if (features !== undefined) {
            fields.push('features = ?')
            values.push(features)
        }

        fields.push('updated_at = CURRENT_TIMESTAMP')
        values.push(id)

        await update(
            `UPDATE cars SET ${fields.join(', ')} WHERE id = ?`,
            values
        )

        const car = await queryOne<CarRow>('SELECT * FROM cars WHERE id = ?', [id])

        if (!car) {
            return NextResponse.json({ error: 'Voiture non trouvée' }, { status: 404 })
        }

        // Parser les champs JSON
        const result = {
            ...car,
            images: car.images ? (typeof car.images === 'string' ? JSON.parse(car.images) : car.images) : [],
            features: car.features ? (typeof car.features === 'string' ? JSON.parse(car.features) : car.features) : []
        }

        return NextResponse.json(result)
    } catch {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const affectedRows = await remove('DELETE FROM cars WHERE id = ?', [id])

        if (affectedRows === 0) {
            return NextResponse.json({ error: 'Voiture non trouvée' }, { status: 404 })
        }

        return NextResponse.json({ success: true })
    } catch {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
