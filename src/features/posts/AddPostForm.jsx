import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, addNewPost } from "./postSlice";
import { selectAllUsers, fetchUsers } from "../users/userSlice";
import { useNavigate } from "react-router-dom";

const AddPostForm = () => {        
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('');
    const [status, setStatus] = useState('idle')

    const users = useSelector(selectAllUsers)

    const canSave = [title, content, userId].every(Boolean) && status === 'idle';

    const handleForm = () => {
        if(canSave){
            try {
                setStatus('pending')
                console.log("Dispatching Add Post")

                //below dispatch will add a new post to both REST API and state
                dispatch(addNewPost({title, body: content, userId})).unwrap()

                //below dispatch will add a new post to state only
                //dispatch(addPost(title, content, userId))             

                setTitle('')
                setContent('')
                setUserId('')
                navigate("/")
            } catch(err) {
                console.error('Failed to save the post', err)
            } finally {
                setStatus('idle')
            }
        }
    }

    const userOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

    return ( 
        <section>
            <h2>Add Post</h2>
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
                <input 
                    type="text"
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
                <button type="button" disabled={!canSave} onClick={handleForm}>Add Post</button>
            </form>
        </section>
    );
}
 
export default AddPostForm;