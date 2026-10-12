"use client"

import { useRouter } from "next/navigation"
import { IconButton } from "./iconButton";
import { IoChevronBack } from "react-icons/io5";

export const BackButton = () => {

    const router = useRouter();

    return (
        <IconButton Icon={IoChevronBack} onClick={router.back} className="bg-white/40"/>
    )

}