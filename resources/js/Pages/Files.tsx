import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import { FileItem, FolderItem, PageProps } from "@/types";
import UploadFileArea from "../Components/UploadFileArea";
import { Button } from "../Components/ui/button";
import { Input } from "../Components/ui/input";

interface FilesProps extends PageProps {
    files: Array<FileItem>;
    folders: Array<FolderItem>;
}

export default function Files({ auth, files, folders }: FilesProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        folder_id: null,
    });

    const {
        data: folderData,
        setData: setFolderData,
        post: folderPost,
        processing: folderProcessing,
        errors: folderErrors,
    } = useForm({
        name: "",
        folder_id: null,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("files.store"));
    };

    const submitFolder = (e: React.FormEvent) => {
        e.preventDefault();
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
                            <div
                                key={file.id.toString()}
                                className="p-4 border border-gray-300 rounded-md"
                            >
                                <p>{file.name}</p>
                            </div>
                        );
                    })}
                {folders.length > 0 &&
                    folders.map((folder) => {
                        return (
                            <Link
                                href={route(
                                    "folders.show",
                                    folder.id.toString()
                                )}
                                key={folder.id.toString()}
                                className="p-4 bg-gray-200 border border-gray-300 rounded-md"
                            >
                                {folder.name}
                            </Link>
                        );
                    })}
            </div>
        </AuthenticatedLayout>
    );
}
