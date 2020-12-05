import { Observable } from "rxjs";
import { useEffect, useMemo, useState } from "react";

export const useObservable = <A>(source: Observable<A>, initial: A): A => {
	const [state, setState] = useState<A>(initial);
	const subscription = useMemo(() => source.subscribe((data) => setState(data)), [source, setState]);
	useEffect(() => () => subscription.unsubscribe(), [subscription]);
	return state;
};
