import { Observable } from "rxjs";
import { remoteData, RemoteData } from "@devexperts/remote-data-ts";
import { pipe } from "fp-ts/pipeable";
import { map } from "rxjs/operators";

export type LiveData<E, A> = Observable<RemoteData<E, A>>;

const liveDataMap = <E, A, B>(f: (a: A) => B) => (source: LiveData<E, A>): LiveData<E, B> =>
	pipe(
		source,
		map((data) => remoteData.map(data, f))
	);

export const liveData = { map: liveDataMap };
