import { commentsService } from "../comments.service";
import { Api } from "../../api/api";
import { of } from "rxjs";
import { isFailure, isSuccess, success } from "@devexperts/remote-data-ts";
import { pipe } from "fp-ts/pipeable";
import { array } from "fp-ts";

describe("comments service", () => {
	const COMMENTS_MOCK = [
		{
			author: "Nikolay",
			message: "Hi",
			comments: [],
		},
	];

	it("should return json without recursive", function (done) {
		const API_MOCK: Api = {
			comments: of(success(COMMENTS_MOCK)),
		};

		const instance = commentsService({ api: API_MOCK });
		instance.comments.subscribe((data) => {
			const expected = [
				{
					author: "Nikolay",
					message: "Hi",
					comments: [],
				},
			];
			expect(isSuccess(data)).toBe(true);
			expect(isSuccess(data) && data.value).toStrictEqual(expected);
			done();
		});
	});

	it("should return json with recursive", function (done) {
		const COMMENTS_MOCK_RECURSIVE = pipe(
			COMMENTS_MOCK,
			array.map((comment) => ({
				...comment,
				comments: [
					{
						author: "Andrey",
						message: "Hi",
						comments: [],
					},
				],
			}))
		);
		const API_MOCK: Api = {
			comments: of(success(COMMENTS_MOCK_RECURSIVE)),
		};
		const instance = commentsService({ api: API_MOCK });
		instance.comments.subscribe((data) => {
			const expected = [
				{
					author: "Nikolay",
					message: "Hi",
					comments: [
						{
							author: "Andrey",
							message: "Hi",
							comments: [],
						},
					],
				},
			];
			expect(isSuccess(data)).toBe(true);
			expect(isSuccess(data) && data.value).toStrictEqual(expected);
			done();
		});
	});

	it("should return failure when server answer worng JSON", function (done) {
		const WRONG_JSON_MOCK = [
			{
				author: "Nikolay",
				message: "Hi",
			},
		];
		const FAILURE_API: Api = {
			comments: of(success(WRONG_JSON_MOCK)),
		};
		const instance = commentsService({ api: FAILURE_API });
		instance.comments.subscribe((data) => {
			expect(isFailure(data)).toBe(true);
			done();
		});
	});
});
