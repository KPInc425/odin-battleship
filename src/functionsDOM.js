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

const addAttackListeners = (player) => {
    const enemyCoordLocations = document.querySelector('#player2Area').querySelectorAll('.gridLocation');
    console.log(enemyCoordLocations);
    enemyCoordLocations.forEach((coord) => {
        coord.addEventListener('click', (e) => {
            console.log(e.target.textContent);
            let attackHit = player.gameboard.receiveAttack(e.target.getAttribute('data-index'));
            if (attackHit) {
                e.target.textContent = 'X';
            } else {
                e.target.textContent = 'O';
            }
        }, {once: true})
    })
}

export {
    drawGameboards,
    setShips,
    addAttackListeners,
}