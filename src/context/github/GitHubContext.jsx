import { createContext, useReducer } from 'react'
import githubReducer from './GitHubReducer'

const GitHubContext = createContext()

export const GitHubProvider = ({ children }) => {
  const initialState = {
    users: [],
    isLoading: false,
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  //Get initial users (testing purposes)
  const getUsers = async () => {
    setLoading()

    const res = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`)
    const data = await res.json()

    dispatch({
      type: 'GET_USERS',
      payload: data,
    })
  }

  //Set loading
  const setLoading = () =>
    dispatch({
      type: 'SET_LOADING',
    })

  return (
    <GitHubContext.Provider
      value={{ users: state.users, isLoading: state.isLoading, getUsers }}
    >
      {children}
    </GitHubContext.Provider>
  )
}

export default GitHubContext
