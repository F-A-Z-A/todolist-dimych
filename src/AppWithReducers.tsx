import React, {useReducer} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer
} from "./state/todolists-reducer";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTiltleAC,
  removeTaskAC,
  tasksReducer
} from "./state/tasks-reducer";

export type FilterValuesType = "all" | "completed" | "active"
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksObjType = {
  [key: string]: TaskType[]
}

function AppWithReducers() {
  
  // ------- function for tasks:
  function removeTask(id: string, todolistId: string) {
    dispatchTasksReducer(removeTaskAC(id, todolistId));
  }
  
  function addTask(title: string, todolistId: string) {
    dispatchTasksReducer(addTaskAC(title, todolistId));
  }
  
  function changeTaskStatus(taskId: string, isDone: boolean, todolistId: string) {
    dispatchTasksReducer(changeTaskStatusAC(todolistId, taskId, isDone));
  }
  
  function changeTaskTitle(taskId: string, newValue: string, todolistId: string) {
    dispatchTasksReducer(changeTaskTiltleAC(todolistId, taskId, newValue));
  }
  
  // ------- function for todolist:
  function changeFilter(value: FilterValuesType, todoListId: string) {
    dispatchTodolistsReducer(changeTodolistFilterAC(todoListId, value));
  }
  
  function removeTodolist(todolistId: string) {
    const action = removeTodolistAC(todolistId);
    dispatchTodolistsReducer(action);
    dispatchTasksReducer(action);
  }
  
  function changeTodolistTitle(todolistId: string, newTitle: string) {
    dispatchTodolistsReducer(changeTodolistTitleAC(todolistId, newTitle));
  }
  
  function addTodolist(title: string) {
    const action = addTodolistAC(title);
    dispatchTodolistsReducer(action);
    dispatchTasksReducer(action);
    
    // dispatchTodolistsReducer(addTodolistAC(title));
    // dispatchTasksReducer(addTodolistAC(title));
  }
  
  const todolistId1 = v1();
  const todolistId2 = v1();
  
  const [todolists, dispatchTodolistsReducer] = useReducer(todolistsReducer, [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"},
  ])
  const [tasksObj, dispatchTasksReducer] = useReducer(tasksReducer, {
    [todolistId1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: false},
      {id: v1(), title: "ReactJS", isDone: false},
      // {id: v1(), title: "Redux", isDone: false},
      // {id: v1(), title: "Rest API", isDone: false},
    ],
    [todolistId2]: [
      {id: v1(), title: "Book", isDone: false},
      {id: v1(), title: "Milk", isDone: true},
    ],
  })
  
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

export default AppWithReducers;
