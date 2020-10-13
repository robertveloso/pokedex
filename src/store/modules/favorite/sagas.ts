import { takeLatest, put, all } from 'redux-saga/effects'

import { saveSuccess, saveFailure } from './actions'

import types from '../constants/types'

export function* saveFavorite({ payload }) {
  try {
    const data = {
      name: payload.name,
      url: `https://pokeapi.co/api/v2/pokemon/${payload.id}/`
    }
    yield put(saveSuccess(data))
  } catch (err) {
    yield put(saveFailure())
  }
}

export default all([takeLatest(types.FAVORITE_SAVE_REQUEST, saveFavorite)])
