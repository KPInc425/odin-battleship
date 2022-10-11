const Player = (name, isAI, boardWidth) => {
    if (isAI) {
        const attackHistory = [];

        const checkAttackHistory = (attackCoords) => {
            console.log(attackHistory);
            for (let i = 0; i < attackHistory.length; i++) {
                if (attackCoords[0] === attackHistory[i][0] &&
                    attackCoords[1] === attackHistory[i][1]) {
                    console.error("Already Attacked Here!");
                    return true;
                }
            }
            return false;
        }
        const randomAttackCoords = () => {
            // get Max number from last location
            const maxNumber = boardWidth || 9;
            let x = Math.floor(Math.random() * maxNumber);
            let y = Math.floor(Math.random() * maxNumber);
            let randomLocation = [x, y];
            while (checkAttackHistory(randomLocation)) {
                x = Math.floor(Math.random() * maxNumber);
                y = Math.floor(Math.random() * maxNumber);
                randomLocation = [x,y];
            }
            attackHistory.push(randomLocation);
            return randomLocation;
        }

        return {
            name: name,
            randomAttack: randomAttackCoords,
        }
    } else {
        return {
            name: name,
        }
    }
}

export default Player;