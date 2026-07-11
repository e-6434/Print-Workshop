// اول نصب کن
// npm install js-cookie

import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Button,
  IconButton,
  Switch,
  Typography,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setSidenavColor,
  setSidenavType,
  setFixedNavbar,
} from "@/context";
import * as Icons from 'lucide-react';
import Cookies from 'js-cookie';

export function Configurator() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { openConfigurator, sidenavColor, sidenavType, fixedNavbar } = controller;
  const [openAccordion, setOpenAccordion] = useState("1");
  const [saveStatus, setSaveStatus] = useState('');

  // کلید کوکی
  const COOKIE_KEY = 'dashboard_config';
  const COOKIE_EXPIRE = 365; // روز

  // بارگذاری تنظیمات از کوکی هنگام شروع
  useEffect(() => {
    const loadConfigFromCookie = () => {
      try {
        const savedConfig = Cookies.get(COOKIE_KEY);
        if (savedConfig) {
          const config = JSON.parse(savedConfig);
          
          // اعمال تنظیمات ذخیره شده
          if (config.sidenavColor) {
            setSidenavColor(dispatch, config.sidenavColor);
          }
          if (config.sidenavType) {
            setSidenavType(dispatch, config.sidenavType);
          }
          if (config.fixedNavbar !== undefined) {
            setFixedNavbar(dispatch, config.fixedNavbar);
          }
          
          console.log('✅ تنظیمات از کوکی بارگذاری شد:', config);
        }
      } catch (error) {
        console.error('❌ خطا در بارگذاری تنظیمات از کوکی:', error);
      }
    };

    loadConfigFromCookie();
  }, []); // فقط یک بار هنگام mount

  // ذخیره تنظیمات در کوکی هر وقت تغییر کرد
  useEffect(() => {
    const saveConfigToCookie = () => {
      try {
        const config = {
          sidenavColor,
          sidenavType,
          fixedNavbar,
        };
        
        Cookies.set(COOKIE_KEY, JSON.stringify(config), { 
          expires: COOKIE_EXPIRE,
          path: '/',
          sameSite: 'strict'
        });
        
        console.log('✅ تنظیمات در کوکی ذخیره شد:', config);
        setSaveStatus('تنظیمات ذخیره شد ✅');
        setTimeout(() => setSaveStatus(''), 2000);
      } catch (error) {
        console.error('❌ خطا در ذخیره تنظیمات در کوکی:', error);
        setSaveStatus('خطا در ذخیره ❌');
        setTimeout(() => setSaveStatus(''), 2000);
      }
    };

    // اگه مقادیر وجود داشته باشن (برای جلوگیری از ذخیره مقدار اولیه خالی)
    if (sidenavColor && sidenavType) {
      saveConfigToCookie();
    }
  }, [sidenavColor, sidenavType, fixedNavbar]);

  // همیشه منو ثابت باشه
  useEffect(() => {
    if (!fixedNavbar) {
      setFixedNavbar(dispatch, true);
    }
  }, []);

  const sidenavColors = {
    white: "from-gray-100 to-gray-100 border-gray-200",
    dark: "from-gray-800 to-gray-900 border-gray-700",
    green: "from-green-500 to-green-600",
    orange: "from-orange-500 to-orange-600",
    red: "from-red-500 to-red-600",
    pink: "from-pink-500 to-pink-600",
    blue: "from-blue-500 to-blue-600",
    purple: "from-purple-500 to-purple-600",
    indigo: "from-indigo-500 to-indigo-600",
  };

  const handleOpenAccordion = (value) => {
    setOpenAccordion(openAccordion === value ? null : value);
  };

  // بازنشانی به حالت پیش‌فرض
  const handleReset = () => {
    // تنظیم به مقادیر پیش‌فرض
    setSidenavColor(dispatch, 'indigo');
    setSidenavType(dispatch, 'white');
    setFixedNavbar(dispatch, true);
    
    // حذف کوکی
    Cookies.remove(COOKIE_KEY, { path: '/' });
    
    setSaveStatus('تنظیمات به حالت پیش‌فرض بازگشت 🔄');
    setTimeout(() => setSaveStatus(''), 2000);
  };

  // ذخیره دستی (اختیاری)
  const handleManualSave = () => {
    const config = {
      sidenavColor,
      sidenavType,
      fixedNavbar,
    };
    
    Cookies.set(COOKIE_KEY, JSON.stringify(config), { 
      expires: COOKIE_EXPIRE,
      path: '/'
    });
    
    setSaveStatus('تنظیمات با موفقیت ذخیره شد ✅');
    setTimeout(() => setSaveStatus(''), 2000);
  };

  const colors = [
    { name: 'آبی', value: 'blue', class: 'bg-blue-500' },
    { name: 'بنفش', value: 'purple', class: 'bg-purple-500' },
    { name: 'نیلی', value: 'indigo', class: 'bg-indigo-500' },
    { name: 'سبز', value: 'green', class: 'bg-green-500' },
    { name: 'نارنجی', value: 'orange', class: 'bg-orange-500' },
    { name: 'قرمز', value: 'red', class: 'bg-red-500' },
    { name: 'صورتی', value: 'pink', class: 'bg-pink-500' },
    { name: 'سفید', value: 'white', class: 'bg-gray-100 border border-gray-300' },
    { name: 'تیره', value: 'dark', class: 'bg-gray-800' },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-50 h-screen w-80 bg-white shadow-xl transition-transform duration-300 ${
        openConfigurator ? "translate-x-0" : "-translate-x-80"
      }`}
      dir="rtl"
    >
      {/* هدر */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Icons.Settings className="w-5 h-5 text-indigo-600" />
          <Typography variant="h6" color="blue-gray" className="font-bold">
            تنظیمات داشبورد
          </Typography>
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          size="sm"
          onClick={() => setOpenConfigurator(dispatch, false)}
          className="rounded-lg hover:bg-gray-100"
        >
          <XMarkIcon className="h-4 w-4" />
        </IconButton>
      </div>

      {/* محتوا با اسکرول */}
      <div className="h-[calc(100vh-64px)] overflow-y-auto p-4">
        
        {/* وضعیت منو و ذخیره */}
        <div className="mb-4 space-y-2">
          <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <Typography variant="small" className="text-indigo-700 font-medium">
                منو ثابت فعال است
              </Typography>
            </div>
            <Typography variant="small" className="text-indigo-500 text-xs mt-1">
              منو همیشه در بالای صفحه ثابت می‌ماند
            </Typography>
          </div>

          {/* پیام ذخیره */}
          {saveStatus && (
            <div className={`p-2 text-xs rounded-lg text-center border ${
              saveStatus.includes('✅') ? 'bg-green-50 text-green-700 border-green-200' :
              saveStatus.includes('❌') ? 'bg-red-50 text-red-700 border-red-200' :
              'bg-blue-50 text-blue-700 border-blue-200'
            }`}>
              {saveStatus}
            </div>
          )}
        </div>

        {/* آکاردئون رنگ‌ها */}
        <Accordion open={openAccordion === "1"}>
          <AccordionHeader onClick={() => handleOpenAccordion("1")} className="border-b-0 py-2">
            <div className="flex items-center gap-2">
              <Icons.Palette className="w-4 h-4 text-gray-600" />
              <Typography variant="h6" color="blue-gray" className="font-bold text-sm">
                رنگ‌بندی
              </Typography>
            </div>
          </AccordionHeader>
          <AccordionBody className="pt-2 pb-4">
            <Typography variant="small" color="gray" className="mb-3">
              رنگ منوی کناری را انتخاب کنید
            </Typography>
            <div className="grid grid-cols-5 gap-2">
              {colors.map((color) => (
                <div
                  key={color.value}
                  className={`relative cursor-pointer group`}
                  onClick={() => setSidenavColor(dispatch, color.value)}
                >
                  <div
                    className={`w-full h-10 rounded-lg ${color.class} shadow-sm group-hover:shadow-md transition-all ${
                      sidenavColor === color.value ? 'ring-2 ring-offset-2 ring-indigo-600' : ''
                    }`}
                  ></div>
                  <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-gray-500 opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                    {color.name}
                  </span>
                </div>
              ))}
            </div>
          </AccordionBody>
        </Accordion>

        {/* آکاردئون پس‌زمینه */}
        <Accordion open={openAccordion === "2"}>
          <AccordionHeader onClick={() => handleOpenAccordion("2")} className="border-b-0 py-2">
            <div className="flex items-center gap-2">
              <Icons.Image className="w-4 h-4 text-gray-600" />
              <Typography variant="h6" color="blue-gray" className="font-bold text-sm">
                پس‌زمینه
              </Typography>
            </div>
          </AccordionHeader>
          <AccordionBody className="pt-2 pb-4">
            <Typography variant="small" color="gray" className="mb-3">
              نوع پس‌زمینه منو را انتخاب کنید
            </Typography>
            <div className="grid grid-cols-3 gap-2">
              <Button
                size="sm"
                variant={sidenavType === "dark" ? "gradient" : "outlined"}
                onClick={() => setSidenavType(dispatch, "dark")}
                className={`text-xs ${sidenavType === "dark" ? 'bg-gradient-to-r from-gray-800 to-gray-900' : ''}`}
              >
                تاریک
              </Button>
              <Button
                size="sm"
                variant={sidenavType === "transparent" ? "gradient" : "outlined"}
                onClick={() => setSidenavType(dispatch, "transparent")}
                className="text-xs"
              >
                شیشه‌ای
              </Button>
              <Button
                size="sm"
                variant={sidenavType === "white" ? "gradient" : "outlined"}
                onClick={() => setSidenavType(dispatch, "white")}
                className="text-xs"
              >
                سفید
              </Button>
            </div>
          </AccordionBody>
        </Accordion>

        {/* آکاردئون تنظیمات نمایش */}
        <Accordion open={openAccordion === "3"}>
          <AccordionHeader onClick={() => handleOpenAccordion("3")} className="border-b-0 py-2">
            <div className="flex items-center gap-2">
              <Icons.Eye className="w-4 h-4 text-gray-600" />
              <Typography variant="h6" color="blue-gray" className="font-bold text-sm">
                تنظیمات نمایش
              </Typography>
            </div>
          </AccordionHeader>
          <AccordionBody className="pt-2 pb-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icons.Navigation className="w-4 h-4 text-gray-500" />
                  <Typography variant="small" color="gray">
                    منو ثابت
                  </Typography>
                </div>
                <Switch
                  id="navbar-fixed"
                  checked={fixedNavbar}
                  onChange={() => setFixedNavbar(dispatch, !fixedNavbar)}
                  className="opacity-50 pointer-events-none"
                />
              </div>
              <Typography variant="small" className="text-xs text-gray-400 pr-6">
                این گزینه برای تجربه کاربری بهتر همیشه فعال است
              </Typography>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <Icons.Maximize2 className="w-4 h-4 text-gray-500" />
                  <Typography variant="small" color="gray">
                    تمام صفحه
                  </Typography>
                </div>
                <Switch 
                  id="fullscreen" 
                  onChange={(e) => {
                    if (e.target.checked) {
                      document.documentElement.requestFullscreen();
                    } else {
                      document.exitFullscreen();
                    }
                  }}
                />
              </div>
            </div>
          </AccordionBody>
        </Accordion>

        {/* آکاردئون اطلاعات سیستم */}
        <Accordion open={openAccordion === "4"}>
          <AccordionHeader onClick={() => handleOpenAccordion("4")} className="border-b-0 py-2">
            <div className="flex items-center gap-2">
              <Icons.Info className="w-4 h-4 text-gray-600" />
              <Typography variant="h6" color="blue-gray" className="font-bold text-sm">
                اطلاعات سیستم
              </Typography>
            </div>
          </AccordionHeader>
          <AccordionBody className="pt-2 pb-4">
            <div className="bg-gray-50 rounded-lg p-3 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">نسخه:</span>
                <span className="text-gray-800 font-medium">۲.۰.۱</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">موجودیت:</span>
                <span className="text-gray-800 font-medium">فرماندهی انتظامی</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">تاریخ آخرین به‌روزرسانی:</span>
                <span className="text-gray-800 font-medium">۱۴۰۲/۱۲/۲۵</span>
              </div>
              <div className="pt-2">
                <Chip
                  value="سیستم پایدار"
                  size="sm"
                  className="bg-green-100 text-green-700 rounded-full text-[10px]"
                />
              </div>
            </div>
          </AccordionBody>
        </Accordion>

        {/* دکمه‌های عملیات */}
        <div className="mt-6 pt-4 border-t border-gray-100 space-y-2">
          <Button
            variant="gradient"
            color="indigo"
            className="w-full"
            size="sm"
            onClick={handleManualSave}
          >
            <div className="flex items-center justify-center gap-2">
              <Icons.Save className="w-4 h-4" />
              ذخیره در کوکی
            </div>
          </Button>
          
          <Button
            variant="outlined"
            color="gray"
            className="w-full"
            size="sm"
            onClick={handleReset}
          >
            <div className="flex items-center justify-center gap-2">
              <Icons.RefreshCw className="w-4 h-4" />
              بازنشانی به پیش‌فرض
            </div>
          </Button>
        </div>

        {/* توضیحات ذخیره‌سازی */}
        <div className="mt-4 text-center">
          <Typography variant="small" className="text-[10px] text-gray-400">
            تنظیمات شما به صورت خودکار در کوکی ذخیره می‌شود
          </Typography>
          <Typography variant="small" className="text-[8px] text-gray-300 mt-1">
            مدت اعتبار: ۱ سال
          </Typography>
        </div>
      </div>
    </aside>
  );
}

Configurator.displayName = "/src/widgets/layout/configurator.jsx";

export default Configurator;