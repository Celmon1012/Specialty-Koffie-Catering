"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { partnerLogos } from "../lib/logos";

type ImageItem = { src: string; alt?: string };

interface Props {
  images?: ImageItem[];
  repeatCount?: number;
  pxPerSec?: number;
  wrapperClassName?: string;
  imgClassName?: string;
}

export default function LogoMarquee({
  images = partnerLogos,
  repeatCount = 16,
  pxPerSec = 120,
  wrapperClassName = "",
  imgClassName = "h-[40px] md:h-[60px] w-auto marquee-logo lg:opacity-40 lg:grayscale",
}: Props) {
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const durationRef = useRef<string>("20s");

  useEffect(() => {
    function update() {
      const el = marqueeRef.current;
      if (!el) return;
      const width = el.scrollWidth || el.getBoundingClientRect().width || 1;
      const d = Math.max(6, Math.round(width / pxPerSec));
      const newVal = `${d}s`;
      if (durationRef.current !== newVal) {
        durationRef.current = newVal;
        try {
          el.style.setProperty("--marquee-duration", newVal);
        } catch {
          // ignore style set errors
        }
      }
    }

    update();
    const ro = new ResizeObserver(update);
    if (marqueeRef.current) ro.observe(marqueeRef.current);
    window.addEventListener("load", update);

    return () => {
      ro.disconnect();
      window.removeEventListener("load", update);
    };
  }, [pxPerSec]);

  type CSSCustomProperties = { [key: `--${string}`]: string };
  // duration is applied directly to the element via `update()` above.
  const marqueeStyle: React.CSSProperties & CSSCustomProperties = {};

  const initialItems = Array.from({ length: repeatCount }).map((_, i) => images[i % images.length]);
  // Start with an initial list and extend dynamically to ensure the marquee
  // content width is at least twice the visible area (so translate(-50%) has no gap).
  const displayItemsInitial = [...initialItems, ...initialItems];
  const [displayItems, setDisplayItems] = useState<ImageItem[]>(() => displayItemsInitial);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;
    const marqueeEl = el; // stable local ref for nested functions

    // Ensure there are enough items to cover the visible area twice (for seamless -50% loop).
    let ensureFillRetries = 0;
    const lastFillTime = { current: 0 } as { current: number };
    function ensureFill() {
      try {
        // debounce rapid calls (avoid rapid state updates that restart animation)
        const now = Date.now();
        if (now - lastFillTime.current < 200) return;
        lastFillTime.current = now;

        const container = marqueeEl.parentElement || marqueeEl;
        const visible = container ? container.clientWidth || window.innerWidth : window.innerWidth;

        // If images are still loading, wait a short moment and retry so measurements include real image widths.
        const imgs = marqueeEl.querySelectorAll("img");
        const anyLoading = Array.from(imgs).some((i) => !(i as HTMLImageElement).complete);
        if (anyLoading && ensureFillRetries < 10) {
          ensureFillRetries++;
          setTimeout(ensureFill, 120);
          return;
        }

        const totalWidth = marqueeEl.scrollWidth || 0;

        // If already large enough, nothing to do
        if (totalWidth >= visible * 2) return;

        // Estimate average item width
        const avg = displayItems.length > 0 ? totalWidth / displayItems.length : 120;
        const neededPixels = visible * 2 - totalWidth;
        const neededItems = Math.ceil(neededPixels / Math.max(1, avg));
        const seqsToAdd = Math.ceil(neededItems / images.length);

        if (seqsToAdd > 0) {
          const toAppend: ImageItem[] = [];
          for (let s = 0; s < seqsToAdd; s++) {
            for (let k = 0; k < images.length; k++) toAppend.push(images[k]);
          }
          setDisplayItems((prev) => [...prev, ...toAppend]);
        }
      } catch {
        // ignore measurement errors
      }
    }

    // Try to ensure fill initially and whenever the marquee's own size changes
    ensureFill();
    const observed = marqueeEl; // observe the marquee content itself so scrollWidth changes are caught
    const ro = new ResizeObserver(() => ensureFill());
    ro.observe(observed);
    window.addEventListener("resize", ensureFill);
    window.addEventListener("load", ensureFill);

    // If we appended items, the parent's size may not change immediately in some browsers.
    // Retry a couple times to ensure we filled the width enough for a seamless loop.
    let retries = 0;
    function retryFill() {
      ensureFill();
      retries += 1;
      if (retries < 5) setTimeout(retryFill, 100);
    }
    retryFill();

    function handleVisibility() {
      try {
        if (!marqueeRef.current) return;
        // Ensure animation is running when the page becomes visible.
        marqueeRef.current.style.animationPlayState = "running";
        // Force-restart animation to avoid pauses in some browsers.
        marqueeRef.current.style.animation = "none";
        // trigger reflow
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        marqueeRef.current.offsetHeight;
        marqueeRef.current.style.animation = "";
      } catch {
        // swallow errors silently
      }
    }

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", ensureFill);
      window.removeEventListener("load", ensureFill);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [images, displayItems.length]);

  return (
    <div className={wrapperClassName}>
      <div ref={marqueeRef} style={marqueeStyle} className="flex w-max flex-row items-center animate-marquee-left-right gap-4 md:gap-8 lg:gap-12">
        {displayItems.map((img, idx) => (
          <div key={idx} className="flex-shrink-0">
            <Image src={img.src} alt={img.alt ?? ""} width={120} height={60} className={imgClassName} />
          </div>
        ))}
      </div>
    </div>
  );
}
