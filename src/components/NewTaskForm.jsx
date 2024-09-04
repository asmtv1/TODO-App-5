import { useState } from 'react';
import PropTypes from 'prop-types';
export default function NewTaskForm({ addTodo }) {
  const [value, setValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setValue('');
    if (value.trim().length === 0) {
      throw new Error('Поле не может быть пустым');
    }
    addTodo(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="new-todo"
        placeholder="Что ты задумал?"
        value={value} // без этого ошибку орёт?!
        onChange={(event) => setValue(event.target.value)}
      />
    </form>
  );
}
NewTaskForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
