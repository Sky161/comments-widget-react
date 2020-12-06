import { api } from "./api/api";
import ReactDOM from "react-dom";
import { CommentsLoaderContainer } from "./ui/comments-loader/comments-loader.container";

const CommentsContainerResolved = CommentsLoaderContainer({ api });

ReactDOM.render(<CommentsContainerResolved />, document.getElementById("root"));
