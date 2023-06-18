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

    const res = await fetch(
      `${process.env.REACT_APP_GITHUB_URL}/users/${login}/repos`
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
        searchUsers,
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
