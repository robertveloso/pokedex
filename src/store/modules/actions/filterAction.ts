export const storeFilter = input => async dispatch => {
  dispatch({
    type: '@pokedex/FILTER_TERM',
    payload: input
  })
}

export const storeOffset = offset => async dispatch => {
  dispatch({
    type: '@pokedex/OFFSET',
    payload: offset
  })
}

export const storeFavOffset = offset => async dispatch => {
  dispatch({
    type: '@favorite/OFFSET',
    payload: offset
  })
}
