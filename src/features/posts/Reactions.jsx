import { useDispatch } from "react-redux";
import { addReaction } from "./postSlice";

const reactionEmoji = {
    thumbsUp: '👍',
    wow: '👌',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕'
}
const Reactions = ({post}) => {
    const dispatch = useDispatch()

    return (  
        Object.entries(reactionEmoji).map(([name,emoji]) => 
            <button key={name} type="button" className="reactionButton" 
                onClick={() => dispatch(addReaction({postId: post.id, reaction: name}))}>
                {emoji} {post.reactions[name]}
            </button>
        )
    );
}
 
export default Reactions;