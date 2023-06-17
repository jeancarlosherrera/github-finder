import { createContext, useReducer } from 'react'
import alertReducer from './AlertReducer'

const AlertContext = createContext()

export const AlertProvider = ({ children }) => {
  const initialState = null

  const [stateFromReducer, dispatch] = useReducer(alertReducer, initialState)

  //Set alert
  const setAlert = (alertText, alertType) => {
    dispatch({
      type: 'SET_ALERT',
      payload: { alertText, alertType },
    })
    setTimeout(
      () =>
        dispatch({
          type: 'REMOVE_ALERT',
        }),
      3000
    )
  }

  return (
    <AlertContext.Provider
      value={{ alertFromContext: stateFromReducer, setAlert }}
    >
      {children}
    </AlertContext.Provider>
  )
}

export default AlertContext
