import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanType = {
  title: string
  onChange: (newValue: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanType) => {
  console.log("EditableSpan rendered")
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  
  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title)
  }
  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  }
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  
  return editMode
    ? <TextField variant="standard"
                 value={title}
                 onChange={onChangeTitleHandler}
                 autoFocus
                 onBlur={activateViewMode}/>
    : <span onDoubleClick={activateEditMode}>{props.title}</span>;
})