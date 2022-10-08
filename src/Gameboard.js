import { Battleship } from "./Battleship.js";

const Gameboard = (sizeX, sizeY) => {
    const x = sizeX;
    const y = sizeY;
    const boardLocArray = [];
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

    const placeShip = (shipSize, location, directionIndex) => {
        let ship = Battleship(shipSize);
        // console.log(ship);

        const possiblePlacements = checkPossiblePlacements(ship, location);
        console.log(possiblePlacements);

        if (possiblePlacements[directionIndex].indexArray) {
            // loop through placement location array
            let placementIndexArray = possiblePlacements[directionIndex].indexArray;
            // console.log(placementIndexArray);
            let placementLocations = [];
            for (let i = 0; i < placementIndexArray.length; i++) {
                // set gameboard location switch to 1
                boardLocArray[placementIndexArray[i]][2] = 1;
                // push set location to array for testing
                placementLocations.push(boardLocArray[placementIndexArray[i]]);
                // console.log(boardLocArray[placementIndexArray[i]]);
            }
            // console.log(placementLocations);
            return placementLocations;
        } else {
            console.error(`That move is invalid! You cannot move 
            ${possiblePlacements[directionIndex].direction} try again!`)
            return false;
        }
        
    }

    const getRandomLocation = () => {
        // get Max number from last location
        const maxNumber = boardLocArray[boardLocArray.length - 1][0];
        const x = Math.floor(Math.random() * maxNumber);
        const y = Math.floor(Math.random() * maxNumber);
        let randomLocation = [x, y];
        return randomLocation;
    }
    
    const checkOccupied = (location) => {
        // console.log(location);
        const index = getLocationIndex(location);
        // console.log(index);
        if (index) {
            if (boardLocArray[index][2] === 1) {
                return true;
            } else {
                return false;
            }
        } else {
            console.error("Location is out of bounds!");
            return true;
        }

    }

    const getLocationIndex = (location) => {
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
            let tmpLocation = [location[0] + i, location[1]];
            // if occupied, stop counting direction
            if (checkOccupied(tmpLocation)) {
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
            // west = x - i
            let tmpLocation = [location[0] - i, location[1]];
            // if occupied, stop counting direction
            if (checkOccupied(tmpLocation)) {
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
            // north = y - i
            let tmpLocation = [location[0], location[1] - i];
            // if occupied, stop counting direction
            if (checkOccupied(tmpLocation)) {
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
            // indexArray.forEach((index) => {
            //     boardLocArray[index][2] = 1;
            // })
            return indexArray;
        } 
    }

    const checkSouth = (length, location) => {
        // initialize array to hold location index that aren't occupied
        let indexArray = [getLocationIndex(location)];
        // check all locations in chosen direction, stop at length of ship
        for (let i = 1; i < length; i++) {
            // south = y + i
            let tmpLocation = [location[0], location[1] + i];
            // if occupied, stop counting direction
            if (checkOccupied(tmpLocation)) {
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
        return possibleMoves;
    }

    return {
        boardLocArray,
        // initializeShipArray,
        getRandomLocation,
        placeShip,
    };
}



export default Gameboard;