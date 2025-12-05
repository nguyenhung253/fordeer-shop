import { authService } from "@/services/authService";
import { cartService } from "@/services/cartService";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ProfileDropdown from "./profile-dropdown";

export default function Header() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(
    authService.isAuthenticated()
  );
  const [cartCount, setCartCount] = useState(cartService.getItemCount());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleUserUpdate = () => {
      setIsAuthenticated(authService.isAuthenticated());
    };

    const handleCartUpdate = () => {
      setCartCount(cartService.getItemCount());
    };

    window.addEventListener("userUpdated", handleUserUpdate);
    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("userUpdated", handleUserUpdate);
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/order", label: "Đặt hàng" },
    { path: "/news", label: "Bảng tin" },
    { path: "/stores", label: "Cửa hàng" },
    { path: "/about", label: "About us" },
    { path: "/recruitment", label: "Tuyển dụng" },
  ];

  return (
    <header className="bg-[#fcfcf6] sticky top-0 z-50 shadow-sm">
      <div className="max-w-[1152px] mx-auto px-4 h-[60px] md:h-[75px] flex items-center justify-between">
        {/* Left: Mobile Menu Button + Logo (on mobile, logo next to hamburger) */}
        <div className="flex items-center gap-2 md:gap-0">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 -ml-2 text-[#45690b]"
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

          {/* Logo - next to hamburger on mobile */}
          <Link to="/" className="flex items-center">
            <img
              src="/Frame 3.png"
              alt="Fordeer Coffee"
              className="h-10 md:h-12"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 flex-1 justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-[12px] lg:text-[13px] font-bold transition-colors uppercase tracking-wide ${
                isActive(link.path)
                  ? "text-[#42612e]"
                  : "text-[#9cc019] hover:text-[#45690b]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: Actions - pushed to right edge */}
        <div className="flex items-center gap-3 md:gap-4">
          <Link
            to="/cart"
            className="hover:opacity-80 transition-opacity relative"
          >
            <img
              src="/cart.png"
              alt="Giỏ hàng"
              className="w-6 h-6 md:w-7 md:h-7"
            />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 md:-top-2 md:-right-2 bg-[#ff6b35] text-white text-[9px] md:text-[10px] font-bold w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <ProfileDropdown />
          ) : (
            <Link to="/login" className="hover:opacity-80 transition-opacity">
              <img
                src="/user.png"
                alt="Đăng nhập"
                className="w-6 h-6 md:w-7 md:h-7"
              />
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-[#fcfcf6] border-t border-[#e5e5e5] ${
          mobileMenuOpen ? "max-h-[400px]" : "max-h-0"
        }`}
      >
        <nav className="px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block py-3 px-4 rounded-lg text-[14px] font-bold uppercase tracking-wide transition-colors ${
                isActive(link.path)
                  ? "text-[#42612e] bg-[#d9ef7f]/30"
                  : "text-[#9cc019] hover:bg-[#d9ef7f]/20"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
