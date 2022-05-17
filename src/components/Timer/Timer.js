import React from 'react';
import './timer.css';

class Timer extends React.Component {
  state = {
    timerOn: false,
    min: parseInt(this.props.minutes),
    sec: parseInt(this.props.seconds),
  };
  componentDidMount() {
    this.interval = null;
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  timerTick = () => {
    if (this.state.min === 0 && this.state.sec === 0) {
      clearInterval(this.interval);
      return;
    }
    if (this.state.sec !== 0) {
      this.setState(({ sec }) => {
        return {
          sec: sec - 1,
        };
      });
    } else {
      this.setState(({ min }) => {
        return {
          sec: 59,
          min: min - 1,
        };
      });
    }
  };

  timerStart = () => {
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
      this.props.changeTodoTime(this.props.id, this.state.min, this.state.sec);
    } else return;
  };

  render() {
    const { min, sec } = this.state;
    const minFormatted = min.toString().length === 1 ? `0${min}` : min;
    const secFormatted = sec.toString().length === 1 ? `0${sec}` : sec;
    return (
      <span className="description">
        <button className="icon icon-play" onMouseDown={this.timerStart}></button>
        <button className="icon icon-pause" onClick={this.timerPause}></button>
        {minFormatted}:{secFormatted}
      </span>
    );
  }
}

export default Timer;
