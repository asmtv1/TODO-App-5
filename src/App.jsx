import Footer from './components/Footer';
import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';
import { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const addTodo = (todo) => {
    setTodos([...todos, { task: todo, active: true, date: new Date(), id: Date.now() }]);
  };
  const updateTodo = (updatedElement) => {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === updatedElement.id ? updatedElement : todo)));
  };
  const deleteTodo = (deleteElement) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== deleteElement.id));
  };
  return (
    <section className="todoapp">
      <h1>todos</h1>
      <NewTaskForm addTodo={addTodo} />
      <ul className="todo-list">
        <TaskList todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
      </ul>
      <Footer todos={todos} deleteTodo={deleteTodo} />
    </section>
  );
}

export default App;
