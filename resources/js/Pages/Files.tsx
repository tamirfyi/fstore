import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { FileItem, PageProps } from "@/types";
import UploadFileArea from "../Components/UploadFileArea";

interface DashboardProps extends PageProps {
    files: Array<FileItem>;
}

export default function Files({ auth }: DashboardProps) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="All files" />
            <UploadFileArea />
        </AuthenticatedLayout>
    );
}
