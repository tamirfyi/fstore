import { router, useForm } from "@inertiajs/react";
import clsx from "clsx";
import { Upload } from "lucide-react";
import { ReactElement, useCallback, useState } from "react";
import { toast } from "sonner";

const UploadFileArea = () => {
    const [isDragging, setIsDragging] = useState<boolean>(false);

    const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    //submit action goes here
    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            files.forEach((file) => {
                toast(`uploaded ${file.name}`);
            });
            e.dataTransfer.clearData();
        }
    }, []);

    const handleDragIn = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragOut = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    return (
        <div
            className={clsx(
                `flex flex-col gap-2 items-center justify-center w-full h-full border-2 border-dashed border-gray-300`,
                {
                    "border-blue-500": isDragging,
                }
            )}
            onDrop={handleDrop}
            onDragOver={handleDrag}
            onDragEnter={handleDragIn}
            onDragLeave={handleDragOut}
        >
            <Upload className="text-gray-400" />
            <p className="text-sm text-gray-400">Drop files here to upload</p>
            <input
                className="invisible"
                type="file"
                onChange={(e: any) => handleDrop(e)}
            />
        </div>
    );
};

export default UploadFileArea;
