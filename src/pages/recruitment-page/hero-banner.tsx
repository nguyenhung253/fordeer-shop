export default function HeroBanner() {
  return (
    <>
      {/* Title Section with Lines */}
      <section className="py-12 bg-white">
        <div className="max-w-[1152px] mx-auto px-4">
          <div className="flex items-center justify-center gap-8">
            <div className="h-[2px] w-[335px] bg-[#45690b]" />
            <h2 className="text-[26px] font-bold text-[#45690b] whitespace-nowrap leading-[26px]">
              TUYỂN DỤNG
            </h2>
            <div className="h-[2px] w-[330px] bg-[#45690b]" />
          </div>
        </div>
      </section>

      {/* Hero Banner Section */}
      <section className="relative w-full h-[600px] overflow-hidden">
        <img
          src="/banner-requirement.png"
          alt="Recruitment Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </section>
    </>
  );
}
