import React from "react";

export function PaperForm({ data, setData }) {
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
        <label className="block text-sm font-semibold text-gray-700 mb-1">تیراژ</label>
        <input
          type="number"
          value={data.count || ""}
          onChange={(e) => setData({ ...data, count: e.target.value })}
          className="w-full px-4 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-sm"
          placeholder="تعداد..."
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">قطع</label>
        <select
          value={data.size || ""}
          onChange={(e) => setData({ ...data, size: e.target.value })}
          className="w-full px-4 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-sm"
        >
          <option value="">انتخاب کنید...</option>
          <option value="A4">A4</option>
          <option value="A3">A3</option>
          <option value="A5">A5</option>
          <option value="رقعی">رقعی</option>
          <option value="وزیری">وزیری</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">نوع کاغذ</label>
        <select
          value={data.paper || ""}
          onChange={(e) => setData({ ...data, paper: e.target.value })}
          className="w-full px-4 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-sm"
        >
          <option value="">انتخاب کنید...</option>
          <option value="گلاسه">گلاسه</option>
          <option value="مات">مات</option>
          <option value="کرافت">کرافت</option>
          <option value="تحریر">تحریر</option>
        </select>
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm font-semibold text-gray-700 mb-1">توضیحات</label>
        <textarea
          value={data.description || ""}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          rows="2"
          className="w-full px-4 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-sm resize-none"
          placeholder="توضیحات اضافی..."
        />
      </div>
    </div>
  );
}