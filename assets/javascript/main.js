let currentPlayer = "not assigned";

// Add eventlistener first when DOM is finish loading. 
document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByClassName('tile-btn');

    for (button of buttons) {
        button.addEventListener('click', gameBoardBtnClick);
    }
    
    // Initialize current player.
    getRandomPlayer();

});

function gameBoardBtnClick () {
    let button = this;
    setPlayerOnBtn(button);
    checkIfWin();
    changePlayer();
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
            alert('Vinst');
        }
    }

    winScenarios(btn1, btn2, btn3); // First row horizontal
    winScenarios(btn4, btn5, btn6); // Second row horizontal
    winScenarios(btn7, btn8, btn9); // Third row horizontal
    winScenarios(btn1, btn4, btn7); // First row vertical 
    winScenarios(btn2, btn5, btn8); // Second row vertical
    winScenarios(btn3, btn6, btn9); // Second row vertical
    winScenarios(btn3, btn5, btn7); // Diagonally right to bottom
    winScenarios(btn1, btn5, btn9); // Diagonally left to bottom
}

