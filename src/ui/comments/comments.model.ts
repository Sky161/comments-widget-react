export interface Comment {
	readonly author: string;
	readonly message: string;
	readonly id: string;
	readonly comments: Comment[];
	readonly imgUrl: string;
}

export type Comments = Comment[];
