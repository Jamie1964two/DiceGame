import React from 'react';
import '../styles.css'


export default function Score(props) {

    console.log(props.fullResult)

    if(props.fullResult.score === 0){

        return(
            <div className="flexCenter">
                <h2 className="farkled">"No score - You're FARKLED!"</h2>
                <button className="playAgain" onClick={props.playAgain}>Play Again</button>
            </div>
        ) 

    }

    const scoreLinesFull = props.fullResult.scoreString.map( line => {
        return (
            <h4 className='scoreTextGrey'>{line}</h4>
        )
    })

    const scoreLinesKeep = props.keepResult.scoreString.map( line => {
        return (
            <h4 className="scoreText">{line}</h4>
        )
    })

    const scoreLinesTotal = props.total.map( (x,i) => {
        return (
            <h4 className="scoreTextGrey">{`${i+1} : ${x}`}</h4>
        )
    })


    return (

        <div>
            <div className="scoreTextBox">
                <div>
                    <div className="fullKeepBox fullBox">
                        <h3>Roll:</h3>
                        {scoreLinesTotal}
                    </div>
                    <h4 className="keepScoreText">{`Total: ${props.total}`}</h4>
                </div>
                <div className="fullKeepBox fullBox">
                    <h3>On table:</h3>
                    {scoreLinesFull}
                </div>
                <div>
                    <div className="fullKeepBox">
                        <h3 className="scoreText">Held:</h3>
                        {scoreLinesKeep}
                    </div>
                    <h4 className="keepScoreText">{`Total: ${props.keepResult.score}`}</h4>
                </div>
            </div>
        </div>
    )

}
