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
  MagnifyingGlassIcon,
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
          order.customerName?.includes(searchTerm) ||
          order.orderNumber?.includes(searchTerm) ||
          order.phone?.includes(searchTerm)
      );
      setFilteredOrders(filtered);
    }
  }, [searchTerm, orders]);

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
          <div class="print-container">
            <div class="header">
              <h1>📋 برگه سفارش چاپ</h1>
              <div class="sub">چاپخانه هوشمند</div>
            </div>
            <div class="order-info">
              <div>📅 تاریخ: <span>${new Date().toLocaleDateString("fa-IR")}</span></div>
              <div>🔢 شماره سفارش: <span>${order.orderNumber}</span></div>
            </div>
            <div class="section">
              <div class="section-title">👤 اطلاعات مشتری</div>
              <div class="grid-2">
                <div class="item"><span class="label">نام مشتری</span><span class="value">${order.customerName || "-"}</span></div>
                <div class="item"><span class="label">شماره تماس</span><span class="value">${order.phone || "-"}</span></div>
                <div class="item"><span class="label">نام پروژه</span><span class="value">${order.projectName || "-"}</span></div>
                <div class="item"><span class="label">تاریخ تحویل</span><span class="value">${order.deliveryDate || "-"}</span></div>
              </div>
            </div>
            <div class="section">
              <div class="section-title">📄 مشخصات کاغذ</div>
              <div class="grid-2">
                <div class="item"><span class="label">نوع کاغذ</span><span class="value">${order.paperType || "-"}</span></div>
                <div class="item"><span class="label">گرماژ</span><span class="value">${order.paperGram || "-"} گرم</span></div>
                <div class="item"><span class="label">اندازه</span><span class="value">${order.paperSize || "-"}</span></div>
                <div class="item"><span class="label">برند</span><span class="value">${order.paperBrand || "-"}</span></div>
                <div class="item"><span class="label">رنگ</span><span class="value">${order.paperColor || "-"}</span></div>
                <div class="item"><span class="label">تعداد</span><span class="value">${order.paperCount || "-"}</span></div>
              </div>
            </div>
            <div class="section">
              <div class="section-title">🖨️ مشخصات زینک</div>
              <div class="grid-2">
                <div class="item"><span class="label">نوع زینک</span><span class="value">${order.zincType || "-"}</span></div>
                <div class="item"><span class="label">تعداد</span><span class="value">${order.zincCount || "-"} عدد</span></div>
                <div class="item"><span class="label">اندازه</span><span class="value">${order.zincSize || "-"}</span></div>
              </div>
            </div>
            <div class="section">
              <div class="section-title">🎨 مشخصات چاپ</div>
              <div class="grid-2">
                <div class="item"><span class="label">نوع چاپ</span><span class="value">${order.printType || "-"}</span></div>
                <div class="item"><span class="label">تعداد رنگ</span><span class="value">${order.printColors || "-"}</span></div>
                <div class="item"><span class="label">دستگاه</span><span class="value">${order.printMachine || "-"}</span></div>
                <div class="item"><span class="label">روی کاغذ</span><span class="value">${order.printSide || "-"}</span></div>
              </div>
            </div>
            <div class="section">
              <div class="section-title">✨ خدمات تکمیلی</div>
              <div class="grid-2">
                <div class="item"><span class="label">سلفون</span><span class="${order.hasCellophane ? 'value' : 'empty'}">${order.hasCellophane ? order.cellophane + (order.cellophaneSide ? ' (' + order.cellophaneSide + ')' : '') : '❌ ندارد'}</span></div>
                <div class="item"><span class="label">یووی</span><span class="${order.hasUV ? 'value' : 'empty'}">${order.hasUV ? order.uv + (order.uvIntensity ? ' (' + order.uvIntensity + ')' : '') : '❌ ندارد'}</span></div>
                <div class="item"><span class="label">طلاکوب</span><span class="${order.hasGold ? 'value' : 'empty'}">${order.hasGold ? order.goldStamping + (order.goldColor ? ' (' + order.goldColor + ')' : '') : '❌ ندارد'}</span></div>
                <div class="item"><span class="label">قالب</span><span class="${order.hasMold ? 'value' : 'empty'}">${order.hasMold ? order.mold + (order.moldCount ? ' (' + order.moldCount + ' عدد)' : '') : '❌ ندارد'}</span></div>
                <div class="item"><span class="label">صحافی</span><span class="${order.hasBinding ? 'value' : 'empty'}">${order.hasBinding ? order.binding + (order.bindingCover ? ' - ' + order.bindingCover : '') : '❌ ندارد'}</span></div>
                <div class="item"><span class="label">بگ/پاکت</span><span class="${order.hasBag ? 'value' : 'empty'}">${order.hasBag ? order.bagType + (order.bagSize ? ' (' + order.bagSize + ')' : '') : '❌ ندارد'}</span></div>
              </div>
            </div>
            ${order.description ? `<div class="section"><div class="section-title">📝 توضیحات</div><div style="background:#f9fafb;padding:10px 15px;border-radius:8px;font-size:13px;border:1px solid #e5e7eb;">${order.description}</div></div>` : ''}
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
      {/* ===== کارت اصلی ===== */}
      <Card className="shadow-xl rounded-2xl overflow-hidden">
        {/* ===== هدر ===== */}
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none px-6 py-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-100"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <Typography variant="h5" className="text-gray-800 font-bold flex items-center gap-2">
                📋 لیست سفارشات چاپ
                <Chip
                  color="blue"
                  value={`${filteredOrders.length} سفارش`}
                  className="text-xs mr-2"
                />
              </Typography>
              <Typography color="gray" className="mt-1 text-sm">
                {orders.length > 0
                  ? `آخرین سفارش: ${orders[0]?.timestamp || "نامشخص"}`
                  : "هنوز سفارشی ثبت نشده است"}
              </Typography>
            </div>

            <div className="flex items-center gap-3">
              {/* جستجو */}
              <div className="relative">
                <MagnifyingGlassIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="جستجو..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 pl-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none bg-white/80 backdrop-blur-sm text-sm w-48 md:w-60 transition-all"
                />
              </div>

              <Link to="/dashboard/print-order">
                <Button
                  color="blue"
                  className="flex items-center gap-2 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl transition-all"
                >
                  <span className="text-lg">+</span>
                  سفارش جدید
                </Button>
              </Link>

              <IconButton
                variant="text"
                color="gray"
                onClick={loadOrders}
                className="rounded-xl hover:bg-blue-50"
              >
                <ArrowPathIcon className="w-5 h-5" />
              </IconButton>
            </div>
          </div>
        </CardHeader>

        {/* ===== بدنه ===== */}
        <CardBody className="p-6">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-7xl mb-4">📭</div>
              <Typography variant="h6" color="gray" className="mb-2">
                {searchTerm ? "نتیجه‌ای یافت نشد" : "هیچ سفارشی ثبت نشده است"}
              </Typography>
              <Typography color="gray" className="text-sm mb-6">
                {searchTerm
                  ? "با عبارت دیگری جستجو کنید"
                  : "اولین سفارش خود را ثبت کنید"}
              </Typography>
              {!searchTerm && (
                <Link to="/dashboard/print-order">
                  <Button
                    color="blue"
                    className="rounded-xl shadow-lg shadow-blue-500/30"
                  >
                    ثبت اولین سفارش 🚀
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredOrders.map((order, index) => {
                const originalIndex = orders.findIndex(
                  (o) => o.orderNumber === order.orderNumber && o.timestamp === order.timestamp
                );
                return (
                  <div
                    key={index}
                    className="group bg-white rounded-2xl border-2 border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    {/* هدر کارت */}
                    <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <Typography variant="h6" className="text-gray-800 font-bold">
                            {order.customerName || "نامشخص"}
                          </Typography>
                          <Typography variant="small" className="text-gray-500 flex items-center gap-1 mt-0.5">
                            📱 {order.phone || "-"}
                          </Typography>
                        </div>
                        <Chip
                          color={order.hasCellophane || order.hasUV || order.hasGold ? "purple" : "green"}
                          value={order.orderNumber || "CH-000000"}
                          className="text-xs font-bold"
                        />
                      </div>
                    </div>

                    {/* محتوای کارت */}
                    <div className="p-4 space-y-2">
                      <div className="grid grid-cols-2 gap-1 text-sm">
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <span>📄</span>
                          <span>{order.paperType || "-"}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <span>⚖️</span>
                          <span>{order.paperGram || "-"} گرم</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <span>🎨</span>
                          <span>{order.printType || "-"}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <span>🌈</span>
                          <span>{order.printColors || "-"}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-xs text-gray-400 pt-1 border-t border-gray-100">
                        <span>📅</span>
                        <span>{order.deliveryDate || "تاریخ تحویل نامشخص"}</span>
                        {order.timestamp && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-gray-300 mx-1.5"></span>
                            <span>ثبت: {order.timestamp}</span>
                          </>
                        )}
                      </div>

                      {/* نشانگر خدمات ویژه */}
                      {(order.hasCellophane || order.hasUV || order.hasGold || order.hasMold || order.hasBinding || order.hasBag) && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {order.hasCellophane && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">✨ سلفون</span>
                          )}
                          {order.hasUV && (
                            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">☀️ یووی</span>
                          )}
                          {order.hasGold && (
                            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">🌟 طلاکوب</span>
                          )}
                          {order.hasMold && (
                            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">🔧 قالب</span>
                          )}
                          {order.hasBinding && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">📚 صحافی</span>
                          )}
                          {order.hasBag && (
                            <span className="text-xs bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full">🛍️ بگ</span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* دکمه‌های اقدام */}
                    <div className="p-3 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center">
                      <div className="flex gap-1.5">
                        <Button
                          size="sm"
                          variant="text"
                          color="blue"
                          className="rounded-xl flex items-center gap-1.5 text-xs hover:bg-blue-50"
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
                          className="rounded-xl flex items-center gap-1.5 text-xs hover:bg-green-50"
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
        <DialogHeader className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-2xl">
          <div className="flex items-center justify-between w-full">
            <Typography variant="h5" className="font-bold text-gray-800">
              📋 جزئیات سفارش
            </Typography>
            <Chip
              color="blue"
              value={selectedOrder?.orderNumber || "CH-000000"}
              className="text-xs"
            />
          </div>
        </DialogHeader>
        <DialogBody className="p-6">
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-xl">
                  <p className="text-xs text-gray-400">👤 مشتری</p>
                  <p className="font-semibold">{selectedOrder.customerName || "-"}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl">
                  <p className="text-xs text-gray-400">📱 تماس</p>
                  <p className="font-semibold">{selectedOrder.phone || "-"}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl">
                  <p className="text-xs text-gray-400">📝 پروژه</p>
                  <p className="font-semibold">{selectedOrder.projectName || "-"}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl">
                  <p className="text-xs text-gray-400">📅 تحویل</p>
                  <p className="font-semibold">{selectedOrder.deliveryDate || "-"}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <Typography variant="h6" className="text-sm font-bold text-gray-700 mb-3">
                  📄 مشخصات کاغذ
                </Typography>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div><span className="text-gray-400">نوع:</span> {selectedOrder.paperType || "-"}</div>
                  <div><span className="text-gray-400">گرماژ:</span> {selectedOrder.paperGram || "-"} گرم</div>
                  <div><span className="text-gray-400">اندازه:</span> {selectedOrder.paperSize || "-"}</div>
                  <div><span className="text-gray-400">برند:</span> {selectedOrder.paperBrand || "-"}</div>
                  <div><span className="text-gray-400">رنگ:</span> {selectedOrder.paperColor || "-"}</div>
                  <div><span className="text-gray-400">تعداد:</span> {selectedOrder.paperCount || "-"}</div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <Typography variant="h6" className="text-sm font-bold text-gray-700 mb-3">
                  🖨️ چاپ و زینک
                </Typography>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div><span className="text-gray-400">چاپ:</span> {selectedOrder.printType || "-"}</div>
                  <div><span className="text-gray-400">رنگ:</span> {selectedOrder.printColors || "-"}</div>
                  <div><span className="text-gray-400">دستگاه:</span> {selectedOrder.printMachine || "-"}</div>
                  <div><span className="text-gray-400">زینک:</span> {selectedOrder.zincType || "-"}</div>
                  <div><span className="text-gray-400">تعداد زینک:</span> {selectedOrder.zincCount || "-"} عدد</div>
                  <div><span className="text-gray-400">اندازه زینک:</span> {selectedOrder.zincSize || "-"}</div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <Typography variant="h6" className="text-sm font-bold text-gray-700 mb-3">
                  ✨ خدمات تکمیلی
                </Typography>
                <div className="flex flex-wrap gap-2">
                  <Chip color="blue" value={`سلفون: ${selectedOrder.hasCellophane ? selectedOrder.cellophane || 'دارد' : 'ندارد'}`} className="text-xs" />
                  <Chip color="yellow" value={`یووی: ${selectedOrder.hasUV ? selectedOrder.uv || 'دارد' : 'ندارد'}`} className="text-xs" />
                  <Chip color="orange" value={`طلاکوب: ${selectedOrder.hasGold ? selectedOrder.goldStamping || 'دارد' : 'ندارد'}`} className="text-xs" />
                  <Chip color="purple" value={`قالب: ${selectedOrder.hasMold ? selectedOrder.mold || 'دارد' : 'ندارد'}`} className="text-xs" />
                  <Chip color="green" value={`صحافی: ${selectedOrder.hasBinding ? selectedOrder.binding || 'دارد' : 'ندارد'}`} className="text-xs" />
                  <Chip color="pink" value={`بگ/پاکت: ${selectedOrder.hasBag ? selectedOrder.bagType || 'دارد' : 'ندارد'}`} className="text-xs" />
                </div>
              </div>

              {selectedOrder.description && (
                <div className="border-t border-gray-200 pt-4">
                  <Typography variant="h6" className="text-sm font-bold text-gray-700 mb-2">
                    📝 توضیحات
                  </Typography>
                  <div className="bg-gray-50 p-3 rounded-xl text-sm">
                    {selectedOrder.description}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogBody>
        <DialogFooter className="border-t border-gray-100 flex gap-2">
          <Button
            variant="outlined"
            color="gray"
            onClick={() => setOpenDetail(false)}
            className="rounded-xl"
          >
            بستن
          </Button>
          {selectedOrder && (
            <Button
              color="green"
              onClick={() => handlePrint(selectedOrder)}
              className="rounded-xl flex items-center gap-2"
            >
              <PrinterIcon className="w-4 h-4" />
              چاپ
            </Button>
          )}
        </DialogFooter>
      </Dialog>

      {/* ===== Dialog حذف ===== */}
      <Dialog
        open={openDelete}
        handler={() => setOpenDelete(false)}
        className="rounded-2xl max-w-md"
      >
        <DialogHeader className="border-b border-gray-100">
          <Typography variant="h5" className="font-bold text-red-600">
            ⚠️ حذف سفارش
          </Typography>
        </DialogHeader>
        <DialogBody>
          <Typography className="text-gray-700 text-center py-4">
            آیا از حذف این سفارش اطمینان دارید؟
            <br />
            <span className="text-sm text-gray-400">این عمل قابل بازگشت نیست</span>
          </Typography>
        </DialogBody>
        <DialogFooter className="border-t border-gray-100 flex gap-2">
          <Button
            variant="outlined"
            color="gray"
            onClick={() => setOpenDelete(false)}
            className="rounded-xl"
          >
            انصراف
          </Button>
          <Button
            color="red"
            onClick={() => handleDelete(deleteIndex)}
            className="rounded-xl flex items-center gap-2"
          >
            <TrashIcon className="w-4 h-4" />
            حذف
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default OrdersList;