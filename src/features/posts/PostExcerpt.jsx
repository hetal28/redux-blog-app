import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import Reactions from "./Reactions";
import { Link } from "react-router-dom";

const PostExcerpt = ({post}) => {
    return ( 
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p className="excerpt">{post.body.substring(0,75)}</p>
            <p className="postCredit">
                <Link to={`post/${post.id}`} >View Post</Link>
                <PostAuthor authorId={post.userId}/>
                <TimeAgo timeStamp={post.date}/>
            </p>
            <p><Reactions post={post} /></p>
        </article>
     );
}
 
export default PostExcerpt;