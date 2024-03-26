import {TasksObjType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

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

export const tasksReducer = (state: TasksObjType, action: ActionsTypes): TasksObjType => {
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
    case "ADD-TODOLIST":
      return {
        ...state,
        [action.todoId]: []
      }
    case 'REMOVE-TODOLIST':
      const stateCopy = {...state};
      delete stateCopy[action.id];
      return stateCopy;
    default:
      throw new Error("I don't understand this type");
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


// ----------- homework (lesson 8) -----------
// import {TasksObjType} from "../App";
// import {v1} from "uuid";
//
// export type RemoveTaskActionType = {
//   type: 'REMOVE-TASK'
//   todoID: string
//   taskID: string
// }
// export type AddTaskActionType = {
//   type: 'ADD-TASK'
//   title: string
//   todoID: string
// }
// export type ChangeTaskTitleActionType = {
//   type: 'CHANGE-TASK-TITLE'
//   todoID: string
//   taskID: string
//   title: string
// }
// export type ChangeTaskStatusActionType = {
//   type: 'CHANGE-TASK-STATUS'
//   todoID: string
//   taskID: string
//   isDone: boolean
// }
//
// export type ActionsTypes =
//   RemoveTaskActionType
//   | AddTaskActionType
//   | ChangeTaskTitleActionType
//   | ChangeTaskStatusActionType
//
// export const tasksReducer = (state: TasksObjType, action: ActionsTypes): TasksObjType => {
//   switch (action.type) {
//     case 'REMOVE-TASK':
//       return {...state, [action.todoID]: state[action.todoID].filter(t => t.id !== action.taskID)}
//     case 'ADD-TASK':
//       return {
//         ...state,
//         [action.todoID]: [
//           {id: v1(), title: action.title, isDone: false},
//           ...state[action.todoID]
//         ]
//       }
//     case 'CHANGE-TASK-TITLE':
//       return {
//         ...state,
//         [action.todoID]: state[action.todoID].map(
//           t => t.id === action.taskID ? {...t, title: action.title} : t
//         )
//       }
//     case 'CHANGE-TASK-STATUS':
//       return {
//         ...state,
//         [action.todoID]: state[action.todoID].map(
//           t => t.id === action.taskID ? {...t, isDone: action.isDone} : t
//         )
//       }
//     default:
//       throw new Error("I don't understand this type");
//   }
// }
//
// export const RemoveTaskAC = (todoID: string, taskID: string): RemoveTaskActionType => {
//   return {type: "REMOVE-TASK", todoID, taskID}
// }
// export const AddTodolistAC = (title: string, todoID: string): AddTaskActionType => {
//   return {type: "ADD-TASK", title, todoID}
// }
// export const ChangeTaskTitleAC = (todoID: string, taskID: string, title: string): ChangeTaskTitleActionType => {
//   return {type: "CHANGE-TASK-TITLE", todoID, taskID, title}
// }
// export const ChangeTaskIsDonAC = (todoID: string, taskID: string, isDone: boolean): ChangeTaskStatusActionType => {
//   return {type: "CHANGE-TASK-STATUS", todoID, taskID, isDone}
// }