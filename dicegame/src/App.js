import React, {useState, useEffect} from 'react';
import './App.css';
import DiceBoard from './components/DiceBoard';
import Score from './components/Score';
import calcScore from './calculate_score';

function App() {

  function diceInitialise() {
    const array = [];
    for (let i = 0; i < 6; i++) {
      array.push({fixed: false, keep: false, value: Math.floor(Math.random()*6+1)})
    }
    console.log(array)
    return array;
  }

  function diceReRoll() {

    const newScore = total.reduce( (partial,a) => partial + a, 0) + keepResult.score
    if( newScore > highScore) {
      setHighScore(newScore);
      setNewHighScore(true);
    }

    let array = [];
    for (let i = 0; i < 6; i++) {
      if(!diceArray[i].keep) {
        array.push({keep: false, value: Math.floor(Math.random()*6+1)})
      } else {
        array.push({keep: true, fixed: true, value: diceArray[i].value})
      }
    }

    if (diceArray.every( x => x.keep === true)) {
      array = diceInitialise()
    }

    console.log(array);
    setDiceArray(array);
    setTotal( prev => [...prev, keepResult.score])
    setNoOfRolls(prev=>prev+1);

  }

  function keepDiceToggle(index) {
    const array = [];
    for (let i = 0; i < 6; i++) {
      if(i == index && !diceArray[i].fixed) {
        array.push({keep: !diceArray[i].keep, value: diceArray[i].value})
      } else {
        array.push(diceArray[i])
      }
    }
    setDiceArray(array);
    console.log(array)
  }

  function playAgain() {
    setDiceArray(()=>diceInitialise());
    setNoOfRolls(0);
    setFullResult({ "score": 0, "scoreString": ""});
    setKeepResult({ "score": 0, "scoreString": ""});
    setTotal([])
    setNewHighScore(false);
  }

  const [diceArray, setDiceArray] = useState(()=>diceInitialise());
  const [noOfRolls, setNoOfRolls] = useState(0);
  const [fullResult, setFullResult] = useState({ "score": 0, "scoreString": ""});
  const [keepResult, setKeepResult] = useState({ "score": 0, "scoreString": ""});
  const [total, setTotal] = useState([])
  const [highScore, setHighScore] = useState(0);
  const [newHighScore, setNewHighScore] = useState(false)

  // const newKeepResult = obj => setKeepResult(obj);
  // const newFullResult = obj => setFullResult(obj);
  
  useEffect( () => {
    const fullArray = diceArray.filter(x => !x.fixed).map( x => x.value );
    const keepArray = diceArray.filter(x => !x.fixed).filter(x => x.keep).map( x => x.value );

    const fullArrayScore = calcScore(fullArray);
    const keepArrayScore = calcScore(keepArray);

    setFullResult(fullArrayScore);
    setKeepResult(keepArrayScore);
  }, [diceArray]
  )




  return (
    <div className="App">
      <div className="highScore">
        <h2>{`High Score: ${highScore}`}</h2>
      </div>

      <h1>Farkle</h1>
      <div className="lineUpButtons">
      <DiceBoard noOfRolls={noOfRolls} diceArray={diceArray} keepDiceToggle={keepDiceToggle} />
      
      { fullResult.score != 0 &&
      <div className="buttonBox">
{/*         <button 
          className={`${keepResult.score == 0 ? "disable_button" : "active_button"} button`} 
          onClick={keepResult.score == 0 ? null : diceReRoll}
          
        >
          Bank
        </button> */}

        <h3>Select at least one scoring combination then roll again </h3>
        <button 
          className={`${keepResult.score == 0 ? "disable_button" : "active_button"} button`}  
          onClick={keepResult.score == 0 ? null : diceReRoll}
        >
          Roll Again
        </button>

      </div>
}
      </div>
      
      <div className="scoreBox">
      <Score 
        diceArray={diceArray} 
        // setKeepResult={newKeepResult} 
        // setFullResult={newFullResult} 
        keepResult={keepResult} 
        fullResult={fullResult}
        total={total}
        playAgain={playAgain}
        newHighScore={newHighScore}
      />
      </div>
      
    </div>
  );
}

export default App;
