"use client";
import { useId } from "react";

export default function CheckIcon() {
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
