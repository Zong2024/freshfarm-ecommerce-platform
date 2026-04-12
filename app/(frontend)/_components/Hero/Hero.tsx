import Image from "next/image";

import backgroundImage from "@/public/image/hero-bg.webp";

import { HeroProps } from "./Hero.types";

export const Hero = ({ title, subtitle }: HeroProps) => {
  return (
    <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden md:h-[70vh]">
      <Image
        src={backgroundImage}
        alt="FreshFarm Background"
        placeholder="blur"
        quality={90}
        fill
        sizes="100vw"
        priority
        className="object-cover object-center transition-transform duration-1000"
      />
      {/* 專業漸層遮罩：左深右淺，確保文字清晰同時展現圖片質感 */}
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent" />

      <div className="relative z-10 container mx-auto flex h-full items-center px-6">
        <div className="animate-in fade-in slide-in-from-left-8 max-w-3xl duration-1000">
          {/* 品牌小標籤 */}
          <div className="mb-6 flex items-center gap-3">
            <span className="bg-primary h-[2px] w-8" />
            <span className="text-primary-100 text-sm font-bold tracking-[0.2em] uppercase">
              Pure & Natural Organic
            </span>
          </div>

          <div className="font-heading space-y-2">
            <h1 className="text-primary-100 text-5xl font-black tracking-tighter md:text-8xl">
              Fresh Farm
            </h1>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-6xl">
              {title}
            </h2>
          </div>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/80 md:text-2xl">
            {subtitle}
          </p>

          <div className="mt-10 flex gap-4">
            <div className="bg-primary h-1 w-20 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};
