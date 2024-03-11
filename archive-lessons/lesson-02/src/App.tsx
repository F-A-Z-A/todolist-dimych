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
  
  console.log(tasks)
  
  let [filter, setFilter] = useState<filterValuesType>("all");
  
  function removeTask(id: string) {
    let filteredTasks = tasks.filter(t => t.id !== id);
    setTasks(filteredTasks);
  }
  
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
      />
    </div>
  );
}

export default App;
