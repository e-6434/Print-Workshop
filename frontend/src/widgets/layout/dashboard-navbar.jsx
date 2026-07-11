import { useLocation, Link } from "react-router-dom";
import { Bell, Calendar, Clock, Settings, ChevronDown, LogOut, User } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Navbar,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
  Badge
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "@/context";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const [currentTime, setCurrentTime] = useState(new Date());

  // اطلاعات کاربر از sessionStorage
  const userData = sessionStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : { name: 'کاربر', family: 'محترم', role: 'user' };

  // بروزرسانی زمان هر ثانیه
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // فرمت زمان به فارسی
  const formatTime = (date) => {
    return date.toLocaleTimeString('fa-IR', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  // فرمت تاریخ به فارسی
  const formatDate = (date) => {
    return date.toLocaleDateString('fa-IR', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };

  // نوتیفیکیشن‌های نمونه
  const notifications = [
    { id: 1, title: 'درخواست مرخصی تأیید شد', time: '۱۰:۲۵', date: 'امروز', read: false },
    { id: 2, title: 'جلسه جدید اضافه شد', time: '۰۹:۱۵', date: 'امروز', read: false },
    { id: 3, title: 'گزارش ماهانه آماده است', time: '۱۴:۳۰', date: 'دیروز', read: true }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  // تابع خروج
  const handleLogout = () => {
    sessionStorage.removeItem('user');
    window.location.href = '/login';
  };

  // دریافت نام صفحه
  const getPageTitle = () => {
    switch(page) {
      case 'dashboard': return 'داشبورد';
      case 'print-order': return 'ثبت سفارش چاپ';
      case 'orders': return ' لیست سفارشات';
 
 
    
      default: return 'داشبورد';
    }
  };

  return (
 <></>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;