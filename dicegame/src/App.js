import React, {useState} from 'react';
import './App.css';
import DiceBoard from './components/DiceBoard';
import Score from './components/Score';

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
    const array = [];
    for (let i = 0; i < 6; i++) {
      if(!diceArray[i].keep) {
        array.push({keep: false, value: Math.floor(Math.random()*6+1)})
      } else {
        array.push({keep: true, fixed: true, value: diceArray[i].value})
      }
    }
    console.log(array);
    setDiceArray(array);
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



  const [diceArray, setDiceArray] = useState(()=>diceInitialise());
  const [noOfRolls, setNoOfRolls] = useState(0);

  return (
    <div className="App">

      <h1>Farkle</h1>
      <DiceBoard noOfRolls={noOfRolls} diceArray={diceArray} keepDiceToggle={keepDiceToggle} />
      <button className="button" onClick={diceReRoll}>Bank</button>
      <button className="button" onClick={diceReRoll}>Roll Again</button>
      <Score diceArray={diceArray} />
      
    </div>
  );
}

export default App;
