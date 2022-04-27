import './taskList.css'

import Task from "../Task";

const TaskList = () => {
  return (
    <ul className="todo-list">
      <Task taskStatus="completed" label="Completed task" />
      <Task taskStatus="editing" label="Editing task" edit={true} />
      <Task label="Active task" />
    </ul>
  );
};

export default TaskList;
