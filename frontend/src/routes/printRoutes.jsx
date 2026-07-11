import * as Icons from 'lucide-react';

// صفحات
import Home from "../pages/dashboard/home";
import PrintOrder from "../pages/dashboard/PrintOrder";
import OrdersList from "../pages/dashboard/OrdersList";

const printRoutes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: "Home",
        name: "داشبورد",
        path: "/home",
        element: <Home />,
      },
      {
        icon: "Printer",
        name: "ثبت سفارش چاپ",
        path: "/print-order",
        element: <PrintOrder />,
      },
      {
        icon: "List",
        name: "لیست سفارشات",
        path: "/orders",
        element: <OrdersList />,
      },
    ],
  },
];

export default printRoutes;