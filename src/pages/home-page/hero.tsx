import { useEffect, useState } from "react";

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative w-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:h-[607px] overflow-hidden bg-[#ede8ea] mb-8 md:mb-20">
      {/* Background Image */}
      <div className="absolute inset-0 flex">
        {/* Left colored area - hidden on mobile */}
        <div className="hidden md:block w-[300px] lg:w-[489px] bg-[#ede8ea]"></div>
        <img
          src="/banner.png"
          alt="Fordeer Coffee"
          className={`flex-1 w-full h-full object-cover object-center md:object-right transition-all duration-1000 ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        />
        {/* Mobile overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#ede8ea]/95 via-[#ede8ea]/70 to-transparent md:hidden" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 max-w-[1152px] mx-auto px-4 flex items-center md:items-center">
        {/* Mobile: position at bottom, Desktop: center */}
        <div className="max-w-[481px] space-y-2 sm:space-y-3 md:space-y-6 mt-auto mb-22 sm:mb-26 md:mt-0 md:mb-0">
          {/* Title */}
          <h1
            className={`text-[40px] sm:text-[56px] md:text-[72px] lg:text-[90px] font-bold text-[#799a01] leading-[1] tracking-tight transition-all duration-700 delay-300 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            FORDEER
          </h1>

          {/* Coffee Badge */}
          <div
            className={`inline-block bg-[#45690b] px-4 sm:px-6 md:px-8 py-2 md:py-3 rounded-[12px] md:rounded-[19px] transition-all duration-700 delay-500 hover:scale-105 hover:shadow-xl ${
              isLoaded
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <span className="text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-bold text-white leading-[1]">
              COFFEE
            </span>
          </div>

          {/* Subtitle */}
          <p
            className={`text-[16px] sm:text-[20px] md:text-[28px] lg:text-[36px] text-[#45690b] leading-[1.3] font-normal transition-all duration-700 delay-700 ${
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

      {/* Floating decorative elements - hidden on mobile */}
      <div
        className={`hidden md:block absolute bottom-20 right-40 w-4 h-4 bg-[#d9ef7f] rounded-full animate-bounce transition-opacity duration-1000 delay-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`hidden md:block absolute top-40 right-60 w-3 h-3 bg-[#799a01] rounded-full animate-pulse transition-opacity duration-1000 delay-1200 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </section>
  );
}
