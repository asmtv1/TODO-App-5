import { useState, useEffect } from 'react';

export default function Timer({ element }) {
  const [minutes, setMinutes] = useState(element.timer[0]);
  const [seconds, setSeconds] = useState(element.timer[1]);
  const [pause, setPause] = useState(true);

  const second = (value) => {
    if (value > 0) {
      setSeconds(value - 1);
    } else {
      if (value === 0 && minutes > 0) {
        // Используем === для сравнения
        setSeconds(59);
        setMinutes(minutes - 1);
      } else {
        if (value === 0 && minutes === 0) {
          return () => clearInterval(intervalId);
        }
      }
    }
  };
  const pauseTimer = () => {
    setPause(true);
  };

  useEffect(() => {
    if (pause) {
      const intervalId = setInterval(() => {
        second(seconds); // обновляем секунды
      }, 1000);

      return () => clearInterval(intervalId);
    } // очищаем интервал при размонтировании компонента
  }, [seconds, minutes, pause]); // добавляем зависимости

  return (
    <span className="description">
      <input
        type="radio"
        name="timer"
        onClick={() => pauseTimer()}
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
