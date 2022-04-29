import React from "react";
import NewTaskForm from "../NewTaskForm";
import TaskList from "../TaskList";
import Footer from "../Footer";

import "./App.css";

export default class App extends React.Component {
  state = {
    todoData: [
      { label: "Completed task", id: 1 },
      { label: "Editing task", id: 2 },
      { label: "Active task", id: 3 },
    ],
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

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm />
        </header>
        <section className="main">
          <TaskList todos={this.state.todoData} onDeleted={this.deleteTask} />
          <Footer />
        </section>
      </section>
    );
  }
}
