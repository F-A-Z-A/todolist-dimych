import {action} from "@storybook/addon-actions"
import {Task} from "../Task";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";
import {v1} from "uuid";

export default {
  title: "Task Component",
  component: Task
}

const changeTaskStatusCallback = action("Status changed")
const changeTaskTitleCallback = action("Title changed")
const removeTaskCallback = action("Task removed")

export const TaskBaseExample = (props: any) => {
  return <>
    <Task
      task={{
        description: "", title: "CSS", status: TaskStatuses.Completed,
        priority: TaskPriorities.Low, startDate: "", deadline: "",
        id: "1", todolistId: "todolistId1", order: 0, addedDate: ""
      }}
      todolistId={"todolistID1"}
      changeTaskStatus={changeTaskStatusCallback}
      changeTaskTitle={changeTaskTitleCallback}
      removeTask={removeTaskCallback}
    />
    <Task
      task={{
        description: "", title: "JS", status: TaskStatuses.New,
        priority: TaskPriorities.Low, startDate: "", deadline: "",
        id: "2", todolistId: "todolistId1", order: 0, addedDate: ""
      }}
      todolistId={"todolistID2"}
      changeTaskStatus={changeTaskStatusCallback}
      changeTaskTitle={changeTaskTitleCallback}
      removeTask={removeTaskCallback}
    />
  </>
}