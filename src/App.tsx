import React, { useState } from 'react';
import Footer from './components/Footer';
import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';
import { Todo } from './components/Task'; //интерфейс Todo, А смысл его объявлять в таск если сюда всё равно экспортировать? не пониимаю тогда

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]); // Правильно?

  const addTodo = (todo: string, timer?: [number, number]) => {
    // Указываем типы параметров
    setTodos([...todos, { task: todo, active: true, date: new Date(), id: Date.now(), timer }]);
  };

  const updateTodo = (updatedElement: Todo) => {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === updatedElement.id ? updatedElement : todo)));
  };

  const deleteTodo = (deleteElement: Todo) => {
    // Правильно??? ТУТ ЭЛЕНЕНТ ИЗ ТУДУ, А НЕ ТУДУ, но в нём как бы такая же структура как в todo
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== deleteElement.id));
  };

  return (
    <section className="todoapp">
      <h1>todos</h1>
      <NewTaskForm addTodo={addTodo} />
      <TaskList todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
      <Footer todos={todos} deleteTodo={deleteTodo} />
    </section>
  );
};

export default App;
