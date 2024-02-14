export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export interface IFileItem {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
    folder_id: string | null;
    user_id: number;
}

export interface IFolderItem {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
    folder_id: integer;
    user_id: number;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};
