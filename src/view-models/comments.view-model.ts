import { asks } from "fp-ts/Reader";
import { CommentsService } from "../services/comments.service";
import { Behaviour, createBehaviourAdapter } from "../utils/behaviour.utils";
import { array, option } from "fp-ts";
import { Option } from "fp-ts/Option";
import { liveData, LiveData } from "../utils/live-data.utils";
import { pipe } from "fp-ts/pipeable";
import { uuid } from "../utils/string.utils";
import { CommentDTO } from "../services/dto/comments.dto";

interface CommentsViewModelContext {
	readonly commentsService: CommentsService;
}

interface Comment extends CommentDTO {
	readonly id: string;
	readonly imgUrl: string;
	readonly comments: Comment[];
}

export interface CommentsViewModel {
	readonly setHoverUser: (value: Option<string>) => void;
	readonly hoveredUser: Behaviour<Option<string>>;
	readonly comments: LiveData<Error, Comment[]>;
}

export const commentsViewModel = asks(
	(ctx: CommentsViewModelContext): CommentsViewModel => {
		const { commentsService } = ctx;
		const [setHoverUser, hoveredUser] = createBehaviourAdapter<Option<string>>(option.none);
		const comments = pipe(
			commentsService.comments,
			liveData.map((comments) =>
				pipe(
					comments,
					array.map((comment) => patchComment(comment))
				)
			)
		);
		return { comments, hoveredUser, setHoverUser };
	}
);

const patchComment = (value: CommentDTO): Comment => ({
	...value,
	id: uuid(),
	comments: pipe(value.comments, array.map(patchComment)),
	imgUrl: `https://cataas.com/cat?${value.author}`,
});
