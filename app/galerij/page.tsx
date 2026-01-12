import React from "react";
import Image from "next/image";
import Footer2 from "../footer2";

const galleryImages = [
  { src: "/G001.webp", alt: "Barista in actie" },
  { src: "/G002.webp", alt: "Selfie in discobal" },
  { src: "/G003.webp", alt: "Espresso word gezet" },
  { src: "/G004.webp", alt: "Sfeerfoto bij koffiebar" },
  { src: "/G005.webp", alt: "Barista in actie" },
  { src: "/G006.webp", alt: "Latte art" },
  { src: "/G007.webp", alt: "Koffiebar word afgebouwd" },
  { src: "/G008.webp", alt: "Sfeerfoto bij koffiebar 2" },
  // Removed last image per request
];

export default function GalerijPage() {
  return (
    <>
      <main id="gallery-main" className="min-h-screen w-full bg-white pt-[70px] md:pt-[80px] lg:pt-[90px]">
        <div className="pt-0 pb-4 px-4 md:pb-8 md:px-8 lg:mt-8">
          <h1
            id="gallery-heading"
            className="w-full text-3xl md:text-4xl lg:text-[48px] leading-tight md:leading-[63px] text-black text-center px-4 mt-0"
            style={{
              fontFamily:
                "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
              fontWeight: 650,
            }}
          >
            Galerij
          </h1>
          <style>{`@media (min-width: 720px) and (max-width: 1024px) {
            #gallery-heading {
              font-size: 56px !important;
              line-height: 1.05 !important;
              white-space: normal !important;
            }
            /* Move the galerij page down by 2rem on iPad-sized viewports */
            #gallery-main { margin-top: 2rem !important; }

            /* Make gallery images wider on iPad sizes */
            .gallery-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              max-width: 980px !important;
              gap: 1.5rem !important;
            }

            .img-wrapper {
              aspect-ratio: 3 / 4 !important;
              height: 420px !important;
            }

            /* Ensure the underlying img uses cover for a fuller appearance */
            .img-wrapper img {
              object-fit: cover !important;
            }
          }`}</style>
          <p className="mt-4 text-center py-4 text-base md:text-lg">Neem een kijkje in onze atmosfeer</p>
        </div>
        {/* 3x3 image grid */}
        <div className="flex justify-center items-center">
          <div className="grid gallery-grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-4 md:gap-8 py-8 w-full max-w-[1100px] px-4">
            {galleryImages.map((image, index) => (
              <div key={image.src} className="relative img-wrapper w-full aspect-[3/4] sm:aspect-[4/5] md:h-[480px] md:aspect-auto">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain sm:object-cover"
                  priority={index < 3}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDAwUBAAAAAAAAAAAAAQIDAAQRBRIhBhMiMUFR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEQA/ANF6c6hvrLTLe1vNNgZoYljMiTsNxUAE4K/T81KuOqdQkldl0y2UMxIC3DEDn4OKUqqxMdgJK7Bn/9k="
                />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer2 />
    </>
  );
}
