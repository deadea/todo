import React from 'react';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';
import './App.css';

export default class App extends React.Component {
  maxId = 100;

  state = {
    todoData: [this.createTodoTask('Task to do'), this.createTodoTask('Task to do'), this.createTodoTask('Task to do')],
    filter: 'All',
  };

  createTodoTask(label) {
    return {
      label,
      done: false,
      edit: false,
      id: this.maxId++,
      date: new Date(),
    };
  }

  addItem = (text) => {
    if (text.trim() === '') {
      return alert('Please enter task name');
    }

    const newItem = this.createTodoTask(text);

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
      const newItem = { ...oldItem, done: !oldItem.done };

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

  render() {
    const { todoData, filter } = this.state;

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
