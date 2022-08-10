import React from 'react';
import calculateScore from '../calculate_score';


export default function Score(props) {

    const roundScore = calculateScore(props.diceArray)

    return(
    <div>
        <h1>{roundScore}</h1>
    </div>
    )
}