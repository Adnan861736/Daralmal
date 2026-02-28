import AdminLayoutClient from '@/frontend/components/admin/AdminLayoutClient';
import './admin.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <AdminLayoutClient>{children}</AdminLayoutClient>
      </body>
    </html>
  );
}
