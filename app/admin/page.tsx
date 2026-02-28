'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface Branch {
  id: number;
  governorate: string;
  status: string;
}

interface Stats {
  total: number;
  active: number;
  hidden: number;
  banned: number;
}

const GOV_LABELS: Record<string, string> = {
  damascus: 'دمشق',
  rif_damascus: 'ريف دمشق',
  aleppo: 'حلب',
  homs: 'حمص',
  hama: 'حماة',
  latakia: 'اللاذقية',
  tartous: 'طرطوس',
  deir_ez_zor: 'دير الزور',
  idlib: 'إدلب',
  daraa: 'درعا',
  raqqa: 'الرقة',
};

const COLORS = [
  '#3b82f6', '#10b981', '#f59e0b', '#ef4444',
  '#8b5cf6', '#06b6d4', '#f97316', '#84cc16',
  '#ec4899', '#14b8a6', '#6366f1',
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 shadow-lg text-sm">
        <p className="font-bold text-gray-800 dark:text-white mb-1">{label}</p>
        <p className="text-blue-600 dark:text-blue-400">
          عدد الفروع: <span className="font-bold">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function AdminDashboard() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, active: 0, hidden: 0, banned: 0 });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await fetch('/api/admin/branches');
      if (res.status === 401) { router.push('/admin/login'); return; }
      const data: Branch[] = await res.json();
      setBranches(data);
      setStats({
        total: data.length,
        active: data.filter((b) => b.status === 'ACTIVE').length,
        hidden: data.filter((b) => b.status === 'HIDDEN').length,
        banned: data.filter((b) => b.status === 'BANNED').length,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // بيانات الرسم البياني: عدد الفروع لكل محافظة
  const chartData = Object.entries(GOV_LABELS)
    .map(([key, label]) => ({
      name: label,
      count: branches.filter((b) => b.governorate === key && b.status !== 'DELETED').length,
    }))
    .filter((d) => d.count > 0)
    .sort((a, b) => b.count - a.count);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin text-4xl">⏳</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">لوحة التحكم</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">نظرة عامة على الفروع</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border-r-4 border-blue-500">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">إجمالي الفروع</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border-r-4 border-green-500">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">الفروع النشطة</p>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.active}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border-r-4 border-orange-500">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">الفروع المخفية</p>
          <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{stats.hidden}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border-r-4 border-red-500">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">الفروع المحظورة</p>
          <p className="text-3xl font-bold text-red-600 dark:text-red-400">{stats.banned}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
          توزيع الفروع حسب المحافظة
        </h2>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 10, left: 10, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: '#6b7280', fontFamily: 'inherit' }}
              angle={-35}
              textAnchor="end"
              interval={0}
              height={70}
            />
            <YAxis
              tick={{ fontSize: 12, fill: '#6b7280' }}
              allowDecimals={false}
              width={30}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59,130,246,0.08)' }} />
            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-3 justify-center">
          {chartData.map((item, index) => (
            <div key={item.name} className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
              <span
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              {item.name} ({item.count})
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
