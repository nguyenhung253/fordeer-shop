import Header from "@/components/header";
import Footer from "@/components/footer";
import CartItems from "./cart-items";
import CartSummary from "./cart-summary";

export default function CartPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Title Section */}
      <section className="py-4 md:py-8 bg-white">
        <div className="max-w-[1152px] mx-auto px-4">
          <div className="flex items-center justify-center gap-4 md:gap-8">
            <div className="h-[2px] flex-1 max-w-[100px] md:max-w-[335px] bg-[#45690b]" />
            <h2 className="text-[20px] md:text-[26px] font-bold text-[#45690b] whitespace-nowrap">
              GIỎ HÀNG
            </h2>
            <div className="h-[2px] flex-1 max-w-[100px] md:max-w-[330px] bg-[#45690b]" />
          </div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-4 md:py-8 bg-[#fcfcf6]">
        <div className="max-w-[1152px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 order-1">
              <CartItems />
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1 order-2">
              <CartSummary />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
