import { takeLatest, call, put, all } from 'redux-saga/effects'

import api from '../../../services/api'

import {
  initSuccess,
  initFailure,
  filterSuccess,
  filterFailure
} from './actions'

import all_pokemons from '../../../data/pokemons.json'
import pokemonFilter from '../../../utils/pokemonFilter'

import types from '../constants/types'

export function* initPokedex() {
  try {
    const response = yield call(api.get, '/pokemon?limit=721')

    const { results, count } = response.data

    yield put(initSuccess(results, count))
  } catch (err) {
    yield put(initFailure())
  }
}
export function* filterPokedex({ payload }) {
  try {
    const { data, input } = payload
    const allowed = pokemonFilter(all_pokemons, input)
    const result = data.filter(f => allowed.includes(f.name))

    yield put(filterSuccess(result, input))
  } catch (err) {
    yield put(filterFailure())
  }
}

export default all([
  takeLatest(types.POKEDEX_INIT_REQUEST, initPokedex),
  takeLatest(types.POKEDEX_FILTER_REQUEST, filterPokedex)
])
