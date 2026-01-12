"use client";
import React from "react";
import { usePathname } from "next/navigation";

export default function Footer2() {
  const pathname = usePathname();
  const showHero = pathname !== "/contact";

  return (
  <footer className="w-full mt-0 bg-white pb-16 md:mb-16 relative" style={{ width: "100%", marginTop: 0, background: "#fff" }}>
      {showHero && (
        <div className="text-center pt-40 md:pt-80 pb-16">
          <h1 id="cta-heading"
            className="text-[24px] md:text-[64px] font-semibold text-center"
            style={{
              fontFamily:
                "Switzer, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
              margin: 0,
              fontWeight: 600
            }}
          >
            KOFFIE CATERING OP LOCATIE?
          </h1>

          <style>{`@media (min-width: 720px) and (max-width: 1024px) {
                    #cta-heading {
                        font-size: 40px !important;
                        line-height: 1.05 !important;
                        white-space: normal !important;
                    }
                }`}</style>

          <div className="mt-10">
            <div
              className="inline-flex items-center justify-center gap-2 text-[14px] md:text-[18px] text-black font-normal"
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
          </div>
        </div>
      )}

      <div className="w-full h-[1px] bg-gray-300 mt-[80px] mb-[60px]" aria-hidden="true" />

      <div style={{ textAlign: "center", paddingBottom: 40, marginTop: 0 }}>
        <div className="mt-0 mb-24 inline-flex justify-center items-center gap-2">
          <a
            href="https://instagram.com"
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
            href="https://facebook.com"
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
            href="https://tiktok.com"
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
        >
          MENNOSKOFFIEBAR ©2025
        </p>
      </div>
    </footer>
  );
}
