import { asks } from "fp-ts/Reader";
import { Api } from "../api/api";
import { pipe } from "fp-ts/pipeable";
import { LiveData } from "../utils/live-data.utils";
import { Comments, commentsArrayDTO } from "./dto/comments.dto";
import { fromEither, remoteData } from "@devexperts/remote-data-ts";
import { reportIfFailure } from "../utils/io-ts.utils";
import { map } from "rxjs/operators";

export interface CommentsService {
	readonly comments: LiveData<Error, Comments>;
}

interface CommentsServiceContext {
	readonly api: Api;
}

export const commentsService = asks(
	(ctx: CommentsServiceContext): CommentsService => {
		const { api } = ctx;
		const comments = pipe(
			api.comments,
			map((data) =>
				remoteData.chain(data, (comments) =>
					pipe(comments, commentsArrayDTO.decode, reportIfFailure, fromEither)
				)
			)
		);
		return { comments };
	}
);
