import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type FilterValuesType = "all" | "completed" | "active"
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksObjType = {
  [key: string]: TaskType[]
}

function App() {
  // function for tasks:
  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId]
    tasksObj[todolistId] = tasks.filter(t => t.id !== id);
    // tasksObj[todolistId] = filteredTasks
    setTasksObj({...tasksObj});
  }
  
  function addTask(title: string, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let task = {id: v1(), title: title, isDone: false};
    tasksObj[todolistId] = [task, ...tasks];
    setTasksObj({...tasksObj});
  }
  
  function changeTaskStatus(taskId: string, isDone: boolean, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let task = tasks.find(t => t.id === taskId)
    if (task) {
      task.isDone = isDone
      setTasksObj({...tasksObj});
    }
  }
  
  function changeTaskTitle(taskId: string, newValue: string, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let task = tasks.find(t => t.id === taskId)
    if (task) {
      task.title = newValue
      setTasksObj({...tasksObj});
    }
  }
  
  // function for todolist:
  function changeFilter(value: FilterValuesType, todoListId: string) {
    let todolist = todolists.find(tl => tl.id === todoListId)
    if (todolist) {
      todolist.filter = value;
      setTodoLists([...todolists])
    }
  }
  
  function removeTodolist(todolistId: string) {
    const filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
    setTodoLists(filteredTodolist)
    // удаляется todolist
    
    // так как удалиил todolist, то необходимо удалить и его ветку с tasks
    delete tasksObj[todolistId]
    setTasksObj({...tasksObj})
  }
  
  function changeTodolistTitle(todolistId: string, newTitle: string) {
    const todolist = todolists.find(tl => tl.id === todolistId)
    if (todolist) {
      todolist.title = newTitle
      setTodoLists([...todolists])
    }
  }
  
  function addTodolist(title: string) {
    let todolist: TodolistType = {id: v1(), title: title, filter: "all"};
    setTodoLists([todolist, ...todolists]);
    setTasksObj({
      ...tasksObj,
      [todolist.id]: []
    })
  }
  
  const todolistId1 = v1();
  const todolistId2 = v1();
  
  const [todolists, setTodoLists] = useState<TodolistType[]>([
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"},
  ])
  const [tasksObj, setTasksObj] = useState<TasksObjType>({
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
              if (tl.filter === "active") {
                tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
              }
              if (tl.filter === "completed") {
                tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
              }
              
              return <Grid item>
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

export default App;
