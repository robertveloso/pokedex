import { AnyAction } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'
import produce from 'immer'

import types from '../constants/types'

export interface State {
  data: Array<string[]>
  loading: boolean
}

const INITIAL_STATE: State = {
  data: [],
  loading: false
}

export default function auth(state = INITIAL_STATE, action: AnyAction) {
  return produce(state, draft => {
    switch (action.type) {
      case HYDRATE:
        return { ...state, ...action.payload }
      case types.POKEMON_SAVE_REQUEST: {
        draft.loading = true
        break
      }
      case types.POKEMON_SAVE_SUCCESS: {
        draft.data = action.payload
        draft.loading = false
        break
      }
      case types.POKEMON_SAVE_FAILURE: {
        draft.loading = false
        break
      }
      default:
    }
  })
}
