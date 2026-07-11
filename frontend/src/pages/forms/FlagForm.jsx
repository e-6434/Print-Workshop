import React from "react";

export function FlagForm({ data, setData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">نوع پرچم</label>
        <input
          type="text"
          value={data.type || ""}
          onChange={(e) => setData({ ...data, type: e.target.value })}
          className="w-full px-4 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-sm"
          placeholder="نوع پرچم..."
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">ابعاد</label>
        <input
          type="text"
          value={data.size || ""}
          onChange={(e) => setData({ ...data, size: e.target.value })}
          className="w-full px-4 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-sm"
          placeholder="مثلاً ۱۰۰×۲۰۰"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">جنس پارچه</label>
        <select
          value={data.fabric || ""}
          onChange={(e) => setData({ ...data, fabric: e.target.value })}
          className="w-full px-4 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-sm"
        >
          <option value="">انتخاب کنید...</option>
          <option value="پلی استر">پلی استر</option>
          <option value="کتان">کتان</option>
          <option value="نایلون">نایلون</option>
          <option value="تافته">تافته</option>
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