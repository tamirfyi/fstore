import { PropsWithChildren } from "react";
import { User } from "@/types";
import SideMenu from "../Components/SideMenu";

export default function Authenticated({
    user,
    children,
}: PropsWithChildren<{ user: User }>) {
    return (
        <div className="min-h-screen bg-white">
            <main>
                <div className="flex">
                    <SideMenu />
                    <div className="flex flex-col flex-1 w-full gap-2 p-2">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
