import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [personaly, setPersonaly] = useState('');
  const [pass, setPass] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // پاک کردن پیغام قبلی

    if (!personaly || !pass) {
      setMessage("شماره پرسنلی و رمز عبور لازم است");
      return;
    }

    try {
     const res = await axios.post("http://localhost:5000/login", { 
  personaly, 
  pass 
});

      if (res.data.success) {
        // اگه بخوای می‌تونی اطلاعات کاربر یا توکن رو ذخیره کنی
        // localStorage.setItem("user", JSON.stringify(res.data.user));

        navigate("/dashboard/home"); 
      } else {
        setMessage(res.data.message || "شماره پرسنلی یا رمز عبور اشتباه است");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "خطا در اتصال به سرور");
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 py-12 flex flex-col justify-center sm:py-20 px-4 relative overflow-hidden">
      {/* دایره‌های متحرک پس‌زمینه */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

      <div className="relative py-3 max-w-lg mx-auto w-full animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-600 shadow-2xl transform -rotate-3 rounded-3xl opacity-20 hidden sm:block"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-violet-700 shadow-xl transform rotate-2 rounded-3xl"></div>
        
        <div className="relative px-6 py-12 bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl sm:px-16 border border-white/20">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight transition-all duration-500 hover:scale-105">
                معاونت فاوا و دفاع سایبری نپاجا
              </h1>
              <p className="text-gray-500 mt-2 font-medium">لطفاً وارد حساب کاربری خود شوید</p>
            </div>
            
            <form className="space-y-10" onSubmit={handleSubmit}>
              {/* فیلد شماره پرسنلی */}
              <div className="relative group">
                <input
                  autoComplete="off"
                  id="personaly"
                  name="personaly"
                  type="text"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 bg-transparent focus:outline-none focus:border-indigo-600 transition-all duration-300 placeholder-transparent text-right" 
                  placeholder="شماره پرسنلی"
                  value={personaly}
                  onChange={(e) => setPersonaly(e.target.value)}
                  required
                />
                <label 
                  htmlFor="personaly" 
                  className="absolute right-0 -top-5 text-gray-600 text-sm transition-all duration-300
                  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 
                  peer-focus:-top-6 peer-focus:text-indigo-600 peer-focus:text-sm font-semibold"
                >
                  شماره پرسنلی
                </label>
                <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-indigo-600 transition-all duration-500 group-focus-within:w-full"></span>
              </div>

              {/* فیلد رمز عبور */}
              <div className="relative group">
                <input
                  autoComplete="off"
                  id="pass"
                  name="pass"
                  type="password"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 bg-transparent focus:outline-none focus:border-indigo-600 transition-all duration-300 placeholder-transparent text-right" 
                  placeholder="رمز عبور"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  required
                /> 
                <label htmlFor="pass" 
                  className="absolute right-0 -top-5 text-gray-600 text-sm transition-all duration-300
                  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 
                  peer-focus:-top-6 peer-focus:text-indigo-600 peer-focus:text-sm font-semibold"
                >
                  رمز عبور
                </label>
                <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-indigo-600 transition-all duration-500 group-focus-within:w-full"></span>
              </div>

              {/* دکمه ورود */}
              <div className="relative pt-4">
                <button
                  type="submit"
                  className="group relative w-full bg-blue-300 from-indigo-600 to-violet-600 text-white rounded-xl px-4 py-4 font-bold text-lg shadow-lg hover:shadow-indigo-300/50 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10">ورود به سیستم</span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </button>
              </div>

              {message && <p className="text-center text-red-600 font-semibold">{message}</p>}

              <div className="flex justify-between items-center text-sm font-medium pt-2">
                <a href="#" className="text-indigo-600 hover:text-indigo-800 transition-colors hover:underline decoration-2 underline-offset-4">فراموشی رمز عبور؟</a>
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">عضویت در سایت</a>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* استایل Blob */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}

export default Login;
