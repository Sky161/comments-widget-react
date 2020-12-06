import React, { memo } from "react";
import { useObservable } from "../../hooks/observable.hook";
import { pending } from "@devexperts/remote-data-ts";
import { commentsViewModel } from "../../view-models/comments.view-model";
import { Api } from "../../api/api";
import { commentsService } from "../../services/comments.service";
import { asks } from "fp-ts/Reader";
import { CommentsLoaderComponent } from "./comments-loader.component";

interface CommentsLoaderContainerContext {
	readonly api: Api;
}

export const CommentsLoaderContainer = asks((ctx: CommentsLoaderContainerContext) => {
	// #region resolve readers
	const commentsServiceResolved = commentsService({ api: ctx.api });
	const commentsViewModelResolved = commentsViewModel({ commentsService: commentsServiceResolved });
	const CommentsLoaderComponentResolved = CommentsLoaderComponent({ commentsViewModel: commentsViewModelResolved });
	// #endregion resolve readers

	return memo(() => {
		const comments = useObservable(commentsViewModelResolved.comments, pending);
		return React.createElement(CommentsLoaderComponentResolved, { comments });
	});
});
