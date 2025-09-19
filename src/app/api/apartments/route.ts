import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  try {
    const { data: apartments, error } = await supabaseAdmin
      .from('apartments')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erreur Supabase:', error);
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // S'assurer que les images sont toujours un tableau
    const transformedApartments = apartments.map(apartment => ({
      ...apartment,
      images: apartment.images || []
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

    const { data: apartment, error } = await supabaseAdmin
      .from('apartments')
      .insert([body])
      .select()
      .single()

    if (error) {
      console.error('Erreur création appartement:', error);
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Retourner l'appartement créé
    return NextResponse.json(apartment, { status: 201 })
  } catch (error) {
    console.error('Erreur API POST:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
