import {  CounterStore } from "../store/text";
import { ResetTest } from "./resetTest";
import { StartTimer } from "./startTimer";

const HandleBackspace = (ctrlKey: boolean, store:CounterStore) => {
  const {
    typedWord,
    activeWordRef,
    typedHistory,
    wordList,
    backtrackWord,
    setTypedWord,
  } = store;

  const currIdx = typedHistory.length - 1;
  const currWordEl = activeWordRef?.current!;
  if (!typedWord && typedHistory[currIdx] !== wordList[currIdx]) {
    backtrackWord(ctrlKey);
    currWordEl.previousElementSibling!.classList.remove("right", "wrong");
    if (ctrlKey) {
      currWordEl.previousElementSibling!.childNodes.forEach((char: any) => {
        char.classList.remove("wrong", "right");
      });
    }
  } else {
    if (ctrlKey) {
      setTypedWord("");
      currWordEl.childNodes.forEach((char: any) => {
        char.classList.remove("wrong", "right");
      });
    } else {
      const newTypedWord = typedWord.slice(0, typedWord.length - 1);
      setTypedWord(newTypedWord);
    }
  }
};

export const RecordTest = (key: string, ctrlKey: boolean, store: CounterStore,lng:any) => {
  const {
    typedWord,
    activeWordRef,
    timer,
    timerId,
    currWord,
    caretRef,
    setChar,
    appendTypedHistory,
  } = store;

  if (!timer) {
    if (key === "Tab") {
      ResetTest(store, lng);
    }
    return;
  }
  if (!timerId && key !== "Tab") StartTimer(store);
  const currWordEl = activeWordRef?.current!;
  currWordEl.scrollIntoView({ behavior: "smooth", block: "center" });
  const caret = caretRef?.current!;
  caret.classList.remove("blink");
  setTimeout(() => caret.classList.add("blink"), 500);
  switch (key) {
    case "Tab":
      if (timer !== 60 || timerId) {
        ResetTest(store, lng);
        document.getElementsByClassName("word")[0].scrollIntoView();
      }
      break;
    case " ":
      if (typedWord === "") return;
      currWordEl.classList.add(typedWord !== currWord ? "wrong" : "right");
      appendTypedHistory();
      break;
    case "Backspace":
      HandleBackspace(ctrlKey, store);
      break;
    default:
      setChar(typedWord + key);
      break;
  }
};
