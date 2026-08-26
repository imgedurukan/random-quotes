import { Collections, getDb } from '@/lib/db';
import { Quote } from '@/types/quotes';
import { ObjectId } from 'mongodb';

interface Params {
  params: Promise<{ id: string }>;
}

export async function PUT(req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const { quote, author, userId } = await req.json();

    if (!id || !ObjectId.isValid(id)) {
      return Response.json({ error: 'Invalid Quote ID' }, { status: 400 });
    }

    if (!quote || !author) {
      return Response.json({ error: 'Quote and author are required' }, { status: 400 });
    }

    const db = await getDb();
    const col = db.collection<Quote>(Collections.quotes);

    const existingQuote = await col.findOne({ _id: new ObjectId(id) as unknown as undefined });

    if (!existingQuote) {
      return Response.json({ error: 'Quote not found' }, { status: 404 });
    }

    if (existingQuote.createdBy && existingQuote.createdBy !== userId) {
      return Response.json(
        { error: 'Unauthorized: You can only edit your own quotes' },
        { status: 403 }
      );
    }

    await col.updateOne(
      { _id: new ObjectId(id) as unknown as undefined },
      { $set: { quote, author, updatedAt: new Date().toISOString() } }
    );

    return Response.json({ message: 'Quote updated successfully' });
  } catch (error) {
    return Response.json({ error: 'Failed to update quote' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const { userId } = await req.json();

    if (!id || !ObjectId.isValid(id)) {
      return Response.json({ error: 'Invalid Quote ID' }, { status: 400 });
    }

    const db = await getDb();
    const col = db.collection<Quote>(Collections.quotes);

    const existingQuote = await col.findOne({ _id: new ObjectId(id) as unknown as undefined });

    if (!existingQuote) {
      return Response.json({ error: 'Quote not found' }, { status: 404 });
    }

    if (existingQuote.createdBy && existingQuote.createdBy !== userId) {
      return Response.json(
        { error: 'Unauthorized: You can only delete your own quotes' },
        { status: 403 }
      );
    }

    await col.deleteOne({ _id: new ObjectId(id) as unknown as undefined });

    return Response.json({ message: 'Quote deleted successfully' });
  } catch (error) {
    return Response.json({ error: 'Failed to delete quote' }, { status: 500 });
  }
}