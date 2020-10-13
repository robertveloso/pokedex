import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;

  max-width: 334px;
  background: #8bbe8a;
  margin: 20px;
  border-radius: 10px;

  article {
    display: flex;
    flex-direction: row;

    > div {
      display: flex;
      flex-direction: column;
      small {
        /* Pokemon Number */
        font-family: SF Pro Display;
        font-style: normal;
        font-weight: bold;
        font-size: 12px;
        line-height: 14px;
        color: rgba(23, 23, 27, 0.6);

        margin: 20px 10px 0px 20px;
      }

      strong {
        /* Pokemon Name */
        font-family: SF Pro Display;
        font-style: normal;
        font-weight: bold;
        font-size: 26px;
        line-height: 31px;
        color: #ffffff;

        text-transform: capitalize;
        margin: 0px 0px 0px 20px;
      }

      > div {
        margin: 0 0 0 20px;
        display: flex;
        flex-direction: row;

        div {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 5px;
          border-radius: 3px;
          margin: 5px 5px 5px 0;

          svg {
            width: 20px;
            height: 20px;

            path {
              fill: #fff;
            }
          }

          small {
            color: #ffffff;
            margin: 0 3px 0 7px;
            font-weight: 500;
            text-transform: capitalize;
          }
        }
      }
    }
  }
`

export const PokeballBg = styled.div`
  width: 334px;
  height: 105px;
  position: absolute;
  opacity: 0.2;
  background: url(../assets/pokeball.svg) no-repeat left top,
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(255, 255, 255, 0) 100%
    );
  background-size: 145px 172px;
  background-position-y: 0px;
  background-position-x: right;
  z-index: 1;
`
export const PatternBg = styled.div`
  width: 170px;
  height: 32px;
  position: absolute;
  background: url(../assets/patterns/Pattern.png) no-repeat left top;
  background-position-x: right;
  background-position-y: 10px;
`

interface IImageStyled {
  src: string
}

export const Image = styled('div')<IImageStyled>`
  width: 335px;
  height: 130px;
  margin-top: -25px;
  margin-left: -10px;
  z-index: 999;
  background: url(${props => props.src}) no-repeat;
  background-size: 130px 130px;
  position: absolute;
  background-position-y: 0px;
  background-position-x: right;
`
