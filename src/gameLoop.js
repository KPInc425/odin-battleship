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
    player1.gameboard.placeShip(4, [0,1], 2);
    player1.gameboard.placeShip(3, [0,2], 2);
    player1.gameboard.placeShip(3, [0,3], 2);
    player1.gameboard.placeShip(2, [0,4], 2);

    player2.gameboard.placeShip(5, [5,5], 3);
    player2.gameboard.placeShip(4, [6,5], 3);
    player2.gameboard.placeShip(3, [7,5], 3);
    player2.gameboard.placeShip(3, [4,5], 0);
    player2.gameboard.placeShip(2, [5,8], 3);

    setShips(player1, 0);
    setShips(player2, 1);
    

    return {
        player1,
        player2,
    }

})();

export default newGame;