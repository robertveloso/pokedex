import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Head from 'next/head'

import { useTheme } from 'styled-components'

import { MdArrowForward, MdArrowBack, MdSearch } from 'react-icons/md'

import api from '../services/api'

import { Card } from '../components'
import { Container } from '../styles/pages/Home'

import * as A from '../store/modules/pokedex/actions'
import { storeFilter, storeOffset } from '../store/modules/actions/filterAction'

const Home: React.FC = () => {
  const dispatch = useDispatch()
  const { data, filter, filter_term, offset, count } = useSelector(
    state => state.pokedex
  )
  const [pokemons, setPokemons] = useState([])
  const [input, setInput] = useState(filter_term)
  const [counter, setCounter] = useState(count)
  const theme = useTheme()
  // const { colors, title } = useContext(ThemeContext)

  useEffect(() => {
    document.body.style.background = ''
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
              // response.data.sprites.other['official-artwork'].front_default
              // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1
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
    dispatch(storeOffset(0))
    if (e.target.value.length > 2) {
      dispatch(A.filterRequest(data, input))
    }
    setPokemons([])
  }

  return (
    <Container>
      <Head>
        <title>Pokedex - Início</title>
      </Head>
      <div>
        <MdSearch size={36} color="#747476" />
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
          <strong>Nenhum pokemon encontrado :(</strong>
        )}
      </section>

      {pokemons.length > 0 && (
        <section>
          <button
            onClick={() => {
              offset > 0 && dispatch(storeOffset(offset - 9))
            }}
          >
            <MdArrowBack size={36} color={theme.colors.primary} />
          </button>
          <button
            onClick={() => {
              offset + 9 < counter && dispatch(storeOffset(offset + 9))
            }}
          >
            <MdArrowForward size={36} color={theme.colors.primary} />
          </button>
        </section>
      )}
    </Container>
  )
}

export default Home
