import React from 'react';
import {filterValuesType} from "./App";

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
}

export function TodoList(props: TodoListPropsType) {
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input/>
        <button>+</button>
      </div>
      <ul>
        {
          props.tasks.map((t) => {
            return (
              <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/> <span>{t.title}</span>
                <button onClick={() => {
                  props.removeTask(t.id)
                }}>
                  del
                </button>
              </li>
            )
          })
        }
      </ul>
      <div>
        <button onClick={() => {
          props.changeFilter("all")
        }}>
          All
        </button>
        <button onClick={() => {
          props.changeFilter("active")
        }}>
          Active
        </button>
        <button onClick={() => {
          props.changeFilter("completed")
        }}>
          Completed
        </button>
      </div>
    </div>
  );
}