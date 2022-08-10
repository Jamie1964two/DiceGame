import React, {useEffect, useState} from 'react';
import Dice from './Dice';
import '../styles.css';

export default function DiceBoard(props) {
    return(
    <div className="diceBoard_container">
        <Dice noOfRolls={props.noOfRolls} diceSetting={props.diceArray[0]} keepDiceToggle={()=>props.keepDiceToggle(0)}/>
        <Dice noOfRolls={props.noOfRolls} diceSetting={props.diceArray[1]} keepDiceToggle={()=>props.keepDiceToggle(1)}/>
        <Dice noOfRolls={props.noOfRolls} diceSetting={props.diceArray[2]} keepDiceToggle={()=>props.keepDiceToggle(2)}/>
        <Dice noOfRolls={props.noOfRolls} diceSetting={props.diceArray[3]} keepDiceToggle={()=>props.keepDiceToggle(3)}/>
        <Dice noOfRolls={props.noOfRolls} diceSetting={props.diceArray[4]} keepDiceToggle={()=>props.keepDiceToggle(4)}/>
        <Dice noOfRolls={props.noOfRolls} diceSetting={props.diceArray[5]} keepDiceToggle={()=>props.keepDiceToggle(5)}/>
    </div>
    )

}