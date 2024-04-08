import React from 'react';
import './App.css';
import {TaskType} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodoListWithRedux} from "./TodoListWithRedux";

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
              return <Grid item key={tl.id}>
                <Paper style={{padding: "10px"}} elevation={3}>
                  <TodoListWithRedux
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    changeFilter={changeFilter}
                    removeTodolist={removeTodolist}
                    changeTodolistTitle={changeTodolistTitle}
                    filter={tl.filter}
                  />
                  
                  {/*<TodoList*/}
                  {/*  key={tl.id}*/}
                  {/*  id={tl.id}*/}
                  {/*  title={tl.title}*/}
                  {/*  tasks={tasksForTodoList}*/}
                  {/*  removeTask={removeTask}*/}
                  {/*  changeFilter={changeFilter}*/}
                  {/*  addTask={addTask}*/}
                  {/*  changeTaskStatus={changeTaskStatus}*/}
                  {/*  changeTaskTitle={changeTaskTitle}*/}
                  {/*  removeTodolist={removeTodolist}*/}
                  {/*  changeTodolistTitle={changeTodolistTitle}*/}
                  {/*  filter={tl.filter}*/}
                  {/*/>*/}
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
