import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddCircleOutline} from "@material-ui/icons";

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
      <TextField
        variant="outlined"
        label="Type value"
        value={newTaskTitle}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        error={!!error}
        helperText={error}
      />
      <IconButton
        onClick={addTask}
        // variant={"contained"}
        color={"primary"}
      >
        <AddCircleOutline/>
      </IconButton>
    </div>
  );
};