import * as t from "io-ts";
import { recursion } from "io-ts";

export interface CommentDTO {
	readonly author: string;
	readonly message: string;
	readonly comments: CommentDTO[];
}

export type CommentsDTO = CommentDTO[];

const commentDTO = recursion<CommentDTO, CommentDTO>("commentDTO", (commentIO) =>
	t.strict({
		author: t.string,
		message: t.string,
		comments: t.array(commentIO),
	})
);

export const commentsArrayDTO: t.Type<CommentsDTO, unknown> = t.array(commentDTO, "commentsArrayDTO");
