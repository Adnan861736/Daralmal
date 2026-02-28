#!/bin/bash
# ════════════════════════════════════════════════════
# سكريبت النشر الكامل - دار المال
# daralmall.com
# ════════════════════════════════════════════════════

set -e  # توقف عند أي خطأ

echo "═══════════════════════════════════════"
echo "  🚀 بدء نشر موقع دار المال"
echo "═══════════════════════════════════════"

# 1. التحقق من وجود ملف البيئة
if [ ! -f ".env.production" ]; then
  echo "❌ ملف .env.production غير موجود!"
  echo "   انسخ المثال: cp .env.production .env.production"
  echo "   ثم عدّل القيم فيه"
  exit 1
fi

# 2. تحميل متغيرات البيئة
export $(cat .env.production | grep -v '^#' | xargs)

# 3. بناء وتشغيل الـ containers
echo ""
echo "📦 بناء الـ Docker images..."
docker compose --env-file .env.production build --no-cache

echo ""
echo "🗄️  تشغيل قاعدة البيانات..."
docker compose --env-file .env.production up -d db

echo ""
echo "⏳ انتظار جاهزية قاعدة البيانات (30 ثانية)..."
sleep 30

echo ""
echo "🔧 تطبيق migrations قاعدة البيانات..."
docker compose --env-file .env.production run --rm app \
  sh -c "npx prisma db push --schema=backend/prisma/schema.prisma"

echo ""
echo "🌱 زرع البيانات الأولية..."
docker compose --env-file .env.production run --rm app \
  sh -c "npm run seed" || echo "⚠️  Seed اختياري - تم التخطي"

echo ""
echo "🌐 تشغيل التطبيق و Nginx..."
docker compose --env-file .env.production up -d app nginx

echo ""
echo "🔒 الحصول على شهادة SSL من Let's Encrypt..."
docker compose --env-file .env.production run --rm certbot \
  certonly --webroot \
  --webroot-path=/var/www/certbot \
  --email admin@daralmall.com \
  --agree-tos \
  --no-eff-email \
  -d daralmall.com \
  -d www.daralmall.com || echo "⚠️  SSL يحتاج أن يكون الدومين مربوطاً بالسيرفر أولاً"

echo ""
echo "🔄 إعادة تشغيل Nginx بعد SSL..."
docker compose --env-file .env.production restart nginx

echo ""
echo "═══════════════════════════════════════"
echo "  ✅ تم النشر بنجاح!"
echo "  🌍 الموقع: https://daralmall.com"
echo "  🔧 لوحة الإدارة: https://daralmall.com/admin"
echo "═══════════════════════════════════════"
echo ""
echo "أوامر مفيدة:"
echo "  docker compose logs -f app    # متابعة الـ logs"
echo "  docker compose ps             # حالة الـ containers"
echo "  docker compose restart app    # إعادة تشغيل التطبيق"
