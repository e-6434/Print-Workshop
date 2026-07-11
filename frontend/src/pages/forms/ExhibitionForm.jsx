import React from "react";

export function ExhibitionForm({ data, setData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">نوع محصول</label>
        <input
          type="text"
          value={data.type || ""}
          onChange={(e) => setData({ ...data, type: e.target.value })}
          className="w-full px-4 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-sm"
          placeholder="نوع محصول..."
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">ابعاد</label>
        <input
          type="text"
          value={data.size || ""}
          onChange={(e) => setData({ ...data, size: e.target.value })}
          className="w-full px-4 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-sm"
          placeholder="طول × عرض × ارتفاع"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">جنس</label>
        <select
          value={data.material || ""}
          onChange={(e) => setData({ ...data, material: e.target.value })}
          className="w-full px-4 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-sm"
        >
          <option value="">انتخاب کنید...</option>
          <option value="چوب">چوب</option>
          <option value="فلز">فلز</option>
          <option value="پلکسی گلاس">پلکسی گلاس</option>
          <option value="ام‌دی‌اف">ام‌دی‌اف</option>
          <option value="آلومینیوم">آلومینیوم</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">تعداد</label>
        <input
          type="number"
          value={data.count || ""}
          onChange={(e) => setData({ ...data, count: e.target.value })}
          className="w-full px-4 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-sm"
          placeholder="تعداد..."
        />
      </div>
    </div>
  );
}