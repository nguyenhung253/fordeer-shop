export default function PositionsSection() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1152px] mx-auto px-4">
        <h3 className="text-[36px] font-bold text-[#42612e] text-center mb-12 leading-[39.86px]">
          BẠN MUỐN ỨNG TUYỂN VỊ TRÍ NÀO
        </h3>

        {/* Featured Position Buttons */}
        <div className="flex justify-center gap-8 mb-8">
          <button className="px-12 py-5 bg-[#45690b] text-white text-[36px] font-bold rounded-[29px] hover:bg-[#42612e] transition-colors leading-[39.86px]">
            Barista
          </button>
          <button className="px-12 py-5 bg-[#45690b] text-white text-[36px] font-bold rounded-[29px] hover:bg-[#42612e] transition-colors leading-[39.86px]">
            Trưởng ca
          </button>
        </div>

        <div className="text-center mb-16">
          <a
            href="#"
            className="text-[#45690b] text-lg inline-flex items-center gap-2 hover:underline leading-[19.93px]"
          >
            Xem thêm các vị trí khác
            <span>→</span>
          </a>
        </div>

        {/* Position Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Office Positions Card */}
          <div className="bg-[#45690b] rounded-[37px] p-8 text-white">
            <div className="h-[410px] rounded-[37px] mb-6 overflow-hidden">
              <img
                src="/requi-1.png"
                alt="Khối văn phòng"
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="text-[36px] font-bold mb-4 leading-[39.86px]">
              KHỐI VĂN PHÒNG
            </h4>
            <ul className="space-y-2 mb-6">
              <li className="text-2xl leading-[26.58px]">Kế toán</li>
              <li className="text-2xl leading-[26.58px]">Designer</li>
              <li className="text-2xl leading-[26.58px]">Marketing</li>
            </ul>
            <button className="text-2xl font-bold hover:underline leading-[26.58px]">
              Xem thêm
            </button>
          </div>

          {/* Store Positions Card */}
          <div className="bg-[#45690b] rounded-[37px] p-8 text-white">
            <div className="h-[410px] rounded-[37px] mb-6 overflow-hidden">
              <img
                src="/requi-2.png"
                alt="Khối cửa hàng"
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="text-[36px] font-bold mb-4 leading-[39.86px]">
              KHỐI CỬA HÀNG
            </h4>
            <ul className="space-y-2 mb-6">
              <li className="text-2xl leading-[26.58px]">Quản lý</li>
              <li className="text-2xl leading-[26.58px]">Trưởng ca</li>
              <li className="text-2xl leading-[26.58px]">Barista</li>
            </ul>
            <button className="text-2xl font-bold hover:underline leading-[26.58px]">
              Xem thêm
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
