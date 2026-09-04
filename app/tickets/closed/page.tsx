"use client"
import { useTicketsPageStore } from "@/store/pages/tickets.store";
import { useEffect } from "react";


export default function ClosedTicketsPage(){
    const { setPageData, setFilters } = useTicketsPageStore();

    useEffect(() => {
        setPageData({
            title: "Closed Tickets",
            description: "Here you find closed tickets",
        })
        setFilters("status", "closed");
    },[])
    return null;
}