import { useState, useEffect } from 'react';
import { Todo } from './Task';

interface TimerProps {
  element: Todo;
}
const Timer: React.FC<TimerProps> = ({ element }) => {
  const [minutes, setMinutes] = useState(element.timer ? element.timer[0] : 0);
  const [seconds, setSeconds] = useState(element.timer ? element.timer[1] : 0);
  const [pause, setPause] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  let intervalId: number | undefined;
  useEffect(() => {
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

  const second = (value: number) => {
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
};

export default Timer;
