"use client";
import { ChangeEvent, Dispatch, SetStateAction, useRef } from "react";
import { Column } from "../../layout/flex";

export const FileInput = ({
    className,
    children,
    onChange,
    accept
}: {
    className?: string,
    children?: React.ReactNode,
    onChange: Dispatch<SetStateAction<File[]>>,
    accept: string
}) => {

    const inputRef = useRef<HTMLInputElement | null>(null);

    const setFiles = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (!files) return;

        onChange((prev) => [
            ...prev,
            ...Array.from(files)
        ]);
    };

    return (
        <Column Center
            className={`bg-white/60 hover:bg-white duration-200 
                cursor-pointer shadow-sm rounded-lg ${className}`}
            onClick={() => inputRef.current?.click()}
        >
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                hidden
                multiple
                onChange={(e: ChangeEvent<HTMLInputElement>) => setFiles(e)}
            />
            {children}
        </Column>
    )
}