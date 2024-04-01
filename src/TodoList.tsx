import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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
  changeFilter: (value: FilterValuesType, todoListId: string) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
  changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void
  removeTodolist: (todolistId: string) => void
  changeTodolistTitle: (todolistId: string, newTitle: string) => void
  filter: FilterValuesType
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
  const changeTodolistTitle = (newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle)
  }
  
  return (
    <div>
      <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
        {/*<button onClick={removeTodolist}>del</button>*/}
        <IconButton onClick={removeTodolist} size={"small"}>
          <Delete/>
        </IconButton>
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
                <Checkbox
                  color={"secondary"}
                  checked={t.isDone}
                  onChange={onChangeStatusHandler}
                />
                <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                {/*<button onClick={removeHandler}>x</button>*/}
                <IconButton onClick={removeHandler} size={"small"}>
                  <Delete/>
                </IconButton>
              </li>
            )
          })
        }
      </ul>
      <div>
        <Button
          // className={props.filter === "all" ? "active-filter" : undefined}
          variant={props.filter === "all" ? "contained" : "text"}
          color={"inherit"}
          onClick={onAllClickHandler}
          size={"small"}
        >All
        </Button>
        <Button
          // className={props.filter === "active" ? "active-filter" : undefined}
          variant={props.filter === "active" ? "contained" : "text"}
          color={"primary"}
          onClick={onActiveClickHandler}
          size={"small"}
        >Active
        </Button>
        <Button
          // className={props.filter === "completed" ? "active-filter" : undefined}
          variant={props.filter === "completed" ? "contained" : "text"}
          color={"secondary"}
          onClick={onCompletedClickHandler}
          size={"small"}
        >Completed
        </Button>
      </div>
    </div>
  );
}

