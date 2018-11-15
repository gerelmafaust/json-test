import React, { Component } from "react";
import { getItems } from "../services/threeService";

class three extends Component {
  state = {
    items: [],
    isLoading: false,
    error: null
  };

  async componentDidMount() {
    try {
      const { data: items } = await getItems();
      console.log(items);
      this.setState({ items });
    } catch (error) {
      this.setState({
        error,
        isLoading: false
      });
    }
  }
  //test

  getRows() {
    console.log(this.state.items);
    if (this.state.items) {
      return this.state.items.map((anObjectMapped, index) => {
        return (
          <p key={anObjectMapped.id}>
            <span>"Title: " {anObjectMapped.title} </span>
            <br />
            <br />
            <span>"Body: " {anObjectMapped.body} </span>
          </p>
        );
      });
    } else {
      return <p>data is not available</p>;
    }
  }
  render() {
    const { isLoading, error } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <p>Loading ...</p>;
    }
    return <div className="row">{this.getRows()}</div>;
  }
}

export default three;
