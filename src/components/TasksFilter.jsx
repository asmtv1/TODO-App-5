import { useState } from 'react';
import Button from './Button';

export default function TasksFilter() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const handleClick = (type) => {
    setSelectedFilter(type);
    document.querySelectorAll('li.hidden').forEach((item) => item.classList.remove('hidden'));
    if (type === 'Completed') {
      document.querySelectorAll('li.active').forEach((item) => item.classList.add('hidden'));
    } else if (type === 'Active') {
      document.querySelectorAll('li.completed').forEach((item) => item.classList.add('hidden'));
    }
  };

  return (
    <ul className="filters">
      <li>
        <Button onClick={() => handleClick('All')} className={selectedFilter === 'All' ? 'selected' : ''}>
          All
        </Button>
      </li>
      <li>
        <Button onClick={() => handleClick('Active')} className={selectedFilter === 'Active' ? 'selected' : ''}>
          Active
        </Button>
      </li>
      <li>
        <Button onClick={() => handleClick('Completed')} className={selectedFilter === 'Completed' ? 'selected' : ''}>
          Completed
        </Button>
      </li>
    </ul>
  );
}
