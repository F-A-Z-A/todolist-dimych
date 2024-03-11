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
    if (e.charCode === 13) {
      addTask()
    }
  }
  const addTask = () => {
    if (newTaskTitle.trim() === "") return setError("Field is required")
    props.addTask(newTaskTitle.trim())
    setNewTaskTitle("")
  }
  const onAllClickHandler = () => props.changeFilter("all")
  const onActiveClickHandler = () => props.changeFilter("active")
  const onCompletedClickHandler = () => props.changeFilter("completed")
  
  // Field is required
  
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input value={newTaskTitle}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}
               className={error ? "error" : undefined}
        />
        <button onClick={addTask}>+</button>
        {error && <div className={"error-message"}>{error}</div>}
      </div>
      <ul>
        {
          props.tasks.map(t => {
            const removeHandler = () => props.removeTask(t.id)
            const onCheckChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked)
            return (
              <li key={t.id}>
                <input type="checkbox"
                       onChange={onCheckChangeHandler}
                       checked={t.isDone}
                />
                <span className={t.isDone ? "is-done" : ""}>{t.title}</span>
                <button onClick={removeHandler}>del</button>
              </li>
            )
          })
        }
      </ul>
      <div>
        <button
          className={props.filter === "all" ? "active-filter" : undefined} onClick={onAllClickHandler}>All
        </button>
        <button
          className={props.filter === "active" ? "active-filter" : undefined}
          onClick={onActiveClickHandler}>Active
        </button>
        <button
          className={props.filter === "completed" ? "active-filter" : undefined}
          onClick={onCompletedClickHandler}>Completed
        </button>
      </div>
    </div>
  );
}