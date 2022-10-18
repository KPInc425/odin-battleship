import { Battleship } from "./Battleship.js";

const Gameboard = (sizeX, sizeY) => {
    const x = sizeX;
    const y = sizeY;
    const boardLocArray = [];
    const shipsLocationArray = [];
    const missedAttacks = [];
    const hitAttacks = [];
    const legend = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ]

    // iteration through sizeX + 1, sizeY
    for (let i = 0; i < x; i++) {
        // nest loop iterates through sizeX, sizeY + 1, sizeY
        for (let j = 0; j < y; j++) {
            // push array with x, y, occupied
            boardLocArray.push([i, j, 0]);
        }
    }

    // console.log(boardLocArray);

    // const initializeShipArray = () => {
    //     const shipArray = [
    //         Battleship(5),
    //         Battleship(4),
    //         Battleship(3),
    //         Battleship(3),
    //         Battleship(2), 
    //     ]

    //     return shipArray;
    // }

    // const placeShips = (shipArray) => {
    //     // let placeDirection = [
    //     //     // East
    //     //     [1, 0],
    //     //     // West
    //     //     [-1, 0], 
    //     //     // North
    //     //     [0, 1], 
    //     //     // South
    //     //     [0, -1],
    //     // ]
    //     // loop through ship array
    //         shipArray.forEach((ship) => {
    //             // Get ship length
    //             let length = ship.length;
    //             // get random spot on board
    //             let randomLocation = getRandomLocation();
    //             // check if location is occupied
    //             while (checkOccupied(randomLocation)) {
    //                 randomLocation = getRandomLocation();
    //             }
    //             // get random direction
    //             let direction = Math.floor(Math.random() * 4);

    //             // check direction is clear from obstruction
    //             // if ()
                
    //         })

    //             // if clear place ship
    //             // else chose 1 of remaining directions
    // }

    const receiveAttack = (coords) => {

        let attackLocationIndex = getLocationIndex(coords);
        // Check if attackMove has already been made before
        if (checkAttacks(missedAttacks, attackLocationIndex)) {
            return console.error("You have already missed there!")
        }
        if (checkAttacks(hitAttacks, attackLocationIndex)) {
            return console.error("You have already caused destruction there!")
        }

        // Check if locaiton is occupied by ship
        let attackHit = checkOccupied(attackLocationIndex);

        if (attackHit) {

            let hitShip = getHitShip(attackLocationIndex);
            hitShip.hit();
            console.log(hitShip);
            if (hitShip.isSunk()) {
                console.log(`You have sunk the ${hitShip.shipData.name}`);
                if(checkIfLost()) {
                    console.log("All Ships have been destroyed");
                    return true;
                };
            }
            // console.log(shipsLocationArray);
            // add to successful hits array
            hitAttacks.push(attackLocationIndex);

            return attackHit;
        } else {
            // add to missed hits array
            missedAttacks.push(attackLocationIndex);
            return false;
        }
    }

    const checkIfLost = () => {
        let sunkShips = 0;
        shipsLocationArray.forEach((ship) => {
            if (ship.shipData.isSunk === 1) {
                sunkShips++
            }
        })

        if (sunkShips === shipsLocationArray.length) {
            return true;
        } else {
            return false;
        }
    }

    const getHitShip = (hitIndex) => {
        for (let i = 0; i < shipsLocationArray.length; i++) {
            // console.log(shipsLocationArray[i]);
            let foundShip = shipsLocationArray[i].shipData.location.find(index => index === hitIndex);
            if (foundShip) {
                return shipsLocationArray[i];
            }
        }
    }

    const checkAttacks = (attackArray,index) => {
        for (let i = 0; i < attackArray.length; i++) {
            if (attackArray[i] === index) {
                return true
            }
        }
        return false;
    }

    const placeShip = (shipSize, location, directionIndex, mockShip) => {
        if (shipsLocationArray.length > 4) {
            return console.error("Max ships already placed!");
        }

        if (checkOccupied(getLocationIndex(location))) {
            console.log(location);
            console.log(getLocationIndex(location));
            console.log(checkOccupied(getLocationIndex(location)));
            return console.error("This location is already occupied!");
        }



        
        let ship = mockShip || Battleship(shipSize);
        // console.log(ship);

        const possiblePlacements = checkPossiblePlacements(ship, location);
        // console.log(possiblePlacements);

        // if chosen direction to place is valid
        if (possiblePlacements[directionIndex].indexArray) {
            let placementIndexArray = possiblePlacements[directionIndex].indexArray;
            ship.shipData.location = placementIndexArray;
            // console.log(ship);
            let placementLocations = [];
            // loop through placement location array
            for (let i = 0; i < placementIndexArray.length; i++) {
                // set gameboard location switch to 1
                boardLocArray[placementIndexArray[i]][2] = 1;
                // push set location to array for testing
                placementLocations.push(boardLocArray[placementIndexArray[i]]);
                // console.log(boardLocArray[placementIndexArray[i]]);
            }
            // console.log(placementLocations);
            shipsLocationArray.push(ship);
            return placementLocations;
        } else {
            console.error(`That move is invalid! You cannot move 
            ${possiblePlacements[directionIndex].direction} try again!`)
            return false;
        }
        
    }

    
    const checkOccupied = (index) => {
        // console.log(index);
        // console.log("Occupied Called!");
        
        if (index < 0 || index > boardLocArray.length || index === undefined) {
            console.error("Location is out of bounds!");
            return true;
        } 

        if (boardLocArray[index][2] === 1) {
            return true;
        } else {
            return false;
        }

    }

    const getLocationIndex = (location) => {
        // console.log(location);
        for (let i = 0; i < boardLocArray.length; i++) {
            if (boardLocArray[i][0] === location[0] && boardLocArray[i][1] === location[1]) {
                return i;
            }
        }
    }

    const checkEast = (length, location) => {
        // initialize array to hold location index that aren't occupied
        let indexArray = [getLocationIndex(location)];
        // check all locations in chosen direction, stop at length of ship
        for (let i = 1; i < length; i++) {
            // east = x + 1
            // let tmpLocation = [location[0] + i, location[1]];
            let tmpLocation = [location[0], location[1] + i];
            // if occupied, stop counting direction
            const tmpLocationIndex = getLocationIndex(tmpLocation);
            if (checkOccupied(tmpLocationIndex)) {
                return false;
            }
            // add location to array if empty
            indexArray.push(getLocationIndex(tmpLocation));
        }

        // make sure the whole ship fits
        if (indexArray.length < length) {
            indexArray = [];
            return false;
        } else {
            // if fits, return index array
            return indexArray;
        }  
    }

    const checkWest = (length, location) => {
        // initialize array to hold location index that aren't occupied
        let indexArray = [getLocationIndex(location)];
        // check all locations in chosen direction, stop at length of ship
        for (let i = 1; i < length; i++) {
            // check if out of range
            if ((location[1] - i) < 0) {
                return false;
            }
            let tmpLocation = [location[0], location[1] - i];
            // if occupied, stop counting direction
            const tmpLocationIndex = getLocationIndex(tmpLocation);
            if (checkOccupied(tmpLocationIndex)) {
                return false;
            }
            // add location to array if empty
            indexArray.push(getLocationIndex(tmpLocation));
        }

        // console.log(indexArray);
        // make sure the whole ship fits
        if (indexArray.length < length) {
            indexArray = [];
            return false;
        } else {
            // if fits, return index array
            return indexArray;
        }  
    }

    const checkNorth = (length, location) => {
        // initialize array to hold location index that aren't occupied
        let indexArray = [getLocationIndex(location)];
        // check all locations in chosen direction, stop at length of ship
        for (let i = 1; i < length; i++) {
            // check if out of range
            if ((location[0] - i) < 0) {
                return false;
            }
            let tmpLocation = [location[0] - i, location[1]];
            const tmpLocationIndex = getLocationIndex(tmpLocation);
            // if occupied, stop counting direction
            if (checkOccupied(tmpLocationIndex)) {
                return false;
            }
            // add location to array if empty
            indexArray.push(getLocationIndex(tmpLocation));
        }

        // make sure the whole ship fits
        if (indexArray.length < length) {
            indexArray = [];
            return false;
        } else {
            // if fits, return index array
            return indexArray;
        } 
    }

    const checkSouth = (length, location) => {
        // initialize array to hold location index that aren't occupied
        let indexArray = [getLocationIndex(location)];
        // check all locations in chosen direction, stop at length of ship
        for (let i = 1; i < length; i++) {
            // south = y + i
            // let tmpLocation = [location[0], location[1] + i];
            let tmpLocation = [location[0] + i, location[1]];
            const tmpLocationIndex = getLocationIndex(tmpLocation);
            // if occupied, stop counting direction
            if (checkOccupied(tmpLocationIndex)) {
                return false;
            }
            // add location to array if empty
            indexArray.push(getLocationIndex(tmpLocation));
        }

        // make sure the whole ship fits
        if (indexArray.length < length) {
            indexArray = [];
            return false;
        } else {
            // if fits, set occupy switch for locations
            return indexArray;
        }  
    }

    const checkPossiblePlacements = (ship, location) => {
        let possibleMoves = [];
        let northIndexArray = checkNorth(ship.shipData.length, location);
        let eastIndexArray = checkEast(ship.shipData.length, location);
        let southIndexArray = checkSouth(ship.shipData.length, location);
        let westIndexArray = checkWest(ship.shipData.length, location);
        
        if (northIndexArray) {
            possibleMoves.push({ direction: "north", indexArray: northIndexArray });
        } else {
            possibleMoves.push({ direction: "north", indexArray: false });
        }
        if (eastIndexArray) {
            possibleMoves.push({ direction: "east", indexArray: eastIndexArray });
        } else {
            possibleMoves.push({ direction: "east", indexArray: false });
        }
        if (southIndexArray) {
            possibleMoves.push({ direction: "south", indexArray: southIndexArray });
        } else {
            possibleMoves.push({ direction: "south", indexArray: false });

        }
        if (westIndexArray) {
            possibleMoves.push({ direction: "west", indexArray: westIndexArray });
        } else {
            possibleMoves.push({ direction: "west", indexArray: false });

        }

        // console.log(possibleMoves);
        return possibleMoves;
    }

    return {
        boardLocArray,
        shipsLocationArray,
        // initializeShipArray,
        // getRandomLocation,
        placeShip,
        receiveAttack,
        checkIfLost,
    };
}



export default Gameboard;