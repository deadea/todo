import React from 'react';
import PropTypes from 'prop-types';

import { ACTIONS } from './filter-actions';
import './tasksFilter.css';

export default class TasksFilter extends React.Component {
  static defaultProps = {
    onFilter: () => {},
    filter: 'All',
  };
  static propTypes = {
    onFilter: PropTypes.func,
    filter: PropTypes.string,
  };
  getActions() {
    let actionsCopy = {};
    actionsCopy = Object.assign(actionsCopy, ACTIONS);
    const actions = [];
    for (let key in actionsCopy) {
      actions.push({ label: actionsCopy[key] });
    }
    return actions;
  }
  render() {
    const { onFilter, filter } = this.props;

    const buttons = this.getActions().map(({ label }) => {
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
  }
}
