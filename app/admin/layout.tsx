import AdminSidebar from '@/frontend/components/admin/AdminSidebar';
import './admin.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="flex h-screen overflow-hidden">
          <AdminSidebar />
          <main className="flex-1 overflow-y-auto p-6 md:p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
