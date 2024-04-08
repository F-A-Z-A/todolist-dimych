import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddCircleOutline} from "@material-ui/icons";

type AddItemFormType = {
  addItem: (title: string) => void
};

export const AddItemForm = React.memo((props: AddItemFormType) => {
  console.log("AddItemForm rendered")
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<null | string>(null);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) setError(null);
    if (e.charCode === 13) addTask();
  }
  const addTask = () => {
    let title = newTaskTitle.trim();
    if (title === "") return setError("Field is required");
    props.addItem(title);
    setNewTaskTitle("");
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
});