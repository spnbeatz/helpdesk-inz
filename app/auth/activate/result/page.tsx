"use client"

import { Column } from "@/components/ui/layout/flex";
import { Description, Label } from "@heroui/react";
import { useEffect, useState } from "react";

type ActivateAccountResult = {
    type: "success" | "error";
    message: string;
};

export default function ActivateResultPage() {
    const [result, setResult] = useState<ActivateAccountResult | null>(null);

    useEffect(() => {
        const stored = sessionStorage.getItem("activationResult");

        if (stored) {
            setResult(JSON.parse(stored));
            sessionStorage.removeItem("activationResult");
        }
    }, []);

    if (!result) return null;
    return (
        <Column Center className="w-full h-full">
            <Label>{result.type}</Label>
            <Description>{result.message}</Description>
        </Column>
    )
}