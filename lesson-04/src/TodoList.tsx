import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {filterValuesType} from "./App";
import {log} from "node:util";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type TodoListPropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string) => void
  changeFilter: (value: filterValuesType) => void
  addTask: (title: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean) => void
  filter: filterValuesType
}

export function TodoList(props: TodoListPropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    // чтоб перекрывался error, если предыдущий ввод вызывал error
    if (e.ctrlKey && e.charCode === 13) {
      props.addTask(newTaskTitle)
      setNewTaskTitle("")
    }
  }
  const addTask = () => {
    if (newTaskTitle.trim() === "") {
      // условие, чтоб не добавлялась пустая task (.trim - для образания пробелов)
      return setError("Title is required")
    }
    props.addTask(newTaskTitle.trim())
    // .trim - для образания пробелов
    setNewTaskTitle("")
  }
  const onAllClickHandler = () => props.changeFilter("all")
  const onActiveClickHandler = () => props.changeFilter("active")
  const onCompletedClickHandler = () => props.changeFilter("completed")
  
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input value={newTaskTitle}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}
               className={error ? "error" : ""}
        />
        <button onClick={addTask}>+</button>
        {error && <div className={"error-massage"}>{error}</div>}
      </div>
      <ul>
        {
          props.tasks.map(t => {
            const removeHandler = () => props.removeTask(t.id)
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeTaskStatus(t.id, e.currentTarget.checked)
            }
            return (
              <li key={t.id} className={t.isDone ? "is-done" : ""}>
                <input type="checkbox"
                       onChange={onChangeHandler}
                       checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={removeHandler}> del</button>
              </li>
            )
          })
        }
      </ul>
      <div>
        <button className={props.filter === "all" ? "active-filter" : ""}
                onClick={onAllClickHandler}>All
        </button>
        <button className={props.filter === "active" ? "active-filter" : ""}
                onClick={onActiveClickHandler}>Active
        </button>
        <button className={props.filter === "completed" ? "active-filter" : ""}
                onClick={onCompletedClickHandler}>Completed
        </button>
      </div>
    </div>
  );
}