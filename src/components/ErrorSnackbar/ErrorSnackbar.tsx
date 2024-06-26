import React, {useState} from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, {AlertProps} from '@mui/material/Alert'
import {useAppDispatch, useAppSelector} from "../../app/store";
import {setAppErrorAC} from "../../app/app-reducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export function ErrorSnackbar() {
  // const [open, setOpen] = useState(true)
  const dispatch = useAppDispatch();
  
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(setAppErrorAC(null))
    // setOpen(false)
  }
  
  const error = useAppSelector<string | null>(state => state.app.error)
  
  return (
    <Snackbar open={error !== null} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
        {error}
      </Alert>
    </Snackbar>
  )
}