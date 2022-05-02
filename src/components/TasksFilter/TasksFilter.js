import React from "react";
import "./tasksFilter.css";
/*
export default class TasksFilter extends React.Component {
  buttons = [
    {name: "all", label: "All"},
    {name: "active", label: "Active"},
    {name: "completed", label: "Completed"}
  ]


  render() {
    const {onFilter, filter} = this.props;
    
    const buttons = this.buttons.map(({name, label}) => {
      let isSelected = ''
      if (filter === name) {
        isSelected = 'selected';
      } 

      return (
        <li key={name}>
        <button key={name} className={isSelected} onClick={() => onFilter(name)} >{label}</button>
      </li>
      )
    })



    return (
      <ul className="filters">
        {buttons}
      </ul>
    );
  }
}*/


export default class TasksFilter extends React.Component {
  buttons = [
    {label: "All"},
    {label: "Active"},
    {label: "Completed"}
  ]


  render() {
    const {onFilter, filter} = this.props;
    
    const buttons = this.buttons.map(({label}) => {
      let isSelected = ''
      if (filter === label) {
        isSelected = 'selected';
      } 

      return (
        <li key={label}>
        <button className={isSelected} onClick={() => onFilter(label)} >{label}</button>
      </li>
      )
    })



    return (
      <ul className="filters">
        {buttons}
      </ul>
    );
  }
}