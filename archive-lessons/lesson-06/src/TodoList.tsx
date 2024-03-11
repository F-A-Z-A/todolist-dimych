import React, {ChangeEvent} from 'react';
import {filterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
  removeTodolist: (todolistId: string) => void
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
  changeTodolistTitle: (newTitle: string, todolistId: string) => void
  filter: filterValuesType
}

export function TodoList(props: TodoListPropsType) {
  const onAllClickHandler = () => props.changeFilter("all", props.id)
  const onActiveClickHandler = () => props.changeFilter("active", props.id)
  const onCompletedClickHandler = () => props.changeFilter("completed", props.id)
  const removeTodolist = () => {
    props.removeTodolist(props.id)
  }
  const addTask = (title: string) => {
    props.addTask(title, props.id)
  }
  const changeTodolistTitle = (title: string) => {
    props.changeTodolistTitle(title, props.id)
  }
  
  return (
    <div>
      <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
        <button onClick={removeTodolist}>del</button>
      </h3>
      <AddItemForm addItem={addTask}/>
      <ul>
        {
          props.tasks.map(t => {
            const removeHandler = () => props.removeTask(t.id, props.id)
            const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
            }
            const onChangeTitleHandler = (newValue: string) => {
              props.changeTaskTitle(t.id, newValue, props.id)
            }
            return (
              <li key={t.id} className={t.isDone ? "is-done" : undefined}>
                <input type="checkbox"
                       checked={t.isDone}
                       onChange={onChangeStatusHandler}
                />
                <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
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