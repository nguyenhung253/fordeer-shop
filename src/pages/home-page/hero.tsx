export default function Hero() {
  return (
    <section className="relative w-full h-[607px] overflow-hidden bg-[#ede8ea]">
      {/* Background Image */}
      <div className="absolute inset-0 flex">
        <div className="w-[489px] bg-[#ede8ea]"></div>
        <img
          src="/banner.png"
          alt="Fordeer Coffee"
          className="flex-1 w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative max-w-[1152px] mx-auto px-4 h-full flex items-center">
        <div className="max-w-[481px] space-y-6">
          {/* Title */}
          <h1 className="text-[90px] font-bold text-[#799a01] leading-[87px] tracking-tight">
            FORDEER
          </h1>

          {/* Coffee Badge */}
          <div className="inline-block bg-[#45690b] px-8 py-3 rounded-[19px]">
            <span className="text-[48px] font-bold text-white leading-[47px]">
              COFFEE
            </span>
          </div>

          {/* Subtitle */}
          <p className="text-[36px] text-[#45690b] leading-[45px] font-normal">
            Những khu rừng nhiệt đới
            <br />
            lạc giữa thành phố lớn
          </p>
        </div>
      </div>
    </section>
  );
}
