import { createContext, useReducer } from 'react'
import githubReducer from './GitHubReducer'

const GitHubContext = createContext()

export const GitHubProvider = ({ children }) => {
  const initialState = {
    users: [],
    isLoading: false,
  }

  const [stateFromReducer, dispatch] = useReducer(githubReducer, initialState)

  //Get search results
  const searchUsers = async (text) => {
    setLoading()

    const params = new URLSearchParams({
      q: text,
    })

    const res = await fetch(
      `${process.env.REACT_APP_GITHUB_URL}/search/users?${params}`
    )
    const { items } = await res.json()

    dispatch({
      type: 'GET_USERS',
      payload: items,
    })
  }

  //Set loading
  const setLoading = () =>
    dispatch({
      type: 'SET_LOADING',
    })

  return (
    <GitHubContext.Provider
      value={{
        usersFromContext: stateFromReducer.users,
        isLoadingFromContext: stateFromReducer.isLoading,
        searchUsers,
      }}
    >
      {children}
    </GitHubContext.Provider>
  )
}

export default GitHubContext
