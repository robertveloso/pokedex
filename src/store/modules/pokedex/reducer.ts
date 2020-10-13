import { AnyAction } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'
import produce from 'immer'

import types from '../constants/types'

export interface State {
  data: Array<string[]>
  filter: Array<string[]>
  filter_term: string
  offset: number
  count: number
  loading: boolean
}

const INITIAL_STATE: State = {
  // previous: null
  // next: null
  data: [],
  filter: [],
  filter_term: '',
  offset: 0,
  count: 0,
  loading: false
}

export default function auth(state = INITIAL_STATE, action: AnyAction) {
  return produce(state, draft => {
    switch (action.type) {
      case HYDRATE:
        // return { ...state, ...action.payload }
        return draft
      case types.POKEDEX_INIT_REQUEST: {
        draft.loading = true
        break
      }
      case types.POKEDEX_INIT_SUCCESS: {
        draft.count = action.payload.count
        draft.data = action.payload.results
        draft.loading = false
        break
      }
      case types.POKEDEX_INIT_FAILURE: {
        draft.loading = false
        break
      }

      case types.POKEDEX_INIT_REQUEST: {
        draft.loading = true
        break
      }
      case '@pokedex/FILTER_REQUEST': {
        // draft.loading = true
        break
      }
      case '@pokedex/FILTER_SUCCESS': {
        draft.filter = action.payload.results
        draft.filter_term = action.payload.input
      }
      case '@pokedex/FILTER_FAILURE': {
        draft.loading = false
        break
      }
      case '@pokedex/FILTER_TERM': {
        draft.filter_term = action.payload
        break
      }
      case '@pokedex/OFFSET': {
        draft.offset = action.payload
        break
      }
      default:
    }
  })
}
