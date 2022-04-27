import './newTaskForm.css'

const NewTaskForm = () => {
  return (
    <input
      className="new-todo"
      placeHolder="What needs to be done?"
      autoFocus
    ></input>
  );
};

export default NewTaskForm;
