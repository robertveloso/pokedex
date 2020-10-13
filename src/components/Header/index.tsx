import React, { useContext } from 'react'
import Switch from 'react-switch'
import { ThemeContext } from 'styled-components'
import { shade } from 'polished'
import { useRouter } from 'next/router'

import { MdFavorite, MdHome, MdArrowBack } from 'react-icons/md'

import Link from 'next/link'

import { Container } from './styles'

interface Props {
  toggleTheme(): void
}

const Header: React.FC<Props> = ({ toggleTheme }) => {
  const router = useRouter()
  const { colors, title } = useContext(ThemeContext)

  return (
    <Container>
      <div>
        {router.pathname !== '/' && (
          <MdArrowBack
            size={36}
            color={colors.primary}
            onClick={() => router.back()}
          />
        )}

        <h1>{router.pathname === '/favorites' ? 'Favoritos' : 'Pokédex'}</h1>
      </div>

      <div>
        <Link href="/favorites">
          <MdFavorite size={24} color={colors.primary} />
        </Link>
        <Link href="/">
          <MdHome size={24} color={colors.primary} />
        </Link>
        <Switch
          onChange={toggleTheme}
          checked={title === 'dark'}
          checkedIcon={false}
          uncheckedIcon={false}
          height={10}
          width={40}
          handleDiameter={20}
          offColor={shade(0.6, '#fff')}
          offHandleColor="#17171B"
          onColor={shade(0.1, '#fff')}
          onHandleColor="#fff"
        />
      </div>
    </Container>
  )
}

export default Header
