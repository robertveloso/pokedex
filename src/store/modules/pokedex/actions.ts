import types from '../constants/types'

export function initRequest() {
  return {
    type: types.POKEDEX_INIT_REQUEST
  }
}

export function initSuccess(results, count) {
  return {
    type: types.POKEDEX_INIT_SUCCESS,
    payload: { results, count }
  }
}

export function initFailure() {
  return {
    type: types.POKEDEX_INIT_FAILURE
  }
}

export function filterRequest(data, input) {
  return {
    type: types.POKEDEX_FILTER_REQUEST,
    payload: { data, input }
  }
}

export function filterSuccess(results, input) {
  return {
    type: types.POKEDEX_FILTER_SUCCESS,
    payload: { results, input }
  }
}

export function filterFailure() {
  return {
    type: types.POKEDEX_FILTER_FAILURE
  }
}
