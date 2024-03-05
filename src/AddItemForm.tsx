import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormType = {
  addItem: (title: string) => void
};

export const AddItemForm = (props: AddItemFormType) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<null | string>(null);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.charCode === 13) {
      addTask()
    }
  }
  const addTask = () => {
    if (newTaskTitle.trim() === "") return setError("Field is required")
    props.addItem(newTaskTitle.trim())
    setNewTaskTitle("")
  }
  return (
    <div>
      <input value={newTaskTitle}
             onChange={onChangeHandler}
             onKeyPress={onKeyPressHandler}
             className={error ? "error" : undefined}
      />
      <button onClick={addTask}>+</button>
      {error && <div className={"error-message"}>{error}</div>}
    </div>
  );
};