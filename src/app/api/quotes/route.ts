import { Collections, getDb } from '@/lib/db';
import { Quote } from '@/types/quotes';

export async function GET() {
  try {
    const db = await getDb();
    const col = db.collection<Quote>(Collections.quotes);

    const rawQuotes = await col.find({}).toArray();

    const quotes = rawQuotes.map((q) => ({
      ...q,
      likedBy: Array.isArray(q.likedBy) ? q.likedBy : [],
    }));

    return Response.json({ quotes });
  } catch (error) {
    return Response.json({ error: 'Failed to fetch quotes' }, { status: 500 });
  }
}