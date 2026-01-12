
"use client";

import Footer2 from "../footer2";
import LogoMarquee from "../../components/LogoMarquee";
import { clientLogos } from "../../lib/logos";
import tarievenContent from "./content";
import Image from "next/image";

import React, { useId, useRef, useState, useEffect } from "react";
import { Why } from "../../components/why";



function PatternCheck() {
    const id = useId();
    const patternId = `pattern_${id}`;
    const imageId = `image_${id}`;

    return (
        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="check-icon flex-shrink-0">
            <rect width="23" height="23" fill={`url(#${patternId})`} />
            <defs>
                <pattern id={patternId} patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlinkHref={`#${imageId}`} transform="scale(0.0104167)" />
                </pattern>
                <image
                    id={imageId}
                    width="96"
                    height="96"
                    preserveAspectRatio="none"
                    xlinkHref="data:image/png;base64,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"
                />
            </defs>
        </svg>
    );
}

export default function TarievenPage() {
    const marqueeRef = useRef<HTMLDivElement | null>(null);
    const [marqueeDuration, setMarqueeDuration] = useState('20s');

    const marqueeStyle = { ['--marquee-duration']: marqueeDuration } as React.CSSProperties;

    useEffect(() => {
        const pxPerSec = 120; // match services/footer speed

        function update() {
            const el = marqueeRef.current;
            if (!el) return;
            const width = el.scrollWidth || el.getBoundingClientRect().width || 1;
            const duration = Math.max(6, Math.round(width / pxPerSec));
            setMarqueeDuration(`${duration}s`);
        }

        update();
        const ro = new ResizeObserver(() => update());
        if (marqueeRef.current) ro.observe(marqueeRef.current);
        window.addEventListener('load', update);

        return () => {
            ro.disconnect();
            window.removeEventListener('load', update);
        };
    }, []);

    return (
        <main className="min-h-screen w-full bg-white pt-0 md:pt-12 lg:pt-24">
                                <div className="tarieven-hero -mt-7 pt-0 pb-4 lg:mt-28"> 
                                    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-55">
                                        <Why title={"Tarieven"} bullets={tarievenContent.heroBullets} overrideNegativeTop="md:-mt-[6rem]" />
                                    </div>

                                    {/* Mobile-only: pull the tarieven hero up by 5rem (increased from 3rem)
                                        and widen the CTA on this page only */}
                                    <style>{`
                                        /* Raise the Tarieven hero globally so it sits higher on the page */
                                        .tarieven-hero { margin-top: -10rem !important; }

                                        @media (max-width: 767px) {
                                            .tarieven-hero { margin-top: -6rem !important; }

                                            /* Widen CTA on Tarieven page only (extend beyond page padding) */
                                            .tarieven-hero #why-cta {
                                                width: calc(100% + 32px) !important; /* reduced by additional 10px */
                                                max-width: none !important;
                                                margin-left: -16px !important;
                                                margin-right: -16px !important;
                                            }
                                            /* Make the hero image match the CTA width on mobile */
                                            /* Target Next.js Image wrapper span and inner img specifically
                                               plus the hero-image-inner container to ensure no other rules
                                               (including compiled global CSS) make the image wider. */
                                            /* Reduce hero image width by 20px on mobile (keep CTA unchanged) */
                                            .tarieven-hero .hero-image-inner,
                                            .tarieven-hero .hero-image-inner > span,
                                            .tarieven-hero .hero-image-inner > span img,
                                            .tarieven-hero #why-img,
                                            .tarieven-hero #why-img img,
                                            .tarieven-hero .hero-image img {
                                                width: calc(100% + 12px) !important; /* 32 - 20 = 12 */
                                                max-width: none !important;
                                                margin-left: -6px !important;
                                                margin-right: -6px !important;
                                                display: block !important;
                                            }
                                        }
                                        /* Reset Tarieven hero transforms so layout matches other pages (e.g. Services)
                                           Remove large translations introduced earlier and keep only small image nudges. */
                                        @media (min-width: 768px) and (max-width: 1366px) {
                                            .tarieven-hero {
                                                transform: none !important;
                                            }

                                            .tarieven-hero #why-cta {
                                                transform: none !important;
                                            }

                                            /* small image nudge on iPad to match services behaviour */
                                            .tarieven-hero .hero-image-inner,
                                            .tarieven-hero .hero-image-inner > span,
                                            .tarieven-hero .hero-image-inner > span img,
                                            .tarieven-hero #why-img,
                                            .tarieven-hero #why-img img,
                                            .tarieven-hero .hero-image img {
                                                transform: translateX(-10px) !important;
                                            }
                                        }

                                        /* Global: reset transforms so Tarieven matches other pages */
                                        .tarieven-hero,
                                        .tarieven-hero #why-cta {
                                            transform: none !important;
                                        }

                                        .tarieven-hero .hero-image-inner,
                                        .tarieven-hero .hero-image-inner > span,
                                        .tarieven-hero .hero-image-inner > span img,
                                        .tarieven-hero #why-img,
                                        .tarieven-hero #why-img img,
                                        .tarieven-hero .hero-image img {
                                            transform: none !important;
                                        }
                                                     /* iPad-specific: shift Tarieven left and push the whole Tarieven block down 23rem
                                                         targeted at iPad mini / air / pro device sizes */
                                        @media (min-device-width: 768px) and (max-device-width: 1366px) and (pointer: coarse) {
                                            /* Shift left for layout balance and move down by 23rem */
                                            .tarieven-hero {
                                                transform: translateX(-15rem) translateY(22rem) !important;
                                            }

                                            /* Keep CTA offset on X and move it up by 10rem relative to current iPad offset */
                                            .tarieven-hero #why-cta {
                                                transform: translateX(1rem) translateY(-2rem) !important;
                                            }

                                            /* Move hero image with the hero block (preserve small X nudge) and down by 23rem */
                                            .tarieven-hero .hero-image-inner,
                                            .tarieven-hero .hero-image-inner > span,
                                            .tarieven-hero .hero-image-inner > span img,
                                            .tarieven-hero #why-img,
                                            .tarieven-hero #why-img img,
                                            .tarieven-hero .hero-image img {
                                                transform: translateX(1.1rem) translateY(1rem) !important;
                                            }

                                            /* Ensure content and footer move down together with the hero; keep marquee moved up */
                                            .tarieven-marquee {
                                                transform: translateY(11rem) !important;
                                            }

                                            .tarieven-content,
                                            .tarieven-footer {
                                                transform: translateY(26rem) !important;
                                            }

                                            /* iPad (mini / air / pro): ensure the "Pakketten" heading uses Switzer
                                               and fixed size/weight as requested */
                                            #packages-heading {
                                                font-family: Switzer, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial !important;
                                                font-size: 48px !important;
                                                font-weight: 650 !important;
                                            }
                                            /* iPad Mini only: nudge the entire Tarieven hero 1rem to the right */
                                            @media (device-width: 768px) and (device-height: 1024px) and (pointer: coarse) {
                                                .tarieven-hero {
                                                    transform: translateX(-14rem) translateY(23rem) !important;
                                                }

                                                /* iPad Mini only: nudge the hero image 0.3rem to the right */
                                                .tarieven-hero .hero-image-inner,
                                                .tarieven-hero .hero-image-inner > span,
                                                .tarieven-hero .hero-image-inner > span img,
                                                .tarieven-hero #why-img,
                                                .tarieven-hero #why-img img,
                                                .tarieven-hero .hero-image img {
                                                    transform: translateX(1.1rem) translateY(1rem) !important;
                                                }
                                            }
                                        }
                                    `}</style>
                                </div>

            

            <section className="mt-8 md:mt-[30px]">
                <div className="align-center justify-center text-center py-12 md:py-24">
                        <LogoMarquee
                            wrapperClassName="w-full mt-24 md:mt-28 mb-24 md:mb-28 py-2 md:-translate-y-32 overflow-hidden opacity-[0.58] mix-blend-luminosity tarieven-marquee"
                            repeatCount={16}
                            images={clientLogos}
                        />

                        <style>{`@media (min-width: 768px) and (max-width: 1024px) {
                            /* iPad Air / Mini / Pro: move marquee up by 20rem (keep content position) */
                            .tarieven-marquee {
                                margin-top: 20rem !important;
                                transform: translateY(11rem) !important;
                            }
                            /* Move the content under the marquee down by 23rem (unchanged) */
                            .tarieven-content {
                                transform: translateY(26rem) !important;
                            }
                        }`}</style>

                    <div className="tarieven-content">
                    <h1 id="packages-heading"
                        className="w-full text-[48px] md:text-[56px] lg:text-[64px] leading-tight md:leading-[64px] lg:leading-[72px] text-black text-center px-4 mt-0 md:mt-16 switzer-650-48"
                    >
                        Pakketten
                    </h1>

                    <p
                        id="tarieven-intro"
                        className="font-medium text-[14px] md:text-[18px] leading-[20px] md:leading-[26px] tracking-normal text-center py-4 md:py-6 px-4 mt-2 md:mt-0 mb-[50px]"
                    >
Onze tarieven zijn maatwerk en gebaseerd op deze pakketten voor koffie catering op locatie voor bedrijven, events en bruiloften.
                    </p>
 

                    

                    {/* heroBullets removed to avoid duplicated lists under the intro paragraph */}

                    <div className="mt-12 md:mt-24 lg:mt-16 flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-6 md:gap-6 px-4 tarieven-cards">
                        <div className="w-full sm:w-[460px] min-h-auto md:min-h-[300px] bg-white border-2 border-black rounded-none p-4 md:p-6 flex flex-col">
                            <div className="pb-4">
                                <h3 className="text-xl md:text-2xl lg:text-[24px] leading-tight md:leading-[30px] text-black text-left sm:text-left lg:text-left px-4 lg:px-0 switzer-500-24">
                                    Basis
                                </h3>
                                <p className="font-medium text-black/90 text-left sm:text-left lg:text-left px-4 lg:px-0 text-[15px] switzer-15">Voor kleinschalige evenementen zonder extra gedoe</p>
                            </div>

                            <div className="-mx-4 px-0 sm:-mx-6 sm:px-6 flex-1 border-t-2 border-b-2 border-black my-4 py-4">
                                <ul className="space-y-6 md:space-y-3 pl-6 sm:pl-0">
                                    <li className="flex items-center gap-3">
                                            <PatternCheck />
                                        <span className="text-[14px] md:text-[16px] font-semibold md:font-medium">Barista</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <PatternCheck />
                                        <span className="text-[14px] md:text-[16px] font-semibold md:font-medium">Basis Menu</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <PatternCheck />
                                        <span className="text-[14px] md:text-[16px] font-semibold md:font-medium">Onbeperkt Service</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="pt-4">
                                <div className="text-[16px] font-semibold">Vanaf €400</div>
                            </div>
                        </div>

                        <div className="w-full sm:w-[460px] min-h-auto md:min-h-[300px] bg-white border-2 border-black rounded-none p-4 md:p-6 flex flex-col">
                            <div className="pb-4">
                                <h3 className="text-xl md:text-2xl lg:text-[24px] leading-tight md:leading-[30px] text-black text-left sm:text-left lg:text-left px-4 lg:px-0 switzer-500-24">
                                    Premium
                                </h3>
                                <p className="font-medium text-black/90 text-left sm:text-left lg:text-left px-4 lg:px-0 text-[15px] switzer-15">Voor kleinschalige evenementen zonder extra gedoe</p>
                            </div>

                            <div className="-mx-4 px-0 sm:-mx-6 sm:px-6 flex-1 border-t-2 border-b-2 border-black my-4 py-4">
                                <ul className="space-y-6 md:space-y-3 pl-6 sm:pl-0">
                                    <li className="flex items-center gap-3">
                                        <PatternCheck />
                                        <span className="text-[14px] md:text-[16px] font-semibold md:font-medium">Alles van het basis pakket</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <PatternCheck />
                                        <span className="text-[14px] md:text-[16px] font-semibold md:font-medium">Custom koffiekar &amp; bekers</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                            <PatternCheck />
                                        <span className="text-[14px] md:text-[16px] font-semibold md:font-medium">Premium Menu</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="pt-4">
                                <div className="text-[16px] font-semibold">Vanaf €500</div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
                        
            <style>{`@media (min-width: 768px) and (max-width: 1024px) {
                /* Move the Tarieven footer down by 26rem on iPad Air / Mini / Pro */
                .tarieven-footer { transform: translateY(26rem) !important; }
            }`}</style>

            <div className="mt-0 md:-mt-[90px] tarieven-footer">
                <Footer2 />
            </div>
            
          

        </main>
    );
}
                                                                                                                    
