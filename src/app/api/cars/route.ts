import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/mysql'
import { randomUUID } from 'crypto'

interface CarRow {
  images?: string | unknown;
  features?: string | unknown;
  [key: string]: unknown;
}

export async function GET() {
  try {
    const cars = await query<CarRow>('SELECT * FROM cars ORDER BY created_at DESC')

    // S'assurer que les images sont toujours un tableau
    const transformedCars = cars.map((car) => ({
      ...car,
      images: car.images ? (typeof car.images === 'string' ? JSON.parse(car.images) : car.images) : [],
      features: car.features ? (typeof car.features === 'string' ? JSON.parse(car.features) : car.features) : []
    }));

    return NextResponse.json(transformedCars)
  } catch (error) {
    console.error('Erreur API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Données reçues pour création voiture:', body);

    const id = randomUUID()
    const images = body.images ? JSON.stringify(body.images) : JSON.stringify([])
    const features = body.features ? JSON.stringify(body.features) : JSON.stringify([])

    await query(
      `INSERT INTO cars (id, brand, model, year, type, transmission, seats, price_per_day, price_per_week, fuel_type, mileage, available, features, images) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        body.brand,
        body.model,
        body.year,
        body.type,
        body.transmission,
        body.seats,
        body.price_per_day,
        body.price_per_week || null,
        body.fuel_type || null,
        body.mileage || null,
        body.available !== undefined ? body.available : true,
        features,
        images
      ]
    )

    const cars = await query<CarRow>('SELECT * FROM cars WHERE id = ?', [id])
    const car = cars[0]

    if (!car) {
      return NextResponse.json({ error: 'Voiture non trouvée' }, { status: 404 })
    }

    // Parser les champs JSON
    const result = {
      ...car,
      images: car.images ? (typeof car.images === 'string' ? JSON.parse(car.images) : car.images) : [],
      features: car.features ? (typeof car.features === 'string' ? JSON.parse(car.features) : car.features) : []
    }

    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    console.error('Erreur API POST:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
