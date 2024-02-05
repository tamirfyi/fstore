import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { FileItem, PageProps } from "@/types";
import { Button } from "@/Components/ui/button";
import SideMenu from "../Components/SideMenu";
import { Upload } from "lucide-react";

interface DashboardProps extends PageProps {
    files: Array<FileItem>;
}

export default function SharedFiles({ auth }: DashboardProps) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Shared files" />
            <div className="flex flex-col items-center justify-center w-full h-full gap-2 border-2 border-gray-300 border-dashed">
                <Upload className="text-gray-400" />
                <p className="text-sm text-gray-400">
                    Drop files here to upload
                </p>
            </div>
        </AuthenticatedLayout>
    );
}
