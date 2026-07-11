import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import {
  EyeIcon,
  PrinterIcon,
  TrashIcon,
  ArrowPathIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [expandedOrders, setExpandedOrders] = useState({});

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(savedOrders.reverse());
    setFilteredOrders(savedOrders.reverse());
  };

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(
        (order) =>
          order.customer?.name?.includes(searchTerm) ||
          order.orderNumber?.includes(searchTerm) ||
          order.customer?.phone?.includes(searchTerm)
      );
      setFilteredOrders(filtered);
    }
  }, [searchTerm, orders]);

  const toggleExpand = (index) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleDelete = (index) => {
    const newOrders = [...orders];
    newOrders.splice(index, 1);
    setOrders(newOrders);
    localStorage.setItem("orders", JSON.stringify(newOrders));
    setFilteredOrders(newOrders);
    setOpenDelete(false);
  };

  const handlePrint = (order) => {
    const printContent = `
      <html dir="rtl">
        <head>
          <title>سفارش چاپ - ${order.orderNumber}</title>
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
            .footer { margin-top: 25px; padding-top: 15px; border-top: 2px solid #1a56db; display: flex; justify-content: space-between; font-size: 12px; color: #666; }
            .project-item { padding: 8px 12px; background: #f9fafb; border-radius: 8px; margin-bottom: 6px; border: 1px solid #e5e7eb; }
            .project-item strong { color: #1a56db; }
            @media print { body { padding: 0; } .print-container { width: 100%; min-height: 100vh; padding: 15mm 12mm; } }
          </style>
        </head>
        <body>
          <div class="print-container">
            <div class="header">
              <h1>📋 برگه سفارش چاپ</h1>
              <div class="sub">چاپخانه هوشمند</div>
            </div>
            <div class="order-info">
              <div>📅 تاریخ: <span>${order.timestamp || new Date().toLocaleDateString("fa-IR")}</span></div>
              <div>🔢 شماره سفارش: <span>${order.orderNumber}</span></div>
              <div>📦 تعداد پروژه: <span>${order.projects?.length || 0}</span></div>
            </div>
            <div class="section">
              <div class="section-title">👤 اطلاعات مشتری</div>
              <div class="grid-2">
                <div class="item"><span class="label">نام مشتری</span><span class="value">${order.customer?.name || "-"}</span></div>
                <div class="item"><span class="label">شماره تماس</span><span class="value">${order.customer?.phone || "-"}</span></div>
                <div class="item"><span class="label">ایمیل</span><span class="value">${order.customer?.email || "-"}</span></div>
                <div class="item"><span class="label">شرکت</span><span class="value">${order.customer?.company || "-"}</span></div>
              </div>
            </div>
            <div class="section">
              <div class="section-title">🛒 پروژه‌های سفارش</div>
              ${order.projects?.map((p, i) => `
                <div class="project-item">
                  <div><strong>${i + 1}.</strong> ${p.icon} ${p.product} - ${p.category}</div>
                  <div style="font-size:12px;color:#666;margin-top:4px;">
                    ${Object.entries(p.details).map(([key, val]) => val ? `${key}: ${val}` : "").filter(Boolean).join(" | ")}
                  </div>
                  <div style="font-size:11px;color:#999;margin-top:4px;">
                    وضعیت: ${p.status || "در انتظار تایید"} | تاریخ: ${p.date || "-"}
                  </div>
                </div>
              `).join("") || "<div>هیچ پروژه‌ای ثبت نشده</div>"}
            </div>
            <div class="footer">
              <div>امضا مشتری: ....................</div>
              <div>امضا کارشناس: ....................</div>
              <div>چاپخانه هوشمند © ${new Date().getFullYear()}</div>
            </div>
          </div>
          <script>window.onload = function() { window.print(); };</script>
        </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(printContent);
    printWindow.document.close();
  };

  return (
    <div dir="rtl" className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <Card className="shadow-xl rounded-2xl overflow-hidden">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none px-6 py-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-100"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <Typography variant="h5" className="text-gray-800 font-bold flex items-center gap-2 text-xl">
                📋 لیست سفارشات
                <Chip color="blue" value={`${filteredOrders.length} سفارش`} className="text-xs" />
              </Typography>
              <Typography color="gray" className="mt-1 text-sm">
                {orders.length > 0
                  ? `آخرین سفارش: ${orders[0]?.timestamp || "نامشخص"}`
                  : "هنوز سفارشی ثبت نشده است"}
              </Typography>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <input
                type="text"
                placeholder="🔍 جستجو..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-sm w-48 md:w-60 transition-all"
              />
              <Link to="/dashboard/print-order">
                <Button color="blue" className="flex items-center gap-2 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl transition-all px-5 py-2.5 text-sm">
                  <span className="text-lg">+</span>
                  سفارش جدید
                </Button>
              </Link>
              <IconButton variant="text" color="gray" onClick={loadOrders} className="rounded-xl hover:bg-blue-50 p-2.5">
                <ArrowPathIcon className="w-5 h-5" />
              </IconButton>
            </div>
          </div>
        </CardHeader>

        <CardBody className="p-6">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-7xl mb-4">📭</div>
              <Typography variant="h6" color="gray" className="mb-2">
                {searchTerm ? "نتیجه‌ای یافت نشد" : "هیچ سفارشی ثبت نشده است"}
              </Typography>
              <Typography color="gray" className="text-sm mb-6">
                {searchTerm ? "با عبارت دیگری جستجو کنید" : "اولین سفارش خود را ثبت کنید"}
              </Typography>
              {!searchTerm && (
                <Link to="/dashboard/print-order">
                  <Button color="blue" className="rounded-xl shadow-lg shadow-blue-500/30 px-6 py-3">
                    ثبت اولین سفارش 🚀
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order, index) => {
                const originalIndex = orders.findIndex(
                  (o) => o.orderNumber === order.orderNumber && o.timestamp === order.timestamp
                );
                const isExpanded = expandedOrders[index];

                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl border-2 border-gray-200 hover:border-blue-300 transition-all shadow-sm hover:shadow-md overflow-hidden"
                  >
                    {/* هدر سفارش */}
                    <div className="p-5 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xl shadow-lg shadow-blue-500/30">
                            {order.customer?.name?.charAt(0) || "👤"}
                          </div>
                          <div>
                            <Typography variant="h6" className="text-gray-800 font-bold">
                              {order.customer?.name || "نامشخص"}
                            </Typography>
                            <div className="flex flex-wrap gap-3 text-sm text-gray-500 mt-0.5">
                              <span>📱 {order.customer?.phone || "-"}</span>
                              <span>📧 {order.customer?.email || "-"}</span>
                              <span>🏢 {order.customer?.company || "-"}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <Chip color="blue" value={`📦 ${order.projects?.length || 0} پروژه`} className="text-sm" />
                          <Chip color="green" value={order.orderNumber || "CH-000000"} className="text-sm font-bold" />
                          <span className="text-xs text-gray-400">{order.timestamp || "تاریخ نامشخص"}</span>
                        </div>
                      </div>
                    </div>

                    {/* لیست پروژه‌ها */}
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <Typography className="font-semibold text-gray-700 text-sm">
                          🛒 پروژه‌های سفارش
                        </Typography>
                        {order.projects?.length > 3 && (
                          <button
                            onClick={() => toggleExpand(index)}
                            className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
                          >
                            {isExpanded ? "بستن" : "مشاهده همه"}
                            {isExpanded ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />}
                          </button>
                        )}
                      </div>

                      <div className="space-y-2">
                        {(isExpanded ? order.projects : order.projects?.slice(0, 3))?.map((project, pIndex) => (
                          <div
                            key={pIndex}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-all"
                          >
                            <div className="flex items-center gap-3">
                              <div className="text-2xl">{project.icon}</div>
                              <div>
                                <Typography className="font-semibold text-gray-800 text-sm">
                                  {project.product} - {project.category}
                                </Typography>
                                <Typography className="text-xs text-gray-500">
                                  👤 {project.customer?.name || "نامشخص"} | 📅 {project.date || "-"}
                                </Typography>
                              </div>
                            </div>
                            <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                              ✅ {project.status || "در انتظار تایید"}
                            </span>
                          </div>
                        ))}

                        {order.projects?.length > 3 && !isExpanded && (
                          <div className="text-center text-sm text-gray-400 py-2">
                            + {order.projects.length - 3} پروژه دیگر
                          </div>
                        )}
                      </div>
                    </div>

                    {/* دکمه‌های اقدام */}
                    <div className="p-4 bg-gray-50/70 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex gap-2 flex-wrap">
                        <Button
                          size="sm"
                          variant="text"
                          color="blue"
                          className="rounded-xl flex items-center gap-2 hover:bg-blue-50 text-sm"
                          onClick={() => {
                            setSelectedOrder(order);
                            setOpenDetail(true);
                          }}
                        >
                          <EyeIcon className="w-4 h-4" />
                          جزئیات
                        </Button>
                        <Button
                          size="sm"
                          variant="text"
                          color="green"
                          className="rounded-xl flex items-center gap-2 hover:bg-green-50 text-sm"
                          onClick={() => handlePrint(order)}
                        >
                          <PrinterIcon className="w-4 h-4" />
                          چاپ
                        </Button>
                      </div>
                      <IconButton
                        size="sm"
                        variant="text"
                        color="red"
                        className="rounded-xl hover:bg-red-50"
                        onClick={() => {
                          setDeleteIndex(originalIndex >= 0 ? originalIndex : index);
                          setOpenDelete(true);
                        }}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </IconButton>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardBody>
      </Card>

      {/* ===== Dialog جزئیات ===== */}
      <Dialog
        size="lg"
        open={openDetail}
        handler={() => setOpenDetail(false)}
        className="rounded-2xl max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-2xl p-5">
          <div className="flex items-center justify-between w-full flex-wrap gap-3">
            <Typography variant="h5" className="font-bold text-gray-800 text-lg">
              📋 جزئیات سفارش
            </Typography>
            <div className="flex items-center gap-3">
              <Chip color="blue" value={selectedOrder?.orderNumber || "CH-000000"} className="text-sm" />
              <Chip color="green" value={`${selectedOrder?.projects?.length || 0} پروژه`} className="text-sm" />
            </div>
          </div>
        </DialogHeader>
        <DialogBody className="p-6">
          {selectedOrder && (
            <div className="space-y-5">
              {/* اطلاعات مشتری */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-xs text-gray-400">👤 مشتری</p>
                  <p className="font-semibold">{selectedOrder.customer?.name || "-"}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-xs text-gray-400">📱 تماس</p>
                  <p className="font-semibold">{selectedOrder.customer?.phone || "-"}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-xs text-gray-400">📧 ایمیل</p>
                  <p className="font-semibold">{selectedOrder.customer?.email || "-"}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-xs text-gray-400">🏢 شرکت</p>
                  <p className="font-semibold">{selectedOrder.customer?.company || "-"}</p>
                </div>
              </div>

              {/* لیست پروژه‌ها */}
              <div className="border-t border-gray-200 pt-4">
                <Typography variant="h6" className="text-base font-bold text-gray-700 mb-3">
                  🛒 پروژه‌های سفارش ({selectedOrder.projects?.length || 0})
                </Typography>
                <div className="space-y-2">
                  {selectedOrder.projects?.map((project, pIndex) => (
                    <div key={pIndex} className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">{project.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="font-bold text-gray-800">{project.product}</span>
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{project.category}</span>
                            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">#{pIndex + 1}</span>
                          </div>
                          <div className="flex flex-wrap gap-3 text-xs text-gray-500 mt-0.5">
                            <span>👤 {project.customer?.name || "-"}</span>
                            <span>📱 {project.customer?.phone || "-"}</span>
                            <span>📅 {project.date || "-"}</span>
                            <span className="text-green-600">✅ {project.status || "در انتظار تایید"}</span>
                          </div>
                          {/* نمایش جزئیات */}
                          {project.details && Object.keys(project.details).length > 0 && (
                            <div className="mt-2 pt-2 border-t border-gray-200">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                                {Object.entries(project.details).map(([key, value]) => (
                                  value && (
                                    <div key={key} className="bg-white p-2 rounded-lg">
                                      <span className="text-gray-400">{key}:</span>
                                      <span className="font-medium mr-1">{value}</span>
                                    </div>
                                  )
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* تاریخ ثبت */}
              <div className="border-t border-gray-200 pt-3 text-xs text-gray-400">
                📅 تاریخ ثبت: {selectedOrder.timestamp || "نامشخص"}
              </div>
            </div>
          )}
        </DialogBody>
        <DialogFooter className="border-t border-gray-100 p-5 flex gap-3 flex-wrap">
          <Button variant="outlined" color="gray" onClick={() => setOpenDetail(false)} className="rounded-xl">
            بستن
          </Button>
          {selectedOrder && (
            <Button color="green" onClick={() => handlePrint(selectedOrder)} className="rounded-xl flex items-center gap-2">
              <PrinterIcon className="w-4 h-4" />
              چاپ
            </Button>
          )}
        </DialogFooter>
      </Dialog>

      {/* ===== Dialog حذف ===== */}
      <Dialog open={openDelete} handler={() => setOpenDelete(false)} className="rounded-2xl max-w-md">
        <DialogHeader className="border-b border-gray-100 p-5">
          <Typography variant="h5" className="font-bold text-red-600">⚠️ حذف سفارش</Typography>
        </DialogHeader>
        <DialogBody className="p-5">
          <Typography className="text-gray-700 text-center py-4">
            آیا از حذف این سفارش اطمینان دارید؟
            <br />
            <span className="text-sm text-gray-400">این عمل قابل بازگشت نیست</span>
          </Typography>
        </DialogBody>
        <DialogFooter className="border-t border-gray-100 p-5 flex gap-3">
          <Button variant="outlined" color="gray" onClick={() => setOpenDelete(false)} className="rounded-xl">
            انصراف
          </Button>
          <Button color="red" onClick={() => handleDelete(deleteIndex)} className="rounded-xl flex items-center gap-2">
            <TrashIcon className="w-4 h-4" />
            حذف
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default OrdersList;