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
        <ul>
          {this.state.items.map((anObjectMapped, index) => (
            <li key={anObjectMapped.id}>
              <div class="card">
                <img
                  class="card-img-top"
                  src={
                    process.env.React_APP_API_URL +
                    anObjectMapped["product-photo"]
                  }
                  alt={anObjectMapped["product-photo"]}
                />
                <div class="card-body">
                  <h5 class="card-title"> {anObjectMapped.label}</h5>
                  <p class="card-text"> {anObjectMapped.price}</p>
                  <a href="#" class="btn btn-primary">
                    Buy
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
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
