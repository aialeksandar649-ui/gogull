"use client";

import { useEffect, useRef, useState } from "react";

type LazyVideoProps = {
  src?: string;
  poster?: string;
  className?: string;
};

export function LazyVideo({ src, poster, className = "" }: LazyVideoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {visible && src ? (
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <div
          className="flex h-full min-h-[280px] w-full items-center justify-center bg-primary/20"
          style={
            poster
              ? {
                  backgroundImage: `url(${poster})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : undefined
          }
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg">
            <span className="ml-1 text-2xl text-primary">▶</span>
          </div>
        </div>
      )}
    </div>
  );
}
