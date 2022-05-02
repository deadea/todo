import React from "react";
import NewTaskForm from "../NewTaskForm";
import TaskList from "../TaskList";
import Footer from "../Footer";

import "./App.css";

export default class App extends React.Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoTask("Completed task"),
      this.createTodoTask("Editing task"),
      this.createTodoTask("Active task"),
      /*
      { label: "Completed task", id: 1 },
      { label: "Editing task", id: 2 },
      { label: "Active task", id: 3 },*/
    ],
    filter: 'All' //completed all active
  };


filterTasks(tasks, filter) {
  if (filter === "All") {
    return tasks
  }
  if (filter === "Active" ) {
    return tasks.filter((task) => !task.done)
  }
  if (filter === "Completed" ) {
    return tasks.filter((task) => task.done)
  }
  //возможно дефолтно оставить ifelse return tasks
}

changeFilter = (filter) => {
  this.setState({
    filter
  })
}

//добавление функции которая умеет создавать элемент таску, вызов в state
  createTodoTask(label) {
    return {
      label,
      done: false,
      id: this.maxId++,
    };
  }

  addItem = (text) => {
    //добавление элемента
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
  const tasksToDelete = arr.filter((el) => el.done)
  tasksToDelete.forEach((el) => {
  this.deleteTask(el.id)
  })
}

//реализация изменения done в state
  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      //1 не меняя исходный создать новый объект с новым знач done
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, done: !oldItem.done };

      //2 создать новый массив стейта
     const newArr = [
        ...todoData.slice(0, idx),
        newItem,
        ...todoData.slice(idx + 1),
      ];
      return {
        todoData: newArr,
      };
    });
  };

  render() {
    const {todoData, filter} = this.state;

    const tasksToShow = this.filterTasks(todoData, filter)


    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm 
          onTaskAdded={this.addItem}
          />
        </header>
        <section className="main">
          <TaskList
            todos={tasksToShow}
            onDeleted={this.deleteTask}
            onToggleDone={this.onToggleDone}
          />
          <Footer toDo={todoCount} todoData={todoData} onFilter={this.changeFilter} filter={filter} deleteCompleted={this.deleteCompleted} />
        </section>
      </section>
    );
  }
}
