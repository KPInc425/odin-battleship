const Player = (name, isAI, boardWidth) => {
    if (isAI) {
        const attackHistory = [];
        const placementHistory = [];

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
        const checkPlacementHistory = (placementCoords) => {
            console.log(placementHistory);
            for (let i = 0; i < placementHistory.length; i++) {
                if (placementCoords[0] === placementHistory[i][0] &&
                    placementCoords[1] === placementHistory[i][1]) {
                    console.error("Already tried to place Here!");
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
        const randomPlacementCoords = () => {
            // get Max number from last location
            const maxNumber = boardWidth || 9;
            let x = Math.floor(Math.random() * maxNumber);
            let y = Math.floor(Math.random() * maxNumber);
            let randomLocation = [x, y];
            while (checkPlacementHistory(randomLocation)) {
                x = Math.floor(Math.random() * maxNumber);
                y = Math.floor(Math.random() * maxNumber);
                randomLocation = [x,y];
            }
            placementHistory.push(randomLocation);
            return randomLocation;
        }

        const clearNewGame = () => {
            attackHistory.length = 0;
            placementHistory.length = 0;
        }

        return {
            name,
            randomAttackCoords,
            randomPlacementCoords,
            clearNewGame,
        }
    } else {
        return {
            name,
        }
    }
}

export default Player;