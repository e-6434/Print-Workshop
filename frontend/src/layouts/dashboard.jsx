import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { Avatar, IconButton } from "@material-tailwind/react";
import "./CubeLoader.css"; 
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
 

import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import { useEffect, useState } from "react";
 

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

const [loading, setLoading] = useState(true);

// after data
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   // شبیه‌سازی fetch داده
  //   fetch("/api/data")
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setData(res);
  //       setLoading(false); // وقتی داده بارگذاری شد، لودینگ مخفی شود
  //     });
  // }, []);


  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

 
  if (loading) {
    return (
 <div className="fixed inset-0 flex flex-col justify-center items-center bg-gradient-to-l from-[#00c6ff] to-[#0072ff]">
      <h1 className="text-2xl text-white font-light mb-12 text-center  ">
     TEST TEST

      </h1>


      <div className="relative w-24 h-24 cube-wrapper ">
        <div className="cube-folding">
          <span className="leaf1"></span>
          <span className="leaf2"></span>
          <span className="leaf3"></span>
          <span className="leaf4"></span>
        </div>
 
        <span className="loading block text-white text-xs tracking-widest absolute top-12 z-10">
          درحال بارگذاری
        </span>
        
      </div>

        <div className="made-with-love absolute bottom-2  w-full flex justify-center items-center gap-2 z-50">
  <Avatar size="sm" src="/img/star.svg" className="-rotate-12 opacity-70" />
  <Avatar size="sm" src="/img/star.svg" className="opacity-70" />
  <Avatar size="sm" src="/img/star.svg" className="rotate-12 opacity-70" />
</div>

    </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
          
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
 <div className="p-4 xl:mr-80">
  <DashboardNavbar />
  <Configurator />
  <IconButton
    size="lg"
    color="white"
    className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
    ripple={false}
    onClick={() => setOpenConfigurator(dispatch, true)}
  >
    <Cog6ToothIcon className="h-5 w-5" />
  </IconButton>
  <Routes>
    {routes.map(
      ({ layout, pages }) =>
        layout === "dashboard" &&
        pages.map(({ path, element }) => (
          <Route exact path={path} element={element} />
        ))
    )}
  </Routes>
 
</div>

    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
