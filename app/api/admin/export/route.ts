import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/backend/lib/prisma';
import { requireAuth } from '@/backend/lib/authMiddleware';
import * as XLSX from 'xlsx';

export async function GET(request: NextRequest) {
  const authError = await requireAuth(request);
  if (authError) return authError;

  try {
    const branches = await prisma.branch.findMany({
      where: {
        status: { not: 'DELETED' },
      },
      orderBy: { governorate: 'asc' },
    });

    const data = branches.map((b) => ({
      'ID': b.id,
      'الاسم (عربي)': b.nameAr,
      'Name (English)': b.nameEn,
      'العنوان (عربي)': b.addressAr,
      'Address (English)': b.addressEn,
      'الهاتف': b.phone,
      'المحافظة': b.governorate,
      'الحالة': b.status,
      'ساعات العمل': b.workingHours || '-',
      'خط العرض': b.latitude || '-',
      'خط الطول': b.longitude || '-',
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Branches');

    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    return new NextResponse(buffer, {
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="dar-almal-branches-${Date.now()}.xlsx"`,
      },
    });
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
