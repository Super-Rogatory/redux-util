import axios from "axios";
import { FETCH_POSTS, NEW_POSTS } from "./types";

// export const fetchPosts = () => dispatch => {
//   axios
//     .get("https://jsonplaceholder.typicode.com/posts")
//     .then((res) => res)
//     .then((posts) =>
//       dispatch({
//         type: FETCH_POSTS,
//         posts,
//       })
//     );
// };
// export const fetchPosts = () => async (dispatch) => {
//   console.log('Fetching');
//     try {
//     const { data } = await axios.get(
//       "https://jsonplaceholder.typicode.com/posts"
//     );
//     dispatch({
//       type: FETCH_POSTS,
//       posts: data,
//     });
//   } catch (err) {
//     console.log("Error in fetchingJson function");
//   }
// };
export function fetchPosts() {
  console.log("Fetching");
  return async function (dispatch) {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    dispatch({
      type: FETCH_POSTS,
      posts: data,
    });
  };
}
