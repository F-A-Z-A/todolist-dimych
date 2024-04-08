import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTiltleAC, removeTaskAC} from "./state/tasks-reducer";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type TodoListPropsType = {
  id: string
  title: string
  changeFilter: (value: FilterValuesType, todoListId: string) => void
  removeTodolist: (todolistId: string) => void
  changeTodolistTitle: (todolistId: string, newTitle: string) => void
  filter: FilterValuesType
}

export function TodoListWithRedux(props: TodoListPropsType) {
  let tasksObj = useSelector<AppRootStateType, TaskType[]>((state => state.tasks[props.id]));
  const dispatch = useDispatch();
  
  if (props.filter === "active") {
    tasksObj = tasksObj.filter(t => !t.isDone)
  }
  if (props.filter === "completed") {
    tasksObj = tasksObj.filter(t => t.isDone)
  }
  
  const onAllClickHandler = () => {
    props.changeFilter("all", props.id)
  }
  const onActiveClickHandler = () => {
    props.changeFilter("active", props.id)
  }
  const onCompletedClickHandler = () => {
    props.changeFilter("completed", props.id)
  }
  const removeTodolist = () => {
    props.removeTodolist(props.id)
  }
  const changeTodolistTitle = (newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle)
  }
  const addTask = (title: string) => {
    dispatch(addTaskAC(title, props.id));
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
          tasksObj.map(t => {
            const removeHandler = () => dispatch(removeTaskAC(t.id, props.id));
            const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              dispatch(changeTaskStatusAC(props.id, t.id, e.currentTarget.checked));
            }
            const onChangeTitleHandler = (newValue: string) => {
              dispatch(changeTaskTiltleAC(props.id, t.id, newValue));
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

