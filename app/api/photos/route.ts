'use server';

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageUrl = searchParams.get('pageUrl') || '';

  try {
    const response = await fetch(pageUrl, {
      headers: {
        Authorization: `${process.env.PEXELS_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch photos: ${response.status}.`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error occurred' }, { status: 500 });
  }
}