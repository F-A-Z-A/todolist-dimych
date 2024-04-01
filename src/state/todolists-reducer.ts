import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
  type: 'REMOVE_TODOLIST'
  id: string
}
export type AddTodolistActionType = {
  type: 'ADD_TODOLIST'
  title: string
  todoId: string
}
export type ChangeTodolistTitleActionType = {
  type: 'CHANGE_TODOLIST_TITLE'
  id: string
  title: string
}
export type ChangeTodolistFilterActionType = {
  type: 'CHANGE_TODOLIST_FILTER'
  id: string
  filter: FilterValuesType
}

export type ActionsTypes =
  RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType

export const todolistId1 = v1();
export const todolistId2 = v1();

const initialState: TodolistType[] = [
  {id: todolistId1, title: "What to learn", filter: "all"},
  {id: todolistId2, title: "What to buy", filter: "all"},
]

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsTypes): TodolistType[] => {
  switch (action.type) {
    case 'REMOVE_TODOLIST':
      return state.filter(tl => tl.id !== action.id);
    case 'ADD_TODOLIST':
      return [{id: action.todoId, title: action.title, filter: "all"}, ...state];
    case 'CHANGE_TODOLIST_TITLE':
      return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl);
    case 'CHANGE_TODOLIST_FILTER':
      return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl);
    default:
      return state;
  }
}

export const removeTodolistAC = (id: string): RemoveTodolistActionType => {
  return {type: 'REMOVE_TODOLIST', id}
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
  return {type: 'ADD_TODOLIST', title, todoId: v1()}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
  return {type: 'CHANGE_TODOLIST_TITLE', id, title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
  return {type: 'CHANGE_TODOLIST_FILTER', id, filter}
}