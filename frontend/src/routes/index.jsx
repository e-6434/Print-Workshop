import Home from "../pages/dashboard/home";
import PrintOrder from "../pages/dashboard/PrintOrder";
import OrdersList from "../pages/dashboard/OrdersList";
import { Avatar } from "@material-tailwind/react";

const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <Avatar src="/img/admin_d.svg"/>,
        name: "داشبورد",
        path: "/home",
        element: <Home />,
      },
      {
       icon: <Avatar src="/img/anbar.svg"/>,
        name: "ثبت سفارش چاپ",
        path: "/print-order",
        element: <PrintOrder />,
      },
      {
        icon: <Avatar src="/img/admin_d.svg"/>,
        name: "لیست سفارشات",
        path: "/orders",
        element: <OrdersList />,
      },
    ],
  },
];

export default routes;