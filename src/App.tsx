import ProtectedRoute from "@/components/ProtectedRoute";
import AuthPage from "@/pages/auth-page";
import CartPage from "@/pages/cart-page";
import HomePage from "@/pages/home-page";
import PrivacyPolicy from "@/pages/privacy-policy";
import ProfilePage from "@/pages/profile-page";
import RecruitmentPage from "@/pages/recruitment-page";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recruitment" element={<RecruitmentPage />} />
        <Route path="/order" element={<div>Đặt hàng - Coming soon</div>} />
        <Route path="/news" element={<div>Bảng tin - Coming soon</div>} />
        <Route path="/stores" element={<div>Cửa hàng - Coming soon</div>} />
        <Route path="/about" element={<div>About us - Coming soon</div>} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <div>Đơn hàng của tôi - Coming soon</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
