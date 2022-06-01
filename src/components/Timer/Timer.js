import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './timer.css';

function Timer({ minutes, seconds, changeTodoTime, id }) {
  const [time, setTime] = useState(parseInt(minutes) * 60 + parseInt(seconds));
  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (!timerOn) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  const timerStart = () => {
    setTimerOn(true);
  };

  const min = Math.floor(time / 60);
  const sec = time - min * 60;
  const minFormatted = min.toString().length === 1 ? `0${min}` : min;
  const secFormatted = sec.toString().length === 1 ? `0${sec}` : sec;

  const timerPause = () => {
    setTimerOn(false);
    changeTodoTime(id, minFormatted, secFormatted);
  };

  return (
    <span className="description">
      <button className="icon icon-play" onMouseDown={timerStart}></button>
      <button className="icon icon-pause" onClick={timerPause}></button>
      {minFormatted}:{secFormatted}
    </span>
  );
}

export default Timer;

Timer.defaultProps = {
  changeTodoTime: () => {},
  minutes: '0',
  seconds: '0',
};

Timer.propTypes = {
  changeTodoTime: PropTypes.func,
  minutes: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  seconds: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
