export const highlightText = (text: string, searchValue?: string) => {
    if (!searchValue?.trim()) {
        return text;
    }

    const search = searchValue.trim();

    const parts = text.split(
        new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
    );

    return parts.map((part, index) =>
        part.toLowerCase() === search.toLowerCase() ? (
            <strong key={index}>{part}</strong>
        ) : (
            part
        )
    );
};