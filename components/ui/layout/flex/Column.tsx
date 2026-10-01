import { FlexProps, alignment, alignmentClasses } from ".";

export const Column = (props: FlexProps) => {

    const { children, className } = props;

    const align = alignment(props);

    return (
        <div
            className={`flex flex-col gap-4 ${align ? alignmentClasses[align] : ""
                } ${className ?? ""}`}
        >
            {children}
        </div>
    )
}