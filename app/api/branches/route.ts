import { NextResponse } from 'next/server';
import { prisma } from '@/backend/lib/prisma';

export async function GET() {
  try {
    const branches = await prisma.branch.findMany({
      where: { status: 'ACTIVE' },
      orderBy: { governorate: 'asc' },
    });

    return NextResponse.json(branches);
  } catch (error) {
    console.error('Get public branches error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
