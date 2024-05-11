import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {Dispatch} from "redux";

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(tl => tl.id !== action.id)
    case 'ADD-TODOLIST':
      return [{...action.todolist, filter: "all"}, ...state]
    case 'CHANGE-TODOLIST-TITLE':
      return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
    case 'CHANGE-TODOLIST-FILTER':
      return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
    case 'SET-TODOLIST':
      return action.todolists.map(tl => ({...tl, filter: "all"}))
    default:
      return state;
  }
}

// ACTION CREATOR
export const removeTodolistAC = (id: string) =>
  ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistAC = (todolist: TodolistType) =>
  ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string) =>
  ({type: 'CHANGE-TODOLIST-TITLE', id, title} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
  ({type: 'CHANGE-TODOLIST-FILTER', id, filter} as const)
export const setTodolistAC = (todolists: TodolistType[]) =>
  ({type: 'SET-TODOLIST', todolists} as const)

// THUNK CREATOR
export const fetchTodolistsTC = () => (dispatch: Dispatch<ActionsType>) => {
  todolistsAPI.getTodolists()
    .then(res => {
      dispatch(setTodolistAC(res.data))
    })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
  todolistsAPI.deleteTodolist(todolistId)
    .then(res => {
      dispatch(removeTodolistAC(todolistId))
    })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
  todolistsAPI.createTodolist(title)
    .then(res => {
      dispatch(addTodolistAC(res.data.data.item))
    })
}
export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
  todolistsAPI.updateTodolist(id, title)
    .then(res => {
      dispatch(changeTodolistTitleAC(id, title))
    })
}

// TYPES
export type SetTodolistActionType = ReturnType<typeof setTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
}
type ActionsType =
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>
  | SetTodolistActionType
  | AddTodolistActionType
  | RemoveTodolistActionType

