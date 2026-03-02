import { PrismaClient, BranchStatus } from '@prisma/client';
import { branches } from '../lib/branches';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // حذف البيانات القديمة
  await prisma.branch.deleteMany({});
  console.log('🗑️  Cleared existing branches');

  // إضافة الفروع
  for (const branch of branches) {
    await prisma.branch.create({
      data: {
        nameAr: branch.nameAr,
        nameEn: branch.nameEn,
        addressAr: branch.addressAr,
        addressEn: branch.addressEn,
        phone: branch.phone,
        governorate: branch.governorate,
        status: branch.status === 'HIDDEN' ? BranchStatus.HIDDEN : BranchStatus.ACTIVE,
      },
    });
  }

  console.log(`✅ Seeded ${branches.length} branches successfully!`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
