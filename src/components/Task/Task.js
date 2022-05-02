import "./task.css";

import { formatDistanceToNow } from "date-fns";
import React from "react";

export default class Task extends React.Component {
  /*
  state = {
    done: false,
  };

  onClickCheckbox = () => {
    this.setState(({ done }) => {
      return {
        done: !done,
      };
    });
  };
*/
  render() {
    const { label, onDeleted, onToggleDone, done } = this.props;

    /*
    const { done } = this.state; */
    let isCompleted = "";
    let isChecked = "";
    if (done) {
      isCompleted = "completed";
      isChecked = "checked";
    }

    const created = formatDistanceToNow(new Date());

    return (
      <li className={isCompleted}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            /*
            onClick={this.onClickCheckbox}*/
            onClick={onToggleDone}
            defaultChecked={isChecked}
          ></input>
          <label>
            <span className="description">{label}</span>
            <span className="created">created {created} ago</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <input type="text" className="edit" defaultValue={label}></input>
      </li>
    );
  }
}
