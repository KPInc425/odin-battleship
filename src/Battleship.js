const Battleship = (length, hits, sunk, name) => {
    // console.log("Make BattleShip!");
    const shipData = {
        length: length,
        hits: hits || 0,
        sunk: sunk || false,
        name: name || "Battleship",
        location: null,
    }

    const hit = () => {
        shipData.hits += 1;
        return shipData.hits;
    }

    const isSunk = () => {
        if (shipData.hits >= shipData.length ) {
            shipData.sunk = true;
            return true;
        } else {
            return false;
        }
    }

    return {
        shipData,
        hit,
        isSunk,
    }
}

export {
    Battleship,
}