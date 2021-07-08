import axios from "axios";
import React, { Component } from "react";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(event) {
    let partialState = {};
    partialState[event.target.name] = event.target.value;
    this.setState(partialState);
  }
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
  render() {
    return (
      <div>
        <h1>Add Post</h1>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Title: </label>
            <br />
            <input
              type="text"
              name="title"
              onChange={this.onChange}
              value={this.state.title}
            />
          </div>
          <br />
          <div>
            <label>Body: </label>
            <br />
            <textarea
              name="body"
              onChange={this.onChange}
              value={this.state.body}
            />
          </div>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
export default PostForm;
