import { Link } from "@inertiajs/react";
import { FileItem } from "../types";
import { Card } from "./ui/card";

interface FilePreviewProps {
    file: FileItem;
}

const FilePreview = ({ file }: FilePreviewProps) => {
    return (
        <div className="border border-gray-100 rounded">
            <p>{file.name}</p>
        </div>
    );
};

export default FilePreview;
