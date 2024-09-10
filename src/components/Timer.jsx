import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Timer({ element }) {
  const [minutes, setMinutes] = useState(element.timer[0]);
  const [seconds, setSeconds] = useState(element.timer[1]);
  const [pause, setPause] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const second = (value) => {
    if (value > 0) {
      setSeconds(value - 1);
    } else {
      if (value === 0 && minutes > 0) {
        setSeconds(59);
        setMinutes(minutes - 1);
      } else {
        if (value === 0 && minutes === 0) {
          return () => clearInterval(intervalId);
        }
      }
    }
  };

  useEffect(() => {
    let intervalId;
    if (pause) {
      intervalId = setInterval(() => {
        const now = Date.now();
        if (now - lastUpdate >= 1000) {
          second(seconds);
          setLastUpdate(now);
        }
      }, 100);
    }
    return () => clearInterval(intervalId);
  }, [pause, lastUpdate]);

  return (
    <span className="description">
      <input
        type="radio"
        name="timer"
        onClick={() => setPause(true)}
        className={`icon icon-play ${pause ? 'selected' : ''}`}
      />
      <input
        type="radio"
        name="timer"
        onClick={() => setPause(false)}
        className={`icon icon-pause ${!pause ? 'selected' : ''}`}
      />
      <div className="timerwraper">
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
    </span>
  );
}
View.propTypes = {
  element: PropTypes.shape({
    task: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    active: PropTypes.bool.isRequired,
  }),
};
