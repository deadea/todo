import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './newTaskForm.css';

const NewTaskForm = ({ onTaskAdded }) => {
  const [label, setLabel] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');
  const [error, setError] = useState(false);

  const onTextChange = (e) => {
    setLabel(e.target.value);
  };
  const onMinChange = (e) => {
    setMin(e.target.value);
    checkInput(e.target.value);
  };
  const onSecChange = (e) => {
    setSec(e.target.value);
    checkInput(e.target.value);
  };

  const checkInput = (input) => {
    try {
      if (parseInt(input) > 59) {
        throw new Error('invalid number');
      }
      setError(false);
    } catch {
      setError(true);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && error === false) {
      sendForm();
    }
  };

  const sendForm = () => {
    onTaskAdded(label, min, sec);
    setLabel('');
    setMin('');
    setSec('');
  };

  const errorNum = error ? <span className="errorMessage">Please enter correct time value</span> : null;
  return (
    <form className="new-todo-form" onKeyDown={onKeyDown}>
      {errorNum}
      <input
        type="text"
        name="text"
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={onTextChange}
        value={label}
        autoComplete="off"
      ></input>
      <input
        type="number"
        name="min"
        className="new-todo-form__timer"
        placeholder="Min"
        onChange={onMinChange}
        value={min}
      ></input>
      <input
        type="number"
        name="sec"
        className="new-todo-form__timer"
        placeholder="Sec"
        onChange={onSecChange}
        value={sec}
      ></input>
    </form>
  );
};

export default NewTaskForm;

NewTaskForm.defaultProps = {
  onTaskAdded: () => {},
};
NewTaskForm.propTypes = {
  onTaskAdded: PropTypes.func,
};
