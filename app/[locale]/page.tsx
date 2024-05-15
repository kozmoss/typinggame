"use client";
import { useTranslations } from "next-intl";
import Header from "../components/Header";
import Test from "../components/Test";
import Result from "../components/Result";
import CommandPallet from "../components/CommandPallet";
import Footer from "../components/Footer";
import "../stylesheets/Theme.scss";
import { useState, useEffect } from "react";
import { useCounterStore } from "../store/storeProvider";
import { RecordTest } from "../helpers/recordTest";
import { createWordStore } from "../store/text";
import { getCookie } from "cookies-next";

export default function Index() {
  const t = useTranslations("Index");
  const store = useCounterStore((state) => state);
  const { timerId, timer, currWord, typedWord, activeWordRef, setTimerId } = store;
  const [showPallet, setShowPallet] = useState(false);
  const locale = getCookie("NEXT_LOCALE")
  console.log(locale)

  useEffect(() => {
    document.onkeydown = (e) => {
      if (e.ctrlKey && e.key === "k") {
        setShowPallet((s) => !s);
        e.preventDefault();
      } else if (
        e.key.length === 1 ||
        e.key === "Backspace" ||
        e.key === "Tab"
      ) {
        RecordTest(e.key, e.ctrlKey, store, locale);
        e.preventDefault();
      }
    };
    return () => {
      document.onkeydown = null;
    };
  }, [store]);

  useEffect(() => {
    let idx = typedWord.length - 1;
    const currWordEl = activeWordRef?.current!;
    if (currWordEl) {
      currWordEl.children[idx + 1].classList.add(
        currWord[idx] !== typedWord[idx] ? "wrong" : "right"
      );
    }
  }, [currWord, typedWord, activeWordRef]);

  useEffect(() => {
    let idx = typedWord.length;
    const currWordEl = activeWordRef?.current!;
    if (currWordEl && idx < currWord.length)
      currWordEl.children[idx + 1].classList.remove("wrong", "right");
  }, [currWord.length, typedWord, activeWordRef]);

  useEffect(() => {
    if (!timer && timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }
  }, [setTimerId, timer, timerId]);
  return (
    <>
      <Header />
      {showPallet && <CommandPallet setShowPallet={setShowPallet} />}
      {timer ? <Test /> : <Result />}
      <Footer />
    </>
  );
}
