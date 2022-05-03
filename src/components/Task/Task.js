import React from "react";
import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";
import "./task.css";

export default class Task extends React.Component {
  state = {
    count: 1,
    text: this.props.label,
  };
  static defaultProps = {
    onDeleted: () => {},
    onToggleDone: () => {},
    onEdit: () => {},
  };

  static propTypes = {
    onDeleted: PropTypes.func,
    onToggleDone: PropTypes.func,
    onEdit: PropTypes.func,
  };

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState(({ count }) => count++);
  }

  onLabelChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onEdit(this.state.text);
  };

  render() {
    const { onDeleted, onToggleDone, onEdit, done, edit, date } = this.props;

    let taskStatus = "";
    let isChecked = "";
    if (done) {
      taskStatus = "completed";
      isChecked = "checked";
    }
    if (edit) {
      taskStatus = "editing";
    }

    return (
      <li className={taskStatus}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onClick={onToggleDone}
            defaultChecked={isChecked}
          ></input>
          <label>
            <span className="description">{this.state.text}</span>
            <span className="created">
              created {formatDistanceToNow(date, { includeSeconds: true })} ago
            </span>
          </label>
          <button className="icon icon-edit" onClick={onEdit}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            className="edit"
            defaultValue={this.state.text}
            onChange={this.onLabelChange}
          ></input>
        </form>
      </li>
    );
  }
}
