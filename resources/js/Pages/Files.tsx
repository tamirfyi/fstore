import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link, usePage, router } from "@inertiajs/react";
import { FileItem, FolderItem, PageProps } from "@/types";
import UploadFileArea from "../Components/UploadFileArea";
import { Button } from "../Components/ui/button";
import { Input } from "../Components/ui/input";

interface FilesProps extends PageProps {
    files: Array<FileItem>;
    folders: Array<FolderItem>;
    folder_id: String;
}

export default function Files({ auth, files, folders, folder_id }: FilesProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        folder_id: folder_id || null,
    });

    const {
        data: folderData,
        setData: setFolderData,
        post: folderPost,
        processing: folderProcessing,
        errors: folderErrors,
    } = useForm({
        name: "",
        folder_id: folder_id || null,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("files.store"));
        setData("name", "");
    };

    const submitFolder = (e: React.FormEvent) => {
        e.preventDefault();
        setFolderData("name", "");
        folderPost(route("folders.store"));
    };

    const deleteFile = (fileId: string) => {
        console.log("deleting", fileId);
        if (confirm("Are you sure you want to delete this file?")) {
            router.delete(route("files.destroy", fileId));
        }
    };

    // Function to handle folder deletion
    const deleteFolder = (folderId: string) => {
        console.log("deleting", folderId);
        if (confirm("Are you sure you want to delete this folder?")) {
            router.delete(route("folders.destroy", folderId));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="All files" />
            <form className="flex flex-col gap-2 w-96" onSubmit={submit}>
                <div className="flex gap-2">
                    <Input
                        value={data.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setData("name", e.target.value);
                        }}
                        placeholder="File name"
                    />
                    <Button type="submit">Create file</Button>
                </div>
            </form>

            <form className="flex flex-col gap-2 w-96" onSubmit={submitFolder}>
                <div className="flex gap-2">
                    <Input
                        value={folderData.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setFolderData("name", e.target.value);
                        }}
                        placeholder="Folder name"
                    />
                    <Button type="submit">Create folder</Button>
                </div>
            </form>

            {/* <UploadFileArea /> */}
            <div className="flex flex-col gap-4">
                {files.length > 0 &&
                    files.map((file) => {
                        return (
                            <div
                                className="flex items-center w-full gap-2"
                                key={file.id.toString()}
                            >
                                <div className="px-24 py-2 border border-gray-300 rounded-md">
                                    <p>{file.name}</p>
                                </div>
                                <Button
                                    onClick={() =>
                                        deleteFile(file.id.toString())
                                    }
                                    variant={"destructive"}
                                >
                                    Delete
                                </Button>
                            </div>
                        );
                    })}
                {folders.length > 0 &&
                    folders.map((folder) => {
                        return (
                            <div
                                className="flex gap-2"
                                key={folder.id.toString()}
                            >
                                <Link
                                    href={route(
                                        "folders.show",
                                        folder.id.toString()
                                    )}
                                    className="px-24 py-2 bg-gray-200 border border-gray-300 rounded-md"
                                >
                                    {folder.name}
                                </Link>
                                <Button
                                    onClick={() =>
                                        deleteFolder(folder.id.toString())
                                    }
                                    variant={"destructive"}
                                >
                                    Delete
                                </Button>
                            </div>
                        );
                    })}
            </div>
        </AuthenticatedLayout>
    );
}
