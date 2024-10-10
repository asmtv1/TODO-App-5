import View from './Task';
import { Todo } from './Task'; //интерфейс Todo

interface TaskListProps {
  todos: Todo[];
  updateTodo: (todo: Todo) => void;
  deleteTodo: (todo: Todo) => void;
}
const TaskList: React.FC<TaskListProps> = ({ todos, updateTodo, deleteTodo }) => {
  if (todos.length > 0) {
    const content = todos.map((element: Todo) => (
      <View key={element.id} element={element} updateTodo={updateTodo} deleteTodo={deleteTodo} />
    ));
    return (
      <ul className="todo-list">
        <div className="TaskList"></div>
        {content}
      </ul>
    );
  }
};

export default TaskList;
