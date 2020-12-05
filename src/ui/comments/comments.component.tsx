import { memo, useCallback } from "react";
import { RemoteData } from "@devexperts/remote-data-ts";
import { Comments } from "./comments.model";
import { RenderRemoteData } from "../ui-kit/components/render-remote-data.component";

export interface CommentsComponentProps {
	readonly comments: RemoteData<Error, Comments>;
}

export const CommentsComponent = memo((props: CommentsComponentProps) => {
	const { comments } = props;
	const renderSuccess = useCallback(
		(data: Comments) => (
			<div>
				{data.map((item, idx) => (
					<div key={`comment_${idx}`}>{item.message}</div>
				))}
			</div>
		),
		[]
	);
	return <RenderRemoteData data={comments} success={renderSuccess} />;
});
