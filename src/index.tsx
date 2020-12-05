import { CommentsContainer } from "./ui/comments/comments.container";
import { api } from "./api/api";
import ReactDOM from "react-dom";

const CommentsContainerResolved = CommentsContainer({ api });

ReactDOM.render(<CommentsContainerResolved />, document.getElementById("root"));
