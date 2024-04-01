import {TasksObjType, TodolistType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, todolistId1, todolistId2} from "./todolists-reducer";

export type RemoveTaskActionType = {
  type: 'REMOVE_TASK'
  taskID: string
  todoID: string
}
export type AddTaskActionType = {
  type: 'ADD_TASK'
  title: string
  todoID: string
}
export type ChangeTaskStatusActionType = {
  type: 'CHANGE_TASK_STATUS'
  todoID: string
  taskID: string
  taskStatus: boolean
}
export type ChangeTaskTitleActionType = {
  type: 'CHANGE_TASK_TITLE'
  todoID: string
  taskID: string
  newTaskTitle: string
}

export type ActionsTypes =
  RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType

const initialState: TasksObjType = {
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
}

export const tasksReducer = (state: TasksObjType = initialState, action: ActionsTypes): TasksObjType => {
  switch (action.type) {
    case "REMOVE_TASK": {
      return {
        ...state,
        [action.todoID]: state[action.todoID].filter(t => t.id !== action.taskID)
      }
    }
    case "ADD_TASK": {
      return {
        ...state,
        [action.todoID]: [
          {id: v1(), title: action.title, isDone: false},
          ...state[action.todoID]
        ]
      };
    }
    case "CHANGE_TASK_STATUS": {
      return {
        ...state,
        [action.todoID]: [
          ...state[action.todoID].map(t => t.id === action.taskID ? {...t, isDone: action.taskStatus} : t)
        ]
      };
    }
    case "CHANGE_TASK_TITLE": {
      return {
        ...state,
        [action.todoID]: [
          ...state[action.todoID].map(
            t => t.id === action.taskID ? {...t, title: action.newTaskTitle} : t
          )
        ]
      };
    }
    case "ADD_TODOLIST":
      return {
        ...state,
        [action.todoId]: []
      }
    case 'REMOVE_TODOLIST':
      const stateCopy = {...state};
      delete stateCopy[action.id];
      return stateCopy;
    default:
      return state;
  }
}

export const removeTaskAC = (taskID: string, todoID: string): RemoveTaskActionType => {
  return {type: "REMOVE_TASK", taskID, todoID}
}

export const addTaskAC = (title: string, todoID: string): AddTaskActionType => {
  return {type: "ADD_TASK", title, todoID}
}

export const changeTaskStatusAC = (todoID: string, taskID: string, taskStatus: boolean): ChangeTaskStatusActionType => {
  return {type: "CHANGE_TASK_STATUS", todoID, taskID, taskStatus}
}

export const changeTaskTiltleAC = (todoID: string, taskID: string, newTaskTitle: string): ChangeTaskTitleActionType => {
  return {type: "CHANGE_TASK_TITLE", todoID, taskID, newTaskTitle}
}
