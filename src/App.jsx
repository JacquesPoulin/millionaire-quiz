// ! ----- hooks -----
import { useState, useEffect, useMemo } from "react";

// ! ----- style -----
import "./app.css";

// ! ----- data -----
import moneyList from "./data/moneyList";
import geoQuiz from "./data/geoQuiz";

// ! ----- composants -----
import Quiz from "./components/Quiz";
import Timer from "./components/Timer";
import Start from "./components/Start";

function App() {
  const [username, setUsername] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stopGame, setStopGame] = useState(false);
  const [earned, setEarned] = useState("0 €");

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(
        moneyList.find((cashPrice) => cashPrice.id === questionNumber - 1)
          .amount
      );
  }, [questionNumber]);

  //  ! useMemo : le tableau "moneyList" sera calculé et mémorisé une fois lors de la première exécution du composant App.
  const memoizedMoneyList = useMemo(() => moneyList, []);

  return (
    <div className='app'>
      {username ? (
        <>
          <div className='main'>
            {stopGame ? (
              earned != "0 €" ? (
                <h1 className='HappyEnd'>Tu as gané : {earned}</h1>
              ) : (
                <h1 className='SadEnd'>Aïe ... Tu n'as rien gagné ! 😥 </h1>
              )
            ) : (
              <>
                <div className='topContainer'>
                  <div className='timer'>
                    <Timer
                      setStopGame={setStopGame}
                      questionNumber={questionNumber}
                    />
                  </div>
                </div>
                <div className='bottomContainer'>
                  <Quiz
                    geoQuiz={geoQuiz}
                    questionNumber={questionNumber}
                    setStopGame={setStopGame}
                    setQuestionNumber={setQuestionNumber}
                  />
                </div>
              </>
            )}
          </div>
          <div className='pyramid'>
            <p className='username'>{username.toUpperCase()}</p>
            <ul className='moneyList'>
              {memoizedMoneyList?.map(({ id, amount, number }) => (
                <li
                  className={
                    questionNumber === id
                      ? "moneyListItem active"
                      : "moneyListItem"
                  }
                  key={id}>
                  <span className='moneyListItemNumber'>{number}.</span>
                  <span className='moneyListItemAmount'> {amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <Start setUsername={setUsername} />
      )}
    </div>
  );
}

export default App;
