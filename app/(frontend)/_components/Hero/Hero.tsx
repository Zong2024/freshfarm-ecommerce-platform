import Image from "next/image";

import backgroundImage from "@/public/image/hero-bg.jpg";

import { HeroProps } from "./Hero.types";

export const Hero = ({ title, subtitle }: HeroProps) => {
  return (
    <section className="relative h-100 w-full overflow-hidden px-4 md:h-200">
      <Image
        src={backgroundImage}
        alt="FreshFarm Background"
        placeholder="blur"
        quality={80}
        fill
        sizes="100vw"
        priority
        className="object-cover object-left md:object-center"
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 container mx-auto flex h-full items-center justify-start text-white md:justify-start">
        <div className="text-start">
          <div className="lg:flex">
            <h1 className="text-primary-100 text-2xl font-bold md:me-1 md:text-5xl">
              Fresh Farm
            </h1>
            <h4 className="mt-1 text-2xl font-bold md:mt-0 md:text-5xl">
              {title}
            </h4>
          </div>
          <h4 className="mt-3 text-xl font-bold md:text-3xl">{subtitle}</h4>
        </div>
      </div>
    </section>
  );
};
