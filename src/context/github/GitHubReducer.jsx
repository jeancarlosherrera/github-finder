const githubReducer = (state, action) => {
  switch (action.type) {
    case 'GET_USERS':
      return {
        ...state,
        users: action.payload,
        isLoading: false,
      }
    case 'GET_USER_AND_REPOS':
      return {
        ...state,
        selectedUser: action.payload.user,
        repos: action.payload.repos,
        isLoading: false,
      }
    case 'CLEAR_RESULTS':
      return {
        ...state,
        users: [],
      }
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: true,
      }
    default:
      return state
  }
}

export default githubReducer
