import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/mysql'
import { randomUUID } from 'crypto'

interface ApartmentRow {
  images?: string | unknown;
  equipment?: string | unknown;
  coordinates?: string | unknown;
  [key: string]: unknown;
}

export async function GET() {
  try {
    const apartments = await query(
      'SELECT * FROM apartments ORDER BY created_at DESC'
    )

    // S'assurer que les images sont toujours un tableau
    const transformedApartments = apartments.map((apartment: ApartmentRow) => ({
      ...apartment,
      images: apartment.images ? (typeof apartment.images === 'string' ? JSON.parse(apartment.images) : apartment.images) : [],
      equipment: apartment.equipment ? (typeof apartment.equipment === 'string' ? JSON.parse(apartment.equipment) : apartment.equipment) : [],
      coordinates: apartment.coordinates ? (typeof apartment.coordinates === 'string' ? JSON.parse(apartment.coordinates) : apartment.coordinates) : { lat: 0, lng: 0 }
    }));

    return NextResponse.json(transformedApartments)
  } catch (error) {
    console.error('Erreur API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Données reçues pour création:', body);

    const id = randomUUID()
    const images = body.images ? JSON.stringify(body.images) : JSON.stringify([])
    const equipment = body.equipment ? JSON.stringify(body.equipment) : JSON.stringify([])
    const coordinates = body.coordinates ? JSON.stringify(body.coordinates) : JSON.stringify({ lat: 0, lng: 0 })

    await query(
      `INSERT INTO apartments (id, title, description, zone, address, rooms, bathrooms, surface, price_per_day, price_per_week, available, equipment, coordinates, images) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        body.title,
        body.description,
        body.zone,
        body.address,
        body.rooms,
        body.bathrooms,
        body.surface,
        body.price_per_day,
        body.price_per_week,
        body.available !== undefined ? body.available : true,
        equipment,
        coordinates,
        images
      ]
    )

    const [apartment] = await query('SELECT * FROM apartments WHERE id = ?', [id])

    // Parser les champs JSON
    const result = {
      ...apartment,
      images: apartment.images ? (typeof apartment.images === 'string' ? JSON.parse(apartment.images) : apartment.images) : [],
      equipment: apartment.equipment ? (typeof apartment.equipment === 'string' ? JSON.parse(apartment.equipment) : apartment.equipment) : [],
      coordinates: apartment.coordinates ? (typeof apartment.coordinates === 'string' ? JSON.parse(apartment.coordinates) : apartment.coordinates) : { lat: 0, lng: 0 }
    }

    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    console.error('Erreur API POST:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
