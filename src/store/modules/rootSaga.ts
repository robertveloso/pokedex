import { all } from 'redux-saga/effects'

// Import sagas
import pokedex from './pokedex/sagas'
import pokemon from './pokemon/sagas'
import favorite from './favorite/sagas'

export default function* rootSaga() {
  return yield all([pokedex, pokemon, favorite])
}
