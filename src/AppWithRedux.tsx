import React from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTiltleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = "all" | "completed" | "active"
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksObjType = {
  [key: string]: TaskType[]
}

function AppWithRedux() {
  const dispatch = useDispatch();
  const todolists = useSelector<AppRootStateType, TodolistType[]>((state => state.todolists));
  const tasksObj = useSelector<AppRootStateType, TasksObjType>((state => state.tasks));
  
  // ------- function for tasks:
  function removeTask(id: string, todolistId: string) {
    dispatch(removeTaskAC(id, todolistId));
  }
  
  function addTask(title: string, todolistId: string) {
    dispatch(addTaskAC(title, todolistId));
  }
  
  function changeTaskStatus(taskId: string, isDone: boolean, todolistId: string) {
    dispatch(changeTaskStatusAC(todolistId, taskId, isDone));
  }
  
  function changeTaskTitle(taskId: string, newValue: string, todolistId: string) {
    dispatch(changeTaskTiltleAC(todolistId, taskId, newValue));
  }
  
  // ------- function for todolist:
  function changeFilter(value: FilterValuesType, todoListId: string) {
    dispatch(changeTodolistFilterAC(todoListId, value));
  }
  
  function removeTodolist(todolistId: string) {
    dispatch(removeTodolistAC(todolistId));
  }
  
  function changeTodolistTitle(todolistId: string, newTitle: string) {
    dispatch(changeTodolistTitleAC(todolistId, newTitle));
  }
  
  function addTodolist(title: string) {
    dispatch(addTodolistAC(title));
  }
  
  return (
    <div className="App">
      
      <AppBar position={"static"}>
        <Toolbar>
          <IconButton edge={"start"} color={"inherit"} aria-label={"menu"}>
            <Menu/>
          </IconButton>
          <Typography variant={"h6"}>
            News
          </Typography>
          <Button color={"inherit"}>Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{padding: "20px"}}>
          <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
          {
            todolists.map(tl => {
              let tasksForTodoList = tasksObj[tl.id];
              // let tasksForTodoList = tasksObj[tl.id] || [];
              if (tl.filter === "active") {
                tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
              }
              if (tl.filter === "completed") {
                tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
              }
              
              return <Grid item key={tl.id}>
                {/*return <Grid item key={tl.id}>*/}
                <Paper style={{padding: "10px"}} elevation={3}>
                  <TodoList
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodoList}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    changeTaskTitle={changeTaskTitle}
                    removeTodolist={removeTodolist}
                    changeTodolistTitle={changeTodolistTitle}
                    filter={tl.filter}
                  />
                </Paper>
              </Grid>
            })
          }
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithRedux;
