import { asks } from "fp-ts/Reader";
import React, { memo, useMemo } from "react";
import { useObservable } from "../../hooks/observable.hook";
import { pending } from "@devexperts/remote-data-ts";
import { CommentsComponent } from "./comments.component";
import { commentsViewModel } from "../../view-models/comments.view-model";
import { Api } from "../../api/api";
import { commentsService } from "../../services/comments.service";

interface CommentsContainerContext {
	readonly api: Api;
}

export const CommentsContainer = asks((ctx: CommentsContainerContext) =>
	memo(() => {
		const commentsServiceResolved = useMemo(() => commentsService({ api: ctx.api }), []);
		const commentsViewModelResolved = useMemo(
			() => commentsViewModel({ commentsService: commentsServiceResolved }),
			[commentsServiceResolved]
		);
		const comments = useObservable(commentsViewModelResolved.comments, pending);
		return React.createElement(CommentsComponent, { comments });
	})
);
