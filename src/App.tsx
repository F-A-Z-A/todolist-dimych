import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolists-api";
import {FilterValuesType, TodolistDomainType} from "./state/todolists-reducer";


export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {
  let todolistId1 = v1();
  let todolistId2 = v1();
  
  let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
    {id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0},
    {id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 0},
  ])
  
  let [tasks, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
      {
        description: "", title: "HTML&CSS", status: TaskStatuses.New,
        priority: TaskPriorities.Low, startDate: "", deadline: "",
        id: v1(), todolistId: todolistId1, order: 0, addedDate: ""
      },
      {
        description: "", title: "JS", status: TaskStatuses.Completed,
        priority: TaskPriorities.Low, startDate: "", deadline: "",
        id: v1(), todolistId: todolistId1, order: 0, addedDate: ""
      }
    ],
    [todolistId2]: [
      {
        description: "", title: "Milk", status: TaskStatuses.New,
        priority: TaskPriorities.Low, startDate: "", deadline: "",
        id: v1(), todolistId: todolistId2, order: 0, addedDate: ""
      },
      {
        description: "", title: "React Book", status: TaskStatuses.Completed,
        priority: TaskPriorities.Low, startDate: "", deadline: "",
        id: v1(), todolistId: todolistId2, order: 0, addedDate: ""
      }
    ]
  });
  
  function removeTask(id: string, todolistId: string) {
    let todolistTasks = tasks[todolistId];
    tasks[todolistId] = todolistTasks.filter(t => t.id != id);
    setTasks({...tasks});
  }
  
  function addTask(title: string, todolistId: string) {
    // let task = {id: v1(), title: title, isDone: false};
    let task = {
      description: "", title: title, status: TaskStatuses.New,
      priority: TaskPriorities.Low, startDate: "", deadline: "",
      id: v1(), todolistId: todolistId, order: 0, addedDate: ""
    };
    let todolistTasks = tasks[todolistId];
    tasks[todolistId] = [task, ...todolistTasks];
    setTasks({...tasks});
  }
  
  // function changeStatus(id: string, status: TaskStatuses, todolistId: string) {
  function changeStatus(id: string, status: TaskStatuses, todolistId: string) {
    let todolistTasks = tasks[todolistId];
    let task = todolistTasks.find(t => t.id === id);
    if (task) {
      // task.isDone = isDone;
      task.status = status;
      setTasks({...tasks});
    }
  }
  
  function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    let todolistTasks = tasks[todolistId];
    let task = todolistTasks.find(t => t.id === id);
    if (task) {
      task.title = newTitle;
      setTasks({...tasks});
    }
  }
  
  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find(tl => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists])
    }
  }
  
  function removeTodolist(id: string) {
    setTodolists(todolists.filter(tl => tl.id != id));
    delete tasks[id];
    setTasks({...tasks});
  }
  
  function changeTodolistTitle(id: string, title: string) {
    const todolist = todolists.find(tl => tl.id === id);
    if (todolist) {
      todolist.title = title;
      setTodolists([...todolists]);
    }
  }
  
  function addTodolist(title: string) {
    let newTodolistId = v1();
    let newTodolist: TodolistDomainType = {
      id: newTodolistId, title: title, filter: 'all', addedDate: "", order: 0
    };
    setTodolists([newTodolist, ...todolists]);
    setTasks({
      ...tasks,
      [newTodolistId]: []
    })
  }
  
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu/>
          </IconButton>
          <Typography variant="h6">
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{padding: "20px"}}>
          <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
          {
            todolists.map(tl => {
              let allTodolistTasks = tasks[tl.id];
              let tasksForTodolist = allTodolistTasks;
              
              if (tl.filter === "active") {
                tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.New);
              }
              if (tl.filter === "completed") {
                tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.Completed);
              }
              
              return <Grid key={tl.id} item>
                <Paper style={{padding: "10px"}}>
                  <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodolistTitle}
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

export default App;
