"use client";

import Link from "next/link";
import Image from "next/image";
import tarievenContent from "../app/tarieven/content";
import { useId, type ReactNode } from "react";

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

interface WhyProps {
    title?: ReactNode;
    description?: ReactNode;
    bullets?: ReactNode[];
    imageSrc?: string;
    imageAlt?: string;
    overrideNegativeTop?: string; // allow pages to override the default negative top margin
}

export function Why({ title, description, bullets, imageSrc, imageAlt, overrideNegativeTop }: WhyProps) {
    const defaultWhyParagraphs = (tarievenContent.whyDescription || "").split('\n\n');
    return (
        <section className={`w-full bg-white pt-2 md:pt-0 mt-20 ${overrideNegativeTop ?? ''} mb-6 md:mb-24 hero--ipad-left why-section`}>
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-20 mt-6 md:mt-18 hero-inner" >
                    <div className="relative w-full md:w-1/2 md:flex-shrink-0 hero-text why-text">
                        <h2
                            className="text-black text-left font-semibold text-[28px] md:text-[64px] md:leading-[72px]"
                            style={{
                                fontFamily:
                                    "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
                                fontWeight: 650,
                                fontStyle: 'semibold',
                                marginLeft: '0px',
                            }}
                        >
                            {title ?? "Wat dit Oplevert"}
                        </h2>

                        <p
                            className="w-full md:w-[607px] mt-2 md:mt-6 py-2 md:py-4 text-[14px] md:text-[18px] leading-[20px] md:leading-[26px] font-medium text-black text-left"
                            style={{
                                fontFamily:
                                    "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
                                    marginLeft: '0px',
                            }}
                        >
                            {description ?? (
                                tarievenContent.whyDescription
                            )}
                        </p>

                        <ol className="mt-2 md:mt-32 space-y-6 py-4 md:py-2 -ml-6 md:-ml-8 relative top-0 md:top-6">
                            {/* Item 1 */}
                            <li className="relative">
                                    <div className="w-full flex items-center gap-4 md:gap-6 text-left">
                                    <CheckIcon />

                                    <div>
                                        <span
                                            className="text-black leading-6 text-[14px] md:text-[16px] font-semibold md:font-medium"
                                            style={{
                                                fontFamily:
                                                    "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
                                            }}
                                        >
                                            {bullets?.[0] ?? "Mensen blijven even hangen" }
                                        </span>
                                    </div>
                                </div>

                                

                                <hr className="border-t-2 md:border-t border-black mt-4" />
                            </li>

                            {/* Item 2 */}
                            <li className="relative">
                                <div className="w-full flex items-center gap-4 md:gap-6 text-left">
                                    <CheckIcon />

                                    <div>
                                        <span
                                            className="text-black leading-6 text-[14px] md:text-[16px] font-semibold md:font-medium"
                                            style={{
                                                fontFamily:
                                                    "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
                                            }}
                                        >
                                            {bullets?.[1] ?? "Er onstaan gesprekken"}
                                        </span>
                                    </div>
                                </div>

                                

                                <hr className="border-t-2 md:border-t border-black mt-4" />
                            </li>

                            {/* Item 3 */}
                            <li className="relative">
                                <div className="w-full flex items-center gap-4 md:gap-6 text-left">
                                    <CheckIcon />

                                    <div>
                                        <span
                                            className="text-black leading-6 text-[14px] md:text-[16px] font-semibold md:font-medium"
                                            style={{
                                                fontFamily:
                                                    "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
                                            }}
                                        >
                                            {bullets?.[2] ?? "Je event word onthouden"}
                                        </span>
                                    </div>
                                </div>

                                

                                <hr className="border-t-2 md:border-t border-black mt-4" />
                            </li>
                        </ol>

                                                <div className="mt-8 md:mt-[112px] md:ml-[-15px] w-full md:w-auto">
                                                    <Link href="/offerte" className="block md:inline-block w-full md:w-auto">
                                                        <button id="why-cta" className="w-full md:w-[230px] h-[57px] border-2 border-black bg-white text-black hover:bg-black hover:text-white flex items-center justify-center text-[14px] md:text-[16px] font-small px-4">
                                                            Offerte Aanvragen
                                                        </button>
                                                    </Link>
                                                </div>

                                                <style>{`@media (min-width: 768px) and (max-width: 1024px) {
                                                    /* Target iPad Air / Mini / Pro widths (portrait and smaller landscape)
                                                       Reduce CTA and image widths for better layout on iPads */
                                                    #why-cta { width: 640px !important; max-width: 640px !important; }
                                                    /* Target Next.js Image wrapper and actual img element */
                                                    #why-img, #why-img img, .hero-image img, .hero-image span img, .hero-image .max-w-none img { width: 640px !important; max-width: 640px !important; display: block !important; }
                                                    /* Nudge image slightly left to align with CTA, then move 0.5rem right to fine-tune */
                                                    #why-img, #why-img img, .hero-image img, .hero-image span img { transform: translateX(calc(-10px + 0.5rem)) !important; }
                                                    .hero-image { display: flex; justify-content: center; }
                                                    .hero-image > div { display: flex; justify-content: center; }

                                                    /* Shift heading, text, lists and CTA slightly to the right on iPads */
                                                    .why-text {
                                                        transform: translateX(2rem) !important;
                                                    }
                                                    /* Ensure CTA wrapper respects the shift */
                                                    .why-text .mt-8, .why-text .mt-[112px] { transform: translateX(2rem) !important; }
                                                    /* Shift CTA slightly to the right/left for fine placement on iPad; moved left by 0.4rem */
                                                    #why-cta { transform: translateX(0.1rem) !important; }

                                                    /* Ensure list text stays on a single line on iPad/tablet */
                                                    /* Move the entire list slightly right for iPad sizes */
                                                    .why-text ol { transform: translateX(0.7rem) !important; }
                                                    .why-text ol li > div { align-items: center; gap: 1rem; }
                                                    .why-text ol li > div span {
                                                        white-space: nowrap;
                                                        overflow: hidden;
                                                        text-overflow: ellipsis;
                                                        display: inline-block;
                                                        max-width: 560px; /* keep room for icon */
                                                    }

                                                    /* Make separator extend to the image width and align with the image nudge */
                                                    .why-text ol li hr {
                                                        width: 640px !important;
                                                        max-width: 640px !important;
                                                        margin-left: 0;
                                                        transform: translateX(calc(-10px + 0.7rem)) !important;
                                                        margin-top: 12px;
                                                    }

                                                    /* Move entire Why section up by 35rem on iPad Air / Mini / Pro */
                                                    .why-section {
                                                        margin-top: -35rem !important; /* move section up further */
                                                    }

                                                    /* iPad mini only (portrait width 768px): shift the whole section left by 2rem */
                                                    @media (width: 768px) {
                                                        .why-section { transform: translateX(-2rem) !important; }
                                                        /* iPad mini only: nudge the image 1.8rem to the right (0.8rem + additional 1rem) */
                                                        #why-img, #why-img img, .hero-image img { transform: translateX(1.8rem) !important; }
                                                        /* iPad mini only: move CTA right by 0.7rem */
                                                        #why-cta { transform: translateX(0.7rem) !important; }
                                                    }

                                                    /* iPad Air only (portrait width 820px): nudge the image 1rem to the right */
                                                    @media (width: 820px) {
                                                        #why-img, #why-img img, .hero-image img { transform: translateX(1rem) !important; }
                                                    }
                                                }`}</style>
                    </div>

                                    <div className="relative w-full md:w-1/2 md:flex-shrink-0 mt-8 md:mt-0 flex justify-center md:justify-end hero-image">
                                        <div className="order-2 md:order-1 bg-white p-0 md:p-2 inline-block w-full md:w-auto mt-6 md:mt-0 mb-6 md:mb-0 flex justify-center md:self-start hero-image-inner">
                                            <Image
                                                src={imageSrc ?? "/G006.webp"}
                                                alt={imageAlt ?? "Latte art word gemaakt"}
                                                id="why-img"
                                                width={720}
                                                height={480}
                                                className="w-full max-w-none sm:max-w-[540px] md:max-w-[720px] h-auto object-cover relative md:translate-y-[5px]"
                                                sizes="(max-width: 640px) 420px, 540px"
                                            />
                                        </div>
                                    </div>
                </div>
            </div>
        </section>
    );
}