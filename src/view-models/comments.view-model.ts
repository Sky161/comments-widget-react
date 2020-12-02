import { asks } from "fp-ts/Reader";
import { CommentsService } from "../services/comments.service";
import { Behaviour, createBehaviourAdapter } from "../utils/behaviour.utils";
import { option } from "fp-ts";
import { Option } from "fp-ts/Option";
import { Comments } from "../services/dto/comments.dto";
import { LiveData } from "../utils/live-data.utils";

interface CommentsViewModelContext {
	readonly commentsService: CommentsService;
}

export interface CommentsViewModel {
	readonly setHoverUser: (value: Option<string>) => void;
	readonly hoveredUser: Behaviour<Option<string>>;
	readonly comments: LiveData<Error, Comments>;
}

export const commentsViewModel = asks(
	(ctx: CommentsViewModelContext): CommentsViewModel => {
		const { commentsService } = ctx;
		const [setHoverUser, hoveredUser] = createBehaviourAdapter<Option<string>>(option.none);

		return { comments: commentsService.comments, hoveredUser, setHoverUser };
	}
);
