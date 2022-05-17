import React from 'react';
import PropTypes from 'prop-types';
import './newTaskForm.css';

export default class NewTaskForm extends React.Component {
  state = {
    label: '',
    min: '',
    sec: '',
    error: false,
  };

  static defaultProps = {
    onTaskAdded: () => {},
  };

  static propTypes = {
    onTaskAdded: PropTypes.func,
  };

  onChange = (e) => {
    this.setState({
      error: false,
    });

    if (e.target.name === 'text') {
      this.setState({
        label: e.target.value,
      });
    }
    if (e.target.name === 'min') {
      if (parseInt(e.target.value) > 59) {
        this.setState({
          min: e.target.value,
          error: true,
        });
      }
      this.setState({
        min: e.target.value,
      });
    }
    if (e.target.name === 'sec') {
      if (parseInt(e.target.value) > 59) {
        this.setState({
          sec: e.target.value,
          error: true,
        });
      } else {
        this.setState({
          sec: e.target.value,
        });
      }
    }
  };

  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.props.onTaskAdded(this.state.label, this.state.min, this.state.sec);
      this.setState({
        label: '',
        min: '',
        sec: '',
        error: false,
      });
    }
  };

  render() {
    const errorNum = this.state.error ? <span className="errorMessage">Please enter correct time value</span> : null;
    return (
      <form className="new-todo-form" onKeyDown={this.onKeyDown}>
        {errorNum}
        <input
          type="text"
          name="text"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onChange}
          value={this.state.label}
          autoComplete="off"
        ></input>
        <input
          type="number"
          name="min"
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={this.onChange}
          value={this.state.min}
        ></input>
        <input
          type="number"
          name="sec"
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={this.onChange}
          value={this.state.sec}
        ></input>
      </form>
    );
  }
}
