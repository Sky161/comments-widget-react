import * as t from "io-ts";
import { recursion } from "io-ts";

export interface Comment {
	readonly author: string;
	readonly message: string;
	readonly comments: Comment[];
}

export type Comments = Comment[];

const commentDTO = recursion<Comment, Comment>("commentDTO", (commentIO) =>
	t.strict({
		author: t.string,
		message: t.string,
		comments: t.array(commentIO),
	})
);

export const commentsArrayDTO: t.Type<Comments, unknown> = t.array(commentDTO, "commentsArrayDTO");
