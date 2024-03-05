import React, {ChangeEvent, useState} from "react";

type EditableSpanType = {
  title: string
  onChange: (newValue: string) => void
};
export const EditableSpan = (props: EditableSpanType) => {
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState("")
  
  const activateEditMode = () => {
    setEditMode(true)
    setTitle(props.title)
  }
  const activateViewMode = () => {
    setEditMode(false)
    props.onChange(title)
  }
  
  const inputChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  
  return editMode
    ? <input value={title} onChange={inputChangeTitleHandler} onBlur={activateViewMode} autoFocus/>
    : <span onDoubleClick={activateEditMode}>{props.title}</span>;
};