/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect, forwardRef } from 'react'
import { css, /*jsx*/ } from '@emotion/core';
import { jsx } from '@emotion/react';
import Icon from './Icon'

const leftLinks = ['PHysics', 'TV Shows', 'Movies', 'Latest', 'My List']

/**
 * @function Navbar
 */
const Navbar = forwardRef((props, ref) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () =>
      window.pageYOffset > 75 ? setScrolled(true) : setScrolled(false)

    const onScroll = window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <nav
      ref={ref}
      css={[
        NavbarCSS,
        scrolled
          ? css`
              // background-color: rgb(20, 20, 20);
              background-color: rgb(1000, 20, 20);
              background-image: linear-gradient(
                to bottom,
                rgba(0, 0, 0, 0.7) 10%,
                rgba(0, 0, 0, 0)
              );
            `
          : css`
              background: transparent;
            `
      ]}
    >
      <ul>
        <li>
          <a href="/#/webinars" class="nav-title">
            <h2>Seminars</h2>
          </a>
          
        </li>

        {leftLinks.map(link => (
          <li key={link}>
            <a href="/#/webinars">{link}</a>
          </li>
        ))}
      </ul>

      <ul className="right">
        <li>
          <Icon type="search" />
        </li>
        <li>
          <Icon type="bell-o" />
        </li>
      </ul>
    </nav>
  )
})

const NavbarCSS = css`
  // position: static;
  position: relative;
  height: 68px;
  z-index: 99;
  width: 100%;
  padding: 0 25px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  .nav-title {
    font-size: 30px;
  }
  ul {
    display: flex;
    align-items: center;
    margin: 50px;
    color: red;
  }
  li {
    margin-right: 30px;
  }
  a {
    font-size: 17px;
    letter-spacing: 1px;
    color: #e5e5e5;
  }
  a.active {
    // color: white;
    font-weight: 500;
  }
  ul.right {
    .Icon {
      color: white;
      cursor: pointer;
      font-size: 22px;
    }
  }
`

export default Navbar
