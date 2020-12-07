import { api } from "./api/api";
import ReactDOM from "react-dom";
import { CommentsLoaderContainer } from "./ui/comments-loader/comments-loader.container";
import "./ui/ui-kit/styles/main.module.css";

const CommentsContainerResolved = CommentsLoaderContainer({ api });

ReactDOM.render(<CommentsContainerResolved />, document.getElementById("root"));
