import Gameboard from "./Gameboard";
import Player from "./Player";
import { addAttackListeners, drawGameboards, drawNarrativeBoard, newGameButton, setShips } from "./functionsDOM.js";


let currentPlayer = 1;
let multiplayer = 0;
let gameStarted = 0;
const player1 = {
    character: Player("KP", false),
    gameboard: Gameboard(10, 10),
}
const player2 = {
    character: Player("Robot", true),
    gameboard: Gameboard(10, 10),
}

const newGame = (() => {
    const mainContainer = document.querySelector('.content');
    drawNarrativeBoard();

    mainContainer.appendChild(drawGameboards());
    


    // multiplayer = 1;
    newGameButton(player1, player2, multiplayer);

    
})();

const checkMultiplayer = () => {
    return multiplayer;
}

const checkCurrentPlayer = () => {
    return currentPlayer;
}

const setCurrentPlayer = (playerIndex) => {
    currentPlayer = playerIndex;
}

export {
    newGame,
    currentPlayer,
    checkMultiplayer, 
    player1,
    player2,
} 