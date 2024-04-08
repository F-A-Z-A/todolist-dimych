import React, {useCallback} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC} from "./state/tasks-reducer";
import {Task} from "./Task";

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

export const TodoListWithRedux = React.memo((props: TodoListPropsType) => {
  console.log("TodoList rendered")
  let tasksObj = useSelector<AppRootStateType, TaskType[]>((state => state.tasks[props.id]));
  const dispatch = useDispatch();
  
  if (props.filter === "active") {
    tasksObj = tasksObj.filter(t => !t.isDone)
  }
  if (props.filter === "completed") {
    tasksObj = tasksObj.filter(t => t.isDone)
  }
  
  const onAllClickHandler = useCallback(() => {
    props.changeFilter("all", props.id)
  }, [props.changeFilter, props.id])
  const onActiveClickHandler = useCallback(() => {
    props.changeFilter("active", props.id)
  }, [props.changeFilter, props.id])
  const onCompletedClickHandler = useCallback(() => {
    props.changeFilter("completed", props.id)
  }, [props.changeFilter, props.id])
  const removeTodolist = () => {
    props.removeTodolist(props.id)
  }
  const changeTodolistTitle = useCallback((newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle)
  }, [props.changeTodolistTitle, props.id])
  const addTask = useCallback((title: string) => {
    dispatch(addTaskAC(title, props.id));
  }, [props.id])
  
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
        {tasksObj.map(t => <Task key={t.id} task={t} todoID={props.id}/>)}
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
});

