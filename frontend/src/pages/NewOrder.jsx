import React, { useState, useRef } from "react";
import { products } from "../data/products";
import { FlagForm } from "./forms/FlagForm";
import { PaperForm } from "./forms/PaperForm";
import { PvcForm } from "./forms/PvcForm";
import { ExhibitionForm } from "./forms/ExhibitionForm";
import { GiftForm } from "./forms/GiftForm";
import { PrinterIcon } from "@heroicons/react/24/outline";

const formComponents = {
  flag: FlagForm,
  paper: PaperForm,
  pvc: PvcForm,
  exhibition: ExhibitionForm,
  gift: GiftForm,
};

export function NewOrder() {
  const [step, setStep] = useState(1);
  const [customer, setCustomer] = useState({ name: "", phone: "", company: "", email: "" });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [formData, setFormData] = useState({});
  const [cart, setCart] = useState([]);
  const printRef = useRef(null);

  const addToCart = () => {
    if (!selectedProduct || !selectedCategory) {
      alert("❌ لطفاً ابتدا محصول و زیرمجموعه را انتخاب کنید");
      return;
    }

    // اگر زیرمجموعه "سایر" هست و کاربر چیزی وارد نکرده
    if (selectedCategory === "سایر" && !customCategory.trim()) {
      alert("❌ لطفاً نام محصول مورد نظر را وارد کنید");
      return;
    }

    const hasData = Object.values(formData).some(val => val !== "");
    if (!hasData) {
      alert("❌ لطفاً فرم را پر کنید");
      return;
    }

    const finalCategory = selectedCategory === "سایر" ? customCategory : selectedCategory;

    const item = {
      id: Date.now(),
      product: selectedProduct.title,
      icon: selectedProduct.icon,
      category: finalCategory,
      isCustom: selectedCategory === "سایر",
      details: formData,
      customer: { ...customer },
      date: new Date().toLocaleDateString("fa-IR"),
    };
    setCart([...cart, item]);
    setSelectedProduct(null);
    setSelectedCategory("");
    setCustomCategory("");
    setFormData({});
    alert("✅ به سبد خرید اضافه شد!");
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const finalSubmit = () => {
    if (cart.length === 0) {
      alert("❌ سبد خرید خالی است!");
      return;
    }
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push({
      customer,
      projects: cart,
      total: cart.length,
      timestamp: new Date().toLocaleString("fa-IR"),
      orderNumber: `CH-${Date.now().toString().slice(-6)}`,
    });
    localStorage.setItem("orders", JSON.stringify(orders));
    setCart([]);
    setCustomer({ name: "", phone: "", company: "", email: "" });
    alert("✅ سفارش با موفقیت ثبت شد!");
  };

  // ===== تابع پرینت =====
  const handlePrint = () => {
    const printContent = printRef.current.innerHTML;
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html dir="rtl">
        <head>
          <title>برگه سفارش</title>
          <style>
            @page { size: A4; margin: 0; }
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Vazir', 'Tahoma', sans-serif; background: #fff; padding: 20px; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
            .print-container { width: 210mm; min-height: 297mm; padding: 15mm 12mm; background: white; }
            .header { text-align: center; border-bottom: 3px double #1a56db; padding-bottom: 15px; margin-bottom: 20px; }
            .header h1 { font-size: 24px; color: #1a56db; }
            .header .sub { font-size: 14px; color: #666; }
            .order-info { display: flex; justify-content: space-between; background: #f0f4ff; padding: 10px 15px; border-radius: 8px; margin-bottom: 20px; font-size: 13px; }
            .order-info span { font-weight: bold; color: #1a56db; }
            .section { margin-bottom: 18px; }
            .section-title { font-size: 15px; font-weight: bold; color: #1a56db; border-right: 4px solid #1a56db; padding-right: 10px; margin-bottom: 8px; }
            .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 20px; }
            .item { display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px dashed #eee; font-size: 13px; }
            .item .label { color: #555; font-weight: 500; }
            .item .value { color: #222; font-weight: 600; }
            .project-item { padding: 10px 12px; background: #f9fafb; border-radius: 8px; margin-bottom: 8px; border: 1px solid #e5e7eb; }
            .project-item .title { font-weight: bold; color: #1a56db; }
            .footer { margin-top: 25px; padding-top: 15px; border-top: 2px solid #1a56db; display: flex; justify-content: space-between; font-size: 12px; color: #666; }
            @media print { body { padding: 0; } .print-container { width: 100%; min-height: 100vh; padding: 15mm 12mm; } }
          </style>
        </head>
        <body>
          <div class="print-container">${printContent}</div>
          <script>window.onload = function() { window.print(); };</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // ===== محتوای قابل پرینت =====
  const getPrintableContent = () => {
    const orderNumber = `CH-${Date.now().toString().slice(-6)}`;
    return `
      <div class="header">
        <h1>📋 برگه سفارش</h1>
        <div class="sub">چاپخانه هوشمند</div>
      </div>
      <div class="order-info">
        <div>📅 تاریخ: <span>${new Date().toLocaleDateString("fa-IR")}</span></div>
        <div>🔢 شماره سفارش: <span>${orderNumber}</span></div>
        <div>📦 تعداد پروژه: <span>${cart.length}</span></div>
      </div>
      <div class="section">
        <div class="section-title">👤 اطلاعات مشتری</div>
        <div class="grid-2">
          <div class="item"><span class="label">نام مشتری</span><span class="value">${customer.name || "-"}</span></div>
          <div class="item"><span class="label">شماره تماس</span><span class="value">${customer.phone || "-"}</span></div>
          <div class="item"><span class="label">ایمیل</span><span class="value">${customer.email || "-"}</span></div>
          <div class="item"><span class="label">شرکت</span><span class="value">${customer.company || "-"}</span></div>
        </div>
      </div>
      <div class="section">
        <div class="section-title">🛒 لیست پروژه‌ها</div>
        ${cart.map((item, index) => `
          <div class="project-item">
            <div class="title">${index + 1}. ${item.icon} ${item.product} - ${item.category}</div>
            <div style="font-size:12px;color:#666;margin-top:6px;">
              ${Object.entries(item.details)
                .filter(([_, val]) => val)
                .map(([key, val]) => `<div><strong>${key}:</strong> ${val}</div>`)
                .join("")}
            </div>
            <div style="font-size:11px;color:#999;margin-top:4px;">
              وضعیت: در انتظار تایید | تاریخ: ${item.date}
            </div>
          </div>
        `).join("")}
      </div>
      <div class="footer">
        <div>امضا مشتری: ....................</div>
        <div>امضا کارشناس: ....................</div>
        <div>چاپخانه هوشمند © ${new Date().getFullYear()}</div>
      </div>
    `;
  };

  // ===== صفحه ۱: اطلاعات مشتری =====
  const renderCustomer = () => (
    <div>
      <h2 className="text-2xl font-bold text-center mb-6">👤 اطلاعات مشتری</h2>
      <div className="max-w-lg mx-auto space-y-4">
        <input
          type="text"
          placeholder="نام و نام خانوادگی *"
          value={customer.name}
          onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
          className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-sm"
        />
        <input
          type="tel"
          placeholder="شماره تماس *"
          value={customer.phone}
          onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
          className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-sm"
        />
        <input
          type="text"
          placeholder="نام شرکت"
          value={customer.company}
          onChange={(e) => setCustomer({ ...customer, company: e.target.value })}
          className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-sm"
        />
        <input
          type="email"
          placeholder="ایمیل"
          value={customer.email}
          onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
          className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-sm"
        />
      </div>
    </div>
  );

  // ===== صفحه ۲: انتخاب محصول =====
  const renderProductSelection = () => {
    const FormComponent = selectedProduct ? formComponents[selectedProduct.id] : null;

    return (
      <div>
        <h2 className="text-2xl font-bold text-center mb-6">🎯 انتخاب محصول</h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {products.map((product) => (
            <div
              key={product.id}
              className={`border-2 rounded-xl p-4 text-center cursor-pointer transition-all hover:scale-105 hover:shadow-lg ${
                selectedProduct?.id === product.id
                  ? `border-${product.color}-500 shadow-lg shadow-${product.color}-500/20`
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => {
                setSelectedProduct(product);
                setSelectedCategory("");
                setCustomCategory("");
                setFormData({});
              }}
            >
              <div className="text-4xl">{product.icon}</div>
              <h3 className="text-sm font-bold mt-2">{product.title}</h3>
            </div>
          ))}
        </div>

        {selectedProduct && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              زیرمجموعه‌های {selectedProduct.title}:
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedProduct.categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCustomCategory("");
                    setFormData({});
                  }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* اگر زیرمجموعه "سایر" انتخاب شده بود، اینپوت نمایش داده میشه */}
            {selectedCategory === "سایر" && (
              <div className="mt-3">
                <input
                  type="text"
                  placeholder="نام محصول مورد نظر را وارد کنید..."
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  className="w-full max-w-md px-4 py-2.5 bg-white border-2 border-blue-300 rounded-xl focus:border-blue-500 focus:outline-none text-sm"
                />
              </div>
            )}
          </div>
        )}

        {selectedCategory && FormComponent && (
          <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                {selectedProduct.icon} فرم {selectedCategory === "سایر" ? "سفارشی" : selectedCategory}
              </h3>
              <button
                onClick={() => {
                  setSelectedCategory("");
                  setCustomCategory("");
                  setFormData({});
                }}
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                ✕ بستن
              </button>
            </div>
            <FormComponent data={formData} setData={setFormData} />
            <button
              onClick={addToCart}
              className="mt-5 w-full py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all flex items-center justify-center gap-2 text-sm"
            >
              ➕ اضافه به سبد خرید
            </button>
          </div>
        )}
      </div>
    );
  };

  // ===== صفحه ۳: سبد خرید =====
  const renderCart = () => (
    <div>
      <h2 className="text-2xl font-bold text-center mb-6">🛒 سبد خرید</h2>

      {cart.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-7xl mb-4">🛒</div>
          <p className="text-gray-500">سبد خرید خالی است</p>
          <button
            onClick={() => setStep(2)}
            className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            ← بازگشت به انتخاب محصول
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-4 max-h-[400px] overflow-y-auto mb-6 p-1">
            {cart.map((item, index) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl border-2 border-gray-200 shadow-sm hover:border-blue-300 transition-all"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{item.icon}</span>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-gray-800">{item.product}</span>
                        <span className="text-sm text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                          {item.category}
                        </span>
                        {item.isCustom && (
                          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                            سفارشی
                          </span>
                        )}
                        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                          #{index + 1}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        <span>👤 {item.customer.name}</span>
                        <span className="mx-2">|</span>
                        <span>📱 {item.customer.phone}</span>
                        <span className="mx-2">|</span>
                        <span>📅 {item.date}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {Object.entries(item.details)
                          .filter(([_, val]) => val)
                          .map(([key, val]) => (
                            <span key={key} className="text-xs bg-gray-100 px-2 py-1 rounded-lg">
                              <span className="text-gray-500">{key}:</span>
                              <span className="font-medium mr-1">{val}</span>
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-all"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border-2 border-blue-200 gap-4">
            <div>
              <span className="text-gray-700">
                تعداد پروژه‌ها: <strong className="text-blue-600 text-lg">{cart.length}</strong>
              </span>
            </div>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={handlePrint}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
              >
                <PrinterIcon className="w-5 h-5" />
                پرینت
              </button>
              <button
                onClick={finalSubmit}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                ✅ ثبت نهایی
              </button>
            </div>
          </div>
        </>
      )}

      {/* محتوای مخفی برای پرینت */}
      <div style={{ display: "none" }}>
        <div ref={printRef} dangerouslySetInnerHTML={{ __html: getPrintableContent() }} />
      </div>
    </div>
  );

  // ===== ناوبری =====
  const nextStep = () => {
    if (step === 1 && !customer.name) {
      alert("لطفاً نام مشتری را وارد کنید");
      return;
    }
    if (step === 1 && !customer.phone) {
      alert("لطفاً شماره تماس مشتری را وارد کنید");
      return;
    }
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const steps = ["مشتری", "محصول", "سبد خرید"];

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8 bg-white rounded-2xl shadow-sm p-4">
          {steps.map((label, index) => (
            <div key={index} className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step === index + 1
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                    : step > index + 1
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                {step > index + 1 ? "✓" : index + 1}
              </div>
              <span
                className={`text-sm transition-all ${
                  step === index + 1 ? "text-blue-600 font-bold" : "text-gray-500"
                }`}
              >
                {label}
              </span>
              {index < 2 && (
                <div
                  className={`w-10 h-0.5 transition-all ${
                    step > index + 1 ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 min-h-[450px]">
          {step === 1 && renderCustomer()}
          {step === 2 && renderProductSelection()}
          {step === 3 && renderCart()}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              step === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:scale-105"
            }`}
          >
            ← قبلی
          </button>
          {step === 3 ? (
            <button
              onClick={finalSubmit}
              disabled={cart.length === 0}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${
                cart.length === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:shadow-xl hover:scale-105"
              }`}
            >
              ✅ ثبت نهایی
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              بعدی →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewOrder;