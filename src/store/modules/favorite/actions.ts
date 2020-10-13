import types from '../constants/types'

export function saveRequest(name, id) {
  return {
    type: types.FAVORITE_SAVE_REQUEST,
    payload: { name, id }
  }
}

export function saveSuccess(data) {
  return {
    type: types.FAVORITE_SAVE_SUCCESS,
    payload: data
  }
}

export function saveFailure() {
  return {
    type: types.FAVORITE_SAVE_FAILURE
  }
}
