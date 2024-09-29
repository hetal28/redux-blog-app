import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/userSlice";

const PostAuthor = ({authorId}) => {

    const users = useSelector(selectAllUsers)

    const author = users.find(user => user.id === Number(authorId))

    return ( 
        <span>
            - Written by {author ? author.name : 'Unknown Author'}
        </span>
     );
}
 
export default PostAuthor;