import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h1 {
    font-size: 54px;
    color: ${props => props.theme.colors.primary};
    margin-top: 40px;
  }

  > div {
    > svg {
      position: absolute;
      margin: 12px;
    }
    > input {
      background: #f2f2f2;
      border-radius: 10px;
      width: 334px;
      height: 60px;

      font-family: SF Pro Display;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 19px;

      display: flex;
      align-items: center;
      padding-left: 60px;

      color: #747476;

      :focus {
        outline: none;
      }
    }
  }

  > section {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 1200px;
    justify-content: center;

    button {
      border: none;
      background: transparent;
      margin: 15px;
    }

    > div {
      flex-grow: 1;
      width: 33%;
    }
  }
`
