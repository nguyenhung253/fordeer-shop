import { useState, useRef } from "react";

const categories = [
  { label: "Cà phê", count: 10 },
  { label: "Trà", count: 4 },
  { label: "Healthy", count: 8 },
  { label: "Nước ép", count: 6 },
  { label: "Đồ đá xay", count: 5 },
];

interface Product {
  name: string;
  category: string;
  price: string;
  image: string;
  description?: string;
  sizes?: { label: string; price: string }[];
}

const products: Product[] = [
  {
    name: "A-Mê Tuyết Quất",
    category: "Cà phê",
    price: "59.000đ",
    image: "/caphe.png",
    description:
      "Đá tuyết Quất thơm mát, kết hợp cùng Americano đắng nhẹ. Uống là mê! *Khuấy đều để thưởng thức trọn vị",
    sizes: [
      { label: "Nhỏ", price: "0đ" },
      { label: "Vừa", price: "6.000đ" },
      { label: "Lớn", price: "10.000đ" },
    ],
  },
  {
    name: "Capuchino Nóng",
    category: "Cà phê",
    price: "95.000đ",
    image: "/caphe2.png",
    description: "Cà phê Espresso đậm đà kết hợp với sữa tươi béo ngậy",
    sizes: [
      { label: "Nhỏ", price: "0đ" },
      { label: "Vừa", price: "6.000đ" },
      { label: "Lớn", price: "10.000đ" },
    ],
  },
  {
    name: "Đen Đá",
    category: "Cà phê",
    price: "95.000đ",
    image: "/caphe3.png",
  },
  {
    name: "Không Đường",
    category: "Cà phê",
    price: "110.000đ",
    image: "/caphe4.png",
  },
  {
    name: "Cà Phê Kem Dừa",
    category: "Cà phê",
    price: "52.000đ",
    image: "/caphe5.png",
  },
  {
    name: "Bạc Sỉu",
    category: "Cà phê",
    price: "42.000đ",
    image: "/caphe6.png",
  },
  {
    name: "Trà Đào Cam Sả",
    category: "Trà",
    price: "45.000đ",
    image: "/caphe2.png",
  },
  {
    name: "Trà Sen Vàng",
    category: "Trà",
    price: "48.000đ",
    image: "/caphe4.png",
  },
];

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState("Cà phê");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredProducts = products.filter(
    (p) => p.category === activeCategory
  );

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = 260;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-12 bg-[#fcfcf6] ">
      <div className="max-w-[1152px] mx-auto px-4 ">
        {/* Header Section */}
        <div className="text-center mb-8 relative">
          <p className="text-[32px] font-bold text-[#1d4220] mb-2 uppercase tracking-wider">
            Featured Product
          </p>
          <h2 className="text-[62px] font-bold text-[#ff6b35] uppercase">
            "Nhà" Foorder
          </h2>
          {/* Badge */}
          <div className="absolute top-0 right-[100px] bg-[#ff6b35] text-white px-4 py-2 rounded-lg transform rotate-12 shadow-lg">
            <span className="text-[14px] font-bold">ngọt ngào</span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center items-center gap-10 border-b-[3px] border-[#d9ef7f] mb-8 mt-17">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(cat.label)}
              className={`relative pb-4 whitespace-nowrap transition-colors ${
                activeCategory === cat.label
                  ? "text-[#45690b]"
                  : "text-gray-400 hover:text-[#799a01]"
              }`}
            >
              <span className="text-[20px] font-bold uppercase tracking-wide">
                {cat.label}
              </span>
              <sup className="ml-1 text-[12px] font-normal">{cat.count}</sup>
              {activeCategory === cat.label && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#45690b] translate-y-[1.5px]" />
              )}
            </button>
          ))}
        </div>

        {/* Products Carousel */}
        <div className="relative flex items-center">
          <button
            onClick={() => scroll("left")}
            className="flex-shrink-0 w-10 h-10 bg-[#d9ef7f] rounded-full flex items-center justify-center hover:bg-[#c5e060] transition-colors shadow-md"
          >
            <svg
              className="w-5 h-5 text-[#45690b]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div
            ref={scrollRef}
            className="flex-1 overflow-x-auto mx-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex gap-6" style={{ width: "max-content" }}>
              {filteredProducts.map((product, index) => (
                <div
                  key={index}
                  className="w-[240px] group cursor-pointer"
                  onClick={() => {
                    setSelectedProduct(product);
                    setSelectedSize(0);
                  }}
                >
                  <div className="relative h-[260px] flex items-center justify-center mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-auto object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-lg"
                    />
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-[13px] text-[#799a01]">
                      {product.category}
                    </p>
                    <h3 className="text-[16px] font-bold text-[#45690b] group-hover:text-[#799a01] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-[15px] font-semibold text-[#1d4220]">
                      {product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => scroll("right")}
            className="flex-shrink-0 w-10 h-10 bg-[#d9ef7f] rounded-full flex items-center justify-center hover:bg-[#c5e060] transition-colors shadow-md"
          >
            <svg
              className="w-5 h-5 text-[#45690b]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* View All Link */}
        <div className="text-center mt-16">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-[#799a01] text-[15px] font-medium hover:text-[#45690b] transition-colors group"
          >
            <span>Xem tất cả sản phẩm</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-[#fcf8e8] rounded-2xl max-w-[800px] w-full overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors z-10"
            >
              <svg
                className="w-6 h-6 text-gray-600"
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
            </button>

            <div className="flex">
              {/* Left - Image */}
              <div className="w-[45%] bg-gradient-to-br from-[#fef9e7] to-[#fcf3d5] flex items-center justify-center p-8 relative">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="max-h-[400px] w-auto object-contain drop-shadow-2xl"
                />
                {/* Decorative elements */}
              </div>

              {/* Right - Info */}
              <div className="flex-1 p-8">
                <h2 className="text-[32px] font-bold text-[#45690b] mb-2">
                  {selectedProduct.name}
                </h2>
                <p className="text-[24px] font-bold text-[#799a01] mb-4">
                  {selectedProduct.price}
                </p>

                {selectedProduct.description && (
                  <p className="text-[15px] text-gray-700 leading-relaxed mb-6">
                    {selectedProduct.description}
                  </p>
                )}

                {selectedProduct.sizes && (
                  <div className="mb-6">
                    <p className="text-[16px] font-bold text-[#1d1d1d] mb-3">
                      Chọn size (bắt buộc):
                    </p>
                    <div className="flex gap-3">
                      {selectedProduct.sizes.map((size, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedSize(idx)}
                          className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                            selectedSize === idx
                              ? "border-[#45690b] bg-[#d9ef7f]"
                              : "border-gray-300 bg-white hover:border-[#799a01]"
                          }`}
                        >
                          <div className="flex flex-col items-center justify-center gap-1">
                            <div className="flex items-center gap-2">
                              <svg
                                className="w-4 h-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z" />
                              </svg>
                              <span className="font-medium">{size.label}</span>
                            </div>
                            {size.price !== "0đ" && (
                              <span className="text-sm text-gray-600">
                                + {size.price}
                              </span>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <button className="w-full bg-[#45690b] text-white py-4 rounded-full text-[18px] font-bold hover:bg-[#42612e] transition-colors shadow-lg">
                  MUA NGAY
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
