import React from 'react';
import PropTypes from 'prop-types';
import './tasksFilter.css';

export default class TasksFilter extends React.Component {
  buttons = [{ label: 'All' }, { label: 'Active' }, { label: 'Completed' }];
  static defaultProps = {
    onFilter: () => {},
    filter: 'All',
  };
  static propTypes = {
    onFilter: PropTypes.func,
    filter: PropTypes.string,
  };

  render() {
    const { onFilter, filter } = this.props;

    const buttons = this.buttons.map(({ label }) => {
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
