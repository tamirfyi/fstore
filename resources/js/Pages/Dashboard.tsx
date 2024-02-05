import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { FileItem, PageProps } from "@/types";
import { Button } from "@/Components/ui/button";
import SideMenu from "../Components/SideMenu";
import { Upload } from "lucide-react";
import UploadFileArea from "../Components/UploadFileArea";

interface DashboardProps extends PageProps {
    files: Array<FileItem>;
}

export default function Dashboard({ auth }: DashboardProps) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            <UploadFileArea />
        </AuthenticatedLayout>
    );
}
