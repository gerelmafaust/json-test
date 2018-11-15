import React, { Component } from "react";
import { getItems, deleteItem } from "../services/oneService";

class One extends Component {
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

  async handleClick(anObjectMapped) {
    
    try {
      console.log(anObjectMapped);
      const { data: items } = await deleteItem();
      console.log(items);
      const { loc } = this.props.location;
      window.location = loc ? loc.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = "user ist schon da";
        this.setState({ errors });
      }
    }
  }

  getRows() {
    console.log(this.state.items);
    if (this.state.items) {

      return (
        <ul>
             {this.state.items.map((anObjectMapped, index) => (
                 
              <li  key={anObjectMapped.id}>
                <span>"Title: " {anObjectMapped.title} </span>
                <br/>
                <span>"Body: " {anObjectMapped.body} </span>
                <br/>
                <button className="sl-btn" onClick={() => this.handleClick(anObjectMapped)}>
                delete
                </button>
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

export default One;
