import Header from "@/components/header";
import Footer from "@/components/footer";
import CartItems from "./cart-items";
import CartSummary from "./cart-summary";

export default function CartPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Title Section */}
      <section className="py-8 bg-white">
        <div className="max-w-[1152px] mx-auto px-4">
          <div className="flex items-center justify-center gap-8">
            <div className="h-[2px] w-[335px] bg-[#45690b]" />
            <h2 className="text-[26px] font-bold text-[#45690b] whitespace-nowrap leading-[26px]">
              GIỎ HÀNG
            </h2>
            <div className="h-[2px] w-[330px] bg-[#45690b]" />
          </div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-8 bg-[#fcfcf6]">
        <div className="max-w-[1152px] mx-auto px-4">
          <div className="grid grid-cols-3 gap-8">
            {/* Cart Items - 2 columns */}
            <div className="col-span-2">
              <CartItems />
            </div>

            {/* Cart Summary - 1 column */}
            <div className="col-span-1">
              <CartSummary />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
