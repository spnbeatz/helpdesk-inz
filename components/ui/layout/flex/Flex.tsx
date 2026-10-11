import { FlexProps, alignment, alignmentClasses, direction } from ".";

export const Flex = (props: FlexProps) => {

    const { children, className, onClick } = props;

    const align = alignment(props);
    const dir = direction(props);

    return (
        <div
            onClick={onClick}
            className={`flex ${dir} ${align ? alignmentClasses[align] : ""
                } ${className ?? ""}`}
        >
            {children}
        </div>
    )
}