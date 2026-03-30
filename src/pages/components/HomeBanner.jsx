import React, { useState, useEffect } from "react";
import { Search, Megaphone, Sparkles, BadgePercent, Rocket, Gem } from "lucide-react";

const HomeBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [iconTick, setIconTick] = useState(0);

  const banners = [
    {
      id: 1,
      title: "치트키로 시작하기!",
      sub: "대학생 포트폴리오의 모든 것",
      gradient: "bg-gradient-to-r from-[#F4A261] via-[#E9C46A] to-[#E76F51]",
      iconColors: ["#FFE7C2", "#FFF3D6", "#FFD9B4", "#FFE2CC"],
    },
    {
      id: 2,
      title: "이번 주 인기 템플릿",
      sub: "선배들의 합격 비결 확인하기",
      gradient: "bg-gradient-to-r from-[#1FBA9E] via-[#2A9D8F] to-[#264653]",
      iconColors: ["#D7FFF7", "#BFEDE6", "#A9E8DD", "#E0FFFA"],
    },
    {
      id: 3,
      title: "PDF/이력서 완성",
      sub: "빠르게 템플릿 완성하기",
      gradient: "bg-gradient-to-r from-[#E76F51] via-[#F4A261] to-[#E9D758]",
      iconColors: ["#FFE1D7", "#FFE9C8", "#FFF3BD", "#FFD2C3"],
    },
    {
      id: 4,
      title: "브론의 프리미엄 멤버십",
      sub: "상단 노출과 PREMIUM 배지로\n더 많은 수익 창출하기",
      gradient: "bg-gradient-to-r from-[#8B5CF6] via-[#D8B4FE] to-[#F3E8FF]",
      iconColors: ["#DDD6FE", "#E9D5FF", "#F3E8FF", "#EDE9FE"],
    },
  ];

  const movingIcons = [
    { id: 1, Icon: Megaphone, y: 22, speed: 0.8, size: 20, delay: 0 },
    { id: 2, Icon: Sparkles, y: 36, speed: 1.05, size: 18, delay: 23 },
    { id: 3, Icon: BadgePercent, y: 52, speed: 0.9, size: 22, delay: 41 },
    { id: 4, Icon: Rocket, y: 68, speed: 1.2, size: 20, delay: 57 },
    { id: 5, Icon: Gem, y: 80, speed: 0.95, size: 18, delay: 76 },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [banners.length]);

  useEffect(() => {
    const iconTimer = setInterval(() => {
      setIconTick((prev) => (prev + 1) % 10000);
    }, 45);
    return () => clearInterval(iconTimer);
  }, []);

  return (
    <div className="relative w-full h-80 overflow-hidden shadow-lg">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-1000 flex flex-col items-center justify-center text-center px-6 text-white ${banner.gradient} ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {movingIcons.map((icon, iconIndex) => {
              const x = ((iconTick * icon.speed + icon.delay) % 140) - 20;
              const drift = Math.sin((iconTick + icon.delay) / 28) * 8;
              const rotate = Math.sin((iconTick + icon.delay) / 36) * 10;
              const IconComp = icon.Icon;

              return (
                <div
                  key={`${banner.id}-${icon.id}`}
                  className="absolute transition-transform duration-75"
                  style={{
                    left: `${x}%`,
                    top: `${icon.y + drift}%`,
                    transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
                    color: banner.iconColors[iconIndex % banner.iconColors.length],
                    opacity: 0.42,
                  }}
                >
                  <IconComp size={icon.size} strokeWidth={2.2} />
                </div>
              );
            })}
          </div>

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_56%)] pointer-events-none" />
          <h2 className="text-4xl font-extrabold mb-2 drop-shadow-lg">{banner.title}</h2>
          <p className="text-lg opacity-95 mb-10 drop-shadow-md whitespace-pre-line">{banner.sub}</p>

          <div className="w-full max-w-lg flex items-center bg-white/15 backdrop-blur-md rounded-full px-6 py-4 shadow-2xl border border-white/30">
            <Search className="text-white mr-3" size={20} />
            <input
              type="text"
              placeholder="검색: 템플릿, 가이드..."
              className="flex-1 bg-transparent text-white placeholder-white/80 outline-none text-base"
            />
          </div>
        </div>
      ))}

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, i) => (
          <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === currentSlide ? 'bg-white' : 'bg-white/40'}`} />
        ))}
      </div>
    </div>
  );
};

export default HomeBanner;
