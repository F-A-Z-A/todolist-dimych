import axios from "axios";

const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": "f0b9fe99-d8f6-4e01-8639-245bf86c46b3"
  }
}

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  ...settings
})

export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}
type ResponseType<D = {}> = {
  resultCode: number
  messages: string[]
  data: D
}

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4
}

export type TaskType = {
  description: string
  title: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
  id: string
  todolistId: string
  order: number
  addedDate: string
}
type UpdateTaskType = {
  title: string
  description: string
  status: number
  priority: number
  startDate: string
  deadline: string
}
type GetTasksResponseType = {
  error: string | null
  totalCount: number
  items: TaskType[]
}

export const todolistsApi = {
  getTodolists: () => {
    return instance
      .get<TodolistType[]>('todo-lists')
  },
  createTodolist: (title: string) => {
    return instance
      .post<ResponseType<{ item: TodolistType }>>('todo-lists', {title})
  },
  deleteTodolist: (id: string) => {
    return instance
      .delete<ResponseType>(`todo-lists/${id}`)
  },
  updateTodolist: (id: string, title: string) => {
    return instance
      .put<ResponseType>(`todo-lists/${id}`, {title})
  },
  getTasks: (todolistId: string) => {
    return instance
      .get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
  },
  createTask: (todolistId: string, title: string) => {
    return instance
      .post<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/`, {title})
  },
  deleteTask: (todolistId: string, taskId: string) => {
    console.log("todo: " + todolistId, "task: " + taskId)
    return instance
      .delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask: (todolistId: string, taskId: string, model: UpdateTaskType) => {
    return instance
      .put<UpdateTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
  }
}