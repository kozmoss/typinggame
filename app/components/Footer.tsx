"use client"
import React from 'react'
import "../stylesheets/Footer.scss"
import { useCounterStore } from '../store/storeProvider';

const Footer = () => {
    const { timerId } = useCounterStore(
        (state) => state,
      )
  return (
    <div className={`bottom-area ${timerId ? "hidden" : ""}`}>
    <span className="hint">
        <kbd>Ctrl</kbd> + <kbd>k</kbd> to open command pallet
    </span>
    <span className="hint">
        <kbd>Tab</kbd> to restart test
    </span>
    <footer>
        <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/kozmoss">
            <span>&lt;/&gt;</span> github
        </a>
        <span>
            created by{" "}
            <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/kozmoss">
                @sametbuzcu
            </a>
        </span>   
    </footer>
</div>
  )
}

export default Footer