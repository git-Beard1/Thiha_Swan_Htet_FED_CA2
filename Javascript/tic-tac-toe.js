window.addEventListener('DOMContentLoaded', () => {

    const playerDisplay = document.querySelector('.display-player'); // link with display-player class
    const resetButton = document.querySelector('#reset'); // link with reset button
    const winner = document.querySelector('.winner'); // link with winner class

    let board = ['', '', '', '', '', '', '', '', '']; // array of 9 empty strings for board creation
    let currentPlayer = 'X'; // set current player to X
    let isGameActive = true; // status of game, set to true

    const PLAYERX_WON = 'PLAYERX_WON'; // constant for player X won
    const PLAYERO_WON = 'PLAYERO_WON'; // constant for player O won
    const TIE = 'TIE'; // constant for tie

    const boardSection = document.querySelector('.board'); // link with board class 
    const boardSize = 3; // board size is 3x3, with 9 tiles, later will be looped to create 9 tiles
    const tiles = []; // array of tiles

    // Function to create a tile and add click event listener
    function createTile() {
        const tile = document.createElement('div'); // create a div element
        tile.classList.add('tile'); // add class tile to the div element
        tile.addEventListener('click', () => userAction(tile, tiles.indexOf(tile))); 
        // tiles store references to the tile element, tiles.index find the clicked tile's index
        return tile;
    }

    // Generate tiles and append them to the board section
    for (let i = 0; i < boardSize ** 2; i++) { // loop 9 times to create 9 tiles
        const tile = createTile();
        tiles.push(tile); // add the tile to the tiles array
        boardSection.appendChild(tile); // append the tile to the board section
    }

    const winningConditions = [
        [0, 1, 2],[3, 4, 5],[6, 7, 8], // winning conditions for horizontal rows
        [0, 3, 6],[1, 4, 7],[2, 5, 8], // winning conditions for vertical columns
        [0, 4, 8],[2, 4, 6] // winning conditions for diagonal lines
    ];

    function handleResultValidation() {
        let roundWon = false; // set roundWon to false
        for (let i = 0; i <= 7; i++) { // loop 8 times for 8 winning conditions
            const winCondition = winningConditions[i]; // set winCondition to winningConditions[i]
            const a = board[winCondition[0]]; // set a to board[winCondition[0]]
            const b = board[winCondition[1]]; // set b to board[winCondition[1]]
            const c = board[winCondition[2]]; // set c to board[winCondition[2]]
            if (a === '' || b === '' || c === '') { // if a or b or c is empty string, continue, if there is no winner
                continue;
            }
            if (a === b && b === c) { // if a is equal to b and b is equal to c, there is a winner
                roundWon = true; // set roundWon to true
                break; // break the loop
            }
        }

    if (roundWon) { // if roundWon is true, if won,
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON); // announce the winner
            isGameActive = false; // set isGameActive to false, stops the game
            return; 
        }

    if (!board.includes(''))  // if board does not include empty string, if tie,
        announce(TIE); // announce tie
    }

    const announce = (type) => { // announce the winner
        switch(type){
            case PLAYERO_WON: // if player O won,
                winner.innerHTML = 'Player <span class="playerO">O</span> Won'; // display player O won
                break;
            case PLAYERX_WON: // if player X won,
                winner.innerHTML = 'Player <span class="playerX">X</span> Won'; // display player X won
                break;
            case TIE: // if tie,
                winner.innerText = 'Tie'; // display tie
        }
        winner.classList.remove('hide'); // remove hide class from winner
    };

    const isValidAction = (tile) => { // check if the tile is empty
        if (tile.innerText === 'X' || tile.innerText === 'O'){ // if tile is not empty,
            return false;
        }

        return true;
    };

    const updateBoard =  (index) => { // update the board
        board[index] = currentPlayer; // set board[index] to currentPlayer
    }

    const changePlayer = () => { // change player
        playerDisplay.classList.remove(`player${currentPlayer}`); // remove class playerX or playerO from playerDisplay
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // if currentPlayer is X, change to O, else change to X
        playerDisplay.innerText = currentPlayer; // display currentPlayer
        playerDisplay.classList.add(`player${currentPlayer}`); // add class playerX or playerO to playerDisplay
    }

    const userAction = (tile, index) => { // user action
        if(isValidAction(tile) && isGameActive) { // if the tile is empty and the game is active,
            tile.innerText = currentPlayer; // display currentPlayer on the tile
            tile.classList.add(`player${currentPlayer}`); // add class playerX or playerO to the tile
            updateBoard(index); // update the board
            handleResultValidation(); // check if there is a winner
            changePlayer(); // change player
        }
    }
    
    const resetBoard = () => { // reset the board
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true; // set isGameActive to true, game starts again
        winner.classList.add('hide'); // add hide class to winner to hide it

        if (currentPlayer === 'O') { // if currentPlayer is O, change to X
            changePlayer(); // change player
        }

        tiles.forEach(tile => { // loop through tiles
            tile.innerText = ''; // set tile to empty string
            tile.classList.remove('playerX'); // remove class playerX from tile
            tile.classList.remove('playerO'); // remove class playerO from tile
        });
    }

    tiles.forEach( (tile, index) => { // loop through tiles
        tile.addEventListener('click', () => userAction(tile, index)); // add click event listener to each tile
    });

    resetButton.addEventListener('click', resetBoard); // add click event listener to reset board when reset button is clicked
});