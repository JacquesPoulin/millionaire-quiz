// ! ----- hooks -----
import { useRef } from "react";

// ! ----- style -----
import "./start.css";

const Start = ({ setUsername }) => {
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.value && setUsername(inputRef.current.value);
  };

  return (
    <div className='startGame'>
      <input
        type='text'
        placeholder='Entrez votre nom de joueur'
        className='startInput'
        ref={inputRef}
      />
      <button className='startButton' onClick={handleClick}>
        Commencer
      </button>
    </div>
  );
};

export default Start;
