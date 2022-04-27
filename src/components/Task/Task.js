import './task.css'

import { formatDistanceToNow } from "date-fns";

const Task = (props) => {
  let input;
  if (props.edit) {
    input = <input type="text" className="edit" value={props.label}></input>;
  }
  const created = formatDistanceToNow(new Date());

  return (
    <li className={props.taskStatus}>
      <div className="view">
        <input className="toggle" type="checkbox"></input>
        <label>
          <span className="description">{props.label}</span>
          <span className="created">created {created} ago</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy"></button>
      </div>
      {input}
    </li>
  );
};

export default Task;
