import React, { useState, useEffect } from "react";

// ! ----- style -----
import "./quiz.css";

// ! ----- composants -----
import useSound from "use-sound";

// ! ----- assets -----
import play from "../assets/play.mp3";
import correct from "../assets/correct.mp3";
import wrong from "../assets/wrong.mp3";

const Quiz = ({
  geoQuiz,
  questionNumber,
  setStopGame,
  setQuestionNumber,
}) => {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("reponse");
  const [letsPlay] = useSound(play);
  const [correctAnswear] = useSound(correct);
  const [wrongAnswear] = useSound(wrong);

  useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  useEffect(() => {
    setQuestion(geoQuiz[questionNumber - 1]);
  }, [geoQuiz, questionNumber]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (reponse) => {
    setSelectedAnswer(reponse);
    setClassName("reponse active");
    delay(3000, () =>
      setClassName(reponse.correct ? "reponse correct" : "reponse wrong")
    );
    delay(5000, () => {
      if (reponse.correct) {
        correctAnswear();
        delay(3000, () => {
          setQuestionNumber((prev) => prev + 1);
          setSelectedAnswer(null);
        });
      } else {
        delay(2000, () => {
          wrongAnswear();
          setStopGame(true);
        });
      }
    });
  };

  return (
    <div className='quizContainer'>
      <div className='questionContainer'>{question?.question}</div>
      <div className='reponsesContainer'>
        {question?.reponses?.map((reponse) => (
          <div
            className={selectedAnswer === reponse ? className : "reponse"}
            onClick={() => handleClick(reponse)}>
            {reponse.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
