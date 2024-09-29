import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";
import { id } from "date-fns/locale";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
    posts: [],
    status: 'idle',
    error: null
}

export const fetchPosts = createAsyncThunk('fetchPosts', async () => {
    console.log("In fetchPost thunk")
    const resp = await axios.get(POSTS_URL)
    return resp.data;
})

export const addNewPost = createAsyncThunk('addNewPost', async (initialPost) => {
    console.log("In addNewPost thunkt")
    const response = await axios.post(POSTS_URL, initialPost)
    console.log(response.data)
    return response.data
})

export const updatePost = createAsyncThunk('updatePost', async (initialPost) => {
    const { id } = initialPost
    console.log("In updatePost thunk")
    try{
        const response = await axios.put(`${POSTS_URL}/${id}`, initialPost)
        return response.data
        
    }catch(err) {
        //return err.message;
        return initialPost;
    }    
})

export const deletePost = createAsyncThunk('deletePost', async (initialPost) => {
    const { id } = initialPost
    console.log("in deletePost thunk")
    try{
       const response =  await axios.delete(`${POSTS_URL}/${id}`)
       if(response?.status === 200) return initialPost
        return `${response?.status} : ${response?.statusText}`
    }catch(err){
        return err.message;
    }
})

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        addPost: {
            reducer(state, action) {
                state.posts.push(action.payload)
                console.log("In addPost reducer");
                console.log(action.payload)
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        userId: Number(userId),
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                    }
                }

            }
        },
        addReaction: (state, action) => {
            const {postId, reaction} = action.payload
            const existingPost = state.posts.find(post => post.id === postId)
            if(existingPost){
            existingPost.reactions[reaction]++
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                console.log("In builder for pending");
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                console.log("In builder for succeeded");
                state.status = 'succeeded'
                
                let min = 1;
                action.payload.map(post => {
                    post.date = sub(new Date(), { minutes: min++ }).toISOString();
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }                    
                });
                state.posts = action.payload
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                console.log("In builder for failed");
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                console.log("In builder for fulfilled");
                console.log(action.payload)

                // Creating sortedPosts & assigning the id would be not be needed if the fake API returned accurate new post IDs
                const sortedPosts = state.posts.sort((a, b) => {
                    if (a.id > b.id) return 1
                    if (a.id < b.id) return -1
                    return 0
                })
                action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;

                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                }
                console.log(action.payload)
                state.posts.push(action.payload)
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }
                action.payload.date = new Date().toISOString();
                const {id} = action.payload
                
                const posts = state.posts.filter(post => post.id !== id)
                state.posts = [...posts, action.payload]
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                console.log(action.payload)
                if (!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                const posts = state.posts.filter(post => post.id !== id)
                state.posts = posts
            })
            
    }

})

export const selectAllPosts = (state) => state.posts.posts;
export const selectStatus = (state) => state.posts.status;
export const selectError = (state) => state.posts.error;

export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId)

export const { addPost, addReaction } = postSlice.actions

export default postSlice.reducer