import { checkMultiplayer, player1, player2 } from "./gameLoop";

const newGameButton = (player1, player2, multi) => {
    // Get Content container
    const mainContainer = document.querySelector('.content');
    // Create startButton container
    const startButton = document.createElement('button');
    startButton.id = 'startButton';
    startButton.textContent = "Start New Game";
    startButton.value = "Start New Game";

    startButton.addEventListener('click', () => {
        console.log('click');
        startButton.classList.add('hidden');
        placeShipsDOM(player1, player2, 0, 0);
        // player1.gameboard.placeShip(5, [0,0], 2);
        // player1.gameboard.placeShip(4, [0,1], 2);
        // player1.gameboard.placeShip(3, [0,2], 2);
        // player1.gameboard.placeShip(3, [0,3], 2);
        // player1.gameboard.placeShip(2, [0,4], 2);
    
        // player2.gameboard.placeShip(5, [5,5], 3);
        // player2.gameboard.placeShip(4, [6,5], 3);
        // player2.gameboard.placeShip(3, [7,5], 3);
        // player2.gameboard.placeShip(3, [4,5], 0);
        // player2.gameboard.placeShip(2, [5,8], 3);

        // setShips(player1, 1);
        // setShips(player2, 2);

        // if (multi) {
        //     console.log("Multiplayer Selected");
        //     addAttackListeners(player1, 1);
        //     addAttackListeners(player2, 2);
        // } else {
        //     addAttackListeners(player2, 2);
        // }

    }, {once: true})

    mainContainer.appendChild(startButton);
}

const placeShipsDOM = (player1, player2, random, multi) => {
    if (random) {
        // randomly set all ships
    } else {
        if (multi) {
            //add placement listeners for player1
            // allow player1 to place ships

            // then place listeners for player2
            // allow player2 to place ships
        } else {
             //add placement listeners for player1
            addPlacementListeners(player1, 1);

        }
    }
}

const drawNarrativeBoard = () => {
    // Get Content container
    const mainContainer = document.querySelector('.content');
    // Create narrative board container
    const narrativeBoard = document.createElement('div');
    narrativeBoard.classList.add('narrativeBoard');
    // Create narrative text
    const narrativeText = document.createElement('p');
    narrativeText.textContent = "Welcome to BattleShip";
    // append elements
    narrativeBoard.appendChild(narrativeText);
    mainContainer.appendChild(narrativeBoard);
}

const drawGameboards = () => {
    const legend = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ]
    // Get content container
    const mainContainer = document.querySelector('.content');

    // create container element for gameBoards
    const boardsContainer = document.createElement('div');
    boardsContainer.classList.add('playArea');

    // create grid Alpha label container 
    const gridAlphaLabels1 = document.createElement('div');
    gridAlphaLabels1.classList.add('alphaGridContainer');

    // create grid Num label container 
    const gridNumLabels1 = document.createElement('div');
    gridNumLabels1.classList.add('numGridContainer');

    // create MAIN grid container for player1
    const player1Grid = document.createElement('div');
    player1Grid.classList.add('gridContainer');
    player1Grid.id = "player1Area";

    // create player1 play area grid container
    const player1PlayArea = document.createElement('div');
    player1PlayArea.classList.add('gridPlayerArea');

    // create/append Gameboard labels
    for (let i = 0; i < 10; i++) {
        let gridLabel = document.createElement('div');
        gridLabel.classList.add('gridLabelAlpha');
        gridLabel.textContent = legend[i];
        gridAlphaLabels1.appendChild(gridLabel);
    }

    for (let i = 0; i < 10; i++) {
        let gridLabel = document.createElement('div');
        gridLabel.classList.add('gridLabelNum');
        gridLabel.textContent = i + 1;
        gridNumLabels1.appendChild(gridLabel);
    }

    // loop through gameboard
    for (let i = 0; i < 100; i++) {
        //create gridItem for each gameboard location
        let gridItem = document.createElement('div');
        gridItem.classList.add('gridLocation');
        gridItem.setAttribute('data-index', i);
        // gridItem.textContent = "X";
        // append gridItem to grid container
        player1PlayArea.appendChild(gridItem);
    }

    // append newly created elements to main player container
    player1Grid.appendChild(gridAlphaLabels1);
    player1Grid.appendChild(gridNumLabels1);
    player1Grid.appendChild(player1PlayArea);

    // create MAIN grid container for player2
    const player2Grid = document.createElement('div');
    player2Grid.classList.add('gridContainer');
    player2Grid.id = "player2Area";

    // Add Gameboard labels
    const gridAlphaLabels2 = gridAlphaLabels1.cloneNode(true);
    const gridNumLabels2 = gridNumLabels1.cloneNode(true);
    const player2PlayArea = player1PlayArea.cloneNode(true);

    // append newly created elements to main player container
    player2Grid.appendChild(gridAlphaLabels2);
    player2Grid.appendChild(gridNumLabels2);
    player2Grid.appendChild(player2PlayArea);

    // Add to DOM
    boardsContainer.appendChild(player1Grid);
    boardsContainer.appendChild(player2Grid);
    mainContainer.appendChild(boardsContainer);
}

const setShips = (player, playerIndex) => {
    // get player area
    const playerContainer = document.querySelector(`#player${playerIndex}Area`);
    // get player coord location area
    const playAreaNodeList = playerContainer.querySelectorAll('.gridLocation');

    // loop through each ship
    player.gameboard.shipsLocationArray.forEach((ship) => {
        // loop through each ship coord
        for (let i = 0; i < ship.shipData.location.length; i++) {
            // find locaiton in DOM
            let tmpLocation = findNode(playAreaNodeList, ship.shipData.location[i]);
            // set class for DOM display
            tmpLocation.classList.add('shipLocation');
        }
    })
}

const findNode = (nodeList, index) => {
    for (let i = 0; i < nodeList.length; i++) {
        if (Number(nodeList[i].getAttribute('data-index')) === index) {
            return nodeList[i];
        }
    }
}

const addAttackListeners = (player, index) => {
    console.log(player);
    const playerCoordLocations = document.querySelector(`#player${index}Area`).querySelectorAll('.gridLocation');
    playerCoordLocations.forEach((coord) => {
        coord.classList.add('coordHoverAttack');
        coord.addEventListener('click', (e) => {
            handleAttack(e.target, player, index);
        }, {once: true})
    })
}
const addPlacementListeners = (player, index) => {
    console.log(player);
    const playerCoordLocations = document.querySelector(`#player${index}Area`).querySelectorAll('.gridLocation');
    playerCoordLocations.forEach((coord) => {
        coord.classList.add('coordHoverPlace');
        coord.addEventListener('click', (e) => {
            console.log('click');
            const chosenCoord = document.querySelector('.chosenLocation');
            // remove buttons and chosenLocation if exists
            if (chosenCoord) {
                chosenCoord.innerHTML = '';
                chosenCoord.classList.remove('chosenLocation');
            }
            // add arrow buttons in all directions from location
            console.log(e.target);
            e.target.classList.add('chosenLocation');
            e.target.classList.remove('coordHoverPlace');
            createDirectionButtons(e.target);
        }, {once: true})
    })
}

const createDirectionButtons = (parent) => {
    // direction legend
    const directions = [
        {
            direction: 0,
            symbol: '↑',
        },
        {
            direction: 1,
            symbol: '→',
        },
        {
            direction: 2,
            symbol: '↓',
        },
        {
            direction: 3,
            symbol: '←',
        },        
    ];
    for (let i = 0; i < 4; i++) {
        const tmpDirectionButton = document.createElement('button');
        tmpDirectionButton.classList.add(`direction${i}Button`);
        tmpDirectionButton.classList.add(`buttonDirection`);
        tmpDirectionButton.textContent = directions[i].symbol;
        tmpDirectionButton.setAttribute('data-direction', directions[i].direction);
        tmpDirectionButton.addEventListener('click', (e) => {
            placeChosenDirection(e.target.getAttribute('data-direction'));
            // Remove buttons
            const chosenCoord = document.querySelector('.chosenLocation');
            chosenCoord.innerHTML = '';
            chosenCoord.classList.remove('chosenLocation');

        })
        parent.appendChild(tmpDirectionButton);
    }
}

const placeChosenDirection = (chosenDirection) => {
    console.log(chosenDirection);

}

const handleAttack = (target, player, index) => {
    console.log(target);
    let attackedArea = document.querySelector(`#player${index}Area`);
    let attackingPlayer;
    if (index === 1) {
        attackingPlayer = 2;
    } else {
        attackingPlayer = 1;
    }
    // Try attack and save result
    let attackHit = player.gameboard.receiveAttack(target.getAttribute('data-index'));
    setNarrativeText(`${player1.character.name} sends missles!`)
    setTimeout(() => {
        setAttackIcon(attackHit, target);
        if (!checkMultiplayer()) {
            if (player1.gameboard.checkIfLost()) {
                setNarrativeText(`${player2.character.name} Has sunk all of ${player1.character.name}'s Ships!`);
                setTimeout(() => {
                    setNarrativeText(`${player2.character.name} Wins!`)
                }, 1000)
            } else if (player2.gameboard.checkIfLost()) {
                setNarrativeText(`${player1.character.name} Has sunk all of ${player2.character.name}'s Ships!`);
                setTimeout(() => {
                    setNarrativeText(`${player1.character.name} Wins!`)
                }, 1000)                         
            } else {
                setTimeout(() => {
                    setNarrativeText(`${player2.character.name} Retaliates!`);
                    console.log("AI Attacks!");
                    setTimeout(() => {
                        // Call player2 random attack, attack player1
                        setNarrativeText(`${player.character.name} sends a missle!`);
                        setTimeout(() => {
                            let aiAttackCoords = player2.character.randomAttack();
                            let aiAttackHit = player1.gameboard.receiveAttack(aiAttackCoords);
        
                            // get attack coord index
                            let aiAttackIndex = player1.gameboard.getLocationIndex(aiAttackCoords);
                            let player1NodeList = document.querySelector('#player1Area').querySelector('.gridPlayerArea').querySelectorAll('.gridLocation');
                            // console.log(player1NodeList);
                            console.log(aiAttackIndex);
                            for (let i = 0; i < player1NodeList.length; i++) {
                                // console.log(player1NodeList[i].getAttribute('data-index'));
        
                                if (Number(player1NodeList[i].getAttribute('data-index')) === aiAttackIndex) {
                                    console.log(player1NodeList[i]);
                                    setAttackIcon(aiAttackHit, player1NodeList[i]);
                                    setTimeout(() => {
                                        setNarrativeText(`${player1.character.name}'s turn to attack!`);
                                        attackedArea.classList.remove('disableClick');
                                    }, 500)
                                    return;
                                }
                            }
                        }, 500)
                    }, 500)
                }, 500);
            }
        } else {
            console.log(`It is now Player${index}'s turn!`);
        }
    }, 500);
    // Prevent further attacks
    attackedArea.classList.add('disableClick');
    

}

const setAttackIcon = (attackHit, target) => {
    if (attackHit) {
        setNarrativeText("And it's a Hit!");
        target.textContent = 'X';
        target.classList.remove('coordHover');
    } else {
        setNarrativeText("And it's a Miss...");
        target.textContent = 'O';
        target.classList.remove('coordHover');
    }
}

const setNarrativeText = (inputText) => {
    const narrativeText = document.querySelector('.narrativeBoard p');
    narrativeText.textContent = inputText;
}

export {
    drawNarrativeBoard,
    drawGameboards,
    newGameButton,
    setShips,
    addAttackListeners,
}