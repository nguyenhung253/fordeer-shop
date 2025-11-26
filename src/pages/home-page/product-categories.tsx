export default function ProductCategories() {
  return (
    <section className="py-16 bg-[#fcfcf6] mb-20">
      <div className="max-w-[1152px] mx-auto px-4">
        {/* Story Section */}
        <div className="max-w-[900px] mx-auto text-center mb-12">
          <h3 className="text-[56px] font-bold text-[#45690b] mb-6 uppercase">
            Chuyện "Nhà"
          </h3>
          <p className="text-[30px] text-[#1d4220] leading-relaxed mb-8">
            Fordeer Coffee tin rằng, nụ cười là hương vị ngọt ngào nhất trong
            mỗi ngày mới. Từ những ly cà phê đậm đà, những tách trà thanh mát,
            đến từng lời chào thân quen, chúng tôi mong mỗi vị khách khi ghé Nhà
            đều mang theo một niềm vui nhỏ – để rồi nụ cười ấy lại được lan toả
            khắp nơi.
          </p>
          <button className="bg-[#45690b] text-white px-8 py-3 rounded-full text-[16px] font-bold hover:bg-[#42612e] transition-colors uppercase">
            Tìm hiểu
          </button>
        </div>

        {/* Banner Images Grid */}
        <div className="relative max-w-[900px] mx-auto">
          {/* Main center image */}
          <div className="mt-[100px] rounded-2xl overflow-hidden shadow-xl">
            <img
              src="/banner-home.png"
              alt="Fordeer Coffee Story"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
