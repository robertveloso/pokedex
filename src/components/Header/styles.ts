import styled from 'styled-components'

export const Container = styled.div`
  width: inherit;
  height: 60px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;

  div {
    :first-of-type {
      display: flex;
      align-items: baseline;

      h1 {
        color: ${props => props.theme.colors.primary};
        /* color: #17171b !important; */
      }
    }
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  div {
    display: flex;
    align-items: center;
    svg {
      margin: 5px;
      :last-of-type {
        margin-right: 10px;
      }
    }
  }
`
