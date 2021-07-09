# Redux Traversy Media

## Starting with basic React setup.
- We will start by creating a few components. We will also create a lifecycle method such that, when the component mounts on Posts, we can fetch data from our fake api at JSON Placeholder.

- Link -> https://jsonplaceholder.typicode.com/posts

## Using axios module (handles json conversion) - notice duplicate state declaration.
```
  async fetchingJson() {
    try {
      const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts");
      return data;
    } catch (err) {
      console.log("Error in fetchingJson function");
    }
  }
```
## Using fetch() API
```
  async fetchingJson() {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await response.json();
      return data;
    } catch (err) {
      console.log("Error in fetchingJson function");
    }
```

# Having a seperate state inside of each component
## Posts.js
```
class Posts extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    };
    this.fetchingJson = this.fetchingJson.bind(this);
  }
  async fetchingJson() {
    try {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      this.setState({ posts: data });
    } catch (err) {
      console.log("Error in fetchingJson function");
    }
  }
  async componentWillMount() {
    await this.fetchingJson();
  }
  render() {
    const postItems = this.state.posts.map((post) => (
      <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));
    return (
      <div>
        <h1>Posts</h1>
        {postItems}
      </div>
    );
  }
```
## Postform.js
```
import React, { Component } from "react";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }
  render() {
    return (
      <div>
        <h1>Add Post</h1>
      </div>
    );
  }
}
export default PostForm;
```

# Using event.target.value && event.target.name **[Form Nuance]**
- Grabbing the name via event.target.name
- event.target.value is the value property of some DOM element. <br />
`<input type='text' name='title' onChange={this.onChange} value={this.state.title} />
`
-  If the event is triggered on the input, then our **e.target.name -> title**
and our **e.target.value -> this.state.value.** Our state will change with respect to input.      
```
  onChange(event) {
      this.setState({[event.target.name]: event.target.value });
  }
```
- This is a function that is placed as an attribute on a JSX/HTML element. 
## **This is how we handle multiple inputs.** Depending on which JSX element triggers the event, we can see that our onChange will handle the event accordingly. This is done so by implicitly creating an object using property name syntax, creating a key value pair in that object, then passing it to setState which merges the partial state into the current state.. overriding event.target.name's value with the new value.

## Examine this code again. 

```
  onChange(event) {
      this.setState({[event.target.name]: event.target.value });
  }
```

## This is equivalent to ES5's
```
  onChange(event) {
      let partialState = {};
      partialState[event.target.name] = event.target.value;
      this.setState(partialState);
  }
```

# Events are synthetic in React, wrapping normal DOM events with extra React metadata
## Use event.preventDefault() on form submissions to change its behavior.
```
  onSubmit(event){
      event.preventDefault();
  }
```
# Making onSubmit asynchronous, recall that axios can take in multiple parameters such as url, content, headers, etc.
```
  async onSubmit(event) {
    event.preventDefault();
    const post = {
      title: this.state.title,
      body: this.state.body,
    };
    const { data } = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      post,
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    console.log(data);
  }
```

# Redux
- `npm install redux react-redux react-thunk`
- We want to bring in a provider (glue for react and redux). <br />
`import { Provider } from 'react-redux';`
- Wrap App.js in Provider JSX tags.
```
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <PostForm />
        <hr />
        <Posts />
      </div>
    </Provider>
  );
}
```
# **
- Provider takes a store property, this store holds the state.

- A store holds the whole state tree of your application, the only way to change the state inside it is to dispatch an action on it"
- Store Methods - `getState(), dispatch(action), subscribe(listener)`
- Use createStore to create a Redux store that holds the complete state tree of the app.
- `createStore(reducer, [preloadingState], [enhancer])`
. <br/>Other reducers will combine into the root 'reducer' and end up passed into the store. A reducing function returns the next state tree, given the current state tree and an action to handle. 
# **

# Creating store.js
```
import { createStore, applyMiddleware } from "redux";
import thunk from 'react-thunk';

const initialState = {};

const middleware = [thunk];

const store  = createStore(rootReducer, initialState, applyMiddleware(...middleware));

export default store;
```

# Creating Reducers (root reducer in index.js) & Action Types
## We create a reducers folder filled with files we can bring into the store.
```
import { FETCH_POSTS, NEW_POSTS } from "../actions/types";

const initialState = {
  item: [],
  item: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      break;
    case NEW_POSTS:
      break;
    default:
      return state;
  }
};
export default reducer;

```
- ## We create an actions folder filled with files that we can bring into specific reducers. We will have a file that specifies action types and on that specify individual actions.
- ## We import these action types into our reducer script so that we can perform some action based on which action is triggered.
- ## Notice how we default to returning state.
# Each Action Creator is a function. (examine the actions folder)
- Using fetch and .then() allows us to handle the promise without async/await keywords
```
// ES6 .then .catch
export const fetchPosts = () => dispatch => {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(posts =>
      dispatch({
        type: FETCH_POSTS,
        payload: posts
      })
    );
};
```
```
// ES7 async/await
const gotPosts = posts => ({
  type: FETCH_POSTS,
  posts
});
export const fetchPosts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios .get("https://jsonplaceholder.typicode.com/posts");
      dispatch(gotPosts(data));
    } catch (err) {
      console.log("Error in fetchingJson function");
    }
  };
}
```
### Note, In JavaScript, there are two main ways to handle asynchronous code: then/catch (ES6) and async/await (ES7). These syntaxes give us the same underlying functionality, but they affect readability and scope in different ways. 
## Thunk Middleware allows us to call the dispatch function directly to make asynchronous requests. **The return value IS the thunk.**
- ## **Think of dispatch as a way of sending data**
- ## Notice how we no longer have to use setState, that sets component state. We can instead dispatch the data to the reducer.
- ## We have condensed our function to use arrows, etc. After creating the action creator, we can remove our constructor and componentWillMount from our Posts.js .

# Connect
## Connect, 'connects' your components to the redux store that was provided by the '<'Provider' />' component.
## Recall, the Provider component wraps the entire React App.
# Mapping our State to our Properties.
`export default connect(null, { fetchPosts })(Posts)`
```
import React, { Component } from "react";
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postActions';
class Posts extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }
  render() {
    const postItems = this.state.posts.map((post) => (
      <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));
    return (
      <div>
        <h1>Posts</h1>
        {postItems}
      </div>
    );
  }
}

export default connect(null, { fetchPosts })(Posts)

```
## When an action is called, dispatch should send the object to the reducer.
# Now we need to get new items from the state.
- ## Use mapStateToProps.
```
const mapStateToProps = (state) => ({
  posts: state.posts.items,
});
```
## The mapStateToProps func is in the Posts.js file, the reason why we call on posts is because that property is found on the root reducer. The reason we call on items is because that it what we want from our postReducer.. items: action.posts
## This creates a this.props.posts.
```
export default combineReducers({
    posts: postReducer
})
```


# Nuance
```
    case FETCH_POSTS:
      return {
          ...state,
          items: action.posts
      }
```
- Returning a new state with the items that have been fetched.
<hr />

```
const initialState = {
  items: [],
  item: {},
};

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
```

# Look at the Diagram in the Redux Crash Course notes in notebook.
- ## Our UI triggers an action, on componentMount, we go invoke postActions for our action creator.
- ## Our action creator will return a thunks function that dispatches the action with an action type and relavent data for the reducer.
- ## Notice in Posts.js, we connected our component to the store. 
- ## Our reducer is a pure function that specifies how the state should change in response to our action.
- ## The reducer creates a new state (without modifying the original) by using spread syntax. Data is modified to respond to our action. New state is returned.
- ## In our root reducer, we see that this reducer function is given as a value to posts.
- ## When we mapToState in Posts.js, we change the posts state and reflect the changed data.
- ## This new state is reflected by the UI.

# Redux DevTools - allows us to see Action, State, Diff, etc.
```
import { createStore, applyMiddleware, compose } from "redux";
.
.
.
const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;
```

# Snippets
- imp
- rcc
- frc