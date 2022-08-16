

export default function calcScore(array) {

    array.sort();

    let count = [0, 0, 0, 0, 0, 0];

    for (let i = 0; i < array.length; i++) {
        count[array[i] - 1] = count[array[i] - 1] + 1;
    }

    let scoreString = [];
    const numberArray = ["one", "two", "three", "four", "five", "six"];
    const numbersArray = ["ones", "twos", "threes", "fours", "fives", "sixes"];
    let scoreValue = 0;

    for (let i = 0; i < count.length; i++) {
        // deal with ones
        if ((i + 1) === 1) {
            if (count[i] > 0 && count[i] <= 2) {
                scoreString.push(`${count[i]} ` + (count[i] > 1 ? `${numbersArray[i]}` : `${numberArray[i]}`) + ` = ${count[i] * (i + 1) * 100}`)
                scoreValue += count[i] * 100;
            }
        }
        // deal with 5's
        if ((i + 1) === 5) {
            if (count[i] > 0 && count[i] <= 2) {
                scoreString.push(`${count[i]} ` + (count[i] > 1 ? `${numbersArray[i]}` : `${numberArray[i]}`) + ` = ${count[i] * 50}`)
                scoreValue += count[i] * 50;
            }
        }
        // deal with triples except 1
        if (count[i] > 2 && (i + 1) != 1) {
            scoreString.push(`${count[i]}` + ` ${numbersArray[i]}` + ` = ${(i + 1) * 100 * (count[i] - 2)}`)
            scoreValue += (i + 1) * 100 * (count[i] - 2)
        }
        // deal with triple ones
        if ((i + 1) === 1 && count[i] === 3) {
            scoreString.push(`${count[i]} ${numbersArray[i]} = ${(i + 1) * 1000 * (count[i] - 2)}`)
            scoreValue += (i + 1) * 1000 * (count[i] - 2);
        }
    }

    //console.log("score"+ scoreValue, "scoreString" + scoreString )
    return { "score": scoreValue, "scoreString": scoreString }

}
