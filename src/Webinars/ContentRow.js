/** @jsxRuntime classic */
/** @jsx jsx */
// import { jsx } from 'theme-ui';

import React, { Component, useCallback, useEffect } from 'react'
import { css, jsx } from '@emotion/core'
import ContentBlock from './ContentBlock'
import Icon from './Icon'

import one from './img/one.jpg'
import two from './img/two.jpg'
import three from './img/three.jpg'
import four from './img/four.jpg'
import five from './img/five.jpg'
import six from './img/six.jpg'

const content = [one, two, three, four, five, six] //images from the gapi call

// function panLeft() {
//   var elmnt = getElementById("vids")
//   elmnt.scrollLeft = 50;
// }

// function panRight() {
//   var elmnt = document.getElementById("vids")
//   elmnt.scrollLeft = -50;
// }



/**
 * @function ContentRow
 */
const ContentRow = ({ category, setActive, events }) => {
  const getPos = useCallback(e => {
    const pos = e.target.parentElement.getBoundingClientRect()
    setActive({ category, pos })
  }, [])

  // useEffect(() => {
  //     var elem = document.getElementById('slide-left');
  //     elem.onclick = function() {
  //       var lol = document.getElementById('vid-container')
  //       lol.style.background = 'yellow';
  //       lol.style.left += 300 ;
  //   }
  // });

  return (
    <div
      className="ContentRow"
      css={css`
        padding-left: 120px;
        // overflow-x: hidden;
        display: flex;
        justify-content: center;

        .ContentBlock {
          display: flex;
          flex-shrink: 0;
          margin-right: 4px;
        }
      `}
    >
      <div
        css={css`
          h2 {
            margin: 20px 0 10px;
            color: white;
          }

          .row-container {
            display: flex;
          }

          .block-wrapper {
            display: flex;
            flex-direction: row;
            width: 800px;
            position: relative;
            background: blue;
            overflow-x: scroll;
          }
        `}
      >
        <h2>{category}</h2>
        
        <div class="row-container">

          {/* <button id="slide-left">Scroll Left</button> */}
          <div id="vid-container">
            <h3>gd morning</h3>
          </div>

        <div className="block-wrapper">
          {/* {content.map(img => ( */}
          {/* {events[0].attachments !== undefined ? console.log("file Ur: ", events[0].attachments[0].fileUrl) : ''} */}
          {events.map(event => {
            // { console.log("attachment: ", event.summary) }
            return (
            <ContentBlock  img={event.attachments !== undefined ? event.attachments[0].fileUrl : null}>
              <Icon type="play" />
              <Icon type="info-circle" onClick={getPos} />
              </ContentBlock>
            )
          })}
          <h2>HELLLOOOo</h2>
            
          {/* ))} */}

          </div>
          {/* <button id="slide-right" onclick={panRight()}>Scroll Right</button> */}
        </div>
      </div>
    </div>
  )
}

export default ContentRow
