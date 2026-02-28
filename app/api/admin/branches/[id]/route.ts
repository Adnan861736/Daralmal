import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/backend/lib/prisma';
import { requireAuth } from '@/backend/lib/authMiddleware';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const branch = await prisma.branch.findUnique({
      where: { id: parseInt(id) },
    });

    if (!branch) {
      return NextResponse.json({ error: 'Branch not found' }, { status: 404 });
    }

    return NextResponse.json(branch);
  } catch (error) {
    console.error('Get branch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const data = await request.json();

    const updateData: any = {};
    if (data.nameAr !== undefined) updateData.nameAr = data.nameAr;
    if (data.nameEn !== undefined) updateData.nameEn = data.nameEn;
    if (data.addressAr !== undefined) updateData.addressAr = data.addressAr;
    if (data.addressEn !== undefined) updateData.addressEn = data.addressEn;
    if (data.phone !== undefined) updateData.phone = data.phone;
    if (data.governorate !== undefined) updateData.governorate = data.governorate;
    if (data.image !== undefined) updateData.image = data.image;
    if (data.workingHours !== undefined) updateData.workingHours = data.workingHours;
    if (data.latitude !== undefined) updateData.latitude = data.latitude ? parseFloat(data.latitude) : null;
    if (data.longitude !== undefined) updateData.longitude = data.longitude ? parseFloat(data.longitude) : null;
    if (data.status !== undefined) updateData.status = data.status;

    const branch = await prisma.branch.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    return NextResponse.json(branch);
  } catch (error) {
    console.error('Update branch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;

    await prisma.branch.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete branch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
