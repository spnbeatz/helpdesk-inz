
import { LuImage, LuVideo, LuFile, LuX, LuArchive } from "react-icons/lu";
import { Button } from "@heroui/react";

export const AttachmentListItem = ({
    onRemoveItem,
    file
}: {
    onRemoveItem: (fileToRemove: File) => void,
    file: File
}) => {
    
    const getFileTypeIcon = (file: File) => {
        const iconClasses = "text-xl text-black/60"
        switch (true) {
            case file.type.startsWith("image/"):
                return <LuImage className={iconClasses} />

            case file.type.startsWith("video/"):
                return <LuVideo className={iconClasses} />

            case file.type.startsWith("text/"):
                return <LuFile className={iconClasses} />
            case [
                "application/zip",
                "application/x-rar-compressed",
                "application/vnd.rar",
                "application/x-7z-compressed",
                "application/x-tar",
                "application/gzip"
            ].includes(file.type):
                return <LuArchive className={iconClasses} />
            default:
                return <LuArchive className={iconClasses} />;
        }
    };
    return (
        <div className="p-4 flex flex-col items-center justify-center gap-2 rounded-lg shadow-sm bg-white/60 relative group">
            {getFileTypeIcon(file)}
            <p className="text-xs text-black/60">{file.name}</p>
            <Button variant="ghost" onClick={() => onRemoveItem(file)}
                className={"text-xs w-[15px] h-[15px] absolute top-2 right-2 px-1 opacity-0 duration-200 group-hover:opacity-100"}>
                <LuX color="red" />
            </Button>
        </div>
    )
}