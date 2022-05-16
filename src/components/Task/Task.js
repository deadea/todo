import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Timer from '../Timer';
import './task.css';

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
    this.props.editTask(this.props.id, this.state.text);
  };

  render() {
    const { onDeleted, onToggleDone, onEdit, done, edit, date, checked, label, changeTodoTime, todoTime, id } =
      this.props;
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
            <Timer changeTodoTime={changeTodoTime} todoTime={todoTime} id={id} />
            <span className="created">created {formatDistanceToNow(dateFormat, { includeSeconds: true })} ago</span>
          </label>
          <button className="icon icon-edit" onClick={onEdit}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input type="text" className="edit" value={this.state.text} onChange={this.onLabelChange}></input>
        </form>
      </li>
    );
  }
}
