export default function Footer() {
  return (
    <footer className="relative bg-[#264213] text-white py-8 md:py-12">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 opacity-20">
        <img
          src="/footer-img.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative max-w-[1152px] mx-auto px-4">
        {/* Mobile Layout */}
        <div className="flex flex-col items-center text-center md:hidden">
          {/* Logo + QR */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <img
              src="/footer-logo.png"
              alt="Fordeer Coffee"
              className="h-16 object-contain"
            />
            <img src="/footer-qr.png" alt="QR Code" className="w-14 h-14" />
          </div>

          {/* Description */}
          <p className="text-[14px] leading-relaxed font-bold mb-4 max-w-[300px]">
            Đăng kí trở thành một thành viên FORDEER để tích điểm và những đặc
            quyền đến từ RỪNG!
          </p>

          {/* Contact Button */}
          <button className="bg-[#45690b] text-white px-6 py-2 rounded-full text-[12px] font-bold mb-6 hover:bg-[#3a5a09] transition-colors">
            LIÊN HỆ
          </button>

          {/* Contact Info - 2 columns */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-[12px] w-full max-w-[360px]">
            {/* Left column */}
            <div className="text-left space-y-3">
              <div className="flex items-start gap-2">
                <svg
                  width="12"
                  height="15"
                  viewBox="0 0 16 20"
                  fill="none"
                  className="mt-0.5 flex-shrink-0"
                >
                  <path
                    d="M8 0C3.58 0 0 3.58 0 8c0 7 8 12 8 12s8-5 8-12c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"
                    fill="#fefefe"
                  />
                </svg>
                <div>
                  <p className="font-bold">Fordeer Coffee</p>
                  <p>217 Tô Hiệu, Cầu Giấy, Hà Nội</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 15 19"
                  fill="none"
                  className="mt-0.5 flex-shrink-0"
                >
                  <path
                    d="M3.62 7.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V17c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
                    fill="#fefefe"
                  />
                </svg>
                <p>
                  <span className="font-bold">Hotline:</span> 0971953116
                </p>
              </div>
            </div>
            {/* Right column */}
            <div className="text-left space-y-3">
              <div className="flex items-start gap-2">
                <svg
                  width="14"
                  height="11"
                  viewBox="0 0 18 14"
                  fill="none"
                  className="mt-0.5 flex-shrink-0"
                >
                  <path
                    d="M16 0H2C.9 0 .01.9.01 2L0 12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zm0 4l-7 4.5L2 4V2l7 4.5L16 2v2z"
                    fill="#fefefe"
                  />
                </svg>
                <p>
                  <span className="font-bold">Email:</span>{" "}
                  info@tropicalforest.vn
                </p>
              </div>
              <div className="flex items-start gap-2">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 18 18"
                  fill="none"
                  className="mt-0.5 flex-shrink-0"
                >
                  <path
                    d="M16 0H2C.9 0 0 .9 0 2v14c0 1.1.9 2 2 2h7v-7H6V8.5h3V6.5c0-2.7 1.7-4.2 4.1-4.2 1.2 0 2.2.1 2.5.1v2.9h-1.7c-1.3 0-1.6.6-1.6 1.5v2h3.2l-.4 2.5h-2.8V18H16c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2z"
                    fill="#fefefe"
                  />
                </svg>
                <p>
                  <span className="font-bold">Fanpage:</span>{" "}
                  facebook.com/Fordeer.vn
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex justify-between items-start">
          {/* Left Column - Branding */}
          <div className="space-y-6">
            <div className="w-[390px] h-[161px]">
              <img
                src="/footer-logo.png"
                alt="Fordeer Coffee"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-[18px] leading-[27.5px] font-bold max-w-[306px]">
              Đăng kí trở thành một thành viên FORDEER để tích điểm và những đặc
              quyền đến từ RỪNG!
            </p>
          </div>

          {/* Center - QR Code */}
          <div className="flex items-end pt-[180px]">
            <img
              src="/footer-qr.png"
              alt="QR Code"
              className="w-[82px] h-[82px]"
            />
          </div>

          {/* Right Column - Contact Info */}
          <div className="space-y-6">
            <h3 className="text-[24px] font-normal">LIÊN HỆ:</h3>
            <div className="space-y-4 text-[20px] leading-[33.78px]">
              <div className="flex items-start gap-3">
                <svg
                  width="16"
                  height="20"
                  viewBox="0 0 16 20"
                  fill="none"
                  className="mt-1.5"
                >
                  <path
                    d="M8 0C3.58 0 0 3.58 0 8c0 7 8 12 8 12s8-5 8-12c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"
                    fill="#fefefe"
                  />
                </svg>
                <div>
                  <p className="font-normal">Fordeer Coffee</p>
                  <p className="font-normal">217 Tô Hiệu, Cầu Giấy, Hà Nội</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg
                  width="15"
                  height="19"
                  viewBox="0 0 15 19"
                  fill="none"
                  className="mt-1.5"
                >
                  <path
                    d="M3.62 7.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V17c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
                    fill="#fefefe"
                  />
                </svg>
                <div>
                  <p className="font-normal">Hotline: 0971953116</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg
                  width="18"
                  height="14"
                  viewBox="0 0 18 14"
                  fill="none"
                  className="mt-1.5"
                >
                  <path
                    d="M16 0H2C.9 0 .01.9.01 2L0 12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zm0 4l-7 4.5L2 4V2l7 4.5L16 2v2z"
                    fill="#fefefe"
                  />
                </svg>
                <div>
                  <p className="font-normal">Email: info@tropicalforest.vn</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  className="mt-1.5"
                >
                  <path
                    d="M16 0H2C.9 0 0 .9 0 2v14c0 1.1.9 2 2 2h7v-7H6V8.5h3V6.5c0-2.7 1.7-4.2 4.1-4.2 1.2 0 2.2.1 2.5.1v2.9h-1.7c-1.3 0-1.6.6-1.6 1.5v2h3.2l-.4 2.5h-2.8V18H16c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2z"
                    fill="#fefefe"
                  />
                </svg>
                <div>
                  <p className="font-normal">
                    Fanpage: facebook.com/Fordeer.vn
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
