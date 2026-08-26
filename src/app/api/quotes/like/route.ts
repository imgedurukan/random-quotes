import { Collections, getDb } from '@/lib/db';
import { Quote } from '@/types/quotes';
import { ObjectId } from 'mongodb';

export async function POST(req: Request) {
  try {
    const { quoteId, userId } = await req.json();

    if (!quoteId || !userId) {
      return Response.json({ error: 'Quote ID and User ID are required' }, { status: 400 });
    }

    const db = await getDb();
    const col = db.collection<Quote>(Collections.quotes);

    const quote = await col.findOne({ _id: new ObjectId(quoteId) as unknown as undefined });

    if (!quote) {
      return Response.json({ error: 'Quote not found' }, { status: 404 });
    }

    const currentLikedBy = Array.isArray(quote.likedBy) ? quote.likedBy : [];
    const isLiked = currentLikedBy.includes(userId);

    const updatedLikedBy = isLiked
      ? currentLikedBy.filter((id) => id !== userId)
      : [...currentLikedBy, userId];

    await col.updateOne(
      { _id: new ObjectId(quoteId) as unknown as undefined },
      { $set: { likedBy: updatedLikedBy, updatedAt: new Date().toISOString() } }
    );

    return Response.json({ success: true, likedBy: updatedLikedBy });
  } catch (error) {
    return Response.json({ error: 'Failed to update like status' }, { status: 500 });
  }
}