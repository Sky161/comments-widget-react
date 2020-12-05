export interface Comment {
	readonly author: string;
	readonly message: string;
	readonly comments: Comment[];
}

export type Comments = Comment[];
