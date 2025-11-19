import { NextRequest, NextResponse } from 'next/server';
import { queryOne, update, remove } from '@/lib/mysql';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const message = await queryOne('SELECT * FROM contact_messages WHERE id = ?', [id]);

        if (!message) {
            return NextResponse.json({ error: 'Message non trouvé' }, { status: 404 });
        }

        return NextResponse.json(message);
    } catch {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await request.json();

        const affectedRows = await update(
            'UPDATE contact_messages SET status = ? WHERE id = ?',
            [body.status, id]
        );

        if (affectedRows === 0) {
            return NextResponse.json({ error: 'Message non trouvé' }, { status: 404 });
        }

        const message = await queryOne('SELECT * FROM contact_messages WHERE id = ?', [id]);

        return NextResponse.json(message);
    } catch {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const affectedRows = await remove('DELETE FROM contact_messages WHERE id = ?', [id]);

        if (affectedRows === 0) {
            return NextResponse.json({ error: 'Message non trouvé' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Message deleted successfully' });
    } catch {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
