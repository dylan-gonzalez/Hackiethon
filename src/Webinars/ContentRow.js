/** @jsxRuntime classic */
/** @jsx jsx */
// import { jsx } from 'theme-ui';

import React, { useCallback } from 'react'
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

/**
 * @function ContentRow
 */
const ContentRow = ({ category, setActive, events }) => {
  const getPos = useCallback(e => {
    const pos = e.target.parentElement.getBoundingClientRect()
    setActive({ category, pos })
  }, [])

  return (
    <div
      className="ContentRow"
      css={css`
        padding-left: 60px;
        overflow-x: hidden;

        .ContentBlock {
          flex: 18vw;
          flex-shrink: 0;
          height: 9.5vw;
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

          .block-wrapper {
            display: flex;
            width: 100%;
            position: relative;
          }
        `}
      >
        <h2>{category}</h2>

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
            
          {/* ))} */}
        </div>
      </div>
    </div>
  )
}

export default ContentRow
