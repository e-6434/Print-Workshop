import React from "react";
import PropTypes from "prop-types";
import Cookies from 'js-cookie';

export const MaterialTailwind = React.createContext(null);
MaterialTailwind.displayName = "MaterialTailwindContext";

// کلید کوکی
const COOKIE_KEY = 'dashboard_config';
const COOKIE_EXPIRE = 365; // روز

export function reducer(state, action) {
  switch (action.type) {
    case "OPEN_SIDENAV": {
      return { ...state, openSidenav: action.value };
    }
    case "SIDENAV_TYPE": {
      return { ...state, sidenavType: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    case "LOAD_CONFIG": {
      return { ...state, ...action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export function MaterialTailwindControllerProvider({ children }) {
  // بارگذاری از کوکی
  const loadFromCookie = () => {
    try {
      const savedConfig = Cookies.get(COOKIE_KEY);
      if (savedConfig) {
        const parsed = JSON.parse(savedConfig);
        return {
          openSidenav: false,
          sidenavColor: parsed.sidenavColor || "dark",
          sidenavType: parsed.sidenavType || "white",
          transparentNavbar: true,
          fixedNavbar: parsed.fixedNavbar !== undefined ? parsed.fixedNavbar : false,
          openConfigurator: false,
        };
      }
    } catch (error) {
      console.error('❌ خطا در بارگذاری از کوکی:', error);
    }
    
    // مقدار پیش‌فرض
    return {
      openSidenav: false,
      sidenavColor: "dark",
      sidenavType: "white",
      transparentNavbar: true,
      fixedNavbar: false,
      openConfigurator: false,
    };
  };

  const [controller, dispatch] = React.useReducer(reducer, loadFromCookie());

  // ذخیره در کوکی هر وقت تغییر کرد
  React.useEffect(() => {
    try {
      const config = {
        sidenavColor: controller.sidenavColor,
        sidenavType: controller.sidenavType,
        fixedNavbar: controller.fixedNavbar,
      };
      
      Cookies.set(COOKIE_KEY, JSON.stringify(config), { 
        expires: COOKIE_EXPIRE,
        path: '/',
        sameSite: 'strict'
      });
      
      console.log('✅ تنظیمات در کوکی ذخیره شد');
    } catch (error) {
      console.error('❌ خطا در ذخیره در کوکی:', error);
    }
  }, [controller.sidenavColor, controller.sidenavType, controller.fixedNavbar]);

  const value = React.useMemo(
    () => [controller, dispatch],
    [controller, dispatch]
  );

  return (
    <MaterialTailwind.Provider value={value}>
      {children}
    </MaterialTailwind.Provider>
  );
}

export function useMaterialTailwindController() {
  const context = React.useContext(MaterialTailwind);

  if (!context) {
    throw new Error(
      "useMaterialTailwindController should be used inside the MaterialTailwindControllerProvider."
    );
  }

  return context;
}

MaterialTailwindControllerProvider.displayName = "/src/context/index.jsx";

MaterialTailwindControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// اکشن‌ها
export const setOpenSidenav = (dispatch, value) =>
  dispatch({ type: "OPEN_SIDENAV", value });

export const setSidenavType = (dispatch, value) =>
  dispatch({ type: "SIDENAV_TYPE", value });

export const setSidenavColor = (dispatch, value) =>
  dispatch({ type: "SIDENAV_COLOR", value });

export const setTransparentNavbar = (dispatch, value) =>
  dispatch({ type: "TRANSPARENT_NAVBAR", value });

export const setFixedNavbar = (dispatch, value) =>
  dispatch({ type: "FIXED_NAVBAR", value });

export const setOpenConfigurator = (dispatch, value) =>
  dispatch({ type: "OPEN_CONFIGURATOR", value });

// اکشن جدید برای بارگذاری دستی
export const loadConfig = (dispatch, value) =>
  dispatch({ type: "LOAD_CONFIG", value });