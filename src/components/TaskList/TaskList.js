import PropTypes from "prop-types";
import Task from "../Task";
import "./taskList.css";

const TaskList = ({ todos, onDeleted, onToggleDone, onEdit }) => {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;

    return (
      <Task
        key={id}
        {...itemProps}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
        onEdit={() => onEdit(id)}
      />
    );
  });

  return <ul className="todo-list">{elements}</ul>;
};

TaskList.defaultProps = {
  todos: [{}],
  onDeleted: () => {},
  onToggleDone: () => {},
  onEdit: () => {},
};

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onEdit: PropTypes.func,
};

export default TaskList;
