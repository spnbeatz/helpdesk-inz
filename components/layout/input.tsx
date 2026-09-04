import { FieldError, Label, TextField, Input as HeroInput, TextArea } from "@heroui/react"
import { ValidationError } from "next/dist/compiled/amphtml-validator"

export const Input = ({
    isRequired,
    name,
    label,
    placeholder,
    validate,
    type = "input",
    value,
    rows = 5,
    onInput
}: {
    isRequired?: boolean,
    name?: string,
    label?: string,
    placeholder?: string,
    validate?: ((value: string) => true | ValidationError | null | undefined) | undefined,
    type?: "input" | "textarea",
    value: string,
    rows?: number,
    onInput: (value: string, key: string) => void
}) => {
    return (
        <TextField
            isRequired={isRequired || false}
            name={name}
            validate={validate}
        >
            {label && <Label>{label}</Label>}
            {type === "input" ?
                (
                    <HeroInput
                        placeholder={placeholder}
                        className={"rounded-lg bg-white/70"}
                        value={value}
                        onInput={(e) =>
                            onInput((e.target as HTMLInputElement).value, name || "")
                        }
                    />
                ) : (
                    <TextArea fullWidth className={"rounded-lg bg-white/70"}
                        placeholder={placeholder} value={value} rows={rows}
                        onInput={(e) =>
                            onInput((e.target as HTMLTextAreaElement).value, name || "")
                        }
                    />
                )}

            <FieldError />
        </TextField>
    )
}