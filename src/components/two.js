import React, { Component } from "react";
import { getTwoJson } from "../services/twoService";

class Two extends Component {
  state = {
    items: [],
    isLoading: false,
    error: null
  };

  componentDidMount() {
    try {
      const items = getTwoJson();
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
    if (this.state.items) {
      return (
        <div>
          {this.state.items.map((anObjectMapped, index) => (
            <p key={anObjectMapped.id}>
              <span>"Name: " {anObjectMapped.name} </span>
              <br />
              <br />
              <span>"Email: " {anObjectMapped.email} </span>
            </p>
          ))}
        </div>
      );
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

export default Two;
