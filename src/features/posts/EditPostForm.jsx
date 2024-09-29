import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectPostById, updatePost, deletePost } from "./postSlice";
import { useEffect, useState } from "react";
import { fetchUsers, selectAllUsers } from "../users/userSlice";

const EditPostForm = () => {

    const {postId} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const post = useSelector(state => selectPostById(state, Number(postId)))
    const users = useSelector(selectAllUsers)

    const [title, setTitle] = useState(post?.title)
    const [content, setContent] = useState(post?.body)
    const [userId, setUserId] = useState(post?.userId);
    const [status, setStatus] = useState('idle')

    const canSave = [title, content, userId].every(Boolean) && status === 'idle'

    const handleEdit = () => {
        if(canSave){
            try{
                setStatus('pending')
                dispatch(updatePost({id: post.id, title, body: content, userId, reactions: post.reactions })).unwrap()
                setTitle('')
                setContent('')
                setUserId('')
                navigate(`/post/${postId}`)
            } catch (err) {
                console.error('Failed to save the post', err)
            } finally {
                setStatus('idle')
            }
        }
    }

    const handleDelete = () => {
        try{
            setStatus('pending')
            dispatch(deletePost({id: post.id})).unwrap()
            console.log("after deleton");
            setTitle('')
            setContent('')
            setUserId('')
            navigate("/")
        } catch (err) {
            console.error('Failed to save the post', err)
        } finally {
            setStatus('idle')
        }
    }

    const userOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

    if(!post){
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }
    return ( 
        <section>
            <h2>Edit Post</h2>
            <form>
                <label htmlFor="title">Post Title:</label>
                <input 
                    type="text"
                    id="title"
                    value={title}
                    placeholder="title"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="content">Post Content:</label>
                <textarea
                    id="content"
                    value={content}
                    placeholder="content"
                    onChange={(e) => setContent(e.target.value)}
                />
                <label htmlFor="author">Author:</label>
                <select
                    id="author"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                >
                    <option value=""></option>
                    {userOptions}
                </select>
                <button type="button" disabled={!canSave} onClick={handleEdit}>Edit Post</button>
                <button className="deleteButton" type="button" onClick={handleDelete}>Delete Post</button>
            </form>
        </section>
     );
}
 
export default EditPostForm;