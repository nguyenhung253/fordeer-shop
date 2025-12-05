import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const newsItems = [
  {
    title: "MÙA YÊU THƯƠNG - CÂY NỘI THẤT, SEN ĐÁ ĐỒNG GIÁ TỪ 9K",
    description:
      "Lối sống đơn giản, tinh gọn đang là xu hướng xong xã hội hiện đại. Workshop Kokedama của Tropical Forest...",
    image: "/news-1.png",
  },
  {
    title: "MÙA YÊU THƯƠNG - CÂY NỘI THẤT, SEN ĐÁ ĐỒNG GIÁ TỪ 9K",
    description:
      "Những tháng cuối năm đã về, và cũng đã đến lúc đặt xuống những âu lo để đón mùa yêu thương mới.",
    image: "/news-2.png",
  },
  {
    title: "NHẶT CÂY THẢ GA MANG RỪNG VỀ NHÀ",
    description:
      'Mở đầu cho mùa lễ hội năm 2020, Tropical Forest mang đến cho khách hàng sự kiện tri ân "NHẶT CÂY...',
    image: "/news-3.png",
  },
  {
    title: "WORKSHOP LÀM TRANH BẰNG LÁ",
    description:
      "Sau bao nhiêu ngày xa cách Rừng Mai Hắc Đế đã trở lại với chuỗi workshop thật thú vị vào mỗi cuối tuần.",
    image: "/news-4.png",
  },
  {
    title: "CHĂM CÂY MÙA LẠNH - CÓ THỂ BẠN CHƯA BIẾT?",
    description:
      "Một chiếc cây cũng như một con người vậy - Mùa đông tới cũng cần được mặc áo ấm, yêu thương...",
    image: "/news-5.png",
  },
  {
    title: "[CUỘC THI] TẮM RỪNG - FINDING PEACE IN NATURE",
    description:
      "Có lúc nào bạn cảm thấy mệt mỏi, muốn bỏ hết mọi thứ để đến một nơi chỉ có mình ta với núi rừng bao la...",
    image: "/news-6.png",
  },
];

export default function NewsSection() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.2);
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation(0.1);

  return (
    <section className="py-8 md:py-16 bg-[#fcfcf6] overflow-hidden">
      <div className="max-w-[1152px] mx-auto px-4">
        {/* Section Title */}
        <div
          ref={titleRef}
          className={`flex items-center justify-center gap-3 md:gap-4 mb-6 md:mb-12 transition-all duration-700 ${
            titleVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div
            className={`h-px bg-[#45690b] flex-1 max-w-[80px] md:max-w-[347px] transition-all duration-1000 delay-300 ${
              titleVisible ? "scale-x-100" : "scale-x-0"
            } origin-right`}
          />
          <h2 className="text-[18px] md:text-[26px] font-bold text-[#45690b] text-center uppercase whitespace-nowrap">
            Tin tức
          </h2>
          <div
            className={`h-px bg-[#45690b] flex-1 max-w-[80px] md:max-w-[347px] transition-all duration-1000 delay-300 ${
              titleVisible ? "scale-x-100" : "scale-x-0"
            } origin-left`}
          />
        </div>

        {/* News Grid - 2 cols on mobile, 3 cols on desktop */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-8"
        >
          {newsItems.map((item, index) => (
            <div
              key={index}
              className={`bg-[#fcfcfc] overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-500 cursor-pointer group ${
                gridVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="h-[120px] sm:h-[160px] md:h-[240px] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-2 sm:p-3 md:p-4 space-y-1.5 md:space-y-3">
                <h3 className="font-bold text-[#45690b] text-[10px] sm:text-[11px] md:text-[13px] leading-tight md:leading-[17.81px] group-hover:text-[#799a01] transition-colors duration-300 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-[9px] sm:text-[10px] md:text-[13px] text-[#45690b] leading-tight md:leading-[17.81px] line-clamp-2 hidden sm:block">
                  {item.description}
                </p>
                <div className="flex justify-end">
                  <button className="bg-[#799a01] hover:bg-[#45690b] text-white text-[9px] sm:text-[10px] md:text-[13px] px-3 sm:px-4 md:px-6 py-1 md:py-1.5 rounded-[23px] font-bold transition-all duration-300 leading-tight md:leading-[14.17px] hover:scale-105 hover:shadow-md">
                    ĐỌC TIẾP
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <a
            href="#"
            className="text-[#799a01] text-[13px] md:text-[16px] hover:text-[#45690b] transition-colors duration-300 relative group"
          >
            Xem tất cả
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#45690b] group-hover:w-full transition-all duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
}
