#!/bin/bash
# ════════════════════════════════════════════════════
# سكريبت النشر الكامل - دار المال
# daralmall.com
# ════════════════════════════════════════════════════
set -e

echo "═══════════════════════════════════════"
echo "  🚀 بدء نشر موقع دار المال"
echo "═══════════════════════════════════════"

# ── التحقق من وجود ملف البيئة ──
if [ ! -f ".env.production" ]; then
  echo "❌ ملف .env.production غير موجود!"
  exit 1
fi

export $(cat .env.production | grep -v '^#' | xargs)

# ── بناء الـ images ──
echo ""
echo "📦 بناء Docker images..."
docker compose --env-file .env.production build --no-cache

# ── تشغيل قاعدة البيانات ──
echo ""
echo "🗄️  تشغيل قاعدة البيانات..."
docker compose --env-file .env.production up -d db
echo "⏳ انتظار جاهزية MySQL..."
sleep 30

# ── تشغيل التطبيق ──
echo ""
echo "🌐 تشغيل التطبيق..."
docker compose --env-file .env.production up -d app

# ── المرحلة الأولى: Nginx بدون SSL ──
echo ""
echo "🔧 تشغيل Nginx مؤقتاً بدون SSL..."
cp nginx.conf nginx-ssl.conf         # حفظ الـ SSL conf
cp nginx-init.conf nginx.conf        # استخدام الـ init conf مؤقتاً
docker compose --env-file .env.production up -d nginx

# ── إنشاء جداول قاعدة البيانات ──
echo ""
echo "🔧 إنشاء جداول قاعدة البيانات..."
docker exec daralmal_app npx prisma db push --schema=backend/prisma/schema.prisma

# ── زرع البيانات ──
echo ""
echo "🌱 زرع الفروع الأولية..."
docker exec daralmal_app npm run seed || echo "⚠️  Seed اختياري - تم التخطي"

# ── الحصول على شهادة SSL ──
echo ""
echo "🔒 الحصول على شهادة SSL من Let's Encrypt..."
echo "⚠️  تأكد أن DNS الدومين مربوط بـ IP هذا السيرفر!"
docker compose --env-file .env.production run --rm certbot \
  certonly --webroot \
  --webroot-path=/var/www/certbot \
  --email admin@daralmall.com \
  --agree-tos --no-eff-email \
  -d daralmall.com \
  -d www.daralmall.com

# ── تفعيل Nginx مع SSL ──
echo ""
echo "🔒 تفعيل HTTPS..."
cp nginx-ssl.conf nginx.conf         # استعادة الـ SSL conf
docker compose --env-file .env.production restart nginx

echo ""
echo "═══════════════════════════════════════"
echo "  ✅ تم النشر بنجاح!"
echo ""
echo "  🌍 الموقع:  https://daralmall.com"
echo "  🔧 الأدمن:  http://daralmall.com:8080/admin"
echo "═══════════════════════════════════════"
echo ""
echo "أوامر مفيدة:"
echo "  docker compose logs -f app      # متابعة logs"
echo "  docker compose ps               # حالة الـ containers"
echo "  docker compose restart app      # إعادة تشغيل التطبيق"
