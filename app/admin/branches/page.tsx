'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useToast, ToastContainer } from '@/frontend/components/admin/Toast';

interface Branch {
  id: number;
  nameAr: string;
  nameEn: string;
  addressAr: string;
  addressEn: string;
  phone: string;
  governorate: string;
  image: string | null;
  workingHours: string | null;
  latitude: number | null;
  longitude: number | null;
  status: string;
}

const EMPTY_FORM = {
  nameAr: '',
  nameEn: '',
  addressAr: '',
  addressEn: '',
  phone: '',
  governorate: 'damascus',
  workingHours: '',
  latitude: '',
  longitude: '',
  image: '',
};

const GOVERNORATES = [
  { value: 'damascus', label: 'دمشق' },
  { value: 'rif_damascus', label: 'ريف دمشق' },
  { value: 'aleppo', label: 'حلب' },
  { value: 'homs', label: 'حمص' },
  { value: 'hama', label: 'حماة' },
  { value: 'latakia', label: 'اللاذقية' },
  { value: 'tartous', label: 'طرطوس' },
  { value: 'deir_ez_zor', label: 'دير الزور' },
  { value: 'idlib', label: 'إدلب' },
  { value: 'daraa', label: 'درعا' },
  { value: 'raqqa', label: 'الرقة' },
  { value: 'hasakah', label: 'الحسكة والقامشلي' },
];

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  ACTIVE: { label: 'نشط', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  HIDDEN: { label: 'مخفي', className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
  BANNED: { label: 'محظور', className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
  DELETED: { label: 'محذوف', className: 'bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400' },
};

export default function BranchesAdmin() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [govFilter, setGovFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [geocoding, setGeocoding] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [deleteAllConfirm, setDeleteAllConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { toasts, addToast, removeToast } = useToast();

  useEffect(() => {
    loadBranches();
  }, [govFilter, statusFilter]);

  const loadBranches = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (govFilter) params.set('governorate', govFilter);
      if (statusFilter) params.set('status', statusFilter);

      const res = await fetch(`/api/admin/branches?${params}`);
      if (res.status === 401) { router.push('/admin/login'); return; }
      const data = await res.json();
      setBranches(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingBranch(null);
    setForm({ ...EMPTY_FORM });
    setModalOpen(true);
  };

  const openEditModal = (branch: Branch) => {
    setEditingBranch(branch);
    setForm({
      nameAr: branch.nameAr,
      nameEn: branch.nameEn,
      addressAr: branch.addressAr,
      addressEn: branch.addressEn,
      phone: branch.phone,
      governorate: branch.governorate,
      workingHours: branch.workingHours || '',
      latitude: branch.latitude?.toString() || '',
      longitude: branch.longitude?.toString() || '',
      image: branch.image || '',
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingBranch(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.url) setForm((f) => ({ ...f, image: data.url }));
      else addToast('فشل رفع الصورة', 'error');
    } catch {
      addToast('حدث خطأ أثناء رفع الصورة', 'error');
    } finally {
      setUploadingImage(false);
    }
  };

  const geocodeAddress = async () => {
    const address = form.addressAr || form.addressEn;
    if (!address) { addToast('أدخل العنوان أولاً', 'warning'); return; }
    setGeocoding(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address + ' سوريا')}&limit=1`,
        { headers: { 'Accept-Language': 'ar' } }
      );
      const data = await res.json();
      if (data.length > 0) {
        setForm((f) => ({ ...f, latitude: data[0].lat, longitude: data[0].lon }));
        addToast('تم تحديد الموقع بنجاح', 'success');
      } else {
        addToast('لم يتم العثور على الموقع، جرب عنواناً أكثر دقة', 'warning');
      }
    } catch {
      addToast('فشل البحث عن الموقع', 'error');
    } finally {
      setGeocoding(false);
    }
  };

  const handleSave = async () => {
    if (!form.nameAr || !form.phone || !form.governorate) {
      addToast('يرجى ملء الحقول المطلوبة: الاسم بالعربي، رقم الهاتف، المحافظة', 'warning');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...form,
        latitude: form.latitude ? parseFloat(form.latitude) : null,
        longitude: form.longitude ? parseFloat(form.longitude) : null,
      };

      let res;
      if (editingBranch) {
        res = await fetch(`/api/admin/branches/${editingBranch.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch('/api/admin/branches', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        addToast(editingBranch ? 'تم حفظ التعديلات بنجاح' : 'تم إضافة الفرع بنجاح', 'success');
        closeModal();
        loadBranches();
      } else {
        addToast('حدث خطأ أثناء الحفظ', 'error');
      }
    } catch {
      addToast('حدث خطأ', 'error');
    } finally {
      setSaving(false);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    const res = await fetch(`/api/admin/branches/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });

    if (res.ok) {
      const messages: Record<string, { msg: string; type: 'success' | 'warning' | 'error' }> = {
        HIDDEN:  { msg: 'تم إخفاء الفرع',    type: 'warning' },
        ACTIVE:  { msg: 'تم تفعيل الفرع',    type: 'success' },
        BANNED:  { msg: 'تم حظر الفرع',      type: 'error'   },
      };
      const info = messages[status];
      if (info) addToast(info.msg, info.type);
      loadBranches();
    } else {
      addToast('حدث خطأ أثناء تحديث الحالة', 'error');
    }
    setDeleteConfirm(null);
  };

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/admin/branches/${id}`, { method: 'DELETE' });
    if (res.ok) {
      addToast('تم حذف الفرع نهائياً من قاعدة البيانات', 'success');
      loadBranches();
    } else {
      addToast('فشل حذف الفرع', 'error');
    }
    setDeleteConfirm(null);
  };

  const handleDeleteAll = async () => {
    const res = await fetch('/api/admin/branches', { method: 'DELETE' });
    if (res.ok) {
      addToast('تم حذف جميع الفروع نهائياً', 'success');
      loadBranches();
    } else {
      addToast('فشل حذف الفروع', 'error');
    }
    setDeleteAllConfirm(false);
  };

  const govLabel = (val: string) =>
    GOVERNORATES.find((g) => g.value === val)?.label || val;

  const mapUrl =
    form.latitude && form.longitude
      ? `https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(form.longitude) - 0.02},${parseFloat(form.latitude) - 0.02},${parseFloat(form.longitude) + 0.02},${parseFloat(form.latitude) + 0.02}&layer=mapnik&marker=${form.latitude},${form.longitude}`
      : null;

  return (
    <div>
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">إدارة الفروع</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {branches.length} فرع
          </p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => window.open('/api/admin/export', '_blank')}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <span>📥</span> تصدير Excel
          </button>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <span>➕</span> إضافة فرع
          </button>
          {deleteAllConfirm ? (
            <div className="flex gap-2 items-center">
              <span className="text-sm text-red-600 font-medium">حذف جميع الفروع؟</span>
              <button
                onClick={handleDeleteAll}
                className="flex items-center gap-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                تأكيد الحذف
              </button>
              <button
                onClick={() => setDeleteAllConfirm(false)}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg transition-colors"
              >
                إلغاء
              </button>
            </div>
          ) : (
            <button
              onClick={() => setDeleteAllConfirm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <span>🗑️</span> حذف الكل
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-6 flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">المحافظة:</label>
          <select
            value={govFilter}
            onChange={(e) => setGovFilter(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">الكل</option>
            {GOVERNORATES.map((g) => (
              <option key={g.value} value={g.value}>{g.label}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">الحالة:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">الكل</option>
            <option value="ACTIVE">نشط</option>
            <option value="HIDDEN">مخفي</option>
            <option value="BANNED">محظور</option>
          </select>
        </div>

        {(govFilter || statusFilter) && (
          <button
            onClick={() => { setGovFilter(''); setStatusFilter(''); }}
            className="text-sm text-red-500 hover:text-red-700 underline"
          >
            مسح الفلتر
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="text-center py-16 text-gray-500">جاري التحميل...</div>
        ) : branches.length === 0 ? (
          <div className="text-center py-16 text-gray-500">لا توجد فروع</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="p-3 text-right font-semibold text-gray-600 dark:text-gray-400">#</th>
                  <th className="p-3 text-right font-semibold text-gray-600 dark:text-gray-400">الاسم</th>
                  <th className="p-3 text-right font-semibold text-gray-600 dark:text-gray-400">المحافظة</th>
                  <th className="p-3 text-right font-semibold text-gray-600 dark:text-gray-400">الهاتف</th>
                  <th className="p-3 text-right font-semibold text-gray-600 dark:text-gray-400">الحالة</th>
                  <th className="p-3 text-right font-semibold text-gray-600 dark:text-gray-400">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {branches.map((branch) => {
                  const statusInfo = STATUS_LABELS[branch.status] || STATUS_LABELS.ACTIVE;
                  return (
                    <tr key={branch.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                      <td className="p-3 text-gray-500">{branch.id}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          {branch.image && (
                            <Image
                              src={branch.image}
                              alt={branch.nameAr}
                              width={32}
                              height={32}
                              unoptimized
                              className="w-8 h-8 rounded-full object-contain bg-gray-100 flex-shrink-0"
                            />
                          )}
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{branch.nameAr}</div>
                            {branch.nameEn && (
                              <div className="text-xs text-gray-500">{branch.nameEn}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-gray-600 dark:text-gray-400">{govLabel(branch.governorate)}</td>
                      <td className="p-3 text-gray-600 dark:text-gray-400" dir="ltr">{branch.phone}</td>
                      <td className="p-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusInfo.className}`}>
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-1.5 flex-wrap">
                          {/* Edit */}
                          <button
                            onClick={() => openEditModal(branch)}
                            className="px-2.5 py-1 text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40 rounded-lg transition-colors font-medium"
                          >
                            تعديل
                          </button>

                          {/* Status actions */}
                          {branch.status === 'ACTIVE' && (
                            <button
                              onClick={() => updateStatus(branch.id, 'HIDDEN')}
                              className="px-2.5 py-1 text-xs bg-yellow-50 text-yellow-600 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400 rounded-lg transition-colors font-medium"
                            >
                              إخفاء
                            </button>
                          )}
                          {branch.status === 'HIDDEN' && (
                            <button
                              onClick={() => updateStatus(branch.id, 'ACTIVE')}
                              className="px-2.5 py-1 text-xs bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 rounded-lg transition-colors font-medium"
                            >
                              تفعيل
                            </button>
                          )}
                          {branch.status !== 'BANNED' && (
                            <button
                              onClick={() => updateStatus(branch.id, 'BANNED')}
                              className="px-2.5 py-1 text-xs bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 rounded-lg transition-colors font-medium"
                            >
                              حظر
                            </button>
                          )}
                          {branch.status === 'BANNED' && (
                            <button
                              onClick={() => updateStatus(branch.id, 'ACTIVE')}
                              className="px-2.5 py-1 text-xs bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 rounded-lg transition-colors font-medium"
                            >
                              فك حظر
                            </button>
                          )}

                          {/* Delete */}
                          {deleteConfirm === branch.id ? (
                            <div className="flex gap-1">
                              <button
                                onClick={() => handleDelete(branch.id)}
                                className="px-2.5 py-1 text-xs bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors font-medium"
                              >
                                تأكيد الحذف
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="px-2.5 py-1 text-xs bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                              >
                                إلغاء
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirm(branch.id)}
                              className="px-2.5 py-1 text-xs bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400 rounded-lg transition-colors font-medium"
                            >
                              حذف
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl my-8">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingBranch ? 'تعديل الفرع' : 'إضافة فرع جديد'}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-500"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {/* Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    اسم الفرع (عربي) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.nameAr}
                    onChange={(e) => setForm((f) => ({ ...f, nameAr: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="مثال: فرع دمشق المركزي"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Branch Name (English)
                  </label>
                  <input
                    type="text"
                    value={form.nameEn}
                    onChange={(e) => setForm((f) => ({ ...f, nameEn: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Damascus Central Branch"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Addresses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    العنوان (عربي)
                  </label>
                  <input
                    type="text"
                    value={form.addressAr}
                    onChange={(e) => setForm((f) => ({ ...f, addressAr: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="مثال: شارع بغداد، دمشق"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Address (English)
                  </label>
                  <input
                    type="text"
                    value={form.addressEn}
                    onChange={(e) => setForm((f) => ({ ...f, addressEn: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Baghdad St., Damascus"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Phone + Governorate */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    رقم الهاتف <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="0991234567"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    المحافظة <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={form.governorate}
                    onChange={(e) => setForm((f) => ({ ...f, governorate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    {GOVERNORATES.map((g) => (
                      <option key={g.value} value={g.value}>{g.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Working Hours */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  أوقات العمل
                </label>
                <input
                  type="text"
                  value={form.workingHours}
                  onChange={(e) => setForm((f) => ({ ...f, workingHours: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="مثال: يومياً 9:00 - 18:00"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  صورة الفرع
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="flex items-center gap-2 px-4 py-2 text-sm border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors disabled:opacity-50"
                  >
                    {uploadingImage ? (
                      <span className="animate-spin">⏳</span>
                    ) : (
                      <span>📷</span>
                    )}
                    {uploadingImage ? 'جاري الرفع...' : 'رفع صورة'}
                  </button>
                  {form.image && (
                    <div className="flex items-center gap-2">
                      <Image
                        src={form.image}
                        alt="preview"
                        width={48}
                        height={48}
                        unoptimized
                        className="w-12 h-12 rounded-lg object-contain bg-gray-100 border border-gray-200"
                      />
                      <button
                        onClick={() => setForm((f) => ({ ...f, image: '' }))}
                        className="text-red-500 text-xs hover:text-red-700"
                      >
                        حذف
                      </button>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {/* Map Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  موقع الفرع على الخريطة
                </label>

                <div className="flex gap-3 mb-3">
                  <input
                    type="number"
                    value={form.latitude}
                    onChange={(e) => setForm((f) => ({ ...f, latitude: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="خط العرض (Latitude)"
                    step="any"
                    dir="ltr"
                  />
                  <input
                    type="number"
                    value={form.longitude}
                    onChange={(e) => setForm((f) => ({ ...f, longitude: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="خط الطول (Longitude)"
                    step="any"
                    dir="ltr"
                  />
                </div>

                <button
                  type="button"
                  onClick={geocodeAddress}
                  disabled={geocoding}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors disabled:opacity-50 mb-3"
                >
                  {geocoding ? <span className="animate-spin">⏳</span> : <span>📍</span>}
                  {geocoding ? 'جاري البحث...' : 'بحث تلقائي عن الموقع'}
                </button>

                {mapUrl && (
                  <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600">
                    <iframe
                      src={mapUrl}
                      width="100%"
                      height="220"
                      style={{ border: 0 }}
                      title="موقع الفرع"
                    />
                    <div className="p-2 bg-gray-50 dark:bg-gray-700 text-xs text-gray-500 text-center">
                      <a
                        href={`https://www.google.com/maps?q=${form.latitude},${form.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        فتح في Google Maps
                      </a>
                    </div>
                  </div>
                )}

                {!mapUrl && (
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    <span className="text-2xl block mb-1">🗺️</span>
                    أدخل إحداثيات أو انقر &quot;بحث تلقائي&quot; لعرض الخريطة
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 justify-end p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={closeModal}
                className="px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg transition-colors flex items-center gap-2"
              >
                {saving ? <span className="animate-spin text-base">⏳</span> : null}
                {saving ? 'جاري الحفظ...' : editingBranch ? 'حفظ التعديلات' : 'إضافة الفرع'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
