import { BehaviorSubject, Observable } from "rxjs";

export interface Behaviour<A> extends Observable<A> {
	getValue: () => A;
}

type BehaviourAdapter<A> = [(value: A) => void, Behaviour<A>];

export const createBehaviourAdapter = <A>(initial: A): BehaviourAdapter<A> => {
	const behaviour = new BehaviorSubject<A>(initial);
	return [(value: A) => behaviour.next(value), behaviour];
};
