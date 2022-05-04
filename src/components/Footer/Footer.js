import PropTypes from 'prop-types';

import TasksFilter from '../TasksFilter';
import './footer.css';

const Footer = ({ toDo, onFilter, filter, deleteCompleted, todoData }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{toDo} items left</span>
      <TasksFilter onFilter={onFilter} filter={filter} />
      <button className="clear-completed" onClick={() => deleteCompleted(todoData)}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  toDo: 0,
  onFilter: () => {},
  filter: 'All',
  deleteCompleted: () => {},
  todoData: [{}],
};

Footer.propTypes = {
  toDo: PropTypes.number,
  onFilter: PropTypes.func,
  filter: PropTypes.string,
  deleteCompleted: PropTypes.func,
  todoData: PropTypes.arrayOf(PropTypes.object),
};

export default Footer;
