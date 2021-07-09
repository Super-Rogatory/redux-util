import { FETCH_POSTS, NEW_POSTS } from "../actions/types";

const initialState = {
  item: [],
  item: {},
};

// export default function(state = initialState, action) {
//     switch (action.type) {
//         case FETCH_POSTS:
//           return {
//               ...state,
//               items: action.posts
//           }
//         case NEW_POSTS:
//           break;
//         default:
//           return state;
//       }
// }
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return {
          ...state,
          items: action.posts
      }
    case NEW_POSTS:
      break;
    default:
      return state;
  }
};
export default reducer;
