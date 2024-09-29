import { useDispatch, useSelector } from "react-redux";
import { selectAllPosts, selectError, selectStatus, fetchPosts } from "./postSlice";
import { useEffect } from "react";
import PostExcerpt from "./PostExcerpt";

const PostList = () => { 
    console.log("In PostList")
    

    const posts = useSelector(selectAllPosts)
    const status = useSelector(selectStatus)
    const error = useSelector(selectError)

    console.log(posts)

    let content;

    if(status === 'loading'){
        content = <p>"Loading..."</p>;
    }else if (status === 'succeeded'){
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
        content = orderedPosts.map(post => <PostExcerpt post={post} key={post.id}/>)
    }else if (status === 'failed'){
        content = <p>{error}</p>
    }

    return ( 
        <section>
            {content}
        </section>
     );
}
 
export default PostList;