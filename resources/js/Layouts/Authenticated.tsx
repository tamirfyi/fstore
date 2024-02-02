import { PropsWithChildren } from "react";
import { User } from "@/types";
import Navbar from "@/Components/Navbar";

export default function Authenticated({
    user,
    children,
}: PropsWithChildren<{ user: User }>) {
    return (
        <div className="min-h-screen bg-white">
            <Navbar user={user} />

            <main>{children}</main>
        </div>
    );
}
