import { Column } from "./Column";
import { Row } from "./Row";

export type Alignment =
    | "Start"
    | "StartCenter"
    | "StartEnd"
    | "StartBetween"
    | "CenterStart"
    | "Center"
    | "CenterEnd"
    | "CenterBetween"
    | "EndStart"
    | "EndCenter"
    | "End"
    | "EndBetween";

export type FlexProps = {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
} & Partial<Record<Alignment, boolean>>;

export const alignmentClasses: Record<Alignment, string> = {
    Start: "items-start justify-start",
    StartCenter: "items-start justify-center",
    StartEnd: "items-start justify-end",
    StartBetween: "items-start justify-between",

    CenterStart: "items-center justify-start",
    Center: "items-center justify-center",
    CenterEnd: "items-center justify-end",
    CenterBetween: "items-center justify-between",

    EndStart: "items-end justify-start",
    EndCenter: "items-end justify-center",
    End: "items-end justify-end",
    EndBetween: "items-end justify-between",
};

export const alignment = (props: FlexProps) => {
    return (Object.keys(alignmentClasses) as Alignment[])
        .find(key => props[key] === true);
};

export {
    Column,
    Row
}