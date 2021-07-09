import axios from "axios";
import { FETCH_POSTS, NEW_POSTS } from "./types";

const gotPosts = posts => ({
  type: FETCH_POSTS,
  posts: posts
});
export const fetchPosts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts");
      dispatch(gotPosts(data));
    } catch (err) {
      console.log("Error in fetchingJson function");
    }
  };
}


