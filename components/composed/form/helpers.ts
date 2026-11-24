import { FilterOption } from "../filters/types";
import { FieldType, FormConfig } from "./types";

export const addFormFieldOptions = <T,>(
    config: FormConfig<T>,
    options: Partial<Record<keyof T, FilterOption[]>>
): FormConfig<T> => ({
    ...config,
    fields: config.fields.map(field => ({
        ...field,
        options: options[field.name] ?? field.options
    }))
});

export const fillFormValues = <T extends object>(
    config: FormConfig<T>,
    data?: Partial<T>
): FormConfig<T> => {
    if (!data) return config;

    return {
        ...config,
        fields: config.fields.map(field => ({
            ...field,
            value: data[field.name] as FieldType<T>["value"] ?? field.value
        }))
    };
};