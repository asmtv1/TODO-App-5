import { useState } from 'react';
import Button from './Button';

export default function TasksFilter() {
  const handleClick = (type) => {
    document.querySelectorAll('div.hidden').forEach((item) => item.classList.remove('hidden'));
    if (type === 'Completed') {
      document.querySelectorAll('div.active').forEach((item) => item.classList.add('hidden'));
    } else if (type === 'Active') {
      document.querySelectorAll('div.completed').forEach((item) => item.classList.add('hidden'));
    }
  };

  return (
    <div className="filters">
      <input type="radio" name="filter" onClick={() => handleClick('All')} id="all" className={'All'} />
      <label htmlFor="all">All</label>

      <input type="radio" name="filter" onClick={() => handleClick('Active')} id="active" className={'Active'} />
      <label htmlFor="active">Active</label>

      <input
        type="radio"
        name="filter"
        onClick={() => handleClick('Completed')}
        id="completed"
        className={'Completed'}
      />
      <label htmlFor="completed">Completed</label>
    </div>
  );
}
