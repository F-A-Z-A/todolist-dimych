import {action} from "@storybook/addon-actions"
import {Task} from "../Task";

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
      task={{id: "1", isDone: true, title: "CSS"}}
      todolistId={"todolistID1"}
      changeTaskStatus={changeTaskStatusCallback}
      changeTaskTitle={changeTaskTitleCallback}
      removeTask={removeTaskCallback}
    />
    <Task
      task={{id: "2", isDone: false, title: "JS"}}
      todolistId={"todolistID2"}
      changeTaskStatus={changeTaskStatusCallback}
      changeTaskTitle={changeTaskTitleCallback}
      removeTask={removeTaskCallback}
    />
  </>
}