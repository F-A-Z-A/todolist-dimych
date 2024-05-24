import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {ResponseType, TaskType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppActionsType} from "../app/store";

export const handleSeverAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<AppActionsType>) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC(data.messages[0]))
  } else {
    dispatch(setAppErrorAC("some error occurred"))
  }
  dispatch(setAppStatusAC("failed"))
}

export const handleSeverNetworkError = (error: { message: string }, dispatch: Dispatch<AppActionsType>) => {
  dispatch(setAppErrorAC(error.message ? error.message : "Some error occurred"))
  dispatch(setAppStatusAC("failed"))
}