import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  ShoppingCartIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

// ============ کامپوننت‌های فرم هر پروژه ============
const PrintForm = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-bold text-gray-800">📄 فرم سفارش چاپ</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">نوع چاپ</label>
        <select className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none">
          <option>بروشور</option>
          <option>کاتالوگ</option>
          <option>مجلله</option>
          <option>کارت ویزیت</option>
          <option>پوستر</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">تیراژ</label>
        <input type="number" className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none" placeholder="تعداد..." />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">قطع</label>
        <select className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none">
          <option>A4</option>
          <option>A3</option>
          <option>A5</option>
          <option>رقعی</option>
          <option>وزیری</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">تعداد صفحه</label>
        <input type="number" className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none" placeholder="تعداد..." />
      </div>
    </div>
  </div>
);

const FlagForm = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-bold text-gray-800">🏁 فرم سفارش پرچم</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">نوع پرچم</label>
        <select className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none">
          <option>سفارشی</option>
          <option>تبلیغاتی</option>
          <option>مناسبتی</option>
          <option>مذهبی</option>
          <option>ورزشی</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">اندازه</label>
        <input type="text" className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none" placeholder="مثلاً ۱۰۰×۲۰۰" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">جنس پارچه</label>
        <select className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none">
          <option>پلی استر</option>
          <option>کتان</option>
          <option>نایلون</option>
          <option>تافته</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">تعداد</label>
        <input type="number" className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none" placeholder="تعداد..." />
      </div>
    </div>
  </div>
);

const ExhibitionForm = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-bold text-gray-800">🏗️ فرم سفارش سازه‌های نمایشگاهی</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">نوع سازه</label>
        <select className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none">
          <option>استند</option>
          <option>بک‌دراپ</option>
          <option>میز نمایشگاهی</option>
          <option>غرفه</option>
          <option>پنل</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">ابعاد</label>
        <input type="text" className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none" placeholder="طول × عرض × ارتفاع" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">جنس</label>
        <select className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none">
          <option>چوب</option>
          <option>فلز</option>
          <option>پلکسی گلاس</option>
          <option>ام‌دی‌اف</option>
          <option>آلومینیوم</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">تعداد</label>
        <input type="number" className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none" placeholder="تعداد..." />
      </div>
    </div>
  </div>
);

const PvcForm = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-bold text-gray-800">💳 فرم سفارش کارت PVC</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">نوع کارت</label>
        <select className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none">
          <option>کارت ویزیت</option>
          <option>کارت شناسایی</option>
          <option>کارت عضویت</option>
          <option>کارت تخفیف</option>
          <option>کارت عبور</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">ضخامت</label>
        <select className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none">
          <option>۰.۳ میلیمتر</option>
          <option>۰.۵ میلیمتر</option>
          <option>۰.۷ میلیمتر</option>
          <option>۱ میلیمتر</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">تعداد</label>
        <input type="number" className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none" placeholder="تعداد..." />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">ویژگی‌ها</label>
        <div className="flex flex-wrap gap-2">
          <label className="flex items-center gap-1 text-sm"><input type="checkbox" /> لمینت</label>
          <label className="flex items-center gap-1 text-sm"><input type="checkbox" /> هولوگرام</label>
          <label className="flex items-center gap-1 text-sm"><input type="checkbox" /> برجسته</label>
          <label className="flex items-center gap-1 text-sm"><input type="checkbox" /> نوار مغناطیسی</label>
        </div>
      </div>
    </div>
  </div>
);

const GiftForm = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-bold text-gray-800">🎁 فرم سفارش هدایای تبلیغاتی</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">نوع هدیه</label>
        <select className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none">
          <option>خودکار</option>
          <option>لیوان</option>
          <option>تقویم</option>
          <option>کیف</option>
          <option>کی‌چین</option>
          <option>دفترچه</option>
          <option>یادداشت</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">جنس</label>
        <select className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none">
          <option>پلاستیک</option>
          <option>چوب</option>
          <option>فلز</option>
          <option>چرم</option>
          <option>شیشه</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">رنگ</label>
        <select className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none">
          <option>سفارشی</option>
          <option>مشکی</option>
          <option>سفید</option>
          <option>قرمز</option>
          <option>آبی</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">تعداد</label>
        <input type="number" className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none" placeholder="تعداد..." />
      </div>
    </div>
  </div>
);

const DiamondForm = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-bold text-gray-800">💎 فرم سفارش نقش الماس</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">نوع محصول</label>
        <select className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none">
          <option>تندیس</option>
          <option>حکاکی</option>
          <option>مدال</option>
          <option>جایزه</option>
          <option>پلاک</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">جنس</label>
        <select className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none">
          <option>کریستال</option>
          <option>چوب</option>
          <option>فلز</option>
          <option>شیشه</option>
          <option>سنگ</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">ابعاد</label>
        <input type="text" className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none" placeholder="طول × عرض × ارتفاع" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">تعداد</label>
        <input type="number" className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none" placeholder="تعداد..." />
      </div>
    </div>
  </div>
);

// ============ کامپوننت اصلی ============
export function PrintOrder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    company: "",
    email: "",
  });
  const [cart, setCart] = useState([]);

  const projectTypes = [
    { id: 1, title: "چاپ", icon: "📄", desc: "بروشور، کاتالوگ، مجله...", color: "blue", component: PrintForm },
    { id: 2, title: "پرچم", icon: "🏁", desc: "سفارشی، تبلیغاتی، مناسبتی...", color: "red", component: FlagForm },
    { id: 3, title: "سازه‌های نمایشگاهی", icon: "🏗️", desc: "استند، بک‌دراپ، میز...", color: "orange", component: ExhibitionForm },
    { id: 4, title: "کارت PVC", icon: "💳", desc: "کارت ویزیت، شناسایی...", color: "purple", component: PvcForm },
    { id: 5, title: "هدایای تبلیغاتی", icon: "🎁", desc: "خودکار، لیوان، تقویم...", color: "pink", component: GiftForm },
    { id: 6, title: "نقش الماس", icon: "💎", desc: "تندیس، حکاکی، جایزه...", color: "teal", component: DiamondForm },
  ];

  const handleCustomerChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const handleAddToCart = () => {
    if (selectedProject) {
      const newProject = {
        id: Date.now(),
        type: selectedProject.title,
        icon: selectedProject.icon,
        customer: customerInfo,
        status: "در انتظار تایید",
        date: new Date().toLocaleDateString("fa-IR"),
      };
      setCart([...cart, newProject]);
      setSelectedProject(null);
      setCurrentStep(0);
      alert("✅ پروژه به سبد خرید اضافه شد!");
    }
  };

  const handleRemoveFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleFinalSubmit = () => {
    if (cart.length === 0) {
      alert("❌ سبد خرید خالی است!");
      return;
    }
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push({
      customer: customerInfo,
      projects: cart,
      total: cart.length,
      timestamp: new Date().toLocaleString("fa-IR"),
      orderNumber: `CH-${Date.now().toString().slice(-6)}`,
    });
    localStorage.setItem("orders", JSON.stringify(orders));
    setCart([]);
    setCustomerInfo({ name: "", phone: "", company: "", email: "" });
    alert(`✅ سفارش شما با شماره ${orders[orders.length - 1]?.orderNumber || "CH-000000"} ثبت شد!`);
  };

  // ============ مرحله ۱: اطلاعات مشتری ============
  const renderCustomerStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">👤 اطلاعات مشتری</h2>
        <p className="text-gray-500">لطفاً اطلاعات خود را وارد کنید</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">نام و نام خانوادگی *</label>
          <input
            type="text"
            name="name"
            value={customerInfo.name}
            onChange={handleCustomerChange}
            className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-all"
            placeholder="نام کامل..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">شماره تماس *</label>
          <input
            type="tel"
            name="phone"
            value={customerInfo.phone}
            onChange={handleCustomerChange}
            className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-all"
            placeholder="۰۹۱۲..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ایمیل</label>
          <input
            type="email"
            name="email"
            value={customerInfo.email}
            onChange={handleCustomerChange}
            className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-all"
            placeholder="example@mail.com"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">نام شرکت / سازمان</label>
          <input
            type="text"
            name="company"
            value={customerInfo.company}
            onChange={handleCustomerChange}
            className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-all"
            placeholder="نام شرکت..."
          />
        </div>
      </div>
    </div>
  );

  // ============ مرحله ۲: انتخاب پروژه ============
  const renderProjectSelection = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">🎯 انتخاب نوع پروژه</h2>
        <p className="text-gray-500">نوع پروژه مورد نظر خود را انتخاب کنید</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projectTypes.map((project) => (
          <div
            key={project.id}
            className={`bg-white border-4 rounded-2xl p-6 cursor-pointer transition-all hover:scale-105 hover:shadow-2xl ${
              selectedProject?.id === project.id
                ? `border-${project.color}-500 shadow-lg shadow-${project.color}-500/30`
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => setSelectedProject(project)}
          >
            <div className="text-5xl text-center">{project.icon}</div>
            <h3 className="text-lg font-bold text-center mt-3 text-gray-800">{project.title}</h3>
            <p className="text-sm text-gray-500 text-center">{project.desc}</p>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="mt-6 p-6 bg-blue-50 rounded-2xl border-2 border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">
              {selectedProject.icon} فرم {selectedProject.title}
            </h3>
            <button
              onClick={() => setSelectedProject(null)}
              className="text-sm text-red-500 hover:text-red-700"
            >
              ✕ انصراف
            </button>
          </div>
          <selectedProject.component />
          <button
            onClick={handleAddToCart}
            className="mt-4 w-full py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all flex items-center justify-center gap-2"
          >
            <PlusIcon className="w-5 h-5" />
            اضافه به سبد خرید
          </button>
        </div>
      )}
    </div>
  );

  // ============ مرحله ۳: سبد خرید ============
  const renderCart = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">🛒 سبد خرید</h2>
        <p className="text-gray-500">{cart.length} پروژه در سبد خرید شماست</p>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-7xl mb-4">🛒</div>
          <h3 className="text-xl font-bold text-gray-600">سبد خرید خالی است</h3>
          <p className="text-gray-400">پروژه‌های خود را اضافه کنید</p>
        </div>
      ) : (
        <div className="space-y-3">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white p-4 rounded-2xl border-2 border-gray-200 hover:border-blue-300 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">{item.icon}</div>
                <div>
                  <h4 className="font-bold text-gray-800">{item.type}</h4>
                  <p className="text-sm text-gray-500">{item.customer.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  {item.status}
                </span>
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-xl transition-all"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={handleFinalSubmit}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-3 mt-6"
          >
            <ShoppingCartIcon className="w-6 h-6" />
            ثبت نهایی سفارش ({cart.length} پروژه)
          </button>
        </div>
      )}

      {cart.length > 0 && (
        <button
          onClick={() => setCurrentStep(1)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center justify-center gap-2"
        >
          <PlusIcon className="w-4 h-4" />
          اضافه کردن پروژه جدید
        </button>
      )}
    </div>
  );

  // ============ رندر ============
  const renderStep = () => {
    switch (currentStep) {
      case 0: return renderCustomerStep();
      case 1: return renderProjectSelection();
      case 2: return renderCart();
      default: return null;
    }
  };

  return (
    <div dir="rtl" className="p-6 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* ===== هدر ===== */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">📋 ثبت سفارش جدید</h1>
              <p className="text-gray-500 text-sm mt-1">
                مرحله {currentStep + 1} از ۳
                {currentStep === 0 && " - اطلاعات مشتری"}
                {currentStep === 1 && " - انتخاب پروژه"}
                {currentStep === 2 && ` - سبد خرید (${cart.length})`}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">پیشرفت</span>
              <div className="w-40 bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${((currentStep + 1) / 3) * 100}%` }}
                />
              </div>
              <span className="text-sm font-bold text-blue-600">
                {Math.round(((currentStep + 1) / 3) * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* ===== محتوای اصلی ===== */}
        <div className="bg-white rounded-3xl shadow-xl p-8 min-h-[500px]">
          {renderStep()}
        </div>

        {/* ===== دکمه‌های ناوبری ===== */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className={`px-6 py-3 rounded-2xl font-bold transition-all flex items-center gap-2 ${
              currentStep === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105"
            }`}
          >
            <ChevronRightIcon className="w-5 h-5" />
            قبلی
          </button>

          {currentStep === 2 ? (
            <button
              onClick={() => {}}
              className="px-6 py-3 bg-green-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
            >
              <ShoppingCartIcon className="w-5 h-5" />
              ثبت نهایی
            </button>
          ) : (
            <button
              onClick={() => setCurrentStep(Math.min(2, currentStep + 1))}
              disabled={(currentStep === 0 && !customerInfo.name) || (currentStep === 1 && !selectedProject)}
              className={`px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2 ${
                ((currentStep === 0 && !customerInfo.name) || (currentStep === 1 && !selectedProject))
                  ? "opacity-50 cursor-not-allowed hover:scale-100"
                  : ""
              }`}
            >
              بعدی
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PrintOrder;