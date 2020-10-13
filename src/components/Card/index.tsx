import React from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

import { ThemeConsumer } from 'styled-components'

import { handleBadge } from '../../utils/badges'

import * as Actions from '../../store/modules/pokemon/actions'

import { Container, Image, PokeballBg, PatternBg } from './styles'

interface IProps {
  data?: any
}

const Card: React.FC<IProps> = ({ data }) => {
  const dispatch = useDispatch()
  const router = useRouter()

  return (
    <ThemeConsumer>
      {theme => (
        <Container
          style={{
            background: theme.backgroundType[data.types[0].type.name]
          }}
        >
          <article>
            <PatternBg />
            <PokeballBg />
            <div>
              <small>#{String(data.id).padStart(3, '0')}</small>
              <strong>{data.name}</strong>

              <div>
                {data.types.map((el, i) => {
                  return (
                    <div
                      key={i}
                      style={{ background: theme.colorType[el.type.name] }}
                    >
                      {handleBadge(el.type.name)}
                      <small>{el.type.name}</small>
                    </div>
                  )
                })}
              </div>
            </div>

            <Image
              onClick={() => {
                dispatch(Actions.saveRequest(data.rest))
                router.push(
                  {
                    pathname: '/pokemon/[id]'
                  },
                  `pokemon/${data.id}`
                )
              }}
              src={data.image}
            />
          </article>
        </Container>
      )}
    </ThemeConsumer>
  )
}

export default Card
