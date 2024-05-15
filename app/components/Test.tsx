"use client";
import React from "react";
import "../stylesheets/Test.scss";
import { useCounterStore } from "../store/storeProvider";
import { useRef, useEffect, useCallback, useState } from "react";

const Test = () => {
  const {
    timer,
    wordList,
    typedHistory,
    typedWord,
    currWord,
    setRef,
    setCaretRef,
    activeWordRef,
  } = useCounterStore((state) => state);

  const extraLetters = typedWord.slice(currWord.length).split("");
  //   const activeWord = useRef<HTMLDivElement>(null);
  //   const caretRef = useRef<HTMLSpanElement>(null);

  const handleActiveWordRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setRef({current: node});
    }
  }, [setRef]);

  const handleCaretRef = useCallback((node: HTMLSpanElement) => {
    if (node !== null) {
      setCaretRef({current: node});
    }
  }, [setCaretRef]);

 
  return (
    <div className="test">
      <div className="timer">{timer}</div>
      <div className="box">
        {wordList.map((word, idx) => {
          const isActive = currWord === word && typedHistory.length === idx;
          return (
            <div
              key={word + idx}
              className="word"
              ref={isActive ? handleActiveWordRef : null}
            >
              {isActive ? (
                <span
                  ref={handleCaretRef}
                  id="caret"
                  className="blink"
                  style={{
                    left: typedWord.length * 14.5833,
                  }}
                >
                  |
                </span>
              ) : null}
              {word.split("").map((char, charId) => {
                return <span key={char + charId}>{char}</span>;
              })}
              {isActive
                ? extraLetters.map((char, charId) => {
                    return (
                      <span key={char + charId} className="wrong extra">
                        {char}
                      </span>
                    );
                  })
                : typedHistory[idx]
                ? typedHistory[idx]
                    .slice(wordList[idx].length)
                    .split("")
                    .map((char, charId) => {
                      return (
                        <span key={char + charId} className="wrong extra">
                          {char}
                        </span>
                      );
                    })
                : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Test;
