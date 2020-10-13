import { takeLatest, call, put, all } from 'redux-saga/effects'

import api from '../../../services/api'

import { saveRequest, saveSuccess, saveFailure } from './actions'

import types from '../constants/types'

export function* savePokemon({ payload }: ReturnType<typeof saveRequest>) {
  try {
    if (payload?.id) {
      yield put(saveSuccess(payload))
    } else {
      const url = new URL(window.location.href)
      const id = url.pathname.split('/').pop()
      const response = yield call(api.get, `/pokemon/${id}`)
      yield put(saveSuccess(response.data))
    }
  } catch (err) {
    yield put(saveFailure())
  }
}

export default all([takeLatest(types.POKEMON_SAVE_REQUEST, savePokemon)])
