import {TasksObjType} from "../App";
import {v1} from "uuid";

export type RemoveTaskActionType = {
  type: 'REMOVE-TASK'
  todoID: string
  taskID: string
}
export type AddTaskActionType = {
  type: 'ADD-TASK'
  title: string
  todoID: string
}
export type ChangeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE'
  todoID: string
  taskID: string
  title: string
}
export type ChangeTaskStatusActionType = {
  type: 'CHANGE-TASK-STATUS'
  todoID: string
  taskID: string
  isDone: boolean
}

export type ActionsTypes =
  RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskTitleActionType
  | ChangeTaskStatusActionType

export const tasksReducer = (state: TasksObjType, action: ActionsTypes): TasksObjType => {
  switch (action.type) {
    case 'REMOVE-TASK':
      return {...state, [action.todoID]: state[action.todoID].filter(t => t.id !== action.taskID)}
    case 'ADD-TASK':
      return {
        ...state,
        [action.todoID]: [
          {id: v1(), title: action.title, isDone: false},
          ...state[action.todoID]
        ]
      }
    case 'CHANGE-TASK-TITLE':
      return {
        ...state,
        [action.todoID]: state[action.todoID].map(
          t => t.id === action.taskID ? {...t, title: action.title} : t
        )
      }
    case 'CHANGE-TASK-STATUS':
      return {
        ...state,
        [action.todoID]: state[action.todoID].map(
          t => t.id === action.taskID ? {...t, isDone: action.isDone} : t
        )
      }
    default:
      throw new Error("I don't understand this type");
  }
}

export const RemoveTaskAC = (todoID: string, taskID: string): RemoveTaskActionType => {
  return {type: "REMOVE-TASK", todoID, taskID}
}
export const AddTodolistAC = (title: string, todoID: string): AddTaskActionType => {
  return {type: "ADD-TASK", title, todoID}
}
export const ChangeTaskTitleAC = (todoID: string, taskID: string, title: string): ChangeTaskTitleActionType => {
  return {type: "CHANGE-TASK-TITLE", todoID, taskID, title}
}
export const ChangeTaskIsDonAC = (todoID: string, taskID: string, isDone: boolean): ChangeTaskStatusActionType => {
  return {type: "CHANGE-TASK-STATUS", todoID, taskID, isDone}
}