import types from '../constants/types'

export function saveRequest(data) {
  return {
    type: types.POKEMON_SAVE_REQUEST,
    payload: data
  }
}

export function saveSuccess(data) {
  return {
    type: types.POKEMON_SAVE_SUCCESS,
    payload: data
  }
}

export function saveFailure() {
  return {
    type: types.POKEMON_SAVE_FAILURE
  }
}
