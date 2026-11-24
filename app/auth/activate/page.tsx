"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { activateUserFormConfig } from "@/components/features/settings/users/config/form.config";
import { Form } from "@/components/composed/form/Form";
import { Column } from "@/components/ui/layout/flex";
import { UserActivationDataType } from "@/components/features/settings/users/types/form.types";


export default function ActivateAccountPage() {

    // wylogowac usera przed aktywacja

    const searchParams = useSearchParams();
    const router = useRouter();

    const testValidToken = "token123"

    const token = searchParams.get("token");

    const onSubmit = (data: UserActivationDataType) => {
        let activationResult: {
            type: "success" | "error";
            message: string;
        };

        if (!token || testValidToken !== token) {
            console.log("tokens are not valid");

            activationResult = {
                type: "error",
                message: "Tokens are not valid"
            };
        } else {
            console.log("valid tokens!");

            activationResult = {
                type: "success",
                message: "Tokens are valid"
            };
        }

        sessionStorage.setItem(
            "activationResult",
            JSON.stringify(activationResult)
        );

        router.push("/auth/activate/result");
    };


    return (
        <Column Center className="w-full h-full">
            <Column Center className="w-[400px] rounded-lg shadow-sm bg-white/80 p-10">
                <Form
                    config={activateUserFormConfig}
                    onSubmit={onSubmit}
                />
            </Column>
        </Column>

    )
}