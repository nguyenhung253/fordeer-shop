import Header from "@/components/header";
import Footer from "@/components/footer";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import LoginForm from "./login-form";
import SignupForm from "./signup-form";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [searchParams, setSearchParams] = useSearchParams();

  // Handle logout redirect from management site
  useEffect(() => {
    const action = searchParams.get("action");
    if (action === "logout") {
      // Clear any existing session on shop site
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      // Clean URL
      setSearchParams({});
      // Force reload to update header
      window.location.reload();
    }
  }, [searchParams, setSearchParams]);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Title Section */}
      <section className="py-8 bg-white">
        <div className="max-w-[1152px] mx-auto px-4">
          <div className="flex items-center justify-center gap-8">
            <div className="h-[2px] w-[335px] bg-[#45690b]" />
            <h2 className="text-[26px] font-bold text-[#45690b] whitespace-nowrap leading-[26px]">
              TÀI KHOẢN
            </h2>
            <div className="h-[2px] w-[330px] bg-[#45690b]" />
          </div>
        </div>
      </section>

      {/* Auth Content */}
      <section className="py-12 bg-[#fcfcf6]">
        <div className="max-w-[500px] mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Tabs */}
            <div className="flex">
              <button
                onClick={() => setActiveTab("login")}
                className={`flex-1 py-4 text-[16px] font-bold transition-colors ${
                  activeTab === "login"
                    ? "bg-[#45690b] text-white"
                    : "bg-[#d9ef7f] text-[#45690b] hover:bg-[#c5e060]"
                }`}
              >
                Đăng nhập
              </button>
              <button
                onClick={() => setActiveTab("signup")}
                className={`flex-1 py-4 text-[16px] font-bold transition-colors ${
                  activeTab === "signup"
                    ? "bg-[#45690b] text-white"
                    : "bg-[#d9ef7f] text-[#45690b] hover:bg-[#c5e060]"
                }`}
              >
                Đăng ký
              </button>
            </div>

            {/* Form Content */}
            <div className="p-8">
              {activeTab === "login" ? <LoginForm /> : <SignupForm />}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
