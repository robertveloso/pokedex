import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Head from 'next/head'

import { useTheme } from 'styled-components'

import { MdArrowForward, MdArrowBack, MdSearch } from 'react-icons/md'

import api from '../../services/api'

import { Card } from '../../components'
import { Container } from '../../styles/pages/Home'

import * as A from '../../store/modules/pokedex/actions'
import {
  storeFilter,
  storeFavOffset
} from '../../store/modules/actions/filterAction'

const Favorites: React.FC = () => {
  const dispatch = useDispatch()
  const { filter, filter_term, count } = useSelector(state => state.pokedex)
  const { data, offset } = useSelector(state => state.favorite)

  const [pokemons, setPokemons] = useState([])
  const [input, setInput] = useState(filter_term)
  const [counter, setCounter] = useState(count)
  const theme = useTheme()

  useEffect(() => {
    if (document.body.style.background !== theme.colors.background)
      document.body.style.background = theme.colors.background
    if (pokemons.length === 0) dispatch(storeFavOffset(0))
  }, [])

  useEffect(() => {
    async function getPokemon() {
      pokemons.length > 0 && setPokemons([])
      const array = input.length > 0 || filter_term.length > 0 ? filter : data
      setCounter(array.length)

      for (let index = offset; index < array.length; index++) {
        if (index > offset + 8) break
        try {
          const id = array[index]?.url.slice(0, -1).split('/').pop()
          await api.get(array[index]?.url).then(response => {
            const res = {
              id,
              name: array[index]?.name,
              image: `/assets/official-artwork/${id}.png`,
              types: response.data.types,
              rest: response.data
            }
            setPokemons(pokemons => [...pokemons, res])
          })
        } catch (err) {
          console.log(err)
        }
      }
    }
    data?.length > 0 && getPokemon()
  }, [data, offset, filter, filter_term])

  const handleInputSearch = async e => {
    const input = e.target.value
    setInput(input)
    dispatch(storeFilter(input))
    dispatch(storeFavOffset(0))
    if (e.target.value.length > 3) {
      dispatch(A.filterRequest(data, input))
    }
    setPokemons([])
  }

  return (
    <Container>
      <Head>
        <title>Pokedex - Favoritos</title>
      </Head>

      <div>
        <MdSearch size={36} />
        <input
          value={input}
          onChange={handleInputSearch}
          placeholder="Which Pokémon you are looking for?"
        />
      </div>
      <br />
      <br />
      <section>
        {pokemons.length > 0 ? (
          pokemons.map(pokemon => <Card key={pokemon.id} data={pokemon} />)
        ) : (
          <strong>Nenhum pokemon encontrado :</strong>
        )}
      </section>

      {pokemons.length > 0 && (
        <section>
          <button
            onClick={() => {
              offset > 0 && dispatch(storeFavOffset(offset - 9))
            }}
          >
            <MdArrowBack size={36} color={theme.colors.primary} />
          </button>
          <button
            onClick={() => {
              offset + 9 < counter && dispatch(storeFavOffset(offset + 9))
            }}
          >
            <MdArrowForward size={36} color={theme.colors.primary} />
          </button>
        </section>
      )}
    </Container>
  )
}

export default Favorites
