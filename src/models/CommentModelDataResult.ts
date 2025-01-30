export interface CommentModelDataResult {
    total: number;
    data: CommentModel[];
}

export interface CommentModel {
    id: string;
    createDT: string;
    updateDT?: string;
    user: UserModel;
    text?: string | null;
    likes?: number | null;
    dislikes?: number | null;
}

export interface UserModel {
    username: string;
}