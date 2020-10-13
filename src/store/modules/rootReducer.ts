import { combineReducers } from 'redux'

// Import reducers
import pokedex from './pokedex/reducer'
import pokemon from './pokemon/reducer'
import favorite from './favorite/reducer'

export default combineReducers({
  pokedex,
  pokemon,
  favorite
})
