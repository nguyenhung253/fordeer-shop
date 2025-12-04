import { useEffect, useState } from "react";

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative w-full h-[607px] overflow-hidden bg-[#ede8ea] mb-20">
      {/* Background Image */}
      <div className="absolute inset-0 flex">
        <div className="w-[489px] bg-[#ede8ea]"></div>
        <img
          src="/banner.png"
          alt="Fordeer Coffee"
          className={`flex-1 w-full h-full object-cover transition-all duration-1000 ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        />
      </div>

      {/* Content */}
      <div className="relative max-w-[1152px] mx-auto px-4 h-full flex items-center">
        <div className="max-w-[481px] space-y-6">
          {/* Title */}
          <h1
            className={`text-[90px] font-bold text-[#799a01] leading-[87px] tracking-tight transition-all duration-700 delay-300 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            FORDEER
          </h1>

          {/* Coffee Badge */}
          <div
            className={`inline-block bg-[#45690b] px-8 py-3 rounded-[19px] transition-all duration-700 delay-500 hover:scale-105 hover:shadow-xl ${
              isLoaded
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <span className="text-[48px] font-bold text-white leading-[47px]">
              COFFEE
            </span>
          </div>

          {/* Subtitle */}
          <p
            className={`text-[36px] text-[#45690b] leading-[45px] font-normal transition-all duration-700 delay-700 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            Những khu rừng nhiệt đới
            <br />
            lạc giữa thành phố lớn
          </p>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div
        className={`absolute bottom-20 right-40 w-4 h-4 bg-[#d9ef7f] rounded-full animate-bounce transition-opacity duration-1000 delay-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`absolute top-40 right-60 w-3 h-3 bg-[#799a01] rounded-full animate-pulse transition-opacity duration-1000 delay-1200 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </section>
  );
}
