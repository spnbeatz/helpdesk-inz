"use client"

import { NavigationRoutesType } from "@/config/navigation"
import { Accordion, AccordionIndicator } from "@heroui/react"
import { BiChevronDown } from "react-icons/bi";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { LuDot } from "react-icons/lu";
import { BsDot } from "react-icons/bs";
import { MdChevronRight } from "react-icons/md";


export const NormalTypeNavItem = ({ item, isAccordion = false }: { item: NavigationRoutesType, isAccordion?: boolean }) => {
    const router = useRouter();
    const pathname = usePathname();
    return (
        <div
            className={`p-2 rounded-lg flex flex-row 
            justify-start items-center gap-2 w-full 
            cursor-pointer
            ${item.href !== pathname ? "hover:gap-6" : "bg-gray-50/50"} duration-300`}
            onClick={() => {
                if (!item.href) return;
                router.replace(item.href)
            }}
        >
            {item.href === pathname && <MdChevronRight />}
            <item.icon />
            <p className="text-sm">{item.name}</p>
        </div>
    )
}

export const MultipleTypeNavItem = ({ item }: { item: NavigationRoutesType }) => {
    const pathname = usePathname();


    return (
        <Accordion.Item className={"w-full rounded-4xl"} id={item.key}>
            <Accordion.Heading>
                <Accordion.Trigger className={`w-full p-0 rounded-lg 
                    ${item.href === pathname && "bg-gray-50"}
                    ${pathname.split("/")[1] === item.key && "bg-gray-50"}
                    hover:bg-white
                    `}
                >
                    <NormalTypeNavItem item={item} />
                    {item.children && <AccordionIndicator>
                        <BiChevronDown />
                    </AccordionIndicator>}
                </Accordion.Trigger>
            </Accordion.Heading>
            {item.children && <Accordion.Panel className={" rounded-lg"}>
                <Accordion.Body className="text-black/70 w-full p-0">
                    {item.children?.map((child) => {
                        return (
                            <NormalTypeNavItem item={child} key={child.name} isAccordion={true} />
                        )
                    })}
                </Accordion.Body>
            </Accordion.Panel>}
        </Accordion.Item>
    )
}