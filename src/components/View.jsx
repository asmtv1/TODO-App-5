import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import Button from './Button';
import { ru } from 'date-fns/locale';
import { useState } from 'react';

export default function View({ element, updateTodo, deleteTodo }) {
  const [style, setStyle] = useState('active');
  const [value, setValue] = useState(element.task);
  let creation = () => {
    const creationTime = formatDistanceToNow(element.date, {
      addSuffix: true,
      locale: ru,
    });
    return creationTime;
  };
  const [time, setTime] = useState(creation());
  setInterval(() => setTime(creation()), 10000);

  const handleClick = () => {
    element.active = !element.active;
    setStyle(element.active ? 'active' : 'completed');
    updateTodo(element);
  };

  const editClick = () => {
    setStyle('editing');
  };

  const handleKeyPress = (event) => {
    event.preventDefault();
    if (value.trim().length === 0) {
      throw new Error('Поле не может быть пустым');
    }
    updateTodo(element);
    setStyle(element.active ? 'active' : 'completed');
  };
  const destroyClick = (element) => {
    deleteTodo(element);
  };

  return (
    <li>
      <div className={style}>
        <div className="view">
          <input className="toggle" onClick={() => handleClick(element)} type="checkbox" />
          <label>
            <span className="description">{element.task}</span>
            <span className="created">Создано {time}</span>
          </label>
          <Button onClick={editClick} className="icon icon-edit"></Button>
          <Button onClick={() => destroyClick(element)} className="icon icon-destroy"></Button>
        </div>
        <form onSubmit={handleKeyPress}>
          <input type="text" className="edit" value={value} onChange={(event) => setValue(event.target.value)} />
        </form>
      </div>
    </li>
  );
}
View.propTypes = {
  element: PropTypes.shape({
    task: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    active: PropTypes.bool.isRequired,
  }).isRequired,
  updateTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};
