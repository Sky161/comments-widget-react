import { asks } from "fp-ts/Reader";
import React, { memo } from "react";
import { CommentsViewModel } from "../../view-models/comments.view-model";
import { CommentComponent, CommentComponentProps } from "./comment.component";
import { useBehaviour } from "../../hooks/behaviour.hook";

interface CommentContainerContext {
	commentsViewModel: CommentsViewModel;
}

export interface CommentContainerProps extends Pick<CommentComponentProps, "comment" | "nested"> {}

export const CommentContainer = asks((ctx: CommentContainerContext) =>
	memo((props: CommentContainerProps) => {
		const { commentsViewModel } = ctx;
		const hoveredUser = useBehaviour(commentsViewModel.hoveredUser);
		return React.createElement(CommentComponent, {
			...props,
			hoveredUser,
			setHover: commentsViewModel.setHoverUser,
		});
	})
);
