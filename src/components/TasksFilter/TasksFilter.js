import React from "react";
import "./tasksFilter.css";

export default class TasksFilter extends React.Component {
  render() {
    return (
      <ul className="filters">
        <li>
          <button className="selected">All</button>
        </li>
        <li>
          <button>Active</button>
        </li>
        <li>
          <button>Completed</button>
        </li>
      </ul>
    );
  }
}
