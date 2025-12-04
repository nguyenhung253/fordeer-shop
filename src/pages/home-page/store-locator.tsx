import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export default function StoreLocator() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.2);
  const { ref: contentRef, isVisible: contentVisible } =
    useScrollAnimation(0.2);

  return (
    <section className="py-12 mb-10 overflow-hidden">
      <div className="max-w-[1152px] mx-auto px-4">
        {/* Section Title */}
        <div
          ref={titleRef}
          className={`flex items-center justify-center gap-4 mb-10 transition-all duration-700 ${
            titleVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div
            className={`h-px bg-[#45690b] flex-1 max-w-[328px] transition-all duration-1000 delay-300 ${
              titleVisible ? "scale-x-100" : "scale-x-0"
            } origin-right`}
          />
          <h2 className="text-[26px] font-bold text-[#45690b] text-center uppercase">
            Cửa hàng
          </h2>
          <div
            className={`h-px bg-[#45690b] flex-1 max-w-[332px] transition-all duration-1000 delay-300 ${
              titleVisible ? "scale-x-100" : "scale-x-0"
            } origin-left`}
          />
        </div>

        <div ref={contentRef} className="grid grid-cols-2 gap-8">
          {/* Store Image */}
          <div
            className={`relative h-[334px] overflow-hidden rounded-lg shadow-lg transition-all duration-700 ${
              contentVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <img
              src="/shop-img.png"
              alt="Cửa hàng"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Store Finder */}
          <div
            className={`flex flex-col justify-center space-y-6 shadow-md bg-white p-8 rounded-lg transition-all duration-700 delay-200 ${
              contentVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center gap-3 group">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="group-hover:scale-110 group-hover:animate-bounce transition-transform duration-300"
                >
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                    fill="#42612e"
                  />
                </svg>
                <h3 className="text-[18px] font-bold text-[#42612e] uppercase">
                  Tìm một cửa hàng gần bạn
                </h3>
              </div>
            </div>

            <div className="relative group">
              <select className="w-full h-[41px] px-4 bg-white border border-gray-300 text-[#45690b] text-[13px] appearance-none cursor-pointer hover:border-[#45690b] focus:border-[#45690b] focus:ring-2 focus:ring-[#d9ef7f] transition-all duration-300 rounded-lg">
                <option>Vui lòng chọn quận, huyện</option>
                <option>Cầu Giấy</option>
                <option>Đống Đa</option>
                <option>Ba Đình</option>
                <option>Hoàn Kiếm</option>
                <option>Hai Bà Trưng</option>
              </select>
              <svg
                className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none group-hover:translate-y-[-40%] transition-transform duration-300"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M7 10l5 5 5-5"
                  stroke="#45690b"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <button className="w-full bg-[#45690b] text-white py-3 rounded-full font-bold hover:bg-[#42612e] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md hover:shadow-lg">
              Tìm cửa hàng
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
