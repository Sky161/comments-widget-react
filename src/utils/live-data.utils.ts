import { Observable } from "rxjs";
import { RemoteData } from "@devexperts/remote-data-ts";

export type LiveData<E, A> = Observable<RemoteData<E, A>>;
