import { ADD_USER, UPDATE_USER } from '../actions/user'

export default (state = {}, action = {}) => {
  switch (action.type) {
    case ADD_USER:
      return {
        id: action.user.id,
        userId: action.user.userId,
        firstName: action.user.firstName,
        lastName: action.user.lastName,
        email: action.user.email,
        password: action.user.password
      }
    case UPDATE_USER:
      if (state.id !== action.user.id) { return state }
      return { ...state, ...action.user}
    default:
      return state
  }
}
