import React, {ChangeEvent, useCallback} from "react";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTiltleAC, removeTaskAC} from "./state/tasks-reducer";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./TodoListWithRedux";

type TaskPropsType = {
  task: TaskType
  todoID: string
}
export const Task = React.memo((props: TaskPropsType) => {
  const dispatch = useDispatch();
  const removeHandler = () => dispatch(removeTaskAC(props.task.id, props.todoID));
  const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeTaskStatusAC(props.todoID, props.task.id, e.currentTarget.checked));
  }, [props.todoID, props.task.id])
  const onChangeTitleHandler = useCallback((newValue: string) => {
    dispatch(changeTaskTiltleAC(props.todoID, props.task.id, newValue));
  }, [props.todoID, props.task.id])
  return (
    <li key={props.task.id} className={props.task.isDone ? "is-done" : undefined}>
      <Checkbox
        color={"secondary"}
        checked={props.task.isDone}
        onChange={onChangeStatusHandler}
      />
      <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
      {/*<button onClick={removeHandler}>x</button>*/}
      <IconButton onClick={removeHandler} size={"small"}>
        <Delete/>
      </IconButton>
    </li>
  )
})