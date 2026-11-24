import { Input } from "@/components/ui/controls/inputs/Input";
import { FieldControlType, FieldType } from "./types"
import { Select } from "@/components/ui/controls/inputs/Select";
import { FileInput } from "@/components/ui/controls/inputs/FileInput";

export const FormControl = <T,>({
    type,
    inputType = "text",
    label,
    name,
    options,
    isRequired,
    validate,
    value,
    accept,
    description,
    onFilesChange,
    files
}: FieldType<T> & {
    onFilesChange?: (name: string, files: File[]) => void;
    files: Record<string, File[]>;
}) => {

    const inputProps = {
        name: String(name),
        isRequired,
        label,
        validate,
        inputType,
        value: value ? String(value) : undefined
    }

    if (!name) return null;


    const renderField = (type: FieldControlType): React.ReactNode => {
        switch (type) {
            case "hidden":
                return (
                    <input hidden name={name as string} />
                )
            case "input":
                return (
                    <Input {...inputProps} />
                )
            case "textarea":
                return (
                    <Input {...inputProps} type="textarea" />
                )
            case "select":
                return (
                    <Select
                        name={name as string}
                        isRequired={isRequired}
                        label={label}
                        options={options}
                        defaultValue={value ? String(value) : undefined}
                    />
                )
            case "file":
                return (
                    <FileInput
                        name={String(name)}
                        accept={accept ?? "*"}
                        label={label}
                        description={description}
                        onChange={(files) => onFilesChange?.(String(name), files)}
                        value={files[String(name)] ?? []}
                    />
                );

            default:
                return null;
        }
    }

    return renderField(type);
}