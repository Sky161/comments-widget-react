import { of } from "rxjs";
import { initial, success } from "@devexperts/remote-data-ts";
import { pipe } from "fp-ts/pipeable";
import { map, timeout } from "rxjs/operators";
import { COMMENTS_MOCK } from "./api.mock";
import { LiveData } from "../utils/live-data.utils";

export interface Api {
	readonly comments: LiveData<Error, unknown>;
}

export const api: Api = {
	comments: pipe(
		of(initial),
		timeout(3000),
		map(() => success(COMMENTS_MOCK))
	),
};
