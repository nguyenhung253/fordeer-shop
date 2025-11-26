const categories = [
  {
    label: "Cà phê",
    image: "/ca-phe.png",
    bgColor: "#45690b",
    textColor: "#799a01",
  },
  {
    label: "Healthy",
    image: "/healthy.png",
    bgColor: "#ebebea",
    textColor: "#799a01",
  },
  {
    label: "Nước ép",
    image: "/nuoc-ep.png",
    bgColor: "#ebebea",
    textColor: "#799a01",
  },
  { label: "Trà", image: "/tra.png", bgColor: "#ebebea", textColor: "#799a01" },
  {
    label: "Đồ đá xay",
    image: "/do-da-xay.png",
    bgColor: "#ebebea",
    textColor: "#799a01",
  },
];

export default function ProductCategories() {
  return (
    <section className="py-16 bg-[#fcfcf6]">
      <div className="max-w-[1152px] mx-auto px-4">
        {/* Section Title */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-px bg-[#45690b] flex-1 max-w-[221px]"></div>
          <h2 className="text-[26px] font-bold text-[#45690b] text-center uppercase whitespace-nowrap">
            Sản phẩm của Fordeer
          </h2>
          <div className="h-px bg-[#45690b] flex-1 max-w-[221px]"></div>
        </div>

        {/* Categories */}
        <div className="flex justify-center gap-12">
          {categories.map((category, index) => (
            <button
              key={index}
              className="flex flex-col items-center gap-3 group hover:scale-105 transition-all"
            >
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center transition-all"
                style={{ backgroundColor: category.bgColor }}
              >
                <img
                  src={category.image}
                  alt={category.label}
                  className="w-20 h-20 object-contain"
                />
              </div>
              <span
                className="text-[14px] font-bold"
                style={{ color: category.textColor }}
              >
                {category.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
