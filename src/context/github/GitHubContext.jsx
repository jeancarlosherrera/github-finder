import { createContext, useReducer } from 'react'
import githubReducer from './GitHubReducer'

const GitHubContext = createContext()

export const GitHubProvider = ({ children }) => {
  const initialState = {
    users: [],
    selectedUser: {},
    isLoading: false,
    repos: [],
  }

  const [stateFromReducer, dispatch] = useReducer(githubReducer, initialState)

  return (
    <GitHubContext.Provider
      value={{
        usersFromContext: stateFromReducer.users,
        selectedUserFromContext: stateFromReducer.selectedUser,
        reposFromContext: stateFromReducer.repos,
        isLoadingFromContext: stateFromReducer.isLoading,
        dispatch,
      }}
    >
      {children}
    </GitHubContext.Provider>
  )
}

export default GitHubContext
