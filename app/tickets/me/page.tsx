"use client"
import { useEffect } from "react";
import { useTicketsPageStore } from "@/store/pages/tickets.store";

export default function MyTicketsPage(){
    const { setPageData, setFilters } = useTicketsPageStore();

    useEffect(() => {
        setPageData({
            title: "My Tickets",
            description: "Here you find your own tickets",
        })
        setFilters("status", "new");
    },[])
    return null;
}