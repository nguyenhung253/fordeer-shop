import { useState, useRef } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cartService } from "@/services/cartService";
import { toast } from "sonner";

const categories = [
  { label: "Cà phê", count: 10 },
  { label: "Trà", count: 4 },
  { label: "Nước ép", count: 8 },
  { label: "Latte", count: 6 },
  { label: "Trà sữa", count: 5 },
];

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  priceNumber: number;
  image: string;
  description?: string;
  sizes?: { label: string; price: string; priceNumber: number }[];
}

const products: Product[] = [
  {
    id: 1,
    name: "A-Mê Tuyết Quất",
    category: "Cà phê",
    price: "59.000đ",
    priceNumber: 59000,
    image: "/caphe.png",
    description:
      "Đá tuyết Quất thơm mát, kết hợp cùng Americano đắng nhẹ. Uống là mê! *Khuấy đều để thưởng thức trọn vị",
    sizes: [
      { label: "Nhỏ", price: "0đ", priceNumber: 0 },
      { label: "Vừa", price: "+6.000đ", priceNumber: 6000 },
      { label: "Lớn", price: "+10.000đ", priceNumber: 10000 },
    ],
  },
  {
    id: 2,
    name: "Capuchino Nóng",
    category: "Cà phê",
    price: "95.000đ",
    priceNumber: 95000,
    image: "/caphe2.png",
    description: "Cà phê Espresso đậm đà kết hợp với sữa tươi béo ngậy",
    sizes: [
      { label: "Nhỏ", price: "0đ", priceNumber: 0 },
      { label: "Vừa", price: "+6.000đ", priceNumber: 6000 },
      { label: "Lớn", price: "+10.000đ", priceNumber: 10000 },
    ],
  },
  {
    id: 3,
    name: "Đen Đá",
    category: "Cà phê",
    price: "95.000đ",
    priceNumber: 95000,
    image: "/caphe3.png",
  },
  {
    id: 4,
    name: "Không Đường",
    category: "Cà phê",
    price: "110.000đ",
    priceNumber: 110000,
    image: "/caphe4.png",
  },
  {
    id: 5,
    name: "Cà Phê Kem Dừa",
    category: "Cà phê",
    price: "52.000đ",
    priceNumber: 52000,
    image: "/caphe5.png",
  },
  {
    id: 6,
    name: "Bạc Sỉu",
    category: "Cà phê",
    price: "42.000đ",
    priceNumber: 42000,
    image: "/caphe6.png",
  },
  {
    id: 7,
    name: "Trà Đào Cam Sả",
    category: "Trà",
    price: "45.000đ",
    priceNumber: 45000,
    image: "/caphe2.png",
  },
  {
    id: 8,
    name: "Trà Sen Vàng",
    category: "Trà",
    price: "48.000đ",
    priceNumber: 48000,
    image: "/caphe4.png",
  },
];

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState("Cà phê");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Drag to scroll state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation(0.2);
  const { ref: tabsRef, isVisible: tabsVisible } = useScrollAnimation(0.2);
  const { ref: productsRef, isVisible: productsVisible } =
    useScrollAnimation(0.1);

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

  // Drag to scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <section className="py-12 bg-[#fcfcf6]">
      <div className="max-w-[1152px] mx-auto px-4">
        {/* Header Section */}
        <div ref={headerRef} className="text-center mb-8 relative">
          <p
            className={`text-[32px] font-bold text-[#1d4220] mb-2 uppercase tracking-wider transition-all duration-700 ${
              headerVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            Featured Product
          </p>
          <h2
            className={`text-[62px] font-bold text-[#ff6b35] uppercase transition-all duration-700 delay-200 ${
              headerVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            "Nhà" Foorder
          </h2>
          {/* Badge */}
          <div
            className={`absolute top-0 right-[100px] bg-[#ff6b35] text-white px-4 py-2 rounded-lg transform rotate-12 shadow-lg transition-all duration-700 delay-400 hover:rotate-0 hover:scale-110 ${
              headerVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
          >
            <span className="text-[14px] font-bold">ngọt ngào</span>
          </div>
        </div>

        {/* Category Tabs */}
        <div
          ref={tabsRef}
          className={`flex justify-center items-center gap-10 border-b-[3px] border-[#d9ef7f] mb-8 mt-17 transition-all duration-700 ${
            tabsVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-5"
          }`}
        >
          {categories.map((cat, index) => (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(cat.label)}
              className={`relative pb-4 whitespace-nowrap transition-all duration-300 hover:scale-105 ${
                activeCategory === cat.label
                  ? "text-[#45690b]"
                  : "text-gray-400 hover:text-[#799a01]"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <span className="text-[20px] font-bold uppercase tracking-wide">
                {cat.label}
              </span>
              <sup className="ml-1 text-[12px] font-normal">{cat.count}</sup>
              {activeCategory === cat.label && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#45690b] translate-y-[1.5px] animate-pulse" />
              )}
            </button>
          ))}
        </div>

        {/* Products Carousel */}
        <div ref={productsRef} className="relative flex items-center">
          <button
            onClick={() => scroll("left")}
            className="flex-shrink-0 w-10 h-10 bg-[#d9ef7f] rounded-full flex items-center justify-center hover:bg-[#c5e060] hover:scale-110 transition-all duration-300 shadow-md"
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
            className={`flex-1 overflow-x-auto mx-4 ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="flex gap-6" style={{ width: "max-content" }}>
              {filteredProducts.map((product, index) => (
                <div
                  key={index}
                  className={`w-[240px] group cursor-pointer transition-all duration-500 ${
                    productsVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onClick={() => {
                    // Only open modal if not dragging
                    if (!isDragging) {
                      setSelectedProduct(product);
                      setSelectedSize(0);
                    }
                  }}
                >
                  <div className="relative h-[260px] flex items-center justify-center mb-4 group-hover:-translate-y-2 transition-transform duration-300">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-auto object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-lg group-hover:drop-shadow-2xl"
                    />
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-[13px] text-[#799a01]">
                      {product.category}
                    </p>
                    <h3 className="text-[16px] font-bold text-[#45690b] group-hover:text-[#799a01] transition-colors duration-300">
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
            className="flex-shrink-0 w-10 h-10 bg-[#d9ef7f] rounded-full flex items-center justify-center hover:bg-[#c5e060] hover:scale-110 transition-all duration-300 shadow-md"
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
            className="inline-flex items-center gap-2 text-[#799a01] text-[15px] font-medium hover:text-[#45690b] transition-all duration-300 group hover:gap-4"
          >
            <span>Xem tất cả sản phẩm</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300"
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
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-[#fcf8e8] rounded-2xl max-w-[800px] w-full overflow-hidden relative animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white hover:rotate-90 transition-all duration-300 z-10"
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
                  className="max-h-[400px] w-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />
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
                          className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                            selectedSize === idx
                              ? "border-[#45690b] bg-[#d9ef7f] scale-105"
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

                <button
                  onClick={() => {
                    const sizeExtra =
                      selectedProduct.sizes?.[selectedSize]?.priceNumber || 0;
                    const sizeLabel =
                      selectedProduct.sizes?.[selectedSize]?.label;
                    cartService.addToCart({
                      productId: selectedProduct.id,
                      name: selectedProduct.name,
                      price: selectedProduct.priceNumber + sizeExtra,
                      image: selectedProduct.image,
                      size: sizeLabel,
                    });
                    toast.success(
                      `Đã thêm "${selectedProduct.name}" vào giỏ hàng!`
                    );
                    setSelectedProduct(null);
                  }}
                  className="w-full bg-[#45690b] text-white py-4 rounded-full text-[18px] font-bold hover:bg-[#42612e] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  THÊM VÀO GIỎ HÀNG
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
