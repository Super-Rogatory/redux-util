import React, { Component } from "react";
import axios from "axios";

class Posts extends Component {
  constructor() {
    super();
    this.fetchingJson = this.fetchingJson.bind(this);
  }
  async fetchingJson() {
    try {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      return data;
    } catch (err) {
      console.log("Error in fetchingJson function");
    }
  }
  async componentWillMount() {
    console.log(await this.fetchingJson());
  }
  render() {
    return (
      <div>
        <h1>Posts</h1>
      </div>
    );
  }
}

export default Posts;
