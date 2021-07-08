import React, { Component } from "react";
import axios from "axios";

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
}

export default Posts;
