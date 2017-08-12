import v4 from 'uuid/v4'
export const ADD_USER = 'ADD_USER'
export const UPDATE_USER = 'UPDATE_USER'

export const addUser = ( user) => {
  return {
    type: 'ADD_USER',
    user: {...user, id: v4() }
  }
}