"use client"

import { Form, TextField, Label, Input, FieldError, Button } from "@heroui/react";
import { useState, useEffect } from "react";
import { LoginFormData } from "@/validation/types";
import { validateEmail } from "@/validation/email.validation";
import { Center } from "@/components/layout/center";
import { useRef } from "react";
import { Fieldset, FieldGroup, Description } from "@heroui/react";
import { background, text } from "@/styles";
import { useAuth } from "@/providers/auth.provider";
import { useRouter } from "next/navigation";
import { DecorCard } from "@/components/other/DecorCard";

export default function LoginPage() {

    const { isAuthenticated } = useAuth();
    const router = useRouter();

    const formRef = useRef<HTMLFormElement | null>(null);

    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: ''
    })

    useEffect(() => {
        if(isAuthenticated) router.replace("/");
    }, [isAuthenticated, router])


    const onSubmit = async () => {
        console.log(formData);

        // await login(data.email, data.password)
    };
    return (
        <Center>
            <DecorCard element={formRef} />
            <Form
                ref={formRef}
                onSubmit={onSubmit}
                style={{
                    boxShadow: "0px 2px 10px -6px gray"
                }}
                className="w-[400px] rounded-4xl p-6 flex flex-col items-start justify-center gap-4 z-10 bg-white"
            >
                <Fieldset className="w-full">
                    <Fieldset.Legend
                        className={text.title + "text-transparent"}
                        style={{
                            backgroundImage: "inherit",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                        }}
                    >Helpdesk App</Fieldset.Legend>
                    <Description>Please login to service.</Description>
                    <FieldGroup>
                        <TextField
                            className="w-full"
                            isRequired
                            name="email"
                            type="email"
                            validate={validateEmail}
                        >
                            <Label>Email</Label>
                            <Input placeholder="john@example.com" />
                            <FieldError />
                        </TextField>

                        <TextField
                            className="w-full"
                            isRequired
                            minLength={8}
                            name="password"
                            type="password"
                        >
                            <Label>Password</Label>
                            <Input placeholder="Enter your password" />
                            <FieldError />
                        </TextField>
                    </FieldGroup>
                    <Fieldset.Actions>
                        <Button
                            type="submit"
                            className={`${background.bluepurplegradient} w-full`}
                            size="lg"

                        >
                            Zaloguj
                        </Button>
                    </Fieldset.Actions>

                </Fieldset>
            </Form>
        </Center>

    );
}
