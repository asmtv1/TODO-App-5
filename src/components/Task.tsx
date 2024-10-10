import { formatDistanceToNow } from 'date-fns';
import Button from './Button';
import Timer from './Timer';
import { ru } from 'date-fns/locale';
import { useState } from 'react';

export interface Todo {
  // экспортирую что б не тянуть
  task: string;
  active: boolean;
  date: Date;
  id: number;
  timer?: number[]; // Если таймер есть
}
interface ViewProps {
  element: Todo;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (todo: Todo) => void;
}

const View: React.FC<ViewProps> = ({ element, updateTodo, deleteTodo }) => {
  const [style, setStyle] = useState<string>('active');
  const [value, setValue] = useState<string>(element.task);
  let creation = () => {
    const creationTime = formatDistanceToNow(element.date, {
      addSuffix: true,
      locale: ru,
    });
    return creationTime;
  };
  const [time, setTime] = useState(creation());
  setInterval(() => setTime(creation()), 10000);

  const handleClick = (element: Todo) => {
    element.active = !element.active;
    setStyle(element.active ? 'active' : 'completed');
    updateTodo(element);
  };

  const editClick = () => {
    setStyle('editing');
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    //ВЕРНО?!

    if (value.trim().length === 0) {
      throw new Error('Поле не может быть пустым');
    }
    updateTodo(element);
    setStyle(element.active ? 'active' : 'completed');
  };
  const destroyClick = (element: Todo) => {
    deleteTodo(element);
  };

  return (
    <li>
      <div className={style}>
        <div className="view">
          <input className="toggle" onClick={() => handleClick(element)} type="checkbox" />
          <label>
            <span className="description">{element.task}</span>

            <Timer element={element} />

            <span className="created">Создано {time}</span>
          </label>
          <Button onClick={editClick} className="icon icon-edit"></Button>
          <Button onClick={() => destroyClick(element)} className="icon icon-destroy"></Button>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            className="edit"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={handleKeyPress}
          />
        </form>
      </div>
    </li>
  );
};

export default View;
