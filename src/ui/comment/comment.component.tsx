import { memo, useCallback, useMemo } from "react";
import { Option } from "fp-ts/Option";
import { Comment } from "../comments/comments.model";
import css from "./comment.module.css";
import cn from "classnames";
import { pipe } from "fp-ts/pipeable";
import { option } from "fp-ts";

export interface CommentComponentProps {
	readonly comment: Comment;
	readonly hoveredUser: Option<string>;
	readonly setHover: (value: Option<string>) => void;
	readonly nested: boolean;
}

export const CommentComponent = memo((props: CommentComponentProps) => {
	const { comment, hoveredUser, setHover, nested } = props;
	const cssForContainer = useMemo(
		() =>
			cn({
				[css.nested]: nested,
			}),
		[nested]
	);

	const cssForHovered = useMemo(
		() =>
			cn(css.container, {
				[css.hovered]: pipe(
					hoveredUser,
					option.exists((hoveredAuthor) => hoveredAuthor === comment.author)
				),
			}),
		[hoveredUser, comment]
	);

	const handleMouseEnter = useCallback(() => setHover(option.some(comment.author)), [comment.author, setHover]);
	const handleMouseLeave = useCallback(() => setHover(option.none), [setHover]);

	return (
		<div className={cssForContainer}>
			<div className={cssForHovered} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
				<img className={css.author_img} src={comment.imgUrl} alt={"avatar"} />
				<div className={css.text_block}>
					<div className={css.author_name}>{comment.author}</div>
					<div>{comment.message}</div>
				</div>
			</div>
			{comment.comments.length > 0 &&
				comment.comments.map((item) => (
					<CommentComponent
						key={item.id}
						comment={item}
						hoveredUser={hoveredUser}
						setHover={setHover}
						nested={true}
					/>
				))}
		</div>
	);
});
