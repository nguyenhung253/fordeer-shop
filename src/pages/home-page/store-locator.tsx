export default function StoreLocator() {
  return (
    <section className=" py-12 mb-10">
      <div className="max-w-[1152px] mx-auto px-4">
        {/* Section Title */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px bg-[#45690b] flex-1 max-w-[328px]"></div>
          <h2 className="text-[26px] font-bold text-[#45690b] text-center uppercase">
            Cửa hàng
          </h2>
          <div className="h-px bg-[#45690b] flex-1 max-w-[332px]"></div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Store Image */}
          <div className="relative h-[334px] overflow-hidden">
            <img
              src="/shop-img.png"
              alt="Cửa hàng"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Store Finder */}
          <div className="flex flex-col justify-center space-y-6 shadow-md bg-white p-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
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

            <div className="relative">
              <select className="w-full h-[41px] px-4 bg-white border border-gray-300 text-[#45690b] text-[13px] appearance-none cursor-pointer">
                <option>Vui lòng chọn quận, huyện</option>
                <option>Cầu Giấy</option>
                <option>Đống Đa</option>
                <option>Ba Đình</option>
                <option>Hoàn Kiếm</option>
                <option>Hai Bà Trưng</option>
              </select>
              <svg
                className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
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
          </div>
        </div>
      </div>
    </section>
  );
}
