import React, {useEffect, useState} from 'react';
import { wobble } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
import '../styles.css';

const styles = {
    wobble: {
    animation: 'x 0.2s',
    animationName: Radium.keyframes(wobble, 'wobble')
    },
    noWobble: {
    }
}

export default function Dice(props) {

    const keep = props.diceSetting.keep;
    const fixed = props.diceSetting.fixed;
    const value = props.diceSetting.value;
    const keepDiceToggle = props.keepDiceToggle;
    const noOfRolls = props.noOfRolls;

    // console.log("dice value: " + value);
    
    const dicePattern = [[0,0,0,0,1,0,0,0,0],[0,0,1,0,0,0,1,0,0],[0,0,1,0,1,0,1,0,0,0],[1,0,1,0,0,0,1,0,1],[1,0,1,0,1,0,1,0,1],[1,0,1,1,0,1,1,0,1]]
    const [roll, setRoll] = useState(value-1);
    const [wobble, setWobble] = useState(true);
    //const [keep, setKeep] = useState(false);

    useEffect( () => {
        function rollDice() {
            if(keep) return;
            let i = 0;
            setWobble(prev=>true)
            function roll() {
                i++; 
                if (i > 3) {
                    setRoll(value-1)
                    console.log("setting roll to: " + value)
                } else {
                    setRoll(Math.floor(Math.random()*6));
                }
                if (i>3) {
                    setWobble(prev=>false); 
                    return
                };
                setTimeout(roll,50);
            }
            roll()
        }
        rollDice()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[noOfRolls]  
    )

   // useEffect(rollDice,[value]);

    return (
        <div>
        <StyleRoot>
            <div className={`dice grid ${keep ? "diceShrink" : "diceGrow"} ${fixed ? "diceGrey" : ""}`} onClick={keepDiceToggle} style={ wobble ? styles.wobble : styles.noWobble}>
                <div className={`dot ${dicePattern[roll][0] ? "" : 'bckgrnd'}`}></div>
                <div className={`dot ${dicePattern[roll][1] ? "" : 'bckgrnd'}`}></div>
                <div className={`dot ${dicePattern[roll][2] ? "" : 'bckgrnd'}`}></div>
                <div className={`dot ${dicePattern[roll][3] ? "" : 'bckgrnd'}`}></div>
                <div className={`dot ${dicePattern[roll][4] ? "" : 'bckgrnd'}`}></div>
                <div className={`dot ${dicePattern[roll][5] ? "" : 'bckgrnd'}`}></div>
                <div className={`dot ${dicePattern[roll][6] ? "" : 'bckgrnd'}`}></div>
                <div className={`dot ${dicePattern[roll][7] ? "" : 'bckgrnd'}`}></div>
                <div className={`dot ${dicePattern[roll][8] ? "" : 'bckgrnd'}`}></div>
            </div>
        </StyleRoot>
        {/* <button onClick={rollDice}>Roll</button> */}
        </div>
    )
}