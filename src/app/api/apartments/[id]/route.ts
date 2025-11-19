import { NextRequest, NextResponse } from 'next/server'
import { queryOne, update, remove } from '@/lib/mysql'

interface ApartmentRow {
  images?: string | unknown;
  equipment?: string | unknown;
  coordinates?: string | unknown;
  [key: string]: unknown;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const apartment = await queryOne<ApartmentRow>('SELECT * FROM apartments WHERE id = ?', [id])

    if (!apartment) {
      return NextResponse.json({ error: 'Appartement non trouvé' }, { status: 404 })
    }

    // Parser les champs JSON
    const result = {
      ...apartment,
      images: apartment.images ? (typeof apartment.images === 'string' ? JSON.parse(apartment.images) : apartment.images) : [],
      equipment: apartment.equipment ? (typeof apartment.equipment === 'string' ? JSON.parse(apartment.equipment) : apartment.equipment) : [],
      coordinates: apartment.coordinates ? (typeof apartment.coordinates === 'string' ? JSON.parse(apartment.coordinates) : apartment.coordinates) : { lat: 0, lng: 0 }
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
    const equipment = body.equipment ? JSON.stringify(body.equipment) : undefined
    const coordinates = body.coordinates ? JSON.stringify(body.coordinates) : undefined

    // Construire la requête dynamiquement
    const fields: string[] = []
    const values: unknown[] = []

    Object.keys(body).forEach(key => {
      if (key !== 'images' && key !== 'equipment' && key !== 'coordinates' && key !== 'id') {
        fields.push(`${key} = ?`)
        values.push(body[key])
      }
    })

    if (images !== undefined) {
      fields.push('images = ?')
      values.push(images)
    }
    if (equipment !== undefined) {
      fields.push('equipment = ?')
      values.push(equipment)
    }
    if (coordinates !== undefined) {
      fields.push('coordinates = ?')
      values.push(coordinates)
    }

    fields.push('updated_at = CURRENT_TIMESTAMP')
    values.push(id)

    await update(
      `UPDATE apartments SET ${fields.join(', ')} WHERE id = ?`,
      values
    )

    const apartment = await queryOne<ApartmentRow>('SELECT * FROM apartments WHERE id = ?', [id])

    if (!apartment) {
      return NextResponse.json({ error: 'Appartement non trouvé' }, { status: 404 })
    }

    // Parser les champs JSON
    const result = {
      ...apartment,
      images: apartment.images ? (typeof apartment.images === 'string' ? JSON.parse(apartment.images) : apartment.images) : [],
      equipment: apartment.equipment ? (typeof apartment.equipment === 'string' ? JSON.parse(apartment.equipment) : apartment.equipment) : [],
      coordinates: apartment.coordinates ? (typeof apartment.coordinates === 'string' ? JSON.parse(apartment.coordinates) : apartment.coordinates) : { lat: 0, lng: 0 }
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
    const affectedRows = await remove('DELETE FROM apartments WHERE id = ?', [id])

    if (affectedRows === 0) {
      return NextResponse.json({ error: 'Appartement non trouvé' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
