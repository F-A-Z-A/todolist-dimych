import React from 'react'
import {Provider} from "react-redux";
import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from '../../state/tasks-reducer';
import {todolistsReducer} from "../../state/todolists-reducer";
import {v1} from "uuid";
import {AppRootStateType} from "../../state/store";
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer
})

const initialGlobalState: AppRootStateType = {
  todolists: [
    {id: "todolistId1", title: "What to learn", filter: "all", addedDate: "", order: 0},
    {id: "todolistId2", title: "What to buy", filter: "all", addedDate: "", order: 0}
  ],
  tasks: {
    ["todolistId1"]: [
      {
        description: "", title: "HTML&CSS", status: TaskStatuses.Completed,
        priority: TaskPriorities.Low, startDate: "", deadline: "",
        id: v1(), todolistId: "todolistId1", order: 0, addedDate: ""
      },
      {
        description: "", title: "JS", status: TaskStatuses.Completed,
        priority: TaskPriorities.Low, startDate: "", deadline: "",
        id: v1(), todolistId: "todolistId1", order: 0, addedDate: ""
      }
    ],
    ["todolistId2"]: [
      {
        description: "", title: "Milk", status: TaskStatuses.Completed,
        priority: TaskPriorities.Low, startDate: "", deadline: "",
        id: v1(), todolistId: "todolistId2", order: 0, addedDate: ""
      },
      {
        description: "", title: "React Book", status: TaskStatuses.Completed,
        priority: TaskPriorities.Low, startDate: "", deadline: "",
        id: v1(), todolistId: "todolistId2", order: 0, addedDate: ""
      }
    ]
  }
};

// export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType);
export const storyBookStore = legacy_createStore(rootReducer);
// export const storyBookStore = createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>
}


// import {Provider} from "react-redux";
// import {store} from "../state/store";
//
// export const ReduxStoreProviderDecorator = (story: any) => {
//   return <Provider store={store}> {story()} </Provider>
// }