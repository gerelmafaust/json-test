import React, { Component } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { saveItem } from "../services/oneService";

class oneForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      errors: {}
    };
  }

  componentDidMount() {
    this.setState({ item: this.props.item });
  }

  handleInputChange(stateFieldName, event) {
    if (!event.target.value)
      toast.error = "entry missing from: " + stateFieldName;
    // update from item changed value ( first clone item then change value)
    const saveItem = {
      ...this.state.item,
      [stateFieldName]: event.target.value
    };
    this.setState({ item: saveItem });
  }

  async handleSave(e) {
    e.preventDefault();
    try {
      // update item
      // bevore update remove isOpen, because we add it
      const newitem = this.state.item;
     
      delete newitem["isOpen"];
      const reqItem = await saveItem(newitem);
      // call parent function
      this.setState({item:{}});

      this.props.myParentFkt(reqItem.data);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        toast.error = "something wrong !!";
        this.setState({ errors });
      }
    }
  }

  // use modal window
  render() {
    //console.log(this.props.show);
    // Render nothing if the "show" prop is false
    if (!this.props.show) {
      return null;
    }

    return (
      <form>
        <label className="m-2">
          title:
          <input
            type="text"
            value={this.state.item.title}
            onChange={e => this.handleInputChange("title", e)}
          />
        </label>
        <label className="m-2">
          body:
          <input
            type="text"
            value={this.state.item.body}
            onChange={e => this.handleInputChange("body", e)}
          />
        </label>
        <button className="sl-btn" onClick={e => this.handleSave(e)}>
          save
        </button>
      </form>
    );
  }
}
// it is important to define with prop-types need this Component
oneForm.propTypes = {
  onUpdateItem: PropTypes.func.isRequired,
  onNewItem: PropTypes.func.isRequired,
  show: PropTypes.bool
};
export default oneForm;
