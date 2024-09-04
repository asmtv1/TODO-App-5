import PropTypes from 'prop-types';
import TasksFilter from './TasksFilter';
import { useState, useEffect, useCallback } from 'react';
import Button from './Button';

export default function Footer({ todos, deleteTodo }) {
  const [item, setItem] = useState(0);

  const calculateActiveItems = useCallback(() => {
    let sum = todos.reduce((accumulator, todoItem) => {
      return todoItem.active ? accumulator + 1 : accumulator;
    }, 0);
    setItem(sum);
  }, [todos]);

  useEffect(() => {
    calculateActiveItems();
  }, [calculateActiveItems]);

  function handleClick() {
    const Clear = todos.filter((item) => item.active !== true);
    if (Clear.length !== 0) for (let i = 0; i < Clear.length; i++) deleteTodo(Clear[i]);
  }

  return (
    <footer className="footer">
      <span className="todo-count">{item} items left</span>
      <TasksFilter />
      <Button onClick={handleClick} className="clear-completed">
        Clear completed
      </Button>
    </footer>
  );
}

Footer.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      active: PropTypes.bool.isRequired,
    })
  ).isRequired,
  deleteTodo: PropTypes.func.isRequired,
};
