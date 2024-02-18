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
}

export function TodoList(props: TodoListPropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.ctrlKey && e.charCode === 13) {
      props.addTask(newTaskTitle)
      setNewTaskTitle("")
    }
  }
  const addTask = () => {
    props.addTask(newTaskTitle)
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
        />
        <button onClick={addTask}>+</button>
      </div>
      <ul>
        {
          props.tasks.map(t => {
            const removeHandler = () => props.removeTask(t.id)
            return (
              <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={removeHandler}> del</button>
              </li>
            )
          })
        }
      </ul>
      <div>
        <button onClick={onAllClickHandler}>All</button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  );
}