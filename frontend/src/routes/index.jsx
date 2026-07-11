import Home from "../pages/Home";
import NewOrder from "../pages/NewOrder";
import OrdersList from "../pages/OrdersList";

const routes = [
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
        name: "ثبت سفارش",
        path: "/new-order",
        element: <NewOrder />,
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

export default routes;