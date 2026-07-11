import React from "react";

export function GiftForm({ data, setData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">نوع هدیه</label>
        <input
          type="text"
          value={data.type || ""}
          onChange={(e) => setData({ ...data, type: e.target.value })}
          className="w-full px-4 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-sm"
          placeholder="نوع هدیه..."
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
          <option value="پلاستیک">پلاستیک</option>
          <option value="چوب">چوب</option>
          <option value="فلز">فلز</option>
          <option value="چرم">چرم</option>
          <option value="شیشه">شیشه</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">رنگ</label>
        <select
          value={data.color || ""}
          onChange={(e) => setData({ ...data, color: e.target.value })}
          className="w-full px-4 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-sm"
        >
          <option value="">انتخاب کنید...</option>
          <option value="سفارشی">سفارشی</option>
          <option value="مشکی">مشکی</option>
          <option value="سفید">سفید</option>
          <option value="قرمز">قرمز</option>
          <option value="آبی">آبی</option>
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