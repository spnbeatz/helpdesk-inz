import { FieldError, Label, TextField, Input as HeroInput, TextArea } from "@heroui/react"
import { ValidationError } from "next/dist/compiled/amphtml-validator"

export const Input = ({
    isRequired,
    inputType = "text",
    name,
    label,
    placeholder,
    validate,
    type = "input",
    value,
    rows = 5,
    onInput,
    disabled = false
}: {
    isRequired?: boolean,
    name?: string,
    inputType?: string,
    label?: string,
    placeholder?: string,
    validate?: ((value: string) => true | ValidationError | null | undefined) | undefined,
    type?: "input" | "textarea",
    value?: string,
    rows?: number,
    onInput?: (value: string, key: string) => void,
    disabled?: boolean
}) => {
    return (
        <TextField
            isRequired={isRequired || false}
            name={name}
            defaultValue={value}
            type={inputType}
            validate={validate}
            className={"w-full"}
            aria-label="write something"
        >
            {label && <Label>{label}</Label>}
            {type === "input" ?
                (
                    <HeroInput
                        disabled={disabled}
                        aria-label="input"
                        placeholder={placeholder}
                        className={"rounded-lg bg-white/50 w-full"}
                        onInput={(e) =>
                            onInput?.((e.target as HTMLInputElement).value, name || "")
                        }
                    />
                ) : (
                    <TextArea fullWidth className={"rounded-lg bg-white/50"}
                        placeholder={placeholder} rows={rows}
                        onInput={(e) =>
                            onInput?.((e.target as HTMLTextAreaElement).value, name || "")
                        }
                    />
                )}

            <FieldError />
        </TextField>
    )
}