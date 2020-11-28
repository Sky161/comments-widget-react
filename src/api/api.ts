import { Observable, of } from "rxjs";
import { initial, RemoteData, success } from "@devexperts/remote-data-ts";
import { pipe } from "fp-ts/pipeable";
import { map, timeout } from "rxjs/operators";
import { COMMENTS_MOCK } from "./api.mock";

export interface Api {
	readonly comments: Observable<RemoteData<Error, unknown>>;
}

export const api: Api = {
	comments: pipe(
		of(initial),
		timeout(3000),
		map(() => success(COMMENTS_MOCK))
	),
};
