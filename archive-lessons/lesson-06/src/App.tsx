import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type filterValuesType = "all" | "completed" | "active"

type TodolistType = {
  id: string
  title: string
  filter: filterValuesType
}

type TasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {
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
  
  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let task = tasks.find(t => t.id === taskId)
    if (task) {
      task.isDone = isDone
      setTasksObj({...tasksObj});
    }
  }
  
  function changeFilter(value: filterValuesType, todoListId: string) {
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
  
  function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let task = tasks.find(t => t.id === taskId)
    if (task) {
      task.title = newTitle
      setTasksObj({...tasksObj});
    }
  }
  
  function changeTodolistTitle(newTitle: string, todolistId: string) {
    const todolist = todolists.find(tl => tl.id === todolistId)
    if (todolist) {
      todolist.title = newTitle
      setTodoLists([...todolists])
    }
  }
  
  const todolistId1 = v1();
  const todolistId2 = v1();
  
  const [todolists, setTodoLists] = useState<TodolistType[]>([
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"},
  ])
  const [tasksObj, setTasksObj] = useState<TasksStateType>({
    [todolistId1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Redux", isDone: false},
      {id: v1(), title: "Rest API", isDone: false},
    ],
    [todolistId2]: [
      {id: v1(), title: "Book", isDone: false},
      {id: v1(), title: "Milk", isDone: true},
    ],
  })
  
  function addTodolist(title: string) {
    const todolist: TodolistType = {id: v1(), title: title, filter: "all"};
    setTodoLists([todolist, ...todolists])
    setTasksObj({
      ...tasksObj,
      [todolist.id]: []
    })
  }
  
  return (
    <div className="App">
      <AddItemForm addItem={addTodolist}/>
      {
        todolists.map(tl => {
          let tasksForTodoList = tasksObj[tl.id];
          if (tl.filter === "active") {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
          }
          if (tl.filter === "completed") {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
          }
          
          return <TodoList
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForTodoList}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            removeTodolist={removeTodolist}
            changeTaskTitle={changeTaskTitle}
            changeTodolistTitle={changeTodolistTitle}
            filter={tl.filter}
          />
        })
      }
    </div>
  );
}

export default App;
