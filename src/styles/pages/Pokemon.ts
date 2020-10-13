import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  > section {
    display: flex;
    flex-direction: row;
    width: 1200px;
    margin: 20px;
    align-items: flex-end;

    aside {
      text-align: center;
      > div {
        img {
          z-index: 999;
        }
        :first-of-type {
          place-content: flex-start;
          align-items: center;
          svg {
            margin-right: 5px;
            z-index: 999;
          }
          strong {
            font-size: 30px;
            margin-right: 10px;
          }
          small {
            font-size: 834%;
            opacity: 0.2;
            position: absolute;
            margin-top: 1px;
            margin-left: 138px;
            font-weight: bold;
            z-index: 1;
            :last-of-type {
              top: 0;
              margin-left: 0;
              font-size: 180px;
              font-weight: 100;
              opacity: 0.1;
            }
          }
        }
        place-content: center;
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

    article {
      width: -webkit-fill-available;

      p {
        width: fit-content;
        margin: 0 auto;

        li {
          :first-letter {
            text-transform: capitalize;
          }
        }
      }
      ul {
        list-style-type: none;
        font-size: 20px;
        line-height: 25px;
      }
      section {
        > ul {
          display: flex;
          justify-content: space-around;
          padding: 20px;
          border-radius: 10px;
          > li {
            display: flex;
            flex-direction: column;
            text-align: center;
          }
        }
        small {
          color: #ffffff;
          font-weight: 500;
          text-transform: capitalize;
        }
      }
      div {
        display: flex;
        margin: 25px 25px 5px 25px;
        border-radius: 10px;
        > div {
          display: flex;
          flex-direction: column;
          text-align: center;
          margin: 25px;

          strong {
            font-family: SF Pro Display;
            font-style: normal;
            font-weight: bold;
            font-size: 16px;
            line-height: 19px;
            color: rgba(23, 23, 27, 0.6);
          }
          small {
            font-family: SF Pro Display;
            font-style: normal;
            font-size: 14px;
            line-height: 17px;
            color: #ffffff;
          }
        }
      }
    }

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
