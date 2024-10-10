import TasksFilter from './TasksFilter';
import { useState, useEffect, useCallback } from 'react';
import Button from './Button';
import { Todo } from './Task'; //интерфейс Todo

interface FooterProps {
  todos: Todo[]; // Массив задач
  deleteTodo: (todo: Todo) => void; // Функция  удаления
}

const Footer: React.FC<FooterProps> = ({ todos, deleteTodo }) => {
  const [item, setItem] = useState<number>(0);

  const calculateActiveItems = useCallback(() => {
    let sum = todos.reduce((accumulator: number, todoItem: Todo) => {
      return todoItem.active ? accumulator + 1 : accumulator;
    }, 0);
    setItem(sum);
  }, [todos]);

  useEffect(() => {
    calculateActiveItems();
  }, [calculateActiveItems]);

  function handleClick() {
    const Clear = todos.filter((item: Todo) => item.active !== true);
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
};

export default Footer;
