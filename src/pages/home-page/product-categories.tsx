import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export default function ProductCategories() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.2);
  const { ref: textRef, isVisible: textVisible } = useScrollAnimation(0.2);
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation(0.3);

  return (
    <section className="py-8 md:py-16 bg-[#fcfcf6] mb-10 md:mb-20 overflow-hidden">
      <div className="max-w-[1152px] mx-auto px-4">
        {/* Story Section */}
        <div className="max-w-[900px] mx-auto text-center mb-8 md:mb-12">
          <div ref={titleRef}>
            <h3
              className={`text-[28px] sm:text-[36px] md:text-[48px] lg:text-[56px] font-bold text-[#45690b] mb-4 md:mb-6 uppercase transition-all duration-700 ${
                titleVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              Chuyện "Nhà"
            </h3>
          </div>

          <div ref={textRef}>
            <p
              className={`text-[14px] sm:text-[16px] md:text-[22px] lg:text-[30px] text-[#1d4220] leading-relaxed mb-6 md:mb-8 transition-all duration-700 delay-200 ${
                textVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              Fordeer Coffee tin rằng, nụ cười là hương vị ngọt ngào nhất trong
              mỗi ngày mới. Từ những ly cà phê đậm đà, những tách trà thanh mát,
              đến từng lời chào thân quen, chúng tôi mong mỗi vị khách khi ghé
              Nhà đều mang theo một niềm vui nhỏ – để rồi nụ cười ấy lại được
              lan toả khắp nơi.
            </p>
            <button className="bg-[#45690b] text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full text-[14px] md:text-[16px] font-bold hover:bg-[#42612e] hover:scale-105 hover:shadow-lg transition-all duration-300 uppercase">
              Tìm hiểu
            </button>
          </div>
        </div>

        {/* Banner Images Grid */}
        <div ref={imageRef} className="relative max-w-[900px] mx-auto">
          {/* Main center image */}
          <div
            className={`mt-8 md:mt-[100px] rounded-xl md:rounded-2xl overflow-hidden shadow-xl transition-all duration-1000 ${
              imageVisible
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-20 scale-95"
            }`}
          >
            <img
              src="/banner-home.png"
              alt="Fordeer Coffee Story"
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
