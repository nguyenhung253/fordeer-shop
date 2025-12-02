import { authService } from "@/services/authService";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ProfileDropdown from "./profile-dropdown";

export default function Header() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());

  useEffect(() => {
    // Listen for user updates to refresh auth state
    const handleUserUpdate = () => {
      setIsAuthenticated(authService.isAuthenticated());
    };

    window.addEventListener('userUpdated', handleUserUpdate);

    return () => {
      window.removeEventListener('userUpdated', handleUserUpdate);
    };
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-[#fcfcf6] sticky top-0 z-50">
      <div className="max-w-[1152px] mx-auto px-4 h-[75px] flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/Frame 3.png" alt="Fordeer Coffee" className="h-12" />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/order"
            className={`text-[13px] font-bold transition-colors uppercase tracking-wide ${
              isActive("/order")
                ? "text-[#42612e]"
                : "text-[#9cc019] hover:text-[#45690b]"
            }`}
          >
            Đặt hàng
          </Link>
          <Link
            to="/news"
            className={`text-[13px] font-bold transition-colors uppercase tracking-wide ${
              isActive("/news")
                ? "text-[#42612e]"
                : "text-[#9cc019] hover:text-[#45690b]"
            }`}
          >
            Bảng tin
          </Link>
          <Link
            to="/stores"
            className={`text-[13px] font-bold transition-colors uppercase tracking-wide ${
              isActive("/stores")
                ? "text-[#42612e]"
                : "text-[#9cc019] hover:text-[#45690b]"
            }`}
          >
            Cửa hàng
          </Link>
          <Link
            to="/about"
            className={`text-[13px] font-bold transition-colors uppercase tracking-wide ${
              isActive("/about")
                ? "text-[#42612e]"
                : "text-[#9cc019] hover:text-[#45690b]"
            }`}
          >
            About us
          </Link>
          <Link
            to="/recruitment"
            className={`text-[13px] font-bold transition-colors uppercase tracking-wide ${
              isActive("/recruitment")
                ? "text-[#42612e]"
                : "text-[#9cc019] hover:text-[#45690b]"
            }`}
          >
            Tuyển dụng
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link to="/cart" className="hover:opacity-80 transition-opacity">
            <img src="/cart.png" alt="Giỏ hàng" className="w-7 h-7" />
          </Link>

          {/* Show Profile Dropdown if authenticated, otherwise show login link */}
          {isAuthenticated ? (
            <ProfileDropdown />
          ) : (
            <Link to="/login" className="hover:opacity-80 transition-opacity">
              <img src="/user.png" alt="Đăng nhập" className="w-7 h-7" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
