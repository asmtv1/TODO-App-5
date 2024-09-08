import { useState } from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/reset.css';
import { message } from 'antd';
export default function NewTaskForm({ addTodo }) {
  const [value, setValue] = useState('');
  const [seconds, setSeconds] = useState('');
  const [minutes, setMinutes] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();

    if (value.trim().length === 0) {
      message.error('Поле задания не может быть пустым');
      throw new Error();
    }
    if (minutes === '' || seconds === '') {
      message.error('Минуты и секунды не могут быть пустыми');
      throw new Error();
    }
    addTodo(value);
    setValue('');
    setMinutes('');
    setSeconds('');
  };

  const handleSecondsChange = (event) => {
    const value = event.target.value;
    if (Number(value) >= 0 && Number(value) <= 60) {
      setSeconds(value);
    }
  };

  const handleMinutesChange = (event) => {
    const value = event.target.value;
    if (Number(value) >= 0 && Number(value) <= 999) {
      setMinutes(value);
    }
  };

  return (
    <form className="wraperNewTaskForm" onSubmit={handleSubmit}>
      <input
        type="text"
        className="new-todo"
        placeholder="Что ты задумал?"
        value={value} // без этого ошибку орёт?!
        onChange={(event) => setValue(event.target.value)}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        type="number"
        min="0"
        max="999"
        step="1"
        onChange={handleMinutesChange}
        value={minutes}
      />
      <span>:</span>
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        type="number"
        min="0"
        max="60"
        step="1"
        onChange={handleSecondsChange}
        value={seconds}
      />
      <input type="submit" hidden />
    </form>
  );
}

NewTaskForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
