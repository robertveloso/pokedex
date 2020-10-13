import { AnyAction } from 'redux'
import { HYDRATE } from 'next-redux-wrapper'
import produce, { original } from 'immer'

import types from '../constants/types'

export interface State {
  data: Array<string[]>
  loading: boolean
  offset: number
}

const INITIAL_STATE = {
  data: [],
  offset: 0,
  loading: false
}

export default function favorite(state = INITIAL_STATE, action: AnyAction) {
  return produce(state, draft => {
    switch (action.type) {
      case HYDRATE:
        return draft
      case types.FAVORITE_SAVE_REQUEST: {
        draft.loading = true
        break
      }
      case types.FAVORITE_SAVE_SUCCESS: {
        const data = original(draft)
        const index = data.data.findIndex(f => f.name === action.payload.name)
        if (index !== -1) {
          draft.data.splice(index, 1)
        } else {
          draft.data.push({
            name: action.payload.name,
            url: action.payload.url
          })
        }
        console.log('DRAFT', draft.data)
        draft.loading = false
        break
      }
      case types.FAVORITE_SAVE_FAILURE: {
        draft.loading = false
        break
      }
      case '@favorite/OFFSET': {
        draft.offset = action.payload
        break
      }
      default:
    }
  })
}
