import { memo } from "react";
import { fold, RemoteData } from "@devexperts/remote-data-ts";
import { pipe } from "fp-ts/pipeable";
import { LoaderComponent } from "../loader/loader.component";

export interface RenderRemoteDataProps<E, A> {
	readonly data: RemoteData<E, A>;
	readonly success: (value: A) => JSX.Element;
}

const Component = <E, A>(props: RenderRemoteDataProps<E, A>) => {
	const { data, success } = props;
	return pipe(
		data,
		fold(
			() => <LoaderComponent />,
			() => <LoaderComponent />,
			() => <>Error</>,
			success
		)
	);
};

export const RenderRemoteData = memo(Component) as typeof Component;
