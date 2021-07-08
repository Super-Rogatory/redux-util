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