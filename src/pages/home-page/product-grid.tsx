const products = [
  { name: "Rừng Pạc\nChai", price: "95.000đ", image: "/coffee.png" },
  { name: "Rừng Nâu\nChai", price: "95.000đ", image: "/coffee.png" },
  { name: "Rừng Amazon\nChai", price: "110.000đ", image: "/coffee.png" },
  { name: "Rừng Amazon", price: "48.000đ", image: "/coffee.png" },
  { name: "Cà Phê Kem dừa", price: "52.000đ", image: "/coffee.png" },
  { name: "Bạc sỉu", price: "42.000đ", image: "/coffee.png" },
  { name: "Cà Phê Sữa", price: "35.000đ", image: "/coffee.png" },
  { name: "Cà Phê Đen", price: "35.000đ", image: "/coffee.png" },
  { name: "Latte", price: "58.000đ", image: "/coffee.png" },
  { name: "Americano", price: "48.000đ", image: "/coffee.png" },
];

export default function ProductGrid() {
  return (
    <section className="py-16 bg-[#fcfcf6]">
      <div className="max-w-[1152px] mx-auto px-4">
        {/* Products Grid */}
        <div className="grid grid-cols-5 gap-6 mb-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-[#d9ef7f] rounded-md overflow-hidden shadow-md hover:shadow-lg transition-all"
            >
              {/* Product Image */}
              <div className="aspect-square bg-white flex items-center justify-center p-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="p-3">
                <h3 className="font-bold text-[#45690b] text-[14px] leading-tight mb-2 whitespace-pre-line">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between">
                  <span className="text-[#1d4220] text-[12px]">
                    {product.price}
                  </span>
                  <button className="w-[30px] h-[30px] rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition-colors">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M8 3V13M3 8H13"
                        stroke="#45690b"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <a href="#" className="text-[#799a01] text-[16px] hover:underline">
            Xem tất cả
          </a>
        </div>
      </div>
    </section>
  );
}
