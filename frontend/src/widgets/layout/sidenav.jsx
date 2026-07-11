import React from "react";
import PropTypes from "prop-types";

import { Link, NavLink, useLocation } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import * as Icons from 'lucide-react';

export function Sidenav({ routes, brandName, brandImg }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const location = useLocation();

  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900",
    white: "bg-white shadow-xl border-l border-gray-100",
    transparent: "bg-white/95 backdrop-blur-xl border-l border-white/20",
  };

  const textColor = sidenavType === "dark" ? "text-white" : "text-gray-800";
  const subTextColor = sidenavType === "dark" ? "text-gray-400" : "text-gray-500";
  const borderColor = sidenavType === "dark" ? "border-white/10" : "border-gray-100";

  // آمار سفارشات از localStorage
  const [ordersCount, setOrdersCount] = React.useState(0);
  React.useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrdersCount(orders.length);
  }, []);

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "translate-x-80"
      } fixed inset-y-0 right-0 z-50 my-4 mr-4 h-[calc(100vh-32px)] w-72 rounded-2xl transition-transform duration-300 xl:translate-x-0 border ${borderColor} shadow-xl`}
      dir="rtl"
    >
      {/* ===== هدر با لوگو ===== */}
      <div className="relative px-5 py-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl shadow-lg shadow-blue-500/30">
            {brandImg || "🖨️"}
          </div>
          <div>
            <Typography variant="h6" className={`font-bold ${textColor}`}>
              {brandName || "چاپخانه"}
            </Typography>
            <Typography variant="small" className={`text-xs ${subTextColor}`}>
              مدیریت سفارشات
            </Typography>
          </div>
        </Link>

        <IconButton
          variant="text"
          color={sidenavType === "dark" ? "white" : "blue-gray"}
          size="sm"
          className="absolute left-2 top-2 grid xl:hidden rounded-lg hover:bg-black/10"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
        </IconButton>
      </div>

      {/* ===== خط جداکننده ===== */}
      <div className={`mx-5 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent`}></div>

      {/* ===== منوها ===== */}
      <div className="mt-4 h-[calc(100vh-220px)] overflow-y-auto px-3 pb-4 scrollbar-thin scrollbar-thumb-gray-300/20 scrollbar-track-transparent">
        {routes.map(({ layout, title, pages }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            {title && (
              <li className="mx-2 mt-4 mb-2">
                <Typography
                  variant="small"
                  className={`text-xs font-bold uppercase tracking-wider ${subTextColor} opacity-60`}
                >
                  {title}
                </Typography>
              </li>
            )}

            {pages.map(({ icon, name, path }) => {
              const IconComponent = icon?.type === 'function' ? icon : Icons[icon] || Icons.Circle;
              const isActive = location.pathname === `/${layout}${path}`;
              
              return (
                <li key={name}>
                  <NavLink to={`/${layout}${path}`}>
                    {({ isActive }) => (
                      <Button
                        variant={isActive ? "gradient" : "text"}
                        color={isActive ? sidenavColor : "gray"}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                          isActive 
                            ? 'shadow-lg shadow-indigo-500/25 scale-[1.02]' 
                            : `hover:bg-black/5 ${sidenavType === 'dark' ? 'hover:bg-white/10' : ''} hover:scale-[1.02]`
                        }`}
                        fullWidth
                      >
                        <div className={`flex items-center justify-center w-9 h-9 rounded-xl transition-all ${
                          isActive 
                            ? 'bg-white/20 text-white' 
                            : sidenavType === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {typeof IconComponent === 'function' ? (
                            <IconComponent size={19} strokeWidth={1.8} />
                          ) : (
                            icon
                          )}
                        </div>
                        <Typography
                          className={`flex-1 text-right font-medium ${
                            isActive 
                              ? 'text-white' 
                              : sidenavType === 'dark' ? 'text-gray-200' : 'text-gray-700'
                          }`}
                        >
                          {name}
                        </Typography>

                        {isActive && (
                          <div className="flex gap-1">
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                            <span className="w-1.5 h-1.5 bg-white/60 rounded-full animate-pulse delay-150"></span>
                          </div>
                        )}
                      </Button>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        ))}
      </div>

      {/* ===== بخش پایین ===== */}
      <div className={`absolute bottom-4 left-4 right-4`}>
        <div className={`rounded-xl p-3 bg-gradient-to-r ${sidenavType === 'dark' ? 'from-white/5 to-white/5' : 'from-gray-50 to-gray-100'} border ${borderColor}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-sm shadow-lg shadow-blue-500/25">
                📦
              </div>
              <div>
                <Typography className={`text-xs font-medium ${subTextColor}`}>
                  کل سفارشات
                </Typography>
                <Typography className={`text-lg font-bold ${textColor}`}>
                  {ordersCount}
                </Typography>
              </div>
            </div>
            <Link
              to="/dashboard/orders"
              className="text-xs text-blue-600 font-medium px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 transition-all"
            >
              مشاهده
            </Link>
          </div>
        </div>

        <div className={`flex items-center justify-center gap-2 text-xs ${subTextColor} opacity-40 mt-3`}>
          <span>نسخه ۳.۰.۰</span>
          <span className="w-1 h-1 rounded-full bg-gray-400"></span>
          <span>چاپخانه هوشمند</span>
        </div>
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandName: "چاپخانه",
  brandImg: "🖨️",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/Sidenav.jsx";

export default Sidenav;