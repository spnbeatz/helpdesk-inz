import { FlexProps, alignment, alignmentClasses } from ".";

export const Row = (props: FlexProps) => {

    const { children, className } = props;

    const align = alignment(props);

    return (
        <div
            className={`flex flex-row gap-4 ${align ? alignmentClasses[align] : ""
                } ${className ?? ""}`}
        >
            {children}
        </div>
    )
}