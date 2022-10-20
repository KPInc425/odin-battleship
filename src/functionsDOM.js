import { checkMultiplayer } from "./gameLoop";

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

        setShips(player1, 1);
        setShips(player2, 2);

        if (multi) {
            console.log("Multiplayer Selected");
            addAttackListeners(player1, 1);
            addAttackListeners(player2, 2);
        } else {
            addAttackListeners(player2, 2);
        }

    }, {once: true})

    mainContainer.appendChild(startButton);
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
    const enemyCoordLocations = document.querySelector(`#player${index}Area`).querySelectorAll('.gridLocation');
    enemyCoordLocations.forEach((coord) => {
        coord.classList.add('coordHover');
        coord.addEventListener('click', (e) => {
            handleAttack(e.target, player, index);
        }, {once: true})
    })
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
    setNarrativeText(`Player${attackingPlayer} sends missles!`)
    setTimeout(() => {
        if (attackHit) {
            setNarrativeText("And it's a Hit!");
            target.textContent = 'X';
            target.classList.remove('coordHover');
        } else {
            setNarrativeText("And it's a Miss...");
            target.textContent = 'O';
            target.classList.remove('coordHover');
        }
    
        if (!checkMultiplayer()) {
            setTimeout(() => {
                setNarrativeText(`${player.character.name} Retaliates!`);
                console.log("AI Attacks!");
                attackedArea.classList.remove('disableClick');
            }, 1000);
        } else {
            console.log(`It is now Player${index}'s turn!`);
        }
    }, 1000);
    // Prevent further attacks
    attackedArea.classList.add('disableClick');
    

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