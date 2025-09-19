import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  try {
    const { data: cars, error } = await supabaseAdmin
      .from('cars')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erreur Supabase:', error);
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // S'assurer que les images sont toujours un tableau
    const transformedCars = cars.map(car => ({
      ...car,
      images: car.images || []
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

    // Séparer les champs potentiellement manquants
    const { fuel_type, mileage, price_per_week, ...carData } = body;

    // Ajouter seulement les champs qui existent dans la base
    const dataToInsert = {
      ...carData,
      // Ajouter les champs optionnels seulement s'ils sont fournis
      ...(fuel_type && { fuel_type }),
      ...(mileage && { mileage }),
      ...(price_per_week && { price_per_week })
    };

    console.log('Données à insérer:', dataToInsert);

    const { data: car, error } = await supabaseAdmin
      .from('cars')
      .insert([dataToInsert])
      .select()
      .single()

    if (error) {
      console.error('Erreur création voiture:', error);
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Retourner la voiture créée
    return NextResponse.json(car, { status: 201 })
  } catch (error) {
    console.error('Erreur API POST:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
