import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Timer from '../Timer';
import './task.css';

const Task = (props) => {
  const {
    onDeleted,
    onToggleDone,
    onEdit,
    editTask,
    done,
    edit,
    date,
    checked,
    label,
    minutes,
    seconds,
    id,
    changeTodoTime,
  } = props;
  const [count, setCount] = useState(1);
  const [text, setText] = useState(label);

  useEffect(() => {
    let timerID = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);
    return () => clearInterval(timerID);
  });

  const onLabelChange = (e) => {
    setText(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    editTask(id, text);
  };

  const dateFormat = new Date(date);
  let taskStatus = classNames({ completed: done === true }, { editing: edit === true });

  return (
    <li className={taskStatus}>
      <div className="view">
        <input className="toggle" type="checkbox" onChange={onToggleDone} checked={checked}></input>
        <label>
          <span className="title" onClick={onToggleDone}>
            {label}
          </span>
          <Timer id={id} minutes={minutes} seconds={seconds} changeTodoTime={changeTodoTime} />
          <span className="created">created {formatDistanceToNow(dateFormat, { includeSeconds: true })} ago</span>
        </label>
        <button className="icon icon-edit" onClick={onEdit}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
      <form onSubmit={onSubmit}>
        <input type="text" className="edit" value={text} onChange={onLabelChange}></input>
      </form>
    </li>
  );
};

export default Task;

Task.defaultProps = {
  onDeleted: () => {},
  onToggleDone: () => {},
  onEdit: () => {},
};

Task.propTypes = {
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onEdit: PropTypes.func,
};
