import { Link, router } from "@inertiajs/react";
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
            })
        );
        setIsEditing(false);
    };

    return (
        <div className="flex gap-2">
            <ContextMenu>
                <ContextMenuTrigger>
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
                        <Link
                            href={route("folders.show", folder.id.toString())}
                            className="px-24 py-2 bg-gray-200 border border-gray-300 rounded-md"
                        >
                            {folder.name}
                        </Link>
                    )}
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuItem onClick={editFolder}>Edit</ContextMenuItem>
                    <ContextMenuItem onClick={deleteFolder}>
                        Delete
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
        </div>
    );
};

export default FolderItem;
