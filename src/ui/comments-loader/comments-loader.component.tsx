import { memo, useCallback } from "react";
import { RemoteData } from "@devexperts/remote-data-ts";
import { Comments } from "../comments/comments.model";
import { RenderRemoteData } from "../ui-kit/components/render-remote-data/render-remote-data.component";
import { pipe } from "fp-ts/pipeable";
import { reader } from "fp-ts";
import { CommentsComponent } from "../comments/comments.component";

interface CommentsLoaderProps {
	readonly comments: RemoteData<Error, Comments>;
}

export const CommentsLoaderComponent = pipe(
	CommentsComponent,
	reader.map((CommentsComponent) =>
		memo((props: CommentsLoaderProps) => {
			const { comments } = props;
			const renderSuccess = useCallback((data: Comments) => <CommentsComponent comments={data} />, []);
			return <RenderRemoteData data={comments} success={renderSuccess} />;
		})
	)
);
