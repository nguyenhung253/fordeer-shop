import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/home-page";
import RecruitmentPage from "@/pages/recruitment-page";
import CartPage from "@/pages/cart-page";
import AuthPage from "@/pages/auth-page";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
