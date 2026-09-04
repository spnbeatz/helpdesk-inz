"use client"

import { useTicketsPageStore } from "@/store/pages/tickets.store";
import { useEffect } from "react";

export default function TicketsPage(){
    const { setPageData, setFilters } = useTicketsPageStore();

    useEffect(() => {
        setPageData({
            title: "All Tickets",
            description: "Here you find all existing tickets",
            
        })
        setFilters("status", "all");
    },[])
    return null;
}