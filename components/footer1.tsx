"use client";   
import { useRef, useEffect, useState } from "react";
import type { HTMLAttributes } from "react";
import tarievenContent from "../app/tarieven/content";
import Reviews from "./Reviews";
import reviews, { Review } from "../app/content/reviews";

// Helper function to render star rating
function renderStars(rating: number): string {
  return "★".repeat(Math.min(5, Math.max(0, rating))) + "☆".repeat(5 - Math.min(5, Math.max(0, rating)));
}

export function Footer1() {
    const marqueeRef = useRef<HTMLDivElement | null>(null);

    // detect tablet (iPad mini/air/pro and similar) to apply tablet-only tweaks
    const [isTablet, setIsTablet] = useState(false);
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const mq = window.matchMedia('(min-width: 720px) and (max-width: 1024px)');

        // debounce updates to avoid rapid toggling during orientation/resize on tablets
        let timer: number | undefined;
        const updateIsTablet = (matches: boolean) => {
            if (timer) clearTimeout(timer);
            timer = window.setTimeout(() => setIsTablet(!!matches), 150);
        };
        const listener = (e: MediaQueryListEvent) => updateIsTablet(e.matches);

        // initialize state from current matches
        updateIsTablet(mq.matches);

        type MQWithLegacy = MediaQueryList & {
            addEventListener?: (type: 'change', listener: (e: MediaQueryListEvent) => void) => void;
            removeEventListener?: (type: 'change', listener: (e: MediaQueryListEvent) => void) => void;
            addListener?: (listener: (e: MediaQueryListEvent) => void) => void;
            removeListener?: (listener: (e: MediaQueryListEvent) => void) => void;
        };

        const mqLegacy = mq as MQWithLegacy;

        if (mqLegacy.addEventListener) mqLegacy.addEventListener('change', listener);
        else if (mqLegacy.addListener) mqLegacy.addListener(listener);

        return () => {
            if (timer) clearTimeout(timer);
            if (mqLegacy.removeEventListener) mqLegacy.removeEventListener('change', listener);
            else if (mqLegacy.removeListener) mqLegacy.removeListener(listener);
        };
    }, []);

    useEffect(() => {
        // increase pxPerSec for tablet to speed up the marquee only on iPad/tablet
        const pxPerSec = isTablet ? 1200 : 120; // higher = faster on tablet

        let updateTimer: number | undefined;
        function doUpdate() {
            const el = marqueeRef.current;
            if (!el) return;
            const width = el.scrollWidth || el.getBoundingClientRect().width || 1;
            const duration = Math.max(6, Math.round(width / pxPerSec));
            try {
                el.style.setProperty('--marquee-duration', `${duration}s`);
            } catch {
                // ignore if setting style fails
            }
        }

        function update() {
            if (updateTimer) clearTimeout(updateTimer);
            updateTimer = window.setTimeout(doUpdate, 120);
        }

        update();
        const ro = new ResizeObserver(() => update());
        if (marqueeRef.current) ro.observe(marqueeRef.current);
        window.addEventListener('load', update);

        return () => {
            if (updateTimer) clearTimeout(updateTimer);
            ro.disconnect();
            window.removeEventListener('load', update);
        };
    }, [isTablet]);
    // inline `xmlns` directly where needed to satisfy JSX/TSX typing
    return (
        <section className="w-full bg-white pb-16 md:pb-16 md:mb-16 relative">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
                <h2
                    id="reviews-heading"
                    className="text-black text-center font-semibold text-[28px] md:text-[64px]"
                    style={{
                        fontFamily:
                            "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
                        fontWeight: 650,
                        marginTop: '20px',
                        // increase heading size specifically on tablet (iPad/mini/pro)
                        fontSize: isTablet ? '64px' : undefined,
                    }}
                >
                    Wat zeggen onze klanten
                </h2>

                <style>{`@media (min-width: 720px) and (max-width: 1024px) {
                    #reviews-heading {
                        /* responsive cap so text stays large but fits on one line */
                        font-size: clamp(48px, 6.5vw, 72px) !important;
                        line-height: 1.05 !important;
                        white-space: nowrap !important;
                        overflow: visible !important;
                        text-wrap: none !important;
                        /* shifted left for tablet, then nudged right by 2rem */
                        transform: translateX(calc(-130px + 2rem)) !important;
                    }
                    #reviews-intro {
                        /* slightly larger and nudged left on tablets */
                        font-size: clamp(16px, 3.8vw, 20px) !important;
                        line-height: 1.4 !important;
                        transform: translateX(-130px) !important;
                    }
                }`}</style>

                <p id="reviews-intro"
                    className="w-full md:w-[607px] mx-auto mt-6 md:mt-10 py-4 md:py-8 text-[14px] md:text-[18px] leading-[20px] md:leading-[26px] font-medium text-black text-center"
                    style={{
                        fontFamily:
                            "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
                        // ensure centered on tablet explicitly
                        textAlign: isTablet ? 'center' : undefined,
                    }}
                >
                    {tarievenContent.introParagraph}
                </p>

                <div className={`w-full py-1 ${isTablet ? 'overflow-visible' : 'overflow-hidden'} mt-8 md:mt-[10px] mb-10 md:mb-[60px]`}>
                    <div
                        ref={marqueeRef}
                        className="flex w-max flex-row items-center animate-marquee-left-right gap-8 md:gap-[80px]"
                        style={{
                            // enforce continuous, linear, infinite animation as a safeguard
                            animationIterationCount: 'infinite',
                            animationTimingFunction: 'linear',
                            animationDuration: 'var(--marquee-duration)',
                        }}
                    >
                        {/* Duplicate reviews array so marquee can loop seamlessly */}
                        {[...reviews, ...reviews].map((review: Review, i: number) => (
                            <div key={i} className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[420px] lg:origin-center lg:scale-90 lg:-translate-y-1" style={{ width: isTablet ? '320px' : undefined }}>
                                <svg
                                    viewBox="0 0 420 220"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    role="img"
                                    aria-label={`Klantbeoordeling van ${review.customerName}`}
                                    className="w-full h-auto">
                                    <rect x="0.5" y="0.5" width="419" height="219" rx="0" fill="#FFFFFF" stroke="#374151"/>
                                    <foreignObject x="28" y="58" width="364" height={isTablet ? 110 : 78}>
                                        <div
                                            {...({ xmlns: "http://www.w3.org/1999/xhtml" } as unknown as HTMLAttributes<HTMLDivElement> & { xmlns?: string })}
                                            style={{
                                                fontFamily: "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
                                                fontSize: '18px',
                                                color: '#000000',
                                                lineHeight: '20px',
                                                overflow: 'hidden'
                                            }}
                                        >
                                            {review.text}
                                        </div>
                                    </foreignObject>
                                    <text x="28" y="156" fontSize="14" fontFamily="Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial">
                                        <tspan fill="#6B7280">{review.customerName}</tspan>
                                        <tspan fill="#6B7280" dx="8">—</tspan>
                                        <tspan fill="#FFC800" fontSize="16" dx="8">{renderStars(review.rating)}</tspan>
                                    </text>
                                </svg>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stars block moved directly under the reviews marquee */}
                {/* restore rating text and small star icons to the right */}
                <div className="flex justify-center items-center gap-4 mt-4 lg:mt-2 lg:origin-center lg:scale-90 lg:-translate-y-1">
                    

                    <div className="flex items-center gap-3" aria-hidden="true">
                        <Reviews rating={5} count={19} size={18} textSize="text-sm md:text-base" />
                    </div>
                </div>
            </div>

            <div className="w-full py-1 overflow-hidden pt-10 md:pt-0">

                        <p id="cta-heading" className="flex flex-col md:flex-row justify-center gap-4 md:gap-[30px] mt-10 md:mt-[120px] text-[24px] md:text-[64px] font-semibold text-center"
                                style={{
                                    fontFamily:
                                        "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
                                }}
                        >KOFFIE CATERING OP LOCATIE?</p>
                        <style>{`@media (min-width: 720px) and (max-width: 1024px) {
                            /* Adjust CTA size for iPad/tablet (reduced) */
                            #cta-heading {
                                font-size: 40px !important;
                                line-height: 1.05 !important;
                                white-space: normal !important;
                            }
                        }`}</style>
                        <div
                            className="flex items-center justify-center gap-2 mt-4 text-[14px] md:text-[18px] font-normal text-black"
                            style={{
                                fontFamily:
                                    "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
                            }}
                        >
                            <a href="/contact" className="underline">
                                Neem contact op met Menno
                            </a>
                            <span className="text-[14px] md:text-[18px] no-underline"> 
                                &rarr;
                            </span>
                        </div>

                        <div className="w-full h-[1px] bg-gray-300 mt-[80px] md:mt-[160px] mb-[60px]" aria-hidden="true"></div>

                        <div className="w-full flex justify-center items-center gap-2 mt-0 mb-24">
                            <a
                                href="https://instagram.com/mennoskoffiebar"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="cursor-pointer inline-flex items-center justify-center"
                            >
                            <svg className="opacity-100" width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="34" height="34" fill="url(#pattern0_207_85)"/>
                                <defs>
                                    <pattern id="pattern0_207_85" patternContentUnits="objectBoundingBox" width="1" height="1">
                                        <use xlinkHref="#image0_207_85" transform="scale(0.0104167)" />
                                    </pattern>
                                    <image id="image0_207_85" width="96" height="96" preserveAspectRatio="none" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAEeElEQVR4nO2cy05UQRCG/wyzITIouBJhqcBehUfwsjNq2Btx6VJlrbIVGeAZUAFFX0TjAwiDV5CIG4FNm06KZILDdM851V19ztSXVGIy45yqrnPp/v8+AIqiKIqiKIqiKIqiKIrCSwXAJIAZACsAPgHYBXAIwAjHIeVic3oN4DGACcq58AwDmAWwlcBAmw6jAeAZgPMoIGcBLAE4SGAgTc7YB7AAYBAFYQrATgIDZ5hjG8AdJEyVznpT8qhTrUnRC+BdAoNjIsU61ZwEPQBWExgUEznepXIldMNtx5wQ8yk8cDtJeJOSvgpgDMAp6QIoB5vLNbq/Nzqs6ZZU4oM0M/BJ0q4DplO5ZB3YBdhtAJ89a9uhaXeyt563AGooHjV62CZ5Kxr2XGS9KPiSvkKD67NYG4qZ2KznmV+UwR8hHegPxRqAUfqs4nklPI057XRpO1sFuu2MAPjVooZd+szSD+Cro+aNWCfcpMfZcBfF4XWbOl42fW/ao+4rMRKe8Zhq2qukKPxpU8te0/eqHlf+wxgJrwjMCCpt/IS8en67Bvw+9t0FR+2vEIFPjiTsgiYFP6HhqeevtfmN5WPfveE45kdEoNUDqzkuJuYn7Dv0/FG6glotsOwJ0MyY41h2YRoc16DUEvUTttvo+SP0wN2jWG4x+KDaXM0OjqvQ1P2Eek5JJFT9ogn0RvYT8uj5pWtAj5CfkFXPL10DlgQGP8+UuVQNmGLwE2Lr+aVpwGAgPyG0nl+aBiwF9hNC6fmlaEAsP6ESQM8vRQNi+gkVZj2/8A2Q8BP6GfX8wjdAyk+YZtLzC98AKT+hyqTnF74Bqx4P3lBw6PmFb0BMPwEB9PzCN8DlJ1wImPsog55f+Aa45v99AXPvY9DzS9+AWsDc7XS06xsQw9I8iXG9BelDODd5E3Bta6kjHC4BsHkjVmkb8Njx/xuBtrHrQoyY8PiNewHyvu9x3Evd0ICKh2v1hXk2dBrAN8cxu0aMA+1YM45YZ5Sj33sc74nn75WiAedpzm0cMc9gyNQ9jvO32wwZH2HMNG0fsQuoLLcdnzPfxpxA/ZnhNOV/eg6QXSA98JwdVUn7dxkwR/EDwIBA/ZnhTOCO5yAdhZ1GLgK4TqvaPopxWmQtZthJfVOw/kxwJ1DvcMA443kC9Ysn0OOxOg4RujWxid4O9vBwxBvdnPs/Vc89PHljLqfnLN6A0Hr+LZqZcA/89wwP3CRf0Iih5w/Q1eCzWPNZZNmz/gxDXkm8ohRTzx+iHWubGQZ+g+SFc4z5JPGSnoSeX6FNU49o68hHuhIPKOy/P9BnVlK+HOit9cUUXlOV0vOlSeZFbSk9XxouPyE3Enq+NJx+Agsx9XxpuP0EFmLp+dKE8BPYCK3nSxPKT2AjlJ4vTWg/gRUOPV+a2H4CO5J6vhGOLH4CO1J6vhGOZP50sYSeb4Qjj58QjFh6vhGOvH5CcELp+UY4OPyEaHDq+UY4OP2E6OTR841whPATxGin5xvhiOknKIqiKIqiKIqiKIqiKOhe/gGIEXGrAgUNNwAAAABJRU5ErkJggg=="/>
                                </defs>
                            </svg>
                            </a>

                            <a
                                href="https://www.facebook.com/profile.php?id=61565428349158"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="cursor-pointer inline-flex items-center justify-center"
                            >
                            <svg className="opacity-100" width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="34" height="34" fill="url(#pattern0_207_86)"/>
                                <defs>
                                    <pattern id="pattern0_207_86" patternContentUnits="objectBoundingBox" width="1" height="1">
                                        <use xlinkHref="#image0_207_86" transform="scale(0.0111111)"/>
                                    </pattern>
                                    <image id="image0_207_86" width="90" height="90" preserveAspectRatio="none" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEeElEQVR4nO2cXYhVVRSAP2bU0TAlSC0Ky0zCFzNS+qFIRIpe0h60PxPCLAnDkTKDHuqhoIQeCny8D/VQKFTmDw6KUi/Wg2M69uOLZmVi4/j3II42umXHGojBy5x779p77XNmf7Behrnnrv3NmXPWXmefDZlMJpPJZDKZTCaTKUw7MBdYDqwHNgM9wBHgDHBJ4oz8rEd+5yP5zBw5RuY63A50AluB84BrMc4BW4DVwG2McMYBLwK7gCsKcuvFALATWAqMZQQxXs60vwPKrRe9wHvARCrMaGAtcNpA8NDwObwhOVWKR4FDCQgeGoeBBVQAf03cAFxNQGq98Ll9CnRQUu4EfkxApCsY3cDdlIwFSmWaixy+LJxPSXgauJiANNdk+MnQMyTOK4FrYhcp/BhWkCiLZHJgLckpyl5CYvjrWn8CclyAy8jjJMKMkt74XAM3yOkp1Mn7E5DhgMvASeBXYJ/k5bt7f/yv69fssfdZ19kbjK+h24DXgXuBtgL53gK83OT3+UmNCY8ZzfiuAp8BM1u4nzT7vY8QGd+M+dlA8lngiRZzb1a0k4cMo4jIWgPJ54H7FHJvRbSPNUTiRqNW50Kl/FsVfUp66sF5y0DyRsX8WxXtpJcd/PHTSYPq4p7ERJ8I/VhsmcHZvFt5DBqifTxPQHYZiO5sMEdfFTwFvA18eJ34UimvrpBLAiw6cw80kKNv3P8WKS/fQLs1hOhOA8kXgTEF8+swqO1XhRC91UD0oQbye8kgv2+0JbfLrCz2QL5vIMcdBvmd1V5+NtdgEE6WdRUldtk5GPdril5uNIjPC+bXbvh0x1+y1FhvNIhawfymGOXnpGRU49vERU8zFP21puiDWTT14idN0ceyaOrFUU3RVitAayUQ7dumarTyYNNVXHR/6qJ3AjcNEzcUzK+twLEG403lcXg3aoSYFW7Hhk+Ux9GnmdxfFRLdpTwOXyio0VMh0b8rj+OAZnKbKyJ6XICe+leaCX5cEdGzA4zDv0iqxqsVEb0kwDhWpH4mbCc+7wYYxyzNBNtk+WrZRX+hPIZzId477wrwjt+6YeLJgrlNLHCsdQEqjiAny2sB/u1cyafgK0OInmLwFKOWsGjvYjKB+C6LZjD2EBC/DCqL5r94NvQC9BB9D1cy0cdj7IzwThaNr2CCMz7iGopagqL/ASYQiVUjWPRKIjI60qrNWmKif4n9spDnwQh1dS0h0VcsXn8L2T51iYpWXZHUTCO9ewSI7k5hK7epss1ZVUX3yfGTYF6gbSRqxqIvyavYSeFfuPy3QqIHUt7yZ6lyJVIzEu3H8ByJ48/sCyUW3Z/ymTyUh+UmUjbRvcBDlIw7gL0lEr1XNkUsJaOk0B9IWLSf8X1gMbUOwWzghwRF7y/jpWI42qXzdTwB0SdkUVCRfZhKS4e0Wf80EH1MnuabT6dj0iabxW6SrdRCiR6QXRkWV3Fj7ka5GXhBVhL1KYjulWP5/UUmBc691NwlZ6Dfd6PoH+p9+cyMql97M5lMJpPJZDKZTAZNrgFlaZc7Hqw4TwAAAABJRU5ErkJggg=="/>
                                </defs>
                            </svg>
                            </a>

                            <a
                                href="https://www.tiktok.com/@mennoskoffiebar"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="TikTok"
                                className="cursor-pointer inline-flex items-center justify-center"
                            >
                            <svg className="opacity-100" width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="34" height="34" fill="url(#pattern0_207_87)"/>
                                <defs>
                                    <pattern id="pattern0_207_87" patternContentUnits="objectBoundingBox" width="1" height="1">
                                        <use xlinkHref="#image0_207_87" transform="scale(0.01)"/>
                                    </pattern>
                                    <image id="image0_207_87" width="100" height="100" preserveAspectRatio="none" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEbUlEQVR4nO2dS4gdRRSGv0lMMKLoynd8v5+b4GMl+F4YNRKziC4kIIK61IXgSlGjIaALUZFE0BgR1J2K4kZxJ+JGE6NGfIzcnSImCBqn5EhdGcfhVnV3dd/Tff8f/t10nz7nm75dVV3VBZIkSZIkSZIkSf3QamATsBv4EjgAhBn3gViL3bE2VqNOdBuw30EBgnN/A2xoE8QK4CkHiYae+clYu+La5iC50FNvbeNnatpJhZ771lIwVsffw2knFHru/aUe9JscJBMG4o0lgLzmIJEwEO8qAeQrB4mEgdj6KY31m4NEwkBstWysaScRBmYBwZcFBF+eOSC/Aj9P8J8C0q0vTuTzpoB064sS+TwsIL6AXCcg3frCRD6HAT8JiB8gpscFpDtfkJHTscAvAuIHiOl+AfEFZCXwroC07/Mq5HYU8JmAtOvzK+Z3HPCxgPi4Q8ayV6vPAQsCUt7nNsh1HfCRgPgBMtblwNPAdwJCY59DWR0NXAH8JSDU8tm0o0MCgoAsp9Azn5XI596adRAQ2gFiI73ra9RBQGgHyAj4HbihYh0EhHo+MwOI/d0fwH0V6iAg1PMZmUDGfgc4XUCqeyGzKFWBjO+Wl2KHcE5A/u/vgWfjzHt7A3hEoqCLnfpvH2XEtknRDwB3AjcBt89qx/A94NrEErC2gbTtXgDZC1ydeT2pgp7W8PiZB7IDWFPhekYC0t5D+qEa1zNKnPfUhsfPLJA6MHIKegqTJSDLeGeD6xkJSFnvW9KMrapR4vxrGx4/c0CsWVvlXff1wBPAy8ArwEEBKecPMmPOAVuA+RoxTk6cW0AW+caMeIfHL+rUjSEgmZ6PswVTd8arDeOcJCB5fiEj1l0F4ghIpu/IWLfxQ4E4JwpIni9NxLmmUJwTBCTPxyTiPCIg3QFZyHig7ywU63gBKQNkR6FYtsRgkmyt+swDCXFK5iQ9WiCGLVNLNav14YDoSzp4qL+ViLF2yjBcAdmciLOq5lDJYqc+y2ojBQIS/XxGrC0Nzv/hhBkjY9kgpYBE/5jx/do54PUa557PGOU1fS4g/7UNpae0Bnijwjn3ZC5jW+cAhjsg72fGnAPuSfQZ7HN5jwFHZp6zzp03eCChwnSf8VC8TVTbHgtqd84zcQJdqhm99O4oNdFtcED2Vpz201TWevvEAQi3QMwv0p22OYDgHoj5QdrX3Q4A9AbIQpzQ3CaMQw4A9AbI4jeJ9vAu+czY7qDwvQVi/gK4qsC1XgZ86qDovQcy9tsRTGoIZKmujF8b9dK0HQyQEP1t7G9siOvO7X37WCvjOsL18adpn4MiDx5IWMYHB7Ib3GCAhIFYQPBlAcGXG0sbulB0o4DG6lsrJji2Daw2VtPJzzL/2ta4NJa2zcPXtnk2NvS1g2RCz11sY0lij3naCYUe20a2b6awtFM0tW3Tj4prRdyKetrJhZ7dGVvb2r57LNv1WM8UkrYdUm+hI62KLYZdsW2tziP/1GBPXLq9MdZIkiRJkiRJkiQJ7/obmBVPgqCWEtEAAAAASUVORK5CYII="/>
                                </defs>
                            </svg>
                            </a>
                        </div>
                        <p
                            className="absolute left-0 bottom-16 md:bottom-0 w-full text-center text-[16px] text-black mt-0 mb-0 font-medium py-3 bg-white z-50"
                            style={{
                                fontFamily:
                                    "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
                            }}
                        >MENNOSKOFFIEBAR ©2025</p>
            </div>
        </section>
    );
}