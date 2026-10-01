"use client"

import { useState, useEffect } from "react";
import { RefObject } from "react";
import { background } from "@/styles";

export const DecorCard = ({ 
    element,
    rotation
}: { 
    element: RefObject<HTMLFormElement | HTMLDivElement | null> ,
    rotation?: number
}) => {
    const [formSize, setFormSize] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        if (!element.current) return;

        const el = element.current;

        const updateSize = () => {
            const { width, height } = el.getBoundingClientRect();

            setFormSize({
                width,
                height,
            });
        };

        updateSize();

        const observer = new ResizeObserver(updateSize);
        observer.observe(el);

        return () => observer.disconnect();
    }, []);

    return (
        <div
            className={`${background.bluepurplegradient} rotate-${rotation || 6} absolute rounded-4xl shadow-lg`}
            style={{
                width: formSize.width,
                height: formSize.height
            }}></div>
    )
}