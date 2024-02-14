import React, { ChangeEvent, useState } from "react";
import { IFileItem } from "../../types";
import { router } from "@inertiajs/react";
import { Button } from "../ui/button";

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/Components/ui/context-menu";
import { Input } from "../ui/input";

interface FileItemProps {
    file: IFileItem;
}

const FileItem = ({ file }: FileItemProps) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editingName, setEditingName] = useState<string>(file.name);

    const deleteFile = () => {
        if (confirm("Are you sure you want to delete this file?")) {
            router.delete(route("files.destroy", file.id.toString()));
        }
    };

    const editFile = () => {
        setIsEditing(true);
    };

    const onKeyDownWhileEditing = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Enter") {
            onSaveEditedFile();
        }
    };

    const onSaveEditedFile = () => {
        router.put(
            route("files.update", {
                id: file.id,
                name: editingName,
            })
        );
        setIsEditing(false);
    };

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <div
                    className="flex items-center justify-center py-2 border border-gray-300 rounded-md"
                    draggable="true"
                >
                    {isEditing ? (
                        <Input
                            value={editingName}
                            onKeyDown={onKeyDownWhileEditing}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setEditingName(e.target.value);
                            }}
                        />
                    ) : (
                        <p>{file.name}</p>
                    )}
                </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem onClick={editFile}>Rename</ContextMenuItem>
                <ContextMenuItem onClick={deleteFile}>Delete</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
};

export default FileItem;
