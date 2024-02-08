export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export interface FileItem {
    id: String;
    name: String;
    created_at: String;
    updated_at: String;
    folder_id: String | null;
    user_id: number;
}

export interface FolderItem {
    id: String;
    name: String;
    created_at: String;
    updated_at: String;
    user_id: number;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};
