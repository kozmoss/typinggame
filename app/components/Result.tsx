"use client"
import React from 'react'
import "../stylesheets/Result.scss"
import { useCounterStore } from '../store/storeProvider'

const Result = () => {
    const {wordList, typedHistory, currWord} = useCounterStore((state) => state)
    const spaces = wordList.indexOf(currWord);
    let correctChars = 0;
    const result = typedHistory.map(
        (typedWord, idx) => typedWord === wordList[idx]
    );
    result.forEach((r, idx) => {
        if (r) correctChars += wordList[idx].length;
    });
    const wpm = ((correctChars + spaces) * 60) / 60 / 5;
  return (
    <div className="result">
    <table>
        <tbody>
            <tr>
                <td colSpan={2} align="center">
                    <h1>{Math.round(wpm) + " wpm"}</h1>
                </td>
            </tr>
            <tr>
                <th>Correct Words:</th>
                <td>{result.filter((x:any) => x).length}</td>
            </tr>
            <tr className="wrong">
                <th>Incorrect Words:</th>
                <td>{result.filter((x:any) => !x).length}</td>
            </tr>
            <tr>
                <td colSpan={2} align="center">
                  
                </td>
            </tr>
        </tbody>
    </table>
</div>
  )
}

export default Result