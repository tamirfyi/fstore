import { Link, router, usePage } from "@inertiajs/react";
import { IFolderItem } from "../../types";
import { Button } from "../ui/button";

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/Components/ui/context-menu";
import { useState } from "react";
import { Input } from "../ui/input";

interface FolderItemProps {
    folder: IFolderItem;
}

const FolderItem = ({ folder }: FolderItemProps) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editingName, setEditingName] = useState<string>(folder.name);

    // Functions for renaming folder
    const deleteFolder = () => {
        console.log("deleting", folder.id.toString());
        if (confirm("Are you sure you want to delete this folder?")) {
            router.delete(route("folders.destroy", folder.id.toString()));
        }
    };

    const editFolder = () => {
        setIsEditing(true);
    };

    const onKeyDownWhileEditing = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Enter") {
            onSaveEditedFolder();
        }
    };

    const onSaveEditedFolder = () => {
        router.put(
            route("folders.update", {
                id: folder.id,
                name: editingName,
                op: "name",
            })
        );
        setIsEditing(false);
    };

    //Drag and drop functions
    const handleDragStart = (
        e: React.DragEvent<HTMLDivElement>,
        folder: IFolderItem
    ) => {
        e.dataTransfer.setData("type", "folder");
        e.dataTransfer.setData("folderId", JSON.stringify(folder.id));
        e.dataTransfer.setData(
            "parentFolderId",
            JSON.stringify(folder.folder_id ? folder.folder_id : null)
        );
        e.stopPropagation();
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (
        e: React.DragEvent<HTMLDivElement>,
        folder: IFolderItem
    ) => {
        e.preventDefault();
        e.stopPropagation();

        const draggedFolderId = JSON.parse(e.dataTransfer.getData("folderId"));
        const draggedFolderParentId = JSON.parse(
            e.dataTransfer.getData("parentFolderId")
        );
        console.log(draggedFolderParentId);
        if (draggedFolderId && draggedFolderId !== folder.id.toString()) {
            console.log(
                `dropped folder ${draggedFolderId} onto ${folder.id.toString()}`
            );
            console.log(draggedFolderParentId || "root");
            router.put(
                route("folders.update", {
                    id: draggedFolderId,
                    folder_id: folder.id,
                    op: "move",
                    redirect: draggedFolderParentId
                        ? draggedFolderParentId
                        : "root",
                })
            );
        }
    };

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <div
                    className="flex justify-center py-2 bg-gray-100 border border-gray-300 rounded-md item-center hover:cursor-pointer"
                    draggable="true"
                    onDragStart={(e) => handleDragStart(e, folder)}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, folder)}
                    onDoubleClick={() => {
                        router.get(route("folders.show", folder.id.toString()));
                    }}
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
                        <a>{folder.name}</a>
                    )}
                </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem onClick={editFolder}>Edit</ContextMenuItem>
                <ContextMenuItem onClick={deleteFolder}>Delete</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
};

export default FolderItem;
