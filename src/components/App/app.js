import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';
import './App.css';

export default class App extends React.Component {
  state = {
    todoData: JSON.parse(localStorage.getItem('todoData')) || [],
    filter: 'All',
  };

  createTodoTask(label, min, sec) {
    return {
      label: label,
      done: false,
      edit: false,
      id: uuidv4(),
      date: new Date(),
      checked: false,
      minutes: min || 0,
      seconds: sec || 0,
    };
  }

  addItem = (text, min, sec) => {
    if (text.trim() === '') {
      return;
    }
    if (parseInt(sec) > 59 || parseInt(min) > 59) {
      return;
    }

    const newItem = this.createTodoTask(text, min, sec);

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];
      return {
        todoData: newArr,
      };
    });
  };

  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const [...newArr] = todoData;
      newArr.splice(idx, 1);
      return {
        todoData: newArr,
      };
    });
  };

  deleteCompleted = (arr) => {
    const tasksToDelete = arr.filter((el) => el.done);
    tasksToDelete.forEach((el) => {
      this.deleteTask(el.id);
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const oldItem = todoData[idx];
      const newItem = { ...oldItem, done: !oldItem.done, checked: !oldItem.checked };

      const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      return {
        todoData: newArr,
      };
    });
  };

  onEdit = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const oldItem = todoData[idx];
      const newItem = { ...oldItem, edit: !oldItem.edit };

      const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      return {
        todoData: newArr,
      };
    });
  };

  editTask = (id, text) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const oldItem = todoData[idx];
      const newItem = { ...oldItem, label: text, edit: !oldItem.edit };

      const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      return {
        todoData: newArr,
      };
    });
  };

  filterTasks(tasks, filter) {
    if (filter === 'Active') {
      return tasks.filter((task) => !task.done);
    } else if (filter === 'Completed') {
      return tasks.filter((task) => task.done);
    } else {
      return tasks;
    }
  }

  changeFilter = (filter) => {
    this.setState({
      filter,
    });
  };

  changeTodoTime = (id, min, sec) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const oldItem = todoData[idx];
      const newItem = { ...oldItem, minutes: min, seconds: sec };

      const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      return {
        todoData: newArr,
      };
    });
  };

  render() {
    const { todoData, filter } = this.state;
    localStorage.setItem('todoData', JSON.stringify(todoData));

    const tasksToShow = this.filterTasks(todoData, filter);

    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onTaskAdded={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            todos={tasksToShow}
            onDeleted={this.deleteTask}
            onToggleDone={this.onToggleDone}
            onEdit={this.onEdit}
            editTask={this.editTask}
            changeTodoTime={this.changeTodoTime}
          />
          <Footer
            toDo={todoCount}
            todoData={todoData}
            onFilter={this.changeFilter}
            filter={filter}
            deleteCompleted={this.deleteCompleted}
          />
        </section>
      </section>
    );
  }
}
