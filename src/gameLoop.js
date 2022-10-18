import Gameboard from "./Gameboard";
import Player from "./Player";
import { drawGameboards, setShips } from "./functionsDOM.js";

const newGame = (() => {
    drawGameboards();

    const player1 = {
        character: Player("KP", false),
        gameboard: Gameboard(10, 10),
    }
    const player2 = {
        character: Player("Robot", true),
        gameboard: Gameboard(10, 10),
    }

    console.log(player1.gameboard.boardLocArray[0]);

    player1.gameboard.placeShip(5, [0,0], 2);
    // player1.gameboard.placeShip(4, [0,1], 1);
    // player1.gameboard.placeShip(3, [0,2], 1);
    // player1.gameboard.placeShip(3, [0,3], 1);
    // player1.gameboard.placeShip(2, [0,4], 1);

    // player2.gameboard.placeShip(5, [5,5], 3);
    // player2.gameboard.placeShip(4, [6,5], 0);
    // player2.gameboard.placeShip(3, [7,5], 0);
    // player2.gameboard.placeShip(3, [4,5], 0);
    // player2.gameboard.placeShip(2, [3,5], 0);

    setShips(player1, 0);
    setShips(player2, 1);
    

    return {
        player1,
        player2,
    }

})();

export default newGame;