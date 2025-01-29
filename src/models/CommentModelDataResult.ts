export interface CommentModelDataResult {
    total?: number;
    data?: CommentModel[];
}

interface CommentModel {
    id: string;
    createDT?: string;
    updateDT?: string;
    user?: UserModel;
    userGuid?: string;
    text?: string | null;
    isLike?: boolean | null;
}

interface UserModel {
    username: string;
}