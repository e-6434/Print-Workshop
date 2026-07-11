import { Routes, Route, Navigate } from "react-router-dom";
 
import Auth from "./layouts/auth";  
 
import { Dashboard } from "./layouts";
 

function App() {
  // تابع برای چک کردن لاگین
  // const isLoggedIn = () => {
  //   return !!(sessionStorage.getItem('user') || localStorage.getItem('user'));
  // };

  return (
    <Routes>
         
      {/* صفحات محافظت شده داشبورد */}
      <Route 
        path="/dashboard/*" 
        element={
         
            <Dashboard />
        
        } 
      />
      
      {/* صفحات احراز هویت */}
      <Route path="/auth/*" element={<Auth />} />
      
      {/* 404 - هر چیز دیگه */}
      <Route path="*" element={<Navigate to="/dashboard/*" replace />} />
    </Routes>
  );
}

export default App;