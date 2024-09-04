import View from './View';
import PropTypes from 'prop-types';
export default function TaskList({ todos, updateTodo, deleteTodo }) {
  if (todos.length > 0) {
    const content = todos.map((element) => (
      <View key={element.id} element={element} updateTodo={updateTodo} deleteTodo={deleteTodo} />
    ));
    return <>{content}</>;
  }
}
TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      task: PropTypes.string.isRequired,
      date: PropTypes.instanceOf(Date).isRequired,
      active: PropTypes.bool.isRequired,
    })
  ).isRequired,
  updateTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};
