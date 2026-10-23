
"use client";

import { useEffect, useState } from "react";

export type ScreenType =
    | "mobile"
    | "tablet"
    | "laptop"
    | "desktop"
    | "widescreen";

type ScreenSize = {
    width: number;
    height: number;
};

const getScreenType = (
    width: number,
    height: number
): ScreenType => {
    if (width < 640) return "mobile";
    if (width < 1024) return "tablet";
    if (width < 1440) return "laptop";
    if (width < 1920) return "desktop";

    return "widescreen";
};

export const useScreen = () => {
    const [size, setSize] = useState<ScreenSize>({
        width: 0,
        height: 0
    });

    useEffect(() => {
        const updateSize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        updateSize();

        window.addEventListener("resize", updateSize);

        return () => {
            window.removeEventListener("resize", updateSize);
        };
    }, []);

    const { width, height } = size;

    return {
        width,
        height,

        screenType: getScreenType(width, height),

        isMobile: width < 640,
        isTablet: width >= 640 && width < 1024,
        isLaptop: width >= 1024 && width < 1440,
        isDesktop: width >= 1440 && width < 1920,
        isWideScreen: width >= 1920,

        // Dodatkowe warunki wysokości
        isShortScreen: height > 0 && height < 800,
        isTallScreen: height >= 1000,

        // Duży ekran zarówno na szerokość, jak i wysokość
        isLargeScreen: width >= 1920 && height >= 1080,

        // Proporcje ekranu
        aspectRatio: height > 0 ? width / height : 0,

        isPortrait: height > 0 && height > width,
        isLandscape: height > 0 && width > height,

        isReady: width > 0 && height > 0
    };
};
