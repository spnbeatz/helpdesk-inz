import { ValidationError } from "next/dist/compiled/amphtml-validator"
import { FilterOption } from "../filters/types"
import React from "react"

export type FieldControlType = "input" | "select" | "textarea" | "hidden" | "checkbox" | "file"

export type FieldType<T> = {
    type: FieldControlType,
    inputType?: "text" | "password" | "email",
    label?: string,
    name: keyof T,
    isRequired?: boolean,
    options?: FilterOption[],
    validate?: ((value: string) => true | ValidationError | null | undefined),
    value?: string | number | boolean,
    accept?: string;
    description?: string
}

export type FormConfig<T> = {
    title?: string,
    description?: string,
    submitButtonText?: string,
    fields: FieldType<T>[]
}

export type FormProps<T extends object> = {
    config: FormConfig<T>,
    children?: React.ReactNode,
    onSubmit: (formData: T) => void,
}