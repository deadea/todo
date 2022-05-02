import './footer.css'

import TasksFilter from "../TasksFilter";

const Footer = ({toDo, onFilter, filter, deleteCompleted, todoData}) => {
  return (
    <footer className="footer">
      <span className="todo-count">{toDo} items left</span>
      <TasksFilter 
      onFilter={onFilter}
      filter={filter}
      />
      <button className="clear-completed" onClick={() => deleteCompleted(todoData)}>Clear completed</button>
    </footer>
  );
};

export default Footer;
