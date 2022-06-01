import React from 'react';
import PropTypes from 'prop-types';

import { ACTIONS } from './filter-actions';
import './tasksFilter.css';

const TasksFilter = ({ filter, onFilter }) => {
  let actionsCopy = {};
  actionsCopy = Object.assign(actionsCopy, ACTIONS);
  const actions = [];
  for (let key in actionsCopy) {
    actions.push({ label: actionsCopy[key] });
  }
  const buttons = actions.map(({ label }) => {
    let isSelected = '';
    if (filter === label) {
      isSelected = 'selected';
    }
    return (
      <li key={label}>
        <button className={isSelected} onClick={() => onFilter(label)}>
          {label}
        </button>
      </li>
    );
  });
  return <ul className="filters">{buttons}</ul>;
};

export default TasksFilter;

TasksFilter.defaultProps = {
  onFilter: () => {},
  filter: 'All',
};

TasksFilter.propTypes = {
  onFilter: PropTypes.func,
  filter: PropTypes.string,
};
