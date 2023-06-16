import { createContext, useReducer } from 'react'
import githubReducer from './GitHubReducer'

const GitHubContext = createContext()

export const GitHubProvider = ({ children }) => {
  const initialState = {
    users: [],
    isLoading: true,
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  const getUsers = async () => {
    const res = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`)
    const data = await res.json()

    dispatch({
      type: 'GET_USERS',
      payload: data,
    })
  }

  return (
    <GitHubContext.Provider
      value={{ users: state.users, isLoading: state.isLoading, getUsers }}
    >
      {children}
    </GitHubContext.Provider>
  )
}

export default GitHubContext
