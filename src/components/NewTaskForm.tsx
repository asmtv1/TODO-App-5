import { useState } from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/reset.css';
import { message } from 'antd';

interface NewTaskFormProps {
  addTodo: (todo: string, timer?: [number, number]) => void;
}
const NewTaskForm: React.FC<NewTaskFormProps> = ({ addTodo }) => {
  const [value, setValue] = useState<string>('');
  const [seconds, setSeconds] = useState<number | null>(null);
  const [minutes, setMinutes] = useState<number | null>(null);
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (value.trim().length === 0) {
      message.error('Поле задания не может быть пустым');
      throw new Error();
    }
    if (minutes === null || seconds === null) {
      message.error('Минуты и секунды не могут быть пустыми');
      throw new Error();
    }
    const timer: [number, number] = [minutes, seconds]; // [минуты, секунды]
    addTodo(value, timer);
    setValue('');
    setMinutes(null);
    setSeconds(null);
  };

  const handleSecondsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (value >= 0 && value <= 60) {
      setSeconds(value);
    }
  };

  const handleMinutesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (value >= 0 && value <= 999) {
      setMinutes(value);
    }
  };

  return (
    <form className="wraperNewTaskForm" onSubmit={handleSubmit}>
      <input
        type="text"
        className="new-todo"
        placeholder="Что ты задумал?"
        value={value ?? ''} // так вроде правильней
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
        value={minutes ?? ''} // Обработка null
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
        value={seconds ?? ''} // Обработка null
      />
      <input type="submit" hidden />
    </form>
  );
};

export default NewTaskForm;
