import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  PlusIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export function Home() {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    week: 0,
    month: 0,
  });

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(savedOrders);

    // محاسبه آمار
    const today = new Date().toDateString();
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);

    const todayOrders = savedOrders.filter(
      (order) => new Date(order.timestamp).toDateString() === today
    );

    const weekOrders = savedOrders.filter(
      (order) => new Date(order.timestamp) >= weekAgo
    );

    const monthOrders = savedOrders.filter(
      (order) => new Date(order.timestamp) >= monthAgo
    );

    setStats({
      total: savedOrders.length,
      today: todayOrders.length,
      week: weekOrders.length,
      month: monthOrders.length,
    });
  }, []);

  // آخرین ۵ سفارش
  const recentOrders = orders.slice(-5).reverse();

  return (
    <div dir="rtl" className="p-6">
      {/* هدر */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">🏠 داشبورد چاپخانه</h1>
          <p className="text-gray-500 mt-1">به سیستم مدیریت سفارشات چاپ خوش آمدید</p>
        </div>
        <Link
          to="/dashboard/print-order"
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          سفارش جدید
        </Link>
      </div>

      {/* کارت‌های آماری */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-sm border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">کل سفارشات</p>
              <p className="text-3xl font-bold text-blue-800 mt-1">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
              <ClipboardDocumentListIcon className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl shadow-sm border border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">سفارشات امروز</p>
              <p className="text-3xl font-bold text-green-800 mt-1">{stats.today}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
              <CalendarIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-2xl shadow-sm border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">این هفته</p>
              <p className="text-3xl font-bold text-purple-800 mt-1">{stats.week}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
              <ClockIcon className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl shadow-sm border border-orange-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 font-medium">این ماه</p>
              <p className="text-3xl font-bold text-orange-800 mt-1">{stats.month}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center">
              <DocumentTextIcon className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* بخش پایین: سفارشات اخیر + اقدامات سریع */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* سفارشات اخیر */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">📋 آخرین سفارشات</h2>
            <Link
              to="/dashboard/orders"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              مشاهده همه →
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-gray-500">هنوز سفارشی ثبت نشده است</p>
              <Link
                to="/dashboard/print-order"
                className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
              >
                ثبت اولین سفارش
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold">
                      {order.customerName?.charAt(0) || "?"}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {order.customerName || "نامشخص"}
                      </p>
                      <p className="text-sm text-gray-500">
                        📄 {order.paperType || "-"} | 🎨 {order.printType || "-"}
                      </p>
                    </div>
                  </div>
                  <div className="text-left">
                    <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full">
                      {order.orderNumber || "CH-000000"}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">
                      {order.timestamp || "تاریخ نامشخص"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* اقدامات سریع */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">⚡ اقدامات سریع</h2>
          <div className="space-y-3">
            <Link
              to="/dashboard/print-order"
              className="block w-full text-right p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:shadow-md transition-all border border-blue-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <PlusIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">ثبت سفارش جدید</p>
                  <p className="text-sm text-gray-500">ایجاد یک سفارش چاپ جدید</p>
                </div>
              </div>
            </Link>

            <Link
              to="/dashboard/orders"
              className="block w-full text-right p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl hover:shadow-md transition-all border border-purple-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <ClipboardDocumentListIcon className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">مشاهده سفارشات</p>
                  <p className="text-sm text-gray-500">لیست تمام سفارشات ثبت شده</p>
                </div>
              </div>
            </Link>

            <div className="block w-full text-right p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircleIcon className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">وضعیت امروز</p>
                  <p className="text-sm text-gray-500">
                    {stats.today} سفارش امروز ثبت شده
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* اطلاعات کاربری */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                🖨️
              </div>
              <div>
                <p className="font-semibold text-gray-800">چاپخانه هوشمند</p>
                <p className="text-sm text-gray-500">
                  {orders.length} سفارش ثبت شده
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;