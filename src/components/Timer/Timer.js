import React from 'react';
import './timer.css';

class Timer extends React.Component {
  state = {
    time: parseInt(this.props.todoTime) || 0,
    timerOn: false,
  };
  componentDidMount() {
    this.interval = null;
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  timerTick = () => {
    this.setState(({ time }) => {
      return {
        time: time + 1000,
      };
    });
  };

  timerStart = (e) => {
    if (!this.state.timerOn) {
      this.setState({
        timerOn: true,
      });
      this.interval = setInterval(() => this.timerTick(), 1000);
    } else return;
  };

  timerPause = () => {
    if (this.state.timerOn) {
      this.setState({ timerOn: false });
      clearInterval(this.interval);
      this.props.changeTodoTime(this.props.id, this.state.time);
    } else return;
  };

  render() {
    const { time } = this.state;

    return (
      <span className="description">
        <button className="icon icon-play" onMouseDown={this.timerStart}></button>
        <button className="icon icon-pause" onClick={this.timerPause}></button>
        {('0' + Math.floor((time / 60000) % 60)).slice(-2)}:{('0' + Math.floor((time / 1000) % 60)).slice(-2)}
      </span>
    );
  }
}

export default Timer;
