"use client";
import Link from "next/link";
import Typewriter from "typewriter-effect";
import { ChevronDown } from "lucide-react";

function WelcomeHome() {
  return (
    <div className="relative w-full min-h-[calc(100vh-72px)] overflow-hidden flex items-center">
      {/* Full-screen video background — plays on all screen sizes */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/naji.mp4" type="video/mp4" />
      </video>

      {/* Left-to-right gradient: dark on left (text side) → fades right */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25" />

      {/* Bottom vignette for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full lg:w-[55%] px-6 md:px-14 xl:px-28 py-16 flex flex-col gap-8 items-center text-center lg:items-start lg:text-left">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-white/90">
          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          Tennis Net Club — Since 2010
        </span>

        {/* Headline */}
        <div>
          <h1 className="text-5xl font-extrabold md:text-6xl xl:text-7xl text-white leading-tight drop-shadow-md">
            Elevate Your
          </h1>
          <div className="text-4xl font-extrabold md:text-5xl xl:text-6xl text-green-400 mt-2 min-h-[3rem] md:min-h-[4rem] drop-shadow-md">
            <Typewriter
              options={{ loop: true }}
              onInit={(tw) => {
                tw.typeString("Tennis Game")
                  .pauseFor(2500)
                  .deleteAll()
                  .typeString("Court Skills")
                  .pauseFor(2500)
                  .deleteAll()
                  .typeString("Community")
                  .pauseFor(2500)
                  .deleteAll()
                  .start();
              }}
            />
          </div>
        </div>

        {/* Description */}
        <p className="text-base md:text-lg text-gray-200 max-w-md leading-relaxed">
          Book courts, find playing partners, and train with certified coaches —
          all in one place. The court is set.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-row flex-wrap gap-3 justify-center lg:justify-start">
          <Link
            href="/auth/signup"
            className="inline-flex items-center px-7 py-3.5 rounded-xl bg-green-500 hover:bg-green-400 active:scale-[0.98] text-white font-semibold text-base transition-all shadow-lg shadow-green-900/40"
          >
            Become A Member →
          </Link>
          <Link
            href="/booking/court"
            className="inline-flex items-center px-7 py-3.5 rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm text-white font-semibold text-base hover:bg-white/20 active:scale-[0.98] transition-all"
          >
            Book a Court
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-white/50 animate-bounce">
        <ChevronDown size={28} />
      </div>
    </div>
  );
}

export default WelcomeHome;
