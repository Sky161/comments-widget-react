import { memo } from "react";
import { Comments } from "./comments.model";
import { pipe } from "fp-ts/pipeable";
import { CommentContainer } from "../comment/comment.container";
import { reader } from "fp-ts";
import css from "./comments.module.css";

export interface CommentsComponentProps {
	readonly comments: Comments;
}

export const CommentsComponent = pipe(
	CommentContainer,
	reader.map((CommentContainer) =>
		memo((props: CommentsComponentProps) => {
			const { comments } = props;
			return (
				<div className={css.container}>
					{comments.map((comment) => (
						<CommentContainer comment={comment} key={comment.id} nested={false} />
					))}
				</div>
			);
		})
	)
);
