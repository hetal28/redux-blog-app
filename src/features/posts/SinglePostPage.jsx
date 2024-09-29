import { useSelector } from "react-redux";
import { selectPostById } from "./postSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import Reactions from "./Reactions";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const SinglePostPage = () => {

    const {postId} = useParams();

    const post = useSelector((state) => selectPostById(state, Number(postId)))

    if(!post){
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }
    return ( 
        <article>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <p className="postCredit">
                <Link to={`/post/edit/${post.id}`} >Edit Post</Link>
                <PostAuthor authorId={post.userId}/>
                <TimeAgo timeStamp={post.date}/>
            </p>
            <p><Reactions post={post} /></p>
            <Link to={"/"} >Back</Link>
        </article>
     );
}
 
export default SinglePostPage;