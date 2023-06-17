const alertReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ALERT':
      return {
        ...state,
        alertText: `${action.payload.alertType}: ${action.payload.alertText}`,
      }
    case 'REMOVE_ALERT':
      return {
        ...state,
        alertText: null,
        alertType: null,
      }
    default:
      return state
  }
}

export default alertReducer
