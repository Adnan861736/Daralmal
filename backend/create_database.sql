-- إنشاء قاعدة بيانات دار المال
CREATE DATABASE IF NOT EXISTS daralmal_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

-- استخدام قاعدة البيانات
USE daralmal_db;

-- رسالة نجاح
SELECT 'Database daralmal_db created successfully!' AS message;
