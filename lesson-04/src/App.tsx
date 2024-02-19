import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";

export type filterValuesType = "all" | "completed" | "active"

function App() {
  let [tasks, setTasks] = useState<Array<TaskType>>([
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "ReactJS", isDone: false},
    {id: v1(), title: "Redux", isDone: false},
    {id: v1(), title: "Rest API", isDone: false},
  ])
  
  // console.log(tasks)
  
  function removeTask(id: string) {
    let filteredTasks = tasks.filter(t => t.id !== id);
    setTasks(filteredTasks);
  }
  
  function addTask(title: string) {
    let newTask = {id: v1(), title: title, isDone: false};
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks)
  }
  
  function changeStatus(taskId: string, isDone: boolean) {
    let task = tasks.find(t => t.id === taskId);
    // ищем элемент по taskId
    if (task) {
      task.isDone = isDone
      // поменяли значение isDone в найденом элементе
    }
    // для отрисовки нового массива
    setTasks([...tasks])
  }
  
  let [filter, setFilter] = useState<filterValuesType>("all");
  
  function changeFilter(value: filterValuesType) {
    setFilter(value);
  }
  
  let tasksForTodoList = tasks;
  if (filter === "completed") {
    tasksForTodoList = tasks.filter(t => t.isDone === true)
  }
  if (filter === "active") {
    tasksForTodoList = tasks.filter(t => t.isDone === false)
  }
  
  return (
    <div className="App">
      <TodoList
        title={'What to learn'}
        tasks={tasksForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeTaskStatus={changeStatus}
        filter={filter}
      />
    </div>
  );
}

export default App;
