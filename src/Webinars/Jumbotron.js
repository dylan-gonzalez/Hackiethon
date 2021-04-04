/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/core'
import Button from './Button'
import wallpaper from './img/wallpaper.jpg'
import logo from './img/logo.png'

/**
 * @function Jumbotron
 */
const Jumbotron = ({ children }) => (
  <div css={JumbotronCSS}>
    <div className="synopsis">
      <img src={logo} />

      <p class="quote">
      “He who learns but does not think, is lost! 
      He who thinks but does not learn, is in great danger.” – Confucius
      </p>

      <Button icon="play">Play</Button>
      <Button icon="info-circle">More Info</Button>
    </div>

    {children}
  </div>
)

const JumbotronCSS = css`
  position: relative;
  background-image: url('${wallpaper}');
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 98vh;
  top: 0;

  .synopsis {
    padding-top: 300px;
    padding-left: 60px;
    max-width: 500px;
    color: white;
    // background: green;
    padding-left: 60px;

    .quote  {
      // background: red;
      font-size: 23px;
    }

   .Icon {
      margin-right: 10.5px;
      font-size: 18px;
    }

    Button:hover {
      color: red;
    }
  }

  .ContentRow {
    position: absolute;
    // background-color: green;
    bottom: 20px;
  }
`
export default Jumbotron
