import React, { useState, useRef } from "react";
import { PrinterIcon, ChevronLeftIcon, ChevronRightIcon, CheckIcon } from "@heroicons/react/24/outline";

export function PrintOrder() {
  const [currentStep, setCurrentStep] = useState(0);
  const printRef = useRef(null);

  const [orderData, setOrderData] = useState({
    customerName: "",
    phone: "",
    projectName: "",
    deliveryDate: "",
    orderNumber: `CH-${Date.now().toString().slice(-6)}`,
    paperType: "",
    paperGram: "",
    paperSize: "",
    paperBrand: "",
    paperColor: "",
    paperCount: "",
    zincType: "",
    zincCount: "",
    zincSize: "",
    printType: "",
    printColors: "",
    printMachine: "",
    printSide: "",
    hasCellophane: false,
    cellophane: "",
    cellophaneSide: "",
    hasUV: false,
    uv: "",
    uvIntensity: "",
    hasGold: false,
    goldStamping: "",
    goldColor: "",
    hasMold: false,
    mold: "",
    moldCount: "",
    hasBinding: false,
    binding: "",
    bindingCover: "",
    hasBag: false,
    bagType: "",
    bagSize: "",
    description: "",
  });

  const steps = [
    { id: 0, title: "مشتری", icon: "👤", desc: "اطلاعات اولیه" },
    { id: 1, title: "کاغذ", icon: "📄", desc: "نوع و مشخصات" },
    { id: 2, title: "زینک", icon: "🖨️", desc: "تجهیزات چاپ" },
    { id: 3, title: "چاپ", icon: "🎨", desc: "رنگ و روش" },
    { id: 4, title: "تکمیلی", icon: "✨", desc: "خدمات ویژه" },
    { id: 5, title: "نهایی", icon: "✅", desc: "تایید و چاپ" },
  ];

  const isStepComplete = (stepId) => {
    switch (stepId) {
      case 0: return orderData.customerName && orderData.phone;
      case 1: return orderData.paperType && orderData.paperGram && orderData.paperSize;
      case 2: return orderData.zincType && orderData.zincCount;
      case 3: return orderData.printType && orderData.printColors;
      case 4: return true;
      case 5: return true;
      default: return false;
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setOrderData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setOrderData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const goToStep = (index) => {
    if (index <= currentStep + 1 && isStepComplete(index - 1)) {
      setCurrentStep(index);
    }
  };

  const handlePrint = () => {
    const printContent = printRef.current.innerHTML;
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html dir="rtl">
        <head>
          <title>سفارش چاپ - ${orderData.orderNumber}</title>
          <style>
            @page { size: A4; margin: 0; }
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Vazir', 'Tahoma', sans-serif; background: #fff; padding: 20px; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
            .print-container { width: 210mm; min-height: 297mm; padding: 15mm 12mm; background: white; }
            .header { text-align: center; border-bottom: 3px double #1a56db; padding-bottom: 15px; margin-bottom: 20px; }
            .header h1 { font-size: 24px; color: #1a56db; margin-bottom: 5px; }
            .header .sub { font-size: 14px; color: #666; }
            .order-info { display: flex; justify-content: space-between; background: #f0f4ff; padding: 10px 15px; border-radius: 8px; margin-bottom: 20px; font-size: 13px; }
            .order-info span { font-weight: bold; color: #1a56db; }
            .section { margin-bottom: 18px; }
            .section-title { font-size: 15px; font-weight: bold; color: #1a56db; border-right: 4px solid #1a56db; padding-right: 10px; margin-bottom: 8px; }
            .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 20px; }
            .item { display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px dashed #eee; font-size: 13px; }
            .item .label { color: #555; font-weight: 500; }
            .item .value { color: #222; font-weight: 600; }
            .item .empty { color: #aaa; font-weight: 400; }
            .footer { margin-top: 25px; padding-top: 15px; border-top: 2px solid #1a56db; display: flex; justify-content: space-between; font-size: 12px; color: #666; }
            @media print { body { padding: 0; } .print-container { width: 100%; min-height: 100vh; padding: 15mm 12mm; } }
          </style>
        </head>
        <body>
          <div class="print-container">${printContent}</div>
          <script>window.onload = function() { window.print(); window.close(); };</script>
        </body>
      </html>
    `);
    printWindow.document.close();

    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push({ ...orderData, timestamp: new Date().toLocaleString("fa-IR") });
    localStorage.setItem("orders", JSON.stringify(orders));
  };

  const getPrintableContent = () => `
    <div class="header">
      <h1>📋 برگه سفارش چاپ</h1>
      <div class="sub">چاپخانه هوشمند</div>
    </div>
    <div class="order-info">
      <div>📅 تاریخ: <span>${new Date().toLocaleDateString("fa-IR")}</span></div>
      <div>🔢 شماره سفارش: <span>${orderData.orderNumber}</span></div>
    </div>
    <div class="section">
      <div class="section-title">👤 اطلاعات مشتری</div>
      <div class="grid-2">
        <div class="item"><span class="label">نام مشتری</span><span class="value">${orderData.customerName || "-"}</span></div>
        <div class="item"><span class="label">شماره تماس</span><span class="value">${orderData.phone || "-"}</span></div>
        <div class="item"><span class="label">نام پروژه</span><span class="value">${orderData.projectName || "-"}</span></div>
        <div class="item"><span class="label">تاریخ تحویل</span><span class="value">${orderData.deliveryDate || "-"}</span></div>
      </div>
    </div>
    <div class="section">
      <div class="section-title">📄 مشخصات کاغذ</div>
      <div class="grid-2">
        <div class="item"><span class="label">نوع کاغذ</span><span class="value">${orderData.paperType || "-"}</span></div>
        <div class="item"><span class="label">گرماژ</span><span class="value">${orderData.paperGram || "-"} گرم</span></div>
        <div class="item"><span class="label">اندازه</span><span class="value">${orderData.paperSize || "-"}</span></div>
        <div class="item"><span class="label">برند</span><span class="value">${orderData.paperBrand || "-"}</span></div>
        <div class="item"><span class="label">رنگ</span><span class="value">${orderData.paperColor || "-"}</span></div>
        <div class="item"><span class="label">تعداد</span><span class="value">${orderData.paperCount || "-"}</span></div>
      </div>
    </div>
    <div class="section">
      <div class="section-title">🖨️ مشخصات زینک</div>
      <div class="grid-2">
        <div class="item"><span class="label">نوع زینک</span><span class="value">${orderData.zincType || "-"}</span></div>
        <div class="item"><span class="label">تعداد</span><span class="value">${orderData.zincCount || "-"} عدد</span></div>
        <div class="item"><span class="label">اندازه</span><span class="value">${orderData.zincSize || "-"}</span></div>
      </div>
    </div>
    <div class="section">
      <div class="section-title">🎨 مشخصات چاپ</div>
      <div class="grid-2">
        <div class="item"><span class="label">نوع چاپ</span><span class="value">${orderData.printType || "-"}</span></div>
        <div class="item"><span class="label">تعداد رنگ</span><span class="value">${orderData.printColors || "-"}</span></div>
        <div class="item"><span class="label">دستگاه</span><span class="value">${orderData.printMachine || "-"}</span></div>
        <div class="item"><span class="label">روی کاغذ</span><span class="value">${orderData.printSide || "-"}</span></div>
      </div>
    </div>
    <div class="section">
      <div class="section-title">✨ خدمات تکمیلی</div>
      <div class="grid-2">
        <div class="item"><span class="label">سلفون</span><span class="${orderData.hasCellophane ? 'value' : 'empty'}">${orderData.hasCellophane ? orderData.cellophane + (orderData.cellophaneSide ? ' (' + orderData.cellophaneSide + ')' : '') : '❌ ندارد'}</span></div>
        <div class="item"><span class="label">یووی</span><span class="${orderData.hasUV ? 'value' : 'empty'}">${orderData.hasUV ? orderData.uv + (orderData.uvIntensity ? ' (' + orderData.uvIntensity + ')' : '') : '❌ ندارد'}</span></div>
        <div class="item"><span class="label">طلاکوب</span><span class="${orderData.hasGold ? 'value' : 'empty'}">${orderData.hasGold ? orderData.goldStamping + (orderData.goldColor ? ' (' + orderData.goldColor + ')' : '') : '❌ ندارد'}</span></div>
        <div class="item"><span class="label">قالب</span><span class="${orderData.hasMold ? 'value' : 'empty'}">${orderData.hasMold ? orderData.mold + (orderData.moldCount ? ' (' + orderData.moldCount + ' عدد)' : '') : '❌ ندارد'}</span></div>
        <div class="item"><span class="label">صحافی</span><span class="${orderData.hasBinding ? 'value' : 'empty'}">${orderData.hasBinding ? orderData.binding + (orderData.bindingCover ? ' - ' + orderData.bindingCover : '') : '❌ ندارد'}</span></div>
        <div class="item"><span class="label">بگ/پاکت</span><span class="${orderData.hasBag ? 'value' : 'empty'}">${orderData.hasBag ? orderData.bagType + (orderData.bagSize ? ' (' + orderData.bagSize + ')' : '') : '❌ ندارد'}</span></div>
      </div>
    </div>
    ${orderData.description ? `<div class="section"><div class="section-title">📝 توضیحات</div><div style="background:#f9fafb;padding:10px 15px;border-radius:8px;font-size:13px;border:1px solid #e5e7eb;">${orderData.description}</div></div>` : ''}
    <div class="footer">
      <div>امضا مشتری: ....................</div>
      <div>امضا کارشناس: ....................</div>
      <div>چاپخانه هوشمند © ${new Date().getFullYear()}</div>
    </div>
  `;

  // ============ رندر هر مرحله با طراحی جدید ============
  const renderStep = () => {
    switch (currentStep) {
      case 0: return renderCustomer();
      case 1: return renderPaper();
      case 2: return renderZinc();
      case 3: return renderPrint();
      case 4: return renderFinishing();
      case 5: return renderFinal();
      default: return null;
    }
  };

  // ============ مرحله ۱: مشتری ============
  const renderCustomer = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            👤 نام مشتری <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="customerName"
            value={orderData.customerName}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:bg-white focus:outline-none transition-all text-lg"
            placeholder="نام و نام خانوادگی را وارد کنید..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📱 شماره تماس <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={orderData.phone}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:bg-white focus:outline-none transition-all text-lg"
            placeholder="۰۹۱۲xxx..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📅 تاریخ تحویل
          </label>
          <input
            type="date"
            name="deliveryDate"
            value={orderData.deliveryDate}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:bg-white focus:outline-none transition-all text-lg"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📝 نام پروژه
          </label>
          <input
            type="text"
            name="projectName"
            value={orderData.projectName}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:bg-white focus:outline-none transition-all text-lg"
            placeholder="نام پروژه (مثل: بروشور شرکت)..."
          />
        </div>
      </div>
    </div>
  );

  // ============ مرحله ۲: کاغذ ============
  const renderPaper = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📄 نوع کاغذ <span className="text-red-500">*</span>
          </label>
          <select
            name="paperType"
            value={orderData.paperType}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-all text-lg"
          >
            <option value="">انتخاب کنید...</option>
            <option value="گلاسه براق">✨ گلاسه براق</option>
            <option value="گلاسه مات">🌸 گلاسه مات</option>
            <option value="کرافت">🌿 کرافت</option>
            <option value="تحریر">📝 تحریر</option>
            <option value="مقوایی">📦 مقوایی</option>
            <option value="لمینت">💎 لمینت</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ⚖️ گرماژ <span className="text-red-500">*</span>
          </label>
          <select
            name="paperGram"
            value={orderData.paperGram}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-all text-lg"
          >
            <option value="">انتخاب کنید...</option>
            <option value="70">۷۰ گرم</option>
            <option value="80">۸۰ گرم</option>
            <option value="100">۱۰۰ گرم</option>
            <option value="120">۱۲۰ گرم</option>
            <option value="150">۱۵۰ گرم</option>
            <option value="200">۲۰۰ گرم</option>
            <option value="250">۲۵۰ گرم</option>
            <option value="300">۳۰۰ گرم</option>
            <option value="350">۳۵۰ گرم</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📏 اندازه <span className="text-red-500">*</span>
          </label>
          <select
            name="paperSize"
            value={orderData.paperSize}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-all text-lg"
          >
            <option value="">انتخاب کنید...</option>
            <option value="A4">A4 (۲۱×۲۹.۷)</option>
            <option value="A3">A3 (۲۹.۷×۴۲)</option>
            <option value="A5">A5 (۱۴.۸×۲۱)</option>
            <option value="B5">B5 (۱۷.۶×۲۵)</option>
            <option value="رقعی">رقعی (۱۴×۲۱)</option>
            <option value="وزیری">وزیری (۱۶.۵×۲۳.۵)</option>
            <option value="خشتی">خشتی (۲۰×۲۰)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            🏷️ برند کاغذ
          </label>
          <select
            name="paperBrand"
            value={orderData.paperBrand}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-all text-lg"
          >
            <option value="">انتخاب کنید...</option>
            <option value="آریا">آریا</option>
            <option value="پارس">پارس</option>
            <option value="سینا">سینا</option>
            <option value="آذربایجان">آذربایجان</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            🎨 رنگ کاغذ
          </label>
          <select
            name="paperColor"
            value={orderData.paperColor}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-all text-lg"
          >
            <option value="">انتخاب کنید...</option>
            <option value="سفید">⬜ سفید</option>
            <option value="کرم">🟨 کرم</option>
            <option value="رنگی">🎨 رنگی</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            🔢 تعداد برگ
          </label>
          <input
            type="number"
            name="paperCount"
            value={orderData.paperCount}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:bg-white focus:outline-none transition-all text-lg"
            placeholder="تعداد..."
          />
        </div>
      </div>
    </div>
  );

  // ============ مرحله ۳: زینک ============
  const renderZinc = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            🖨️ نوع زینک <span className="text-red-500">*</span>
          </label>
          <select
            name="zincType"
            value={orderData.zincType}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl focus:border-purple-500 focus:outline-none transition-all text-lg"
          >
            <option value="">انتخاب کنید...</option>
            <option value="CTP معمولی">CTP معمولی</option>
            <option value="CTP رزولوشن بالا">⭐ CTP رزولوشن بالا</option>
            <option value="فیلم">🎞️ فیلم</option>
            <option value="دیجیتال">💻 دیجیتال</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            🔢 تعداد زینک <span className="text-red-500">*</span>
          </label>
          <select
            name="zincCount"
            value={orderData.zincCount}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl focus:border-purple-500 focus:outline-none transition-all text-lg"
          >
            <option value="">انتخاب کنید...</option>
            <option value="1">۱ (تک رنگ)</option>
            <option value="2">۲ (دو رنگ)</option>
            <option value="3">۳ (سه رنگ)</option>
            <option value="4">۴ (چهار رنگ)</option>
            <option value="5">۵ (چهار رنگ + ۱ پنتون)</option>
            <option value="6">۶ (چهار رنگ + ۲ پنتون)</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📐 اندازه زینک
          </label>
          <select
            name="zincSize"
            value={orderData.zincSize}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl focus:border-purple-500 focus:outline-none transition-all text-lg"
          >
            <option value="">انتخاب کنید...</option>
            <option value="۵۰×۷۰">۵۰ × ۷۰ سانتی‌متر</option>
            <option value="۷۰×۱۰۰">۷۰ × ۱۰۰ سانتی‌متر</option>
            <option value="سفارشی">📏 سفارشی</option>
          </select>
        </div>
      </div>
    </div>
  );

  // ============ مرحله ۴: چاپ ============
  const renderPrint = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            🎨 نوع چاپ <span className="text-red-500">*</span>
          </label>
          <select
            name="printType"
            value={orderData.printType}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-2xl focus:border-amber-500 focus:outline-none transition-all text-lg"
          >
            <option value="">انتخاب کنید...</option>
            <option value="افست">افست (تیراژ بالا)</option>
            <option value="دیجیتال">دیجیتال (تیراژ پایین)</option>
            <option value="فلکسو">فلکسو (بسته‌بندی)</option>
            <option value="گراور">گراور (مجلات)</option>
            <option value="اسکرین">اسکرین (روی پارچه)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            🌈 تعداد رنگ <span className="text-red-500">*</span>
          </label>
          <select
            name="printColors"
            value={orderData.printColors}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-2xl focus:border-amber-500 focus:outline-none transition-all text-lg"
          >
            <option value="">انتخاب کنید...</option>
            <option value="تک رنگ">⚫ تک رنگ (سیاه)</option>
            <option value="دو رنگ">🔵 دو رنگ</option>
            <option value="سه رنگ">🔴 سه رنگ</option>
            <option value="چهار رنگ">🌈 چهار رنگ (CMYK)</option>
            <option value="پنتون">🎨 پنتون (رنگ مخصوص)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ⚙️ دستگاه چاپ
          </label>
          <select
            name="printMachine"
            value={orderData.printMachine}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-2xl focus:border-amber-500 focus:outline-none transition-all text-lg"
          >
            <option value="">انتخاب کنید...</option>
            <option value="هایدلبرگ">🇩🇪 هایدلبرگ</option>
            <option value="مان رولند">🇩🇪 مان رولند</option>
            <option value="کموری">🇯🇵 کموری</option>
            <option value="HP Indigo">💻 HP Indigo</option>
            <option value="کونیکا">🇯🇵 کونیکا</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📄 روی کاغذ
          </label>
          <select
            name="printSide"
            value={orderData.printSide}
            onChange={handleChange}
            className="w-full px-5 py-4 bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-2xl focus:border-amber-500 focus:outline-none transition-all text-lg"
          >
            <option value="">انتخاب کنید...</option>
            <option value="یک رو">یک رو</option>
            <option value="دو رو">دو رو</option>
          </select>
        </div>
      </div>
    </div>
  );

  // ============ مرحله ۵: تکمیلی ============
  const renderFinishing = () => (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 p-5 rounded-2xl border-2 border-blue-200 hover:border-blue-400 transition-all">
        <label className="flex items-center gap-3 text-base font-semibold text-gray-800 cursor-pointer">
          <input
            type="checkbox"
            name="hasCellophane"
            checked={orderData.hasCellophane}
            onChange={handleChange}
            className="w-5 h-5 accent-blue-600 rounded-lg"
          />
          <span>✨ سلفون</span>
        </label>
        {orderData.hasCellophane && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pr-10">
            <select
              name="cellophane"
              value={orderData.cellophane}
              onChange={handleChange}
              className="px-4 py-3 bg-white border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:outline-none"
            >
              <option value="">نوع سلفون...</option>
              <option value="سلفون مات">🌸 مات (مخملی)</option>
              <option value="سلفون براق">✨ براق (درخشان)</option>
              <option value="سلفون نیمه مات">🌙 نیمه مات</option>
              <option value="سلفون ضد خش">🛡️ ضد خش</option>
            </select>
            <select
              name="cellophaneSide"
              value={orderData.cellophaneSide}
              onChange={handleChange}
              className="px-4 py-3 bg-white border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:outline-none"
            >
              <option value="">سمت سلفون...</option>
              <option value="رو">روی کار</option>
              <option value="زیر">زیر کار</option>
              <option value="دو رو">دو رو</option>
            </select>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-r from-yellow-50/80 to-amber-50/80 p-5 rounded-2xl border-2 border-yellow-200 hover:border-yellow-400 transition-all">
        <label className="flex items-center gap-3 text-base font-semibold text-gray-800 cursor-pointer">
          <input
            type="checkbox"
            name="hasUV"
            checked={orderData.hasUV}
            onChange={handleChange}
            className="w-5 h-5 accent-yellow-600 rounded-lg"
          />
          <span>☀️ یووی (UV)</span>
        </label>
        {orderData.hasUV && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pr-10">
            <select
              name="uv"
              value={orderData.uv}
              onChange={handleChange}
              className="px-4 py-3 bg-white border-2 border-yellow-200 rounded-xl focus:border-yellow-500 focus:outline-none"
            >
              <option value="">نوع یووی...</option>
              <option value="یووی موضعی">🎯 موضعی (نقاط خاص)</option>
              <option value="یووی تمام صفحه">📄 تمام صفحه</option>
              <option value="یووی برجسته">🔮 برجسته</option>
            </select>
            <select
              name="uvIntensity"
              value={orderData.uvIntensity}
              onChange={handleChange}
              className="px-4 py-3 bg-white border-2 border-yellow-200 rounded-xl focus:border-yellow-500 focus:outline-none"
            >
              <option value="">شدت یووی...</option>
              <option value="کم">🌫️ کم (مات)</option>
              <option value="متوسط">🌤️ متوسط</option>
              <option value="زیاد">☀️ زیاد (براق)</option>
            </select>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-r from-orange-50/80 to-amber-50/80 p-5 rounded-2xl border-2 border-orange-200 hover:border-orange-400 transition-all">
        <label className="flex items-center gap-3 text-base font-semibold text-gray-800 cursor-pointer">
          <input
            type="checkbox"
            name="hasGold"
            checked={orderData.hasGold}
            onChange={handleChange}
            className="w-5 h-5 accent-orange-600 rounded-lg"
          />
          <span>🌟 طلاکوب</span>
        </label>
        {orderData.hasGold && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pr-10">
            <select
              name="goldStamping"
              value={orderData.goldStamping}
              onChange={handleChange}
              className="px-4 py-3 bg-white border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:outline-none"
            >
              <option value="">نوع طلاکوب...</option>
              <option value="طلاکوب طلایی">✨ طلایی</option>
              <option value="طلاکوب نقره‌ای">⚪ نقره‌ای</option>
              <option value="طلاکوب مسی">🟠 مسی</option>
              <option value="طلاکوب رنگی">🎨 رنگی</option>
              <option value="طلاکوب هولوگرام">🌈 هولوگرام</option>
            </select>
            <select
              name="goldColor"
              value={orderData.goldColor}
              onChange={handleChange}
              className="px-4 py-3 bg-white border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:outline-none"
            >
              <option value="">رنگ طلاکوب...</option>
              <option value="طلایی">✨ طلایی</option>
              <option value="نقره‌ای">⚪ نقره‌ای</option>
              <option value="قرمز">🔴 قرمز</option>
              <option value="آبی">🔵 آبی</option>
              <option value="سبز">🟢 سبز</option>
            </select>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-r from-purple-50/80 to-violet-50/80 p-5 rounded-2xl border-2 border-purple-200 hover:border-purple-400 transition-all">
        <label className="flex items-center gap-3 text-base font-semibold text-gray-800 cursor-pointer">
          <input
            type="checkbox"
            name="hasMold"
            checked={orderData.hasMold}
            onChange={handleChange}
            className="w-5 h-5 accent-purple-600 rounded-lg"
          />
          <span>🔧 قالب</span>
        </label>
        {orderData.hasMold && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pr-10">
            <select
              name="mold"
              value={orderData.mold}
              onChange={handleChange}
              className="px-4 py-3 bg-white border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none"
            >
              <option value="">نوع قالب...</option>
              <option value="قالب برش">✂️ برش کامل</option>
              <option value="قالب نیم‌برش">✂️ نیمه برش</option>
              <option value="قالب کشش">📐 کشش</option>
              <option value="قالب پرفراژ">⭕ پرفراژ</option>
            </select>
            <select
              name="moldCount"
              value={orderData.moldCount}
              onChange={handleChange}
              className="px-4 py-3 bg-white border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none"
            >
              <option value="">تعداد قالب...</option>
              <option value="1">۱ عدد</option>
              <option value="2">۲ عدد</option>
              <option value="3">۳ عدد</option>
            </select>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-r from-green-50/80 to-emerald-50/80 p-5 rounded-2xl border-2 border-green-200 hover:border-green-400 transition-all">
        <label className="flex items-center gap-3 text-base font-semibold text-gray-800 cursor-pointer">
          <input
            type="checkbox"
            name="hasBinding"
            checked={orderData.hasBinding}
            onChange={handleChange}
            className="w-5 h-5 accent-green-600 rounded-lg"
          />
          <span>📚 صحافی</span>
        </label>
        {orderData.hasBinding && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pr-10">
            <select
              name="binding"
              value={orderData.binding}
              onChange={handleChange}
              className="px-4 py-3 bg-white border-2 border-green-200 rounded-xl focus:border-green-500 focus:outline-none"
            >
              <option value="">نوع صحافی...</option>
              <option value="سیمی">🔗 سیمی</option>
              <option value="چسب گرم">🔥 چسب گرم</option>
              <option value="مفتولی">📎 مفتولی</option>
              <option value="دوخت">🧵 دوخت</option>
              <option value="رینگی">⭕ رینگی</option>
              <option value="جیبی">👔 جیبی</option>
            </select>
            <select
              name="bindingCover"
              value={orderData.bindingCover}
              onChange={handleChange}
              className="px-4 py-3 bg-white border-2 border-green-200 rounded-xl focus:border-green-500 focus:outline-none"
            >
              <option value="">نوع جلد...</option>
              <option value="شومیز">📄 شومیز</option>
              <option value="گالینگور">📕 گالینگور</option>
              <option value="بی جلد">📑 بی جلد</option>
            </select>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-r from-pink-50/80 to-rose-50/80 p-5 rounded-2xl border-2 border-pink-200 hover:border-pink-400 transition-all">
        <label className="flex items-center gap-3 text-base font-semibold text-gray-800 cursor-pointer">
          <input
            type="checkbox"
            name="hasBag"
            checked={orderData.hasBag}
            onChange={handleChange}
            className="w-5 h-5 accent-pink-600 rounded-lg"
          />
          <span>🛍️ بگ و پاکت</span>
        </label>
        {orderData.hasBag && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pr-10">
            <select
              name="bagType"
              value={orderData.bagType}
              onChange={handleChange}
              className="px-4 py-3 bg-white border-2 border-pink-200 rounded-xl focus:border-pink-500 focus:outline-none"
            >
              <option value="">نوع...</option>
              <option value="کیسه کاغذی">🛍️ کیسه کاغذی</option>
              <option value="پاکت">✉️ پاکت</option>
              <option value="بگ پلاستیکی">🛒 بگ پلاستیکی</option>
              <option value="کیسه پارچه‌ای">🧵 کیسه پارچه‌ای</option>
            </select>
            <select
              name="bagSize"
              value={orderData.bagSize}
              onChange={handleChange}
              className="px-4 py-3 bg-white border-2 border-pink-200 rounded-xl focus:border-pink-500 focus:outline-none"
            >
              <option value="">اندازه...</option>
              <option value="کوچک">📏 کوچک</option>
              <option value="متوسط">📐 متوسط</option>
              <option value="بزرگ">📏 بزرگ</option>
              <option value="سفارشی">✏️ سفارشی</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );

  // ============ مرحله ۶: نهایی ============
  const renderFinal = () => (
    <div className="space-y-6">
      <div className="flex justify-center">
        <button
          onClick={handlePrint}
          className="px-12 py-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xl font-bold rounded-2xl shadow-2xl hover:shadow-xl hover:scale-105 transition-all flex items-center gap-3"
        >
          <PrinterIcon className="w-7 h-7" />
          چاپ برگه سفارش (A4)
        </button>
      </div>
      <p className="text-center text-gray-500">با کلیک روی دکمه، برگه سفارش در اندازه A4 چاپ می‌شود</p>
      <div style={{ display: "none" }}><div ref={printRef} dangerouslySetInnerHTML={{ __html: getPrintableContent() }} /></div>
      <div className="border-2 border-gray-200 rounded-2xl p-6 bg-gray-50 max-h-[400px] overflow-y-auto">
        <div className="text-sm text-gray-400 mb-3">⬇️ پیش‌نمایش برگه چاپ</div>
        <div className="bg-white p-6 rounded-xl shadow-inner" style={{ fontFamily: "'Vazir', 'Tahoma', sans-serif" }} dangerouslySetInnerHTML={{ __html: getPrintableContent() }} />
      </div>
    </div>
  );

  // ============ رندر اصلی ============
  return (
    <div dir="rtl" className="p-6 h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto h-full flex flex-col gap-6">
        {/* هدر */}
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">📋 ثبت سفارش چاپ</h1>
              <p className="text-gray-500 text-sm mt-1">مرحله {currentStep + 1} از {steps.length} - {steps[currentStep].desc}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">پیشرفت</span>
              <div className="w-40 bg-gray-200 rounded-full h-2.5">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }} />
              </div>
              <span className="text-sm font-bold text-blue-600">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
            </div>
          </div>
        </div>

        {/* محتوای اصلی */}
        <div className="flex-1 flex gap-6 min-h-0">
          {/* سایدبار مراحل */}
          <div className="w-64 bg-white rounded-3xl shadow-lg p-4 flex-shrink-0">
            <div className="space-y-1">
              {steps.map((step, index) => {
                const isActive = currentStep === index;
                const isCompleted = isStepComplete(index);
                const isAccessible = index <= currentStep + 1;

                return (
                  <button
                    key={step.id}
                    onClick={() => isAccessible && setCurrentStep(index)}
                    disabled={!isAccessible}
                    className={`w-full text-right p-3 rounded-2xl transition-all flex items-center gap-3 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105"
                        : isCompleted
                        ? "bg-green-50 text-green-800 border-2 border-green-200"
                        : isAccessible
                        ? "hover:bg-gray-50 text-gray-600"
                        : "opacity-40 cursor-not-allowed text-gray-400"
                    }`}
                  >
                    <span className="text-2xl">{step.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{step.title}</div>
                      <div className={`text-xs ${isActive ? "text-white/80" : "text-gray-400"}`}>{step.desc}</div>
                    </div>
                    {isCompleted && <CheckIcon className="w-5 h-5 text-green-500" />}
                    {isActive && <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* محتوای مرحله */}
          <div className="flex-1 bg-white rounded-3xl shadow-lg p-8 overflow-y-auto">
            {renderStep()}
          </div>
        </div>

        {/* دکمه‌های ناوبری */}
        <div className="bg-white rounded-3xl shadow-lg p-4 flex justify-between items-center">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`px-8 py-3 rounded-2xl font-bold transition-all flex items-center gap-2 ${
              currentStep === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105"
            }`}
          >
            <ChevronRightIcon className="w-5 h-5" />
            قبلی
          </button>

          {currentStep === steps.length - 1 ? (
            <button
              onClick={handlePrint}
              className="px-10 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
            >
              <PrinterIcon className="w-5 h-5" />
              چاپ و ذخیره
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="px-10 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
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