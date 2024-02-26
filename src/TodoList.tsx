import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {filterValuesType} from "./App";
import {log} from "node:util";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type TodoListPropsType = {
  id: string
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string, todolistId: string) => void
  changeFilter: (value: filterValuesType, todoListId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
  removeTodolist: (todolistId: string) => void
  filter: filterValuesType
}

export function TodoList(props: TodoListPropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<null | string>(null);
  
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
    props.addTask(newTaskTitle.trim(), props.id)
    setNewTaskTitle("")
  }
  const onAllClickHandler = () => props.changeFilter("all", props.id)
  const onActiveClickHandler = () => props.changeFilter("active", props.id)
  const onCompletedClickHandler = () => props.changeFilter("completed", props.id)
  
  const removeTodolist = () => {
    props.removeTodolist(props.id)
  }
  
  return (
    <div>
      <h3>{props.title}
        <button onClick={removeTodolist}>del</button>
      </h3>
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
            const removeHandler = () => props.removeTask(t.id, props.id)
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeStatus(t.id, e.currentTarget.checked, props.id)
            }
            return (
              <li key={t.id}>
                <input type="checkbox"
                       checked={t.isDone}
                       onChange={onChangeHandler}
                />
                <span className={t.isDone ? "is-done" : undefined}>{t.title}</span>
                <button onClick={removeHandler}>x</button>
              </li>
            )
          })
        }
      </ul>
      <div>
        <button
          className={props.filter === "all" ? "active-filter" : undefined}
          onClick={onAllClickHandler}>All
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