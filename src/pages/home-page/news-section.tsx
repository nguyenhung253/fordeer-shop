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
  return (
    <section className="py-16 bg-[#fcfcf6]">
      <div className="max-w-[1152px] mx-auto px-4">
        {/* Section Title */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-px bg-[#45690b] flex-1 max-w-[347px]"></div>
          <h2 className="text-[26px] font-bold text-[#45690b] text-center uppercase">
            Tin tức
          </h2>
          <div className="h-px bg-[#45690b] flex-1 max-w-[347px]"></div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {newsItems.map((item, index) => (
            <div
              key={index}
              className="bg-[#fcfcfc] overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="h-[240px] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 space-y-3">
                <h3 className="font-bold text-[#45690b] text-[13px] leading-[17.81px]">
                  {item.title}
                </h3>
                <p className="text-[13px] text-[#45690b] leading-[17.81px]">
                  {item.description}
                </p>
                <div className="flex justify-end">
                  <button className="bg-[#799a01] hover:bg-[#45690b] text-white text-[13px] px-6 py-1.5 rounded-[23px] font-bold transition-colors leading-[14.17px]">
                    ĐỌC TIẾP
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <a href="#" className="text-[#799a01] text-[16px] hover:underline">
            Xem tất cả
          </a>
        </div>
      </div>
    </section>
  );
}
