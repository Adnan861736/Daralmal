'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { href: '/admin', label: 'لوحة التحكم', icon: '📊', exact: true },
  { href: '/admin/branches', label: 'إدارة الفروع', icon: '🏢', exact: false },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (item: { href: string; exact: boolean }) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  };

  return (
    <aside
      className={`bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 shadow-lg flex flex-col transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between min-h-[72px]">
        {!collapsed && (
          <div>
            <h1 className="font-bold text-blue-700 dark:text-blue-400 text-base leading-tight">
              دار المال
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              لوحة التحكم
            </p>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300"
          title={collapsed ? 'توسيع' : 'طي'}
        >
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
              isActive(item)
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-semibold shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            <span className="text-xl flex-shrink-0">{item.icon}</span>
            {!collapsed && (
              <span className="text-sm">{item.label}</span>
            )}
          </Link>
        ))}

        {/* View Site */}
        <a
          href="/ar"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
        >
          <span className="text-xl flex-shrink-0">🌐</span>
          {!collapsed && <span className="text-sm">عرض الموقع</span>}
        </a>
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
        >
          <span className="text-xl flex-shrink-0">🚪</span>
          {!collapsed && <span className="text-sm font-medium">تسجيل خروج</span>}
        </button>
      </div>
    </aside>
  );
}
