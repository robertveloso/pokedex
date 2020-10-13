import * as PokedexActions from '../../store/modules/pokedex/actions'
import * as PokemonActions from '../../store/modules/pokemon/actions'
import * as FavoriteActions from '../../store/modules/favorite/actions'

import types from '../../store/modules/constants/types'

describe('Pokedex Init', () => {
  it('should fetch data from pokeapi to storage', () => {
    const expectedAction = {
      type: types.POKEDEX_INIT_REQUEST
    }
    expect(PokedexActions.initRequest()).toEqual(expectedAction)
  })
})

describe('Pokemon Fetch', () => {
  it('should fetch pokemon', () => {
    const payload = {
      id: 1
    }
    const expectedAction = {
      type: types.POKEMON_SAVE_REQUEST,
      payload
    }
    expect(PokemonActions.saveRequest(payload)).toEqual(expectedAction)
  })
})

describe('Pokemon Favorite', () => {
  it('should store pokemon to favorites', () => {
    const payload = {
      id: 1,
      name: 'bulbasaur'
    }
    const expectedAction = {
      type: types.FAVORITE_SAVE_REQUEST,
      payload
    }
    expect(FavoriteActions.saveRequest(payload.name, payload.id)).toEqual(
      expectedAction
    )
  })
})
