let currentPlayer = "not assigned";

// Add eventlistener first when DOM is finish loading. 
document.addEventListener("DOMContentLoaded", function () {
    // Eventlistener click for start button
    document.getElementById('start-btn').addEventListener('click', startGame);

    // Eventlisteners click for game board buttons
    let buttons = document.getElementsByClassName('tile-btn');

    for (let button of buttons) {
        button.addEventListener('click', gameBoardBtnClick);
        button.disabled = true; //To make the buttons unclickable before game is started. 
    }

    // Initialize currentPlayer.
    getRandomPlayer();

    // Shows witch player starts playing. 
    let nextPlayer = document.getElementById('player');
    nextPlayer.innerHTML = currentPlayer;
    
});

/**Main function that calls other functions and desides the order they are executed in. 
 * Main function is called every time a button on game board is clicked. */
function gameBoardBtnClick() {
    let button = this;
    button.disabled = true;
    writeOutPlayer(); // Writes out who is next in line
    setPlayerOnBtn(button) // Set player X/O on the button
    checkIfWin(); // Checks if someone has won or if the game is draw
    changePlayer(); // Change player
}

// Randomize which player is first out to play X or O. 
function getRandomPlayer() {
    const players = ['X', 'O'];
    const randomPlayer = Math.floor(Math.random() * players.length);
    currentPlayer = (players[randomPlayer]);
}

// Using the global variable currentPlayer to set the player on the button. 
function setPlayerOnBtn(button) {
    if (currentPlayer === 'X') {
        button.innerHTML = 'X';
    } else {
        button.innerHTML = 'O';
    }
}

// Changes who plays
function changePlayer() {
    if (currentPlayer === 'X') {
        currentPlayer = 'O';
    } else {
        currentPlayer = 'X';
    }
}

// Checks all the differents ways the player can win to se if someone has won.
function checkIfWin() {
    let btn1 = document.getElementById('btn-tile-1');
    let btn2 = document.getElementById('btn-tile-2');
    let btn3 = document.getElementById('btn-tile-3');
    let btn4 = document.getElementById('btn-tile-4');
    let btn5 = document.getElementById('btn-tile-5');
    let btn6 = document.getElementById('btn-tile-6');
    let btn7 = document.getElementById('btn-tile-7');
    let btn8 = document.getElementById('btn-tile-8');
    let btn9 = document.getElementById('btn-tile-9');

    function winScenarios(btnA, btnB, btnC) {
        if (btnA.innerHTML === currentPlayer && btnB.innerHTML === currentPlayer && btnC.innerHTML === currentPlayer) {
            alert(`Congratulations player ${currentPlayer} you won!`);
            restartGame();
            return 1;
        }
        return 0;
    }

    let winCount = 0;

    winCount += winScenarios(btn1, btn2, btn3); // First row horizontal
    winCount += winScenarios(btn4, btn5, btn6); // Second row horizontal
    winCount += winScenarios(btn7, btn8, btn9); // Third row horizontal
    winCount += winScenarios(btn1, btn4, btn7); // First row vertical 
    winCount += winScenarios(btn2, btn5, btn8); // Second row vertical
    winCount += winScenarios(btn3, btn6, btn9); // Second row vertical
    winCount += winScenarios(btn3, btn5, btn7); // Diagonally right to bottom
    winCount += winScenarios(btn1, btn5, btn9); // Diagonally left to bottom

    /**To prevent draw happening if someone wins at the last turn.
     * The checkIfDraw function is only called when someone hasen't won  */
    if (winCount === 0) {
        checkIfDraw();
    }
}

// Hides the start button and make the buttons clickable.
function startGame() {
    document.getElementById('start-btn').style.display = "none";
    let buttons = document.getElementsByClassName('tile-btn');

    for (let button of buttons) {
        button.disabled = false;
    }
}

// Prepare the game for restart by changing name on and reseting buttons. 
function restartGame() {
    let restartButton = document.getElementById('start-btn');
    restartButton.innerHTML = "RESTART";
    restartButton.style.display = "block";
    let buttons = document.getElementsByClassName('tile-btn');

    for (let button of buttons) {
        button.disabled = true;
        button.innerHTML = "";
    }
}

// Checks if every button is claimed. If they are the result is draw. 
function checkIfDraw() {
    let buttons = document.getElementsByClassName('tile-btn');
    let countClickedButtons = 0;

    for (let button of buttons) {

        if (button.disabled === true) {
            countClickedButtons++;
        }
    }

    if (countClickedButtons === 9) {
        alert('Draw!');
        restartGame();
    }
}
// Write out whose turn it is. 
function writeOutPlayer() {
    let nextPlayer = document.getElementById('player');
    if (currentPlayer === 'X') {
        nextPlayer.innerHTML = 'O';
    } else {
        nextPlayer.innerHTML = 'X';
    }
}
