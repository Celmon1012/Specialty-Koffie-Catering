"use client";


import Link from "next/link";
import { useId, useState, useRef, useEffect, type ReactNode } from "react";
import LogoMarquee from "./LogoMarquee";
import { clientLogos } from "../lib/logos";
const logos = [
    { src: "/Omrin.webp", alt: "Omrin logo" },
    { src: "/MIDDELSEE.webp", alt: "Middelsee logo" },
    { src: "/ITGWO.webp", alt: "ITGWO logo" },
    { src: "/LEVO.webp", alt: "Levo logo" },
    { src: "/Piersma.webp", alt: "Piersma logo" },
    { src: "/Kantoormeubelen.webp", alt: "Kantoormeubelen Drachten logo" },
    { src: "/drent.webp", alt: "Drent & Van Dijk logo" },
    { src: "/DRAISMA.webp", alt: "Dijkstra Draisma logo" },
    { src: "/HK.webp", alt: "HK Detachering logo" },
    { src: "/logo_bob_keukenbouwer.webp", alt: "Bob Keukenbouwer logo" },

  ];

function CheckIcon() {
    const id = useId();
    const patternId = `pattern0_${id}`;
    const imageId = `image0_${id}`;

      
    return (
        <svg
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="check-icon flex-shrink-0 w-[23px] h-[23px] opacity-100 md:opacity-80"
        >
            <rect width="23" height="23" fill={`url(#${patternId})`} />
            <defs>
                <pattern id={patternId} patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use href={`#${imageId}`} transform="scale(0.0104167)" />
                </pattern>
                <image
                    id={imageId}
                    width="96"
                    height="96"
                    preserveAspectRatio="none"
                    href="data:image/png;base64,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"
                />
            </defs>
        </svg>
    );
}

interface ServicesProps {
    heading?: ReactNode;
    description?: ReactNode;
    bullets?: ReactNode[];
    imageSrc?: string;
    imageAlt?: string;
}

export default function Services({ heading, description, bullets, imageSrc, imageAlt }: ServicesProps) {
    // Logo marquee is rendered via `LogoMarquee` component below.

    return (
        <section className="w-full bg-white services-section">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-55">
                <div className="flex flex-col md:flex-row items-start md:items-start gap-6 md:gap-20 services-inner">
                    <div className="order-2 md:order-1 bg-white p-0 md:p-2 inline-block w-full md:flex-shrink-0 md:w-1/2 mt-6 md:mt-0 mb-6 md:mb-0 flex justify-center md:self-start services-image">
                        <div className="w-full max-w-none sm:max-w-[420px] md:max-w-[540px]">
                            <img
                                id="services-img"
                                src={imageSrc ?? "/G007.webp"}
                                alt={imageAlt ?? "Bar word opgezet"}
                                width="540"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                    <div className="order-1 md:order-2 flex flex-col w-full md:w-auto services-text">
                        <h2
                            className="text-black text-left font-semibold text-[28px] md:text-[47px] leading-[36px] md:leading-[56px]"
                            style={{
                                fontFamily:
                                    "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
                                fontWeight: 650,
                                fontStyle: 'semibold',
                            }}
                        >
                            {heading ?? "Zo Werken Wij"}
                        </h2>

                        <p
                            className="w-full md:w-[607px] mt-2 md:mt-4 py-2 md:py-4 text-[14px] md:text-[16px] leading-[20px] md:leading-[22px] font-medium text-black text-left"
                            style={{
                                fontFamily:
                                    "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
                            }}
                        >
                            {description ?? (
                                <>
Wij verzorgen koffie catering op locatie —
voor bedrijven, events en bruiloften. Door heel Nederland en vooral in
 Friesland tot Groningen en Drenthe.
                                </>
                            )}
                        </p>

                        <ol className="mt-0 md:mt-0 space-y-4 md:space-y-6 py-4 md:py-6 -ml-6 md:-ml-8 relative top-0 md:top-0">
                            {/* Item 1 */}
                            <li className="relative">
                                <div className="w-full flex items-center gap-4 md:gap-8 text-left">
                                    <CheckIcon />

                                    <div>
                                        <span
                                            className="text-black leading-6 text-[14px] md:text-[16px] font-semibold md:font-medium"
                                            style={{
                                                fontFamily:
                                                    "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
                                            }}
                                        >
                                            {bullets?.[0] ?? "Jij hoeft niks te regelen, alleen een stopcontact"}
                                        </span>
                                    </div>
                                </div>

                                

                                <hr className="border-t-2 md:border-t border-black mt-4" />
                            </li>

                            {/* Item 2 */}
                            <li className="relative">
                                <div className="w-full flex items-center gap-4 md:gap-8 text-left">
                                    <CheckIcon />

                                    <div>
                                        <span
                                            className="text-black leading-6 text-[14px] md:text-[16px] font-semibold md:font-medium"
                                            style={{
                                                fontFamily:
                                                    "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
                                            }}
                                        >
                                            {bullets?.[1] ?? "Snelle & blije barista’s"}
                                        </span>
                                    </div>
                                </div>

                                

                                <hr className="border-t-2 md:border-t border-black mt-4" />
                            </li>

                            {/* Item 3 */}
                            <li className="relative">
                                <div className="w-full flex items-center gap-4 md:gap-8 text-left">
                                    <CheckIcon />

                                    <div>
                                        <span
                                            className="text-black leading-6 text-[14px] md:text-[16px] font-semibold md:font-medium"
                                            style={{
                                                fontFamily:
                                                    "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
                                            }}
                                        >
                                            {bullets?.[2] ?? "Koffie die blijft doorlopen."}
                                        </span>
                                    </div>
                                </div>

                                

                                <hr className="border-t-2 md:border-t border-black mt-4" />
                            </li>
                        </ol>

                                                <div className="mt-8 md:mt-8 md:ml-[-15px] w-full md:w-auto">
                                                    <Link href="/offerte" className="block md:inline-block w-full md:w-auto">
                                                        <button id="services-cta" className="w-full md:w-[230px] h-[57px] border-2 border-black bg-white text-black hover:bg-black hover:text-white inline-flex items-center justify-center text-[14px] md:text-[16px] font-small">
                                                            Offerte Aanvragen
                                                        </button>
                                                    </Link>
                                                </div>

                                                <style>{`@media (min-width: 768px) and (max-width: 1024px) {
                                                    /* Target iPad Air / Mini / Pro sizes */
                                                    #services-cta { width: 540px !important; max-width: 540px !important; }
                                                    #services-img { width: 540px !important; max-width: 540px !important; display: block !important; }
                                                    /* Nudge image left to align with CTA */
                                                    #services-img, #services-img img, .services-image img { transform: translateX(-10px) !important; }
                                                    .services-image { display: flex; justify-content: center; }

                                                    /* Move entire services section right by 2rem on iPads */
                                                    .services-section { transform: translateX(2rem) !important; }

                                                    /* Slight internal nudges for layout balance */
                                                    .services-text { transform: translateX(1rem) !important; }
                                                    .services-image { transform: translateX(1rem) !important; }
                                                    /* Nudge CTA slightly to the right for fine placement */
                                                    #services-cta { transform: translateX(0.5rem) !important; }

                                                    /* Move lists right slightly and make separators the same length as the CTA */
                                                    .services-text ol { transform: translateX(0.7rem) !important; }
                                                    .services-text ol li hr {
                                                        width: 540px !important;
                                                        max-width: 540px !important;
                                                        margin-left: 0 !important;
                                                        transform: translateX(calc(-10px + 0.7rem)) !important;
                                                        margin-top: 12px !important;
                                                    }

                                                    /* Move LogoMarquee up by 9rem on iPads (Air / Mini / Pro) */
                                                    .services-marquee {
                                                        margin-top: 30rem !important;
                                                        transform: translateY(-20rem) !important;
                                                    }
                                                        /* iPad mini (portrait width 768px) only: also shift services section right by 2rem */
                                                        @media (width: 768px) {
                                                            .services-section { transform: translateX(2rem) !important; }
                                                        }
                                                }`}</style>
                    </div>
                </div>
            </div>

                                <LogoMarquee
                                    wrapperClassName="w-full mt-24 md:mt-28 mb-24 md:mb-28 py-2 md:-translate-y-32 overflow-hidden opacity-[0.58] mix-blend-luminosity services-marquee"
                                    repeatCount={16}
                                    images={clientLogos}
                                    imgClassName="h-[40px] md:h-[60px] w-auto marquee-logo grayscale opacity-30 md:grayscale-0 md:opacity-100 lg:opacity-40 lg:grayscale"
                                />
        </section>
    );
}