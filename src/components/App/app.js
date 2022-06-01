import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';
import './App.css';

const App = () => {
  const [todoData, setTodoData] = useState(JSON.parse(localStorage.getItem('todoData')) || []);
  const [filter, setFilter] = useState('All');

  const createTodoTask = (label, min, sec) => {
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
  };

  const addItem = (text, min, sec) => {
    if (text.trim() === '') {
      return;
    }
    if (parseInt(sec) > 59 || parseInt(min) > 59) {
      return;
    }

    const newItem = createTodoTask(text, min, sec);
    const newArray = [...todoData, newItem];

    setTodoData(newArray);
  };
  const deleteTask = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
    setTodoData(newArray);
  };

  const deleteCompleted = (arr) => {
    const tasksToSave = arr.filter((el) => !el.done);
    setTodoData(tasksToSave);
  };

  const onToggleDone = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[idx];
    const newItem = { ...oldItem, done: !oldItem.done, checked: !oldItem.checked };
    setTodoData([...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]);
  };

  const onEdit = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[idx];
    const newItem = { ...oldItem, edit: !oldItem.edit };
    setTodoData([...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]);
  };

  const editTask = (id, text) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[idx];
    const newItem = { ...oldItem, label: text, edit: !oldItem.edit };
    setTodoData([...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]);
  };

  const filterTasks = (tasks, filter) => {
    if (filter === 'Active') {
      return tasks.filter((task) => !task.done);
    } else if (filter === 'Completed') {
      return tasks.filter((task) => task.done);
    } else {
      return tasks;
    }
  };

  const changeFilter = (filter) => {
    setFilter(filter);
  };

  const changeTodoTime = (id, min, sec) => {
    const idx = todoData.findIndex((el) => el.id === id);

    const oldItem = todoData[idx];
    const newItem = { ...oldItem, minutes: min, seconds: sec };
    setTodoData([...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]);
  };

  localStorage.setItem('todoData', JSON.stringify(todoData));

  const tasksToShow = filterTasks(todoData, filter);
  const doneCount = todoData.filter((el) => el.done).length;
  const todoCount = todoData.length - doneCount;

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onTaskAdded={addItem} />
      </header>
      <section className="main">
        <TaskList
          todos={tasksToShow}
          onDeleted={deleteTask}
          onToggleDone={onToggleDone}
          onEdit={onEdit}
          editTask={editTask}
          changeTodoTime={changeTodoTime}
        />
        <Footer
          toDo={todoCount}
          todoData={todoData}
          onFilter={changeFilter}
          filter={filter}
          deleteCompleted={deleteCompleted}
        />
      </section>
    </section>
  );
};

export default App;
