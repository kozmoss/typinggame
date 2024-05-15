"use client"
import React from 'react'
import styles from "../stylesheets/CommandPallet.module.scss";
import { useState, useRef, useEffect } from 'react';
import { Options, options } from './Header';

const CommandPallet = (props:any) => {
  const [palletText, setPalletText] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [highlightedOption, setHighlightedOption] = useState(0);
  const [commandList, setCommandList] = useState<string[]>([]);
  const palletTextBox = useRef<HTMLInputElement>(null);


const changeLanguage = (nextLanguage:any) => {
  window.location.replace(nextLanguage);
};


  useEffect(() => {
      document.onclick = () => {
          props.setShowPallet((s: boolean) => !s);
      };
      return () => {
          document.onclick = null;
      };
  }, [props]);

  useEffect(() => {
      if (!selectedOption) {
          setCommandList(
              Object.keys(options).filter((option) =>
                  option.includes(palletText.toLowerCase())
              )
          );
      } else {
          const commands: Array<string> = options[ selectedOption as keyof Options].map((o) => o.toString());
          setCommandList(
              commands.filter((option: string) =>
                  option.includes(palletText.toLowerCase())
              )
          );
      }
      setHighlightedOption(0);
  }, [palletText, selectedOption]);

  const handleCommandSelection = (command: string) => {
      setPalletText("");
      if (!command) return;
      if (!selectedOption) {
          setSelectedOption(command);
          return;
      }
      switch (selectedOption) {
          case "language":
              changeLanguage(command);
              break;
          default:
      }
      props.setShowPallet(false);
  };

  const handlePalletKeys = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
          setHighlightedOption((op) => (op > 0 ? op - 1 : op));
      } else if (e.key === "ArrowDown") {
          setHighlightedOption((op) =>
              op < commandList.length - 1 ? op + 1 : op
          );
      } else if (e.key === "Enter") {
          const command = commandList[highlightedOption];
          handleCommandSelection(command);
      } else if (e.key === "Escape") {
          props.setShowPallet(false);
      }
      e.stopPropagation();
  };
  return (
    <div
    className={styles.commandPallet}
    onKeyDown={() => handlePalletKeys}
     onClick={(e) => e.stopPropagation()}
>
    <input
        ref={palletTextBox}
        type="text"
        className={styles.commandInput}
        placeholder="Type to search"
        value={palletText}
        autoFocus
        onChange={(e) => setPalletText(e.target.value)}
    />
    <div className={styles.commandList}>
        {commandList!.map((option, idx) => (
            <div
                className={`${styles.command} ${
                    highlightedOption === idx && styles.highlighted
                }`}
                key={idx}
                onClick={() => handleCommandSelection(option)}>
                {option}
            </div>
        ))} 
    </div>
</div>
  )
}

export default CommandPallet