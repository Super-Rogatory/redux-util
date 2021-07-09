import axios from "axios";
import { FETCH_POSTS, NEW_POSTS } from "./types";

const headers = {
    "Content-type": "application/json",
};
const gotPosts = (posts) => ({
  type: FETCH_POSTS,
  posts: posts,
});
const createPostDispatchData = (post) => ({
  type: NEW_POSTS,
  post: post
});


export const fetchPosts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      dispatch(gotPosts(data));
    } catch (err) {
      console.log("Error in fetchingJson function");
    }
  };
};

export const createPost = (postData) => {
  console.log('action called');
  return async (dispatch) => {
    try{
        const { data } = await axios.post("https://jsonplaceholder.typicode.com/posts", postData, { headers } );
        dispatch(createPostDispatchData(data));
    }catch(err){
      console.log('Error in createPost function');
    }
  };
};
