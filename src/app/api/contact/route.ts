import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/mysql';
import { randomUUID } from 'crypto';

export async function GET() {
  try {
    console.log('Récupération des messages de contact...');

    const messages = await query(
      'SELECT * FROM contact_messages ORDER BY created_at DESC'
    );

    console.log('Résultat de la requête:', { messages: messages?.length || 0 });

    console.log('Messages récupérés avec succès:', messages?.length || 0);
    return NextResponse.json(messages || []);
  } catch (error) {
    console.error('Erreur lors de la récupération des messages:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const id = randomUUID();

    await query(
      `INSERT INTO contact_messages (id, name, email, phone, subject, message, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        body.name,
        body.email,
        body.phone,
        body.subject,
        body.message,
        'new'
      ]
    );

    const [message] = await query('SELECT * FROM contact_messages WHERE id = ?', [id]);

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création du message:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}