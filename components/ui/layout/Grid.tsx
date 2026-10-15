import { CSSProperties } from "react";

export const Grid = ({
    cols,
    gap = 0,
    className = "",
    children,
    style
}: {
    cols: number;
    gap?: number;
    className?: string;
    children: React.ReactNode;
    style?: CSSProperties
}) => {
    return (
        <div
            className={`grid w-full ${className}`}
            style={{
                gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                gap: `${gap * 0.25}rem`,
                ...style
            }}
        >
            {children}
        </div>
    );
};