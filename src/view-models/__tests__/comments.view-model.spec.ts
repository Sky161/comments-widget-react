import { commentsViewModel } from "../comments.view-model";
import { CommentsService } from "../../services/comments.service";
import { of } from "rxjs";
import { success } from "@devexperts/remote-data-ts";
import { option } from "fp-ts";

describe("comments view model", () => {
	it("should set hovered user", function () {
		const COMMENTS_SERVICE_MOCK: CommentsService = {
			comments: of(
				success([
					{
						author: "Nikolay",
						message: "Hi",
						comments: [
							{
								author: "Olga",
								message: "Hi there",
								comments: [],
							},
							{
								author: "Nikolay",
								message: "What's up?!",
								comments: [
									{
										author: "Olga",
										message: "How are u?",
										comments: [],
									},
								],
							},
						],
					},
					{
						author: "Alex",
						message: "Hey folks!",
						comments: [],
					},
				])
			),
		};
		const instance = commentsViewModel({ commentsService: COMMENTS_SERVICE_MOCK });
		const expected = option.some("Nikolay");
		instance.setHoverUser(expected);
		expect(instance.hoveredUser.getValue()).toStrictEqual(expected);
	});
});
