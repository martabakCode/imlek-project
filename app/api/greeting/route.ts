import { NextResponse } from 'next/server';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// All 6 valid templates
const VALID_TEMPLATES = [
  'blazing-stallion',
  'phoenix-horse', 
  'emperor-steed',
  'celestial-horse',
  'golden-lotus',
  'dragon-horse'
];

const VALID_INTENSITIES = ['low', 'medium', 'high'];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { senderName, receiverName, message, template, fireIntensity } = body;

    // Validation
    if (!senderName || !receiverName || !template || !fireIntensity) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate template
    if (!VALID_TEMPLATES.includes(template)) {
      return NextResponse.json(
        { error: `Invalid template. Must be one of: ${VALID_TEMPLATES.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate fire intensity
    if (!VALID_INTENSITIES.includes(fireIntensity)) {
      return NextResponse.json(
        { error: 'Invalid fire intensity. Must be: low, medium, or high' },
        { status: 400 }
      );
    }

    // Validate string lengths
    if (senderName.length > 50 || receiverName.length > 50) {
      return NextResponse.json(
        { error: 'Names must be 50 characters or less' },
        { status: 400 }
      );
    }

    if (message && message.length > 200) {
      return NextResponse.json(
        { error: 'Message must be 200 characters or less' },
        { status: 400 }
      );
    }

    // Create greeting
    const docRef = await addDoc(collection(db, 'greetings'), {
      senderName: senderName.trim(),
      receiverName: receiverName.trim(),
      message: message?.trim() || null,
      template,
      fireIntensity,
      createdAt: serverTimestamp(),
      viewCount: 0,
      shareCount: 0,
    });

    return NextResponse.json({
      id: docRef.id,
      success: true,
    });
  } catch (error: any) {
    console.error('Error creating greeting:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to create greeting' },
      { status: 500 }
    );
  }
}
