export default function BenefitsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1152px] mx-auto px-4">
        <h3 className="text-[36px] font-bold text-[#42612e] text-center mb-12 leading-[39.86px]">
          NHỮNG ĐẶC QUYỀN CỦA TREEMAN
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#45690b] rounded-[28px] p-8 text-white flex items-center justify-center h-[112px]">
            <h4 className="text-[36px] font-bold leading-[39.86px]">
              Thu nhập cạnh tranh
            </h4>
          </div>
          <div className="bg-[#45690b] rounded-[28px] p-8 text-white flex items-center justify-center h-[112px]">
            <h4 className="text-[36px] font-bold leading-[39.86px]">
              Môi trường thân thiện
            </h4>
          </div>
          <div className="bg-[#45690b] rounded-[28px] p-8 text-white flex items-center justify-center h-[112px]">
            <h4 className="text-[36px] font-bold leading-[39.86px]">
              Cơ hội phát triển
            </h4>
          </div>
          <div className="bg-[#45690b] rounded-[28px] p-8 text-white flex items-center justify-center h-[112px]">
            <h4 className="text-[32px] font-bold text-center leading-[35.44px]">
              Nhiều ưu đãi riêng cho Treeman
            </h4>
          </div>
          <div className="bg-[#45690b] rounded-[28px] p-8 text-white flex items-center justify-center h-[112px] md:col-start-1 md:col-end-2 md:ml-[25%]">
            <h4 className="text-[36px] font-bold leading-[39.86px]">
              Tham gia các sự kiện
            </h4>
          </div>
        </div>
      </div>
    </section>
  );
}
