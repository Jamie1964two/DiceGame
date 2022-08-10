//const keeparray = [2,4,6,2,2,1];

export default function calculateScore(diceArray) {

    
    const fullArray = diceArray.filter(x => !x.fixed).map( x => x.value );
    const keepArray = diceArray.filter(x => !x.fixed).filter(x => x.keep).map( x => x.value );
    
    //let keeparray = [...diceArray];

    function workOutScore(array) {

        array.sort();

        let count = [0,0,0,0,0,0];

        for(let i = 0; i < array.length; i++) {
            count[array[i]-1] = count[array[i]-1] + 1;
        }

        let scoreString = "";
        const numberArray = ["one","two","three","four","five","six"];
        const numbersArray = ["ones","twos","threes","fours","fives","sixes"];
        let scoreValue = 0;

        for(let i = 0; i < count.length; i++) {
            // deal with ones
            if((i+1) === 1) {
                if(count[i] > 0 && count[i]<=2 ) {
                scoreString = `${count[i]} ` + (count[i]>1 ? `${numbersArray[i]}` : `${numberArray[i]}` ) + ` (${(i+1)*100}) `
                // (scoreString === "") ? "" : (`${scoreString}, `) +  
                scoreValue += count[i]*100;
                }
            }
            // deal with 5's
            if((i+1) === 5) {
                if(count[i] > 0 && count[i] <= 2) {
                scoreString = scoreString + `${count[i]} ` + (count[i]>1 ? `${numbersArray[i]}` : `${numberArray[i]}`) + ` (${count[i]*50}) `
                scoreValue += count[i]*50;
                }
            }
            // deal with triples except 1
            if(count[i] > 2 && (i+1) != 1) {
                scoreString = scoreString + `${count[i]}` + ` ${numbersArray[i]}` + ` (${(i+1)*100*(count[i]-2)}) `
                scoreValue += (i+1)*100*(count[i]-2)
            }
            // deal with triple ones
            if((i+1) === 1 && count[i] === 3 )  {
                scoreString = scoreString + `${count[i]} ${numbersArray[i]} (${(i+1)*1000*(count[i]-2)}) `
                scoreValue += (i+1)*1000*(count[i]-2);
            }
        }

        return {"score" : scoreValue, "scoreString" : scoreString}

    }

    const fullResult = workOutScore(fullArray);
    const keepResult = workOutScore(keepArray);

    if(fullResult.score === 0){
        return "No score - You're FARKLED!"
    } else {
        return `Select at least one scoring combination then Reroll or Bank ${keepResult.scoreString} ${keepResult.score >0 ? keepResult.score : "" }`
    }
    
    // return (
    //     `${scoreString}\n Total: ${scoreValue} `
    // )
}