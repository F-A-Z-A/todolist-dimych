import {v1} from "uuid";
import {TasksObjType} from "../App";
import {AddTodolistAC, ChangeTaskIsDonAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from "./tasks-reducer";

let startState: TasksObjType = {};
let todolistId1 = "";
let todolistId2 = "";
beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()
  startState = {
    [todolistId1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: false},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Redux", isDone: false},
      {id: v1(), title: "Rest API", isDone: false},
    ],
    [todolistId2]: [
      {id: v1(), title: "Book", isDone: false},
      {id: v1(), title: "Milk", isDone: true},
    ],
  }
})

test('correct task should be removed', () => {
  // const endState = tasksReducer(startState, {
  //   type: "REMOVE-TASK",
  //   todoID: todolistId1,
  //   taskID: startState[todolistId1][2].id
  // })
  const endState = tasksReducer(startState, RemoveTaskAC(todolistId1, startState[todolistId1][2].id))
  
  expect(endState[todolistId1].length).toBe(4)
  expect(endState[todolistId1][2].title).toBe("Redux")
})

test('correct task should be added', () => {
  let newTaskTitle = 'New Task'
  // const endState = tasksReducer(startState, {
  //   type: 'ADD-TASK',
  //   title: newTaskTitle,
  //   todoID: todolistId2
  // })
  const endState = tasksReducer(startState, AddTodolistAC(newTaskTitle, todolistId2))
  
  expect(endState[todolistId2].length).toBe(3)
  expect(endState[todolistId2][0].title).toBe(newTaskTitle)
})

test('correct todolist should change its name', () => {
  let newTaskTitle = 'New Task Title'
  
  // const action = {
  //   type: 'CHANGE-TASK-TITLE' as const,
  //   todoID: todolistId1,
  //   taskID: startState[todolistId1][3].id,
  //   title: newTaskTitle
  // }
  // const endState = tasksReducer(startState, action)
  const action = ChangeTaskTitleAC(
    todolistId1,
    startState[todolistId1][3].id,
    newTaskTitle
  );
  const endState = tasksReducer(startState, action)
  
  expect(startState[todolistId1][3].title).toBe("Redux")
  expect(endState[todolistId1][3].title).toBe(newTaskTitle)
})

test('correct filter of todolist should be changed', () => {
  let newValue: boolean = true
  
  // const action = {
  //   type: 'CHANGE-TASK-STATUS' as const,
  //   todoID: todolistId1,
  //   taskID: startState[todolistId1][3].id,
  //   isDone: newValue
  // }
  // const endState = tasksReducer(startState, action)
  const action = ChangeTaskIsDonAC(
    todolistId1,
    startState[todolistId1][3].id,
    newValue
  )
  const endState = tasksReducer(startState, action)
  
  expect(startState[todolistId1][3].isDone).toBe(false)
  expect(endState[todolistId1][3].isDone).toBe(newValue)
})
