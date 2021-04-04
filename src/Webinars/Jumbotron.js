/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/core'
import Button from './Button'
import wallpaper from './img/wallpaper.jpg'

// import handleHover from './ContentBlock.js'

/**
 * @function Jumbotron
 */
const Jumbotron = ({ background }) => (
  <div css={styling(background)}>
    <div className="synopsis">
      {/* <img src={logo} /> */}

      <p class="quote">
      "You don't want lack of experience. 
      Therefore you go watch some seminars mate." - Speedy Gonzo
      </p>

      <Button icon="play">Play</Button>
      <Button icon="info-circle">More Info</Button>
    </div>

  </div>
)

function styling(img) {
  return css`
    position: absolute;
    background-image: url('${img}');
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100vh;
    top: 0;

    .synopsis {
      padding-top: 300px;
      padding-left: 60px;
      max-width: 500px;
      color: white;
      padding-left: 60px;

      .quote  {
        font-size: 23px;
        letter-spacing: 1px;
      }

    .Icon {
        margin-right: 10.5px;
        font-size: 18px;
      }

      Button {
        transition-duration: 0.2s;
      }

      Button:hover {
        color: rgb(150, 250, 200);
      }
    }

  `
}
export default Jumbotron
