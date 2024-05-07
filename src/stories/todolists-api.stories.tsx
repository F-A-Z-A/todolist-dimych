import React, {useEffect, useState} from 'react'
import {todolistsApi} from "../api/todolists-api";
import {string} from "prop-types";

export default {
  title: 'API',
}


// --------------- Todolists ---------------

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todolistsApi
      .getTodolists()
      .then(res => {
        setState(res.data)
      })
  }, []);
  return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const title = 'newTodolist'
    todolistsApi
      .createTodolist(title)
      .then(res => {
        setState(res.data)
      })
  }, [])
  
  return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = "56d81b4a-a6cf-47e1-9b8f-cf6d9ed30652"
    todolistsApi
      .deleteTodolist(todolistId)
      .then(res => {
        setState(res.data)
      })
  }, [])
  
  return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = "56d81b4a-a6cf-47e1-9b8f-cf6d9ed30652"
    const title = 'Update Title'
    todolistsApi
      .updateTodolist(todolistId, title)
      .then(res => {
        setState(res.data)
      })
  }, [])
  
  return <div>{JSON.stringify(state)}</div>
}


// --------------- Tasks ---------------

export const GetTasks = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>("");
  
  const getTasks = () => {
    todolistsApi
      .getTasks(todolistId)
      .then(res => {
        setState(res.data)
      })
  }
  
  return <div>{JSON.stringify(state)}
    <div>
      <input
        placeholder={"todolistId"}
        value={todolistId}
        onChange={(e) => setTodolistId(e.currentTarget.value)}/>
      <button onClick={getTasks}>get tasks</button>
    </div>
  </div>
}

export const CreateTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>("");
  const [taskTitle, setTaskTitle] = useState<string>("");
  
  const createTasks = () => {
    todolistsApi
      .createTask(todolistId, taskTitle)
      .then(res => {
        setState(res.data)
      })
  }
  
  return <div>{JSON.stringify(state)}
    <div>
      <input
        placeholder={"todolistId"}
        value={todolistId}
        onChange={(e) => setTodolistId(e.currentTarget.value)}/>
      <input
        placeholder={"task title"}
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.currentTarget.value)}/>
      <button onClick={createTasks}>create task</button>
    </div>
  </div>
}

export const DeleteTasks = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>("");
  const [taskId, setTaskId] = useState<string>("");
  
  const deleteTasks = () => {
    todolistsApi
      .deleteTask(todolistId, taskId)
      .then(res => {
        setState(res.data)
      })
  }
  
  return <div>{JSON.stringify(state)}
    <div>
      <input
        placeholder={"todolistId"}
        value={todolistId}
        onChange={(e) => setTodolistId(e.currentTarget.value)}/>
      <input
        placeholder={"taskId"}
        value={taskId}
        onChange={(e) => setTaskId(e.currentTarget.value)}/>
      <button onClick={deleteTasks}>delete task</button>
    </div>
  </div>
}

export const UpdateTask = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>('');
  const [taskId, setTaskId] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [status, setStatus] = useState<number>(0);
  const [priority, setPriority] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>('');
  const [deadline, setDeadline] = useState<string>('');
  
  const updateTask = () => {
    todolistsApi
      .updateTask(todolistId, taskId, {
        title, description, status, priority, startDate, deadline
      })
      .then(res => {
        setState(res.data)
      })
  }
  
  return <div>{JSON.stringify(state)}
    <div>
      <input placeholder={"todolistId"} value={todolistId}
             onChange={(e) => setTodolistId(e.currentTarget.value)}/>
      <input placeholder={"taskId"} value={taskId}
             onChange={(e) => setTaskId(e.currentTarget.value)}/>
      <input placeholder={"task title"} value={title}
             onChange={(e) => setTitle(e.currentTarget.value)}/>
      <input placeholder={"description"} value={description}
             onChange={(e) => setDescription(e.currentTarget.value)}/>
      <input placeholder={"status"} value={status} type={"number"}
             onChange={(e) => setStatus(+e.currentTarget.value)}/>
      <input placeholder={"priority"} value={priority} type={"number"}
             onChange={(e) => setPriority(+e.currentTarget.value)}/>
      <input placeholder={"startDate"} value={startDate}
             onChange={(e) => setStartDate(e.currentTarget.value)}/>
      <input placeholder={"deadline"} value={deadline}
             onChange={(e) => setDeadline(e.currentTarget.value)}/>
      <div>
        <button onClick={updateTask}>update task</button>
      </div>
    </div>
  </div>
}