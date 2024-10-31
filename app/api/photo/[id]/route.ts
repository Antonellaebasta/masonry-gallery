'use server';

import { PageProps } from '@/.next/types/app/layout';
import { BASE_URL } from '@/app/utils/constants';
import { NextResponse } from 'next/server';

export async function GET({ params }: PageProps) {
    const { id } = await params;
    const url = `${BASE_URL}photos/${id}`;
  
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `${process.env.PEXELS_API_KEY}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch photo details');
      }
  
      const data = await response.json();
      
      return NextResponse.json(data);
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error occurred' });
  }
}