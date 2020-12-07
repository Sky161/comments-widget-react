import { memo } from "react";
import css from "./loader.module.css";

export const LoaderComponent = memo(() => (
	<div className={css.loader_container}>
		<div className={css.loader} />
	</div>
));
