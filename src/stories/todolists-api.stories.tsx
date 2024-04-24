import React, {useEffect, useState} from 'react'
import {todolistsApi} from "../api/todolists-api";

export default {
  title: 'API',
}

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

//------------------------------------------------------------------------------------

export const GetTasks = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const todolistId = '56d81b4a-a6cf-47e1-9b8f-cf6d9ed30652'
    todolistsApi
      .getTasks(todolistId)
      .then(res => {
        setState(res.data)
      })
  }, []);
  return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const todolistId = '56d81b4a-a6cf-47e1-9b8f-cf6d9ed30652'
    const title = 'TaskTitle'
    todolistsApi
      .createTask(todolistId, title)
      .then(res => {
        setState(res.data)
      })
  }, []);
  return <div>{JSON.stringify(state)}</div>
}

// export const DeleteTasks = () => {
//   const [state, setState] = useState<any>(null);
//   useEffect(() => {
//     const todolistId = '56d81b4a-a6cf-47e1-9b8f-cf6d9ed30652'
//     const taskId = '87ddcb0e-9cd6-4d63-abb8-67410a3cbdf0'
//     todolistsApi
//       .deleteTask(todolistId, taskId)
//       .then(res => {
//         setState(res.data)
//       })
//   }, []);
//
//   return <div>{JSON.stringify(state)}</div>
// }

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

export const UpdateTasksTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = '56d81b4a-a6cf-47e1-9b8f-cf6d9ed30652'
    const taskId = '18ec6a76-1a61-4b16-956d-0772336e27e1'
    const title = 'Update TaskTitle'
    todolistsApi
      .updateTaskTitle(todolistId, taskId, title)
      .then(res => {
        setState(res.data)
      })
  }, [])
  
  return <div>{JSON.stringify(state)}</div>
}