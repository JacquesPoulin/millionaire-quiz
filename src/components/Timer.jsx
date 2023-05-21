import { useState, useEffect } from "react";

const Timer = ({ setStopGame, questionNumber }) => {
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer === 0) return setStopGame(true);

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    // ! Clean up function
    return () => clearInterval(interval);
  }, [setStopGame, timer]);

  useEffect(() => {
    setTimer(30);
  }, [questionNumber]);

  return timer;
};

export default Timer;
