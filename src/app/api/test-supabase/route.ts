import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
    try {
        console.log('🧪 Test de connexion Supabase...');

        // Test de connexion basique
        const { data, error } = await supabaseAdmin
            .from('contact_messages')
            .select('id')
            .limit(1);

        console.log('📊 Résultat du test Supabase:', { data, error });

        if (error) {
            console.error('❌ Erreur Supabase:', error);
            return NextResponse.json({
                success: false,
                error: error.message,
                details: error
            }, { status: 500 });
        }

        // Test de récupération des messages
        const { data: messages, error: messagesError } = await supabaseAdmin
            .from('contact_messages')
            .select('*')
            .limit(5);

        console.log('📨 Messages de test:', { messages: messages?.length || 0, messagesError });

        return NextResponse.json({
            success: true,
            connection: 'OK',
            messagesCount: messages?.length || 0,
            messages: messages || [],
            error: messagesError
        });

    } catch (error) {
        console.error('❌ Erreur lors du test Supabase:', error);
        return NextResponse.json({
            success: false,
            error: 'Erreur de connexion Supabase',
            details: error
        }, { status: 500 });
    }
}
