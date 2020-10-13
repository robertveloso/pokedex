import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { usePalette } from 'color-thief-react'

import Head from 'next/head'
import { useRouter } from 'next/router'

import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'

import { ThemeConsumer } from 'styled-components'

import { handleBadge } from '../../utils/badges'

import api from '../../services/api'

import * as S from '../../styles/pages/Pokemon'
import * as Actions from '../../store/modules/pokemon/actions'
import * as Favorites from '../../store/modules/favorite/actions'

import getMultipliers from '../../utils/multiplers'
import { rgb, getRGB } from '../../utils/rgb'

const Details: React.FC = () => {
  const dispatch = useDispatch()
  const favorite = useSelector(state => state.favorite.data)
  const pokemon = useSelector(state => state.pokemon.data)
  const router = useRouter()
  const [specie, setSpecie]: any = useState([])
  const [evolution, setEvolution] = useState([])
  const [weakness, setWeakness] = useState([])

  const id = String(pokemon?.id).padStart(3, '0')
  const name =
    String(pokemon?.name).charAt(0).toUpperCase() + pokemon?.name?.slice(1)

  const { data } = usePalette(
    `/assets/official-artwork/${pokemon?.id}.png`,
    4,
    'rgbString',
    { crossOrigin: 'Anonymous', quality: 10 }
  )

  useEffect(() => {
    function getPalette() {
      const bgChannels = getRGB(data[0])

      const bgColor = rgb(
        bgChannels.r + 50,
        bgChannels.g + 50,
        bgChannels.b + 50
      )

      const bgColorEnd = rgb(
        bgChannels.r - 10,
        bgChannels.g - 10,
        bgChannels.b - 10
      )

      document.body.style.background = `linear-gradient(-45deg, ${bgColor}, ${bgColorEnd})`
    }
    data && getPalette()
  }, [data])

  useEffect(() => {
    !pokemon.id && dispatch(Actions.saveRequest(null))
  }, [])

  const depthFirst = getChildren => node => [
    node,
    ...(getChildren(node) || []).flatMap(depthFirst(getChildren))
  ]

  const makePokeList = pokes =>
    depthFirst(node => node.evolves_to)(pokes.chain).map(
      ({ species }) => species
    )

  useEffect(() => {
    function getData() {
      let types = pokemon.types.map(type => {
        return type.type.name
      })

      const multipliers = getMultipliers(types)
      let multipliersDefense = []

      Object.keys(multipliers.defense).forEach(key => {
        if (multipliers.defense[key] === 2) multipliersDefense.push(key)
      })
      setWeakness(multipliersDefense)

      api.get(pokemon.species.url).then(response => {
        setSpecie(response.data)
        api.get(response.data.evolution_chain.url).then(async response => {
          setEvolution(response.data)

          const evol = makePokeList(response.data)
          const arr = []
          for (let index = 0; index < evol.length; index++) {
            await api.get(evol[index].url).then(response => {
              const data = {
                id: response.data.id,
                image: `/assets/official-artwork/${response.data.id}.png`,
                name: response.data.name
              }
              arr.push(data)
            })
          }
          setEvolution(arr)
        })
      })
    }
    pokemon.id && getData()
  }, [pokemon])

  return (
    <ThemeConsumer>
      {theme => (
        <S.Container>
          <Head>
            <title>
              Pokedex - {name} #{id}
            </title>
          </Head>
          <section>
            <aside>
              <div>
                {favorite.find(f => f.name === pokemon?.name) ? (
                  <MdFavorite
                    onClick={() =>
                      dispatch(
                        Favorites.saveRequest(pokemon?.name, pokemon?.id)
                      )
                    }
                    size={24}
                    color="red"
                  />
                ) : (
                  <MdFavoriteBorder
                    onClick={() =>
                      dispatch(
                        Favorites.saveRequest(pokemon?.name, pokemon?.id)
                      )
                    }
                    size={24}
                  />
                )}
                <strong>{name}</strong>
                <small>#{id}</small>
                <small>{specie?.names && specie.names[0].name}</small>
              </div>
              <div>
                <img
                  src={`/assets/official-artwork/${pokemon?.id}.png`}
                  width={255}
                />
              </div>
              <div>
                {pokemon?.types?.map((el, i) => (
                  <div
                    key={i}
                    style={{ background: theme.colorType[el.type.name] }}
                  >
                    {handleBadge(el.type.name)}
                    <small>{el.type.name}</small>
                  </div>
                ))}
              </div>
              <br />
              <br />
              <strong>Weakness</strong>
              <div>
                {weakness?.map((el, i) => (
                  <div key={i} style={{ background: theme.colorType[el] }}>
                    {handleBadge(el)}
                    <small>{el}</small>
                  </div>
                ))}
              </div>
            </aside>
            <article>
              <p>
                <ul>
                  <li>
                    {String(
                      specie?.flavor_text_entries?.find(
                        el => el.language.name === 'en'
                      )?.flavor_text
                    ).replace('', '\n')}
                  </li>
                  <li>Height: {Number(pokemon?.height) / 10} metters</li>
                  <li>Weight: {Number(pokemon?.weight) / 10} kilograms</li>
                  <li>
                    Genus:{' '}
                    {
                      specie?.genera?.find(el => el.language.name === 'en')
                        ?.genus
                    }
                  </li>
                  <li>HP: {pokemon?.stats && pokemon?.stats[0].base_stat}</li>
                  <li>
                    Attack: {pokemon?.stats && pokemon?.stats[1].base_stat}
                  </li>
                  <li>
                    Defense: {pokemon?.stats && pokemon?.stats[2].base_stat}
                  </li>
                  <li>
                    Special Attack:{' '}
                    {pokemon?.stats && pokemon?.stats[3].base_stat}
                  </li>
                  <li>
                    Special Defense:{' '}
                    {pokemon?.stats && pokemon?.stats[4].base_stat}
                  </li>
                  <li>
                    Speed: {pokemon?.stats && pokemon?.stats[5].base_stat}
                  </li>
                  <li>
                    Abilities:{' '}
                    {pokemon?.abilities &&
                      pokemon?.abilities.map(function (el, i) {
                        return (
                          <small
                            key={i}
                            style={{ textTransform: 'capitalize' }}
                          >
                            {(i ? ', ' : '') + el.ability.name}
                          </small>
                        )
                      })}
                  </li>
                </ul>
              </p>
            </article>
          </section>
          <section>
            <article>
              <section>
                <ul
                  style={{
                    background:
                      pokemon.types &&
                      theme.backgroundType[pokemon.types[0].type.name]
                  }}
                >
                  {evolution.length > 0 &&
                    evolution?.map((el, i) => (
                      <li
                        key={i}
                        onClick={() => router.push(`/pokemon/${el?.id}`)}
                      >
                        <img src={el.image} width={150} height={150} />
                        <small>{el.name}</small>
                      </li>
                    ))}
                </ul>
              </section>
            </article>
          </section>
        </S.Container>
      )}
    </ThemeConsumer>
  )
}

export default Details
