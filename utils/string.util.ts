export const truncateText = (
    text: string | null | undefined,
    maxLength: number = 40
): string => {
    if (!text) return "";

    return text.length > maxLength
        ? text.slice(0, maxLength) + "..."
        : text;
};