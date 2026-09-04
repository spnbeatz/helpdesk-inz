"use client"

import { useTicketsPageStore } from "@/store/pages/tickets.store";
import { useEffect } from "react";

export default function UnassignedTicketsPage(){
    const { setPageData, setFilters } = useTicketsPageStore();

    useEffect(() => {
        setPageData({
            title: "Unassigned Tickets",
            description: "Here you find unassigned tickets",
            
        })

        setFilters("status", "new");
    },[])
    return null;
}