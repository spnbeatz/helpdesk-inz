export const highlightText = (
    text: string | number | null | undefined,
    searchValue?: string
) => {
    const value = String(text ?? "");

    if (!searchValue?.trim()) {
        return value;
    }

    const search = searchValue.trim();

    const parts = value.split(
        new RegExp(
            `(${search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
            "gi"
        )
    );

    return parts.map((part, index) =>
        part.toLowerCase() === search.toLowerCase() ? (
            <strong key={index}>{part}</strong>
        ) : (
            part
        )
    );
};