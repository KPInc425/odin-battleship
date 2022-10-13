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

    player1.gameboard.placeShip(5, [0,0], 2);
    player1.gameboard.placeShip(4, [9,9], 0);
    player1.gameboard.placeShip(3, [5,5], 2);
    player1.gameboard.placeShip(3, [7,0], 1);
    player1.gameboard.placeShip(2, [0,9], 0);

    player2.gameboard.placeShip(5, [0,0], 2);
    player2.gameboard.placeShip(4, [9,9], 0);
    player2.gameboard.placeShip(3, [5,5], 2);
    player2.gameboard.placeShip(3, [7,0], 1);
    player2.gameboard.placeShip(2, [0,9], 0);

    setShips(player1, 0);
    

    return {
        player1,
        player2,
    }

})();

export default newGame;