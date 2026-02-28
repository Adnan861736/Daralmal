import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/backend/lib/prisma';
import { requireAuth } from '@/backend/lib/authMiddleware';

export async function GET(request: NextRequest) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const governorate = searchParams.get('governorate');
    const status = searchParams.get('status');

    const branches = await prisma.branch.findMany({
      where: {
        ...(governorate && governorate !== '' && { governorate }),
        ...(status && status !== '' && { status: status as any }),
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(branches);
  } catch (error) {
    console.error('Get branches error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    const data = await request.json();

    const branch = await prisma.branch.create({
      data: {
        nameAr: data.nameAr,
        nameEn: data.nameEn,
        addressAr: data.addressAr,
        addressEn: data.addressEn,
        phone: data.phone,
        governorate: data.governorate,
        image: data.image || null,
        workingHours: data.workingHours || null,
        latitude: data.latitude ? parseFloat(data.latitude) : null,
        longitude: data.longitude ? parseFloat(data.longitude) : null,
        status: data.status || 'ACTIVE',
      },
    });

    return NextResponse.json(branch, { status: 201 });
  } catch (error) {
    console.error('Create branch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
