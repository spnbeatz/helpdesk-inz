import { Accordion } from "@heroui/react"
import { BiChevronDown } from "react-icons/bi"

export const AccordionItem = ({
    key,
    body,
    indicator = true,
    children,
    className,
    isDisabled=false
}: {
    key: string,
    body: React.ReactNode,
    indicator?: boolean,
    children: React.ReactNode,
    className?: string,
    isDisabled?: boolean
}) => {
    return (
        <Accordion className={"w-full disabled:saturate-100"} isDisabled={isDisabled}>
            <Accordion.Item key={key} className={className}>
                <Accordion.Heading>
                    <Accordion.Trigger className={"p-0.5 disabled:opacity-100"}>
                        {children}
                        {indicator && <Accordion.Indicator>
                            <BiChevronDown />
                        </Accordion.Indicator>}
                    </Accordion.Trigger>
                </Accordion.Heading>
                <Accordion.Panel >
                    <Accordion.Body >
                        {body}
                    </Accordion.Body>
                </Accordion.Panel>
            </Accordion.Item>
        </Accordion>

    )
}