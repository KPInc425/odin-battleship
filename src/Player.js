const Player = (name, isAI, boardWidth) => {
    if (isAI) {
        const attackHistory = [];
        const placementHistory = [];
        const lastHitCoords = [];
        const adjacentCoords = [];

        const checkAttackHistory = (attackCoords) => {
            // console.log(attackHistory);
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
            // console.log(placementHistory);
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

            if (adjacentCoords.length > 0) {
                console.log('Need to attack adjacent locations');
                let attackLocation = adjacentCoords.shift();
                console.log("Adjacent Coords");
                console.log(adjacentCoords);
                console.log(attackLocation);
                while (checkAttackHistory(attackLocation)) {
                    if (adjacentCoords.length < 1) {
                        console.log('Get Random Move');
                        attackLocation = randomCoords();
                        return attackLocation;
                    }
                    attackLocation = adjacentCoords.shift();
                }
                console.log(attackLocation);
                attackHistory.push(attackLocation);
                return attackLocation;
            } else {
                let randomLocation = randomCoords();
                attackHistory.push(randomLocation);
                return randomLocation;
            }

        }
        const randomCoords = () => {
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
        const setLastHitCoords = () => {
            console.log(attackHistory);
            lastHitCoords.push(attackHistory[attackHistory.length - 1]);
            console.log(lastHitCoords);
            if (lastHitCoords.length > 1) {
                lastHitCoords.shift();
                adjacentCoords.length = 0;
            }
            setAdjecentCoords();
            console.log(lastHitCoords);
        }
        const setAdjecentCoords = () => {
            const northAdjecent = [lastHitCoords[0][0] - 1, lastHitCoords[0][1]];
            const eastAdjecent = [lastHitCoords[0][0], lastHitCoords[0][1] + 1];
            const southAdjecent = [lastHitCoords[0][0] + 1, lastHitCoords[0][1]];
            const WestAdjecent = [lastHitCoords[0][0], lastHitCoords[0][1] - 1];
            adjacentCoords.push(northAdjecent, eastAdjecent, southAdjecent, WestAdjecent);
            console.log(adjacentCoords);
        }


        return {
            name,
            randomAttackCoords,
            randomPlacementCoords,
            clearNewGame,
            setLastHitCoords,
        }
    } else {
        return {
            name,
        }
    }
}

export default Player;