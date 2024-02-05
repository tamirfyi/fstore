import { usePage } from "@inertiajs/react";
import clsx from "clsx";

import { Share2, Files, Trash } from "lucide-react";

const SideMenu = () => {
    const { url, component } = usePage();

    return (
        <div className="flex flex-col flex-none w-48 min-h-screen border-r border-gray-200 bg-gray-50">
            <div className="flex flex-col ">
                <a
                    className={clsx(
                        "flex items-center justify-left px-3 py-2 hover:bg-gray-200 transition ease",
                        {
                            "bg-gray-200": url.startsWith("/files"),
                        }
                    )}
                    href={route("files.index")}
                >
                    <Files className="w-4 h-4 mr-2" />
                    <p>My files</p>
                </a>
                <a
                    className={clsx(
                        "flex items-center justify-left px-3 py-2 hover:bg-gray-200 transition ease",
                        {
                            "bg-gray-200": url.startsWith("/shared"),
                        }
                    )}
                    href={route("files.shared")}
                >
                    <Share2 className="w-4 h-4 mr-2" />
                    <p>Shared</p>
                </a>
                <a
                    className={clsx(
                        "flex items-center justify-left px-3 py-2 hover:bg-gray-200 transition ease",
                        {
                            "bg-gray-200": url.startsWith("/deleted"),
                        }
                    )}
                    href={route("files.deleted")}
                >
                    <Trash className="w-4 h-4 mr-2" />
                    <p>Deleted files</p>
                </a>
            </div>
        </div>
    );
};

export default SideMenu;
