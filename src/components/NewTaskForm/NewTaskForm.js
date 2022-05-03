import React from "react";
import PropTypes from "prop-types";
import "./newTaskForm.css";

export default class NewTaskForm extends React.Component {
  state = {
    label: "",
  };

  static defaultProps = {
    onTaskAdded: () => {},
  };

  static propTypes = {
    onTaskAdded: PropTypes.func,
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.props.onTaskAdded(this.state.label);
    this.setState({
      label: "",
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onLabelChange}
          value={this.state.label}
        ></input>
      </form>
    );
  }
}
