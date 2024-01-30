import React, { useState } from "react";
import CardGame from "./components/cardGame";
import Header from "./components/header";
import Modal from "./components/modal";
import { useTimer } from "./util/customHooks";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [bestTime, setBestTime] = useState(0);
  const [previousTime, setPreviousTime] = useState(0);

  const {
    time,
    start: timerStart,
    stop: timerStop,
    reset: timerReset,
  } = useTimer();

  const cardTexts = [
    "Bunny 🐰",
    "Frog 🐸",
    "Panda 🐼",
    "Doggy 🐶",
    "Kitty 😺",
    "Duck 🦆",
  ];

  // start game function
  function onGameStart() {
    // show timer on start
    timerStart();
    // reset timer on start
    timerReset()
  };

  // end game function
  function onGameEnd() {
    // stop timer on game end, no timer before start
    timerStop();
    // show previous time on game end
    setPreviousTime(time);
    // if time is lower, become new best time
    if (time < bestTime || bestTime === 0) {
        setBestTime(time);
      };
    timerReset();
  };

  return (
    <>
      <Header
        // add time, bestTime, previousTime props
        time={time}
        bestTime={bestTime}
        previousTime={previousTime}
        openModal={() => setShowModal(true)}
      />
      <CardGame
        // add onGameStart, onGameEnd props
        onGameStart={onGameStart}
        onGameEnd={onGameEnd}
        cardTexts={cardTexts}
      />
      <Modal isShown={showModal} close={() => setShowModal(false)} />
    </>
  );
}

