import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link, usePage, router } from "@inertiajs/react";
import { IFileItem, IFolderItem, PageProps } from "@/types";
import UploadFileArea from "../Components/UploadFileArea";
import { Button } from "../Components/ui/button";
import { Input } from "../Components/ui/input";
import FileItem from "../Components/File/FileItem";
import FolderItem from "../Components/Folder/FolderItem";

interface FilesProps extends PageProps {
    files: Array<IFileItem>;
    folders: Array<IFolderItem>;
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
                            <FileItem key={file.id.toString()} file={file} />
                        );
                    })}
                {folders.length > 0 &&
                    folders.map((folder) => {
                        return (
                            <FolderItem
                                key={folder.id.toString()}
                                folder={folder}
                            />
                        );
                    })}
            </div>
        </AuthenticatedLayout>
    );
}
