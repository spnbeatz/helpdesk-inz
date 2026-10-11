import { FlexProps } from ".";
import { Flex } from "./Flex";

export const Column = (props: FlexProps) => {
    return <Flex {...props} direction="col"/>
}