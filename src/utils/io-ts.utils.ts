import { Validation } from "io-ts";
import { Either } from "fp-ts/Either";
import { pipe } from "fp-ts/pipeable";
import { array, either, option } from "fp-ts";
import { PathReporter } from "io-ts/PathReporter";

export const reportIfFailure = <A>(source: Validation<A>): Either<Error, A> => {
	const reporter = pipe(PathReporter.report(source), array.last);
	return pipe(
		source,
		either.mapLeft((errors) =>
			pipe(
				errors,
				array.last,
				option.chain((error) =>
					pipe(
						reporter,
						option.map((reporter) => error.message || reporter)
					)
				),
				option.fold(
					() => new Error("Validation has less one error"),
					(message) => new Error(message)
				)
			)
		)
	);
};
