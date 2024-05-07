import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer';
import {TasksStateType} from '../App';
import {addTodolistAC, removeTodolistAC} from './todolists-reducer';
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";
import {v1} from "uuid";

let startState: TasksStateType = {};
beforeEach(() => {
  startState = {
    ["todolistId1"]: [
      {
        description: "", title: "CSS", status: TaskStatuses.Completed,
        priority: TaskPriorities.Low, startDate: "", deadline: "",
        id: "1", todolistId: "todolistId1", order: 0, addedDate: ""
      },
      {
        description: "", title: "JS", status: TaskStatuses.Completed,
        priority: TaskPriorities.Low, startDate: "", deadline: "",
        id: v1(), todolistId: "todolistId1", order: 0, addedDate: ""
      }
    ],
    ["todolistId2"]: [
      {
        description: "", title: "bread", status: TaskStatuses.Completed,
        priority: TaskPriorities.Low, startDate: "", deadline: "",
        id: "1", todolistId: "todolistId2", order: 0, addedDate: ""
      },
      {
        description: "", title: "milk", status: TaskStatuses.Completed,
        priority: TaskPriorities.Low, startDate: "", deadline: "",
        id: "2", todolistId: "todolistId2", order: 0, addedDate: ""
      }
    ]
  };
  // startState = {
  //   "todolistId1": [
  //     {id: "1", title: "CSS", isDone: false},
  //     {id: "2", title: "JS", isDone: true},
  //     {id: "3", title: "React", isDone: false}
  //   ],
  //   "todolistId2": [
  //     {id: "1", title: "bread", isDone: false},
  //     {id: "2", title: "milk", isDone: true},
  //     {id: "3", title: "tea", isDone: false}
  //   ]
  // };
});

test('correct task should be deleted from correct array', () => {
  const action = removeTaskAC("2", "todolistId2");
  
  const endState = tasksReducer(startState, action)
  
  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(2);
  expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy();
});
test('correct task should be added to correct array', () => {
  const action = addTaskAC("juce", "todolistId2");
  
  const endState = tasksReducer(startState, action)
  
  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(4);
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][0].title).toBe("juce");
  expect(endState["todolistId2"][0].status).toBe(false);
});
test('status of specified task should be changed', () => {
  const action = changeTaskStatusAC("2", TaskStatuses.New, "todolistId2");
  
  const endState = tasksReducer(startState, action)
  
  expect(endState["todolistId1"][1].status).toBe(true);
  expect(endState["todolistId2"][1].status).toBe(false);
});
test('title of specified task should be changed', () => {
  const action = changeTaskTitleAC("2", "yogurt", "todolistId2");
  
  const endState = tasksReducer(startState, action)
  
  expect(endState["todolistId1"][1].title).toBe("JS");
  expect(endState["todolistId2"][1].title).toBe("yogurt");
  expect(endState["todolistId2"][0].title).toBe("bread");
});
test('new array should be added when new todolist is added', () => {
  const action = addTodolistAC("new todolist");
  
  const endState = tasksReducer(startState, action)
  
  
  const keys = Object.keys(endState);
  const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
  if (!newKey) {
    throw Error("new key should be added")
  }
  
  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});
test('propertry with todolistId should be deleted', () => {
  const action = removeTodolistAC("todolistId2");
  
  const endState = tasksReducer(startState, action)
  
  const keys = Object.keys(endState);
  
  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).not.toBeDefined();
});
