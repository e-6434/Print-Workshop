import React from "react";

export function PvcForm({ data, setData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">نوع کارت</label>
        <input
          type="text"
          value={data.type || ""}
          onChange={(e) => setData({ ...data, type: e.target.value })}
          className="w-full px-4 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-sm"
          placeholder="نوع کارت..."
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">ضخامت</label>
        <select
          value={data.thickness || ""}
          onChange={(e) => setData({ ...data, thickness: e.target.value })}
          className="w-full px-4 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-sm"
        >
          <option value="">انتخاب کنید...</option>
          <option value="۰.۳">۰.۳ میلیمتر</option>
          <option value="۰.۵">۰.۵ میلیمتر</option>
          <option value="۰.۷">۰.۷ میلیمتر</option>
          <option value="۱">۱ میلیمتر</option>
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
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">ویژگی‌ها</label>
        <div className="flex flex-wrap gap-2 pt-1">
          <label className="flex items-center gap-1.5 text-sm bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
            <input type="checkbox" className="w-4 h-4" /> لمینت
          </label>
          <label className="flex items-center gap-1.5 text-sm bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
            <input type="checkbox" className="w-4 h-4" /> هولوگرام
          </label>
          <label className="flex items-center gap-1.5 text-sm bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
            <input type="checkbox" className="w-4 h-4" /> برجسته
          </label>
        </div>
      </div>
    </div>
  );
}