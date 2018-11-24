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
        <div className="card-deck">
          {this.state.items.map((anObjectMapped, index) => (
            <div className="card" key={anObjectMapped.id}>
              <img
                className="card-img-top h-100"
                src={
                  process.env.React_APP_API_URL +
                  anObjectMapped["product-photo"]
                }
                alt={anObjectMapped["product-photo"]}
              />
              <div className="card-body">
                <h5 className="card-title"> {anObjectMapped.label}</h5>
                <p className="card-text"> {anObjectMapped.price}</p>
                <a href="#" className="btn btn-primary">
                  Buy
                </a>
              </div>
            </div>
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
