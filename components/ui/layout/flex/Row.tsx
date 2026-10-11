import { FlexProps } from ".";
import { Flex } from "./Flex";

export const Row = (props: FlexProps) => {
    return <Flex {...props} direction="row" />
}