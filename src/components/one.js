import React, { Component } from "react";
import { getItems, deleteItem } from "../services/oneService";
import { toast } from "react-toastify";
import OneForm from "./oneForm";

class One extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoading: false,
      error: null
    };
    this.onUpdateItem = this.onUpdateItem.bind(this);
    this.onNewItem = this.onNewItem.bind(this);
  }

  async componentDidMount() {
    try {
      const { data: items } = await getItems();
      console.log(items);
      // add new property isOpen to every item  because modal dialog
      const newItems = items.map(item => ({ ...item, isOpen: false }));
      console.log(newItems);

      this.setState({ items: newItems });
    } catch (error) {
      this.setState({
        error,
        isLoading: false
      });
    }
  }

  async handleDelete(anObjectMappedKey) {
    // save orginalItems
    const originalItems = this.state.items;
    // set items without deleted Item
    const items = originalItems.filter(m => m.id !== anObjectMappedKey);
    this.setState({ items });
    // now try to delete
    try {
      await deleteItem(anObjectMappedKey);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) console.log(ex);
      toast.error("This item has already been deleted.");
      // back saved Items to items
      this.setState({ items: originalItems });
    }
  }

  toggleOneForm(anObjectMappedKey, index) {
    // update one object in items
    // if find this object then clone this item and update isopen with reverse value else item not change
    const saveItems = this.state.items.map(item =>
      item.id === anObjectMappedKey ? { ...item, isOpen: !item.isOpen } : item
    );
    console.log(saveItems);
    this.setState({ items: saveItems });
  }
  // this function called from child
  onUpdateItem(fromChild) {
    console.log(fromChild);
    // update fields, that was in changed in child form
    console.log(this.state.items);
    const saveItems = this.state.items.map(item =>
      item.id === fromChild.id
        ? {
            userId: fromChild.userId,
            title: fromChild.title,
            body: fromChild.body,
            isOpen: false
          }
        : item
    );
    console.log(saveItems);
    this.setState({ items: saveItems });
  }
  // this function called from child
  onNewItem(fromChild) {
    console.log(fromChild);
    // update fields, that was in changed in child form
    console.log(this.state.items);
    const newItem = { ...fromChild, isOpen: false };
    const saveItems = this.state.items;
    saveItems.unshift(newItem);
    console.log(saveItems);
    this.setState({ items: saveItems });
  }

  getRows() {
    // console.log(this.state.items);

    if (this.state.items) {
      return (
        <ul>
          {this.state.items.map((anObjectMapped, index) => (
            <li key={anObjectMapped.id}>
              <span>"Title: " {anObjectMapped.title} </span>
              <br />
              <span>"Body: " {anObjectMapped.body} </span>
              <br />
              <button
                className="sl-btn"
                onClick={() => this.handleDelete(anObjectMapped.id)}
              >
                delete
              </button>
              <button
                className="sl-btn m-2"
                onClick={() => this.toggleOneForm(anObjectMapped.id, index)}
              >
                update
              </button>
              <OneForm
                show={anObjectMapped.isOpen}
                item={anObjectMapped}
                myParentFkt={this.onUpdateItem}
              />
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
    return (
      <div className="row">
        <div className="newPost">
          <h2>New Post</h2>
          <OneForm
            show={true}
            item={{ userId: 1, title: "", body: "" }}
            myParentFkt={this.onNewItem}
          />
        </div>
        <div className="listPost">
          <h2> Lists of Posts</h2>
          {this.getRows()}
        </div>
      </div>
    );
  }
}

export default One;
