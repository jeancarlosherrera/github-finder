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

  //Get single user
  const getUser = async (login) => {
    setLoading()

    const res = await fetch(
      `${process.env.REACT_APP_GITHUB_URL}/users/${login}`
    )

    if (res.status === 404) {
      window.location = '/notfound'
    } else {
      const data = await res.json()

      dispatch({
        type: 'GET_USER',
        payload: data,
      })
    }
  }

  //Get user repos
  const getRepos = async (login) => {
    setLoading()

    const params = new URLSearchParams({
      sort: 'created',
      per_page: 10,
    })

    const res = await fetch(
      `${process.env.REACT_APP_GITHUB_URL}/users/${login}/repos?${params}`
    )

    const data = await res.json()

    dispatch({
      type: 'GET_REPOS',
      payload: data,
    })
  }

  //Clear search results
  const clearResults = () => {
    dispatch({
      type: 'CLEAR_RESULTS',
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
        selectedUserFromContext: stateFromReducer.selectedUser,
        reposFromContext: stateFromReducer.repos,
        isLoadingFromContext: stateFromReducer.isLoading,
        dispatch,
        getUser,
        getRepos,
        clearResults,
      }}
    >
      {children}
    </GitHubContext.Provider>
  )
}

export default GitHubContext
