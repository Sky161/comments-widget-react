import { Behaviour } from "../utils/behaviour.utils";
import { useObservable } from "./observable.hook";

export const useBehaviour = <A>(source: Behaviour<A>): A => {
	return useObservable(source, source.getValue());
};
