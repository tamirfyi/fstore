import { Upload } from "lucide-react";
import { useCallback, useState } from "react";

const UploadFileArea = () => {
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [files, setFiles] = useState<Array<File>>([]);

    const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFiles((prevFiles) => [
                ...prevFiles,
                ...Array.from(e.dataTransfer.files),
            ]);
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
            className={`flex flex-col items-center justify-center w-full h-full gap-2 border-2 ${
                isDragging ? "border-blue-500" : "border-gray-300"
            } border-dashed`}
            onDrop={handleDrop}
            onDragOver={handleDrag}
            onDragEnter={handleDragIn}
            onDragLeave={handleDragOut}
        >
            <Upload className="text-gray-400" />
            <p className="text-sm text-gray-400">Drop files here to upload</p>
            {files.length > 0 && (
                <ul>
                    {files.map((file, index) => (
                        <li key={index}>{file.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UploadFileArea;
