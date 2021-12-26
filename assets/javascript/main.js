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
    checkIfWinn();
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
        // currentPlayer = 'O';
    } else {
        button.innerHTML = 'O';
        // currentPlayer = 'X';
    }

}
function changePlayer() {

    if (currentPlayer === 'X') {
        currentPlayer = 'O';
    } else {
        currentPlayer = 'X';
    }

}

function checkIfWinn() {
    let btn1 = document.getElementById('btn-tile-1');
    let btn2 = document.getElementById('btn-tile-2');
    let btn3 = document.getElementById('btn-tile-3');
    let btn4 = document.getElementById('btn-tile-4');
    let btn5 = document.getElementById('btn-tile-5');
    let btn6 = document.getElementById('btn-tile-6');
    let btn7 = document.getElementById('btn-tile-7');
    let btn8 = document.getElementById('btn-tile-8');
    let btn9 = document.getElementById('btn-tile-9');

    function winnScenarios(btnA, btnB, btnC) {
        if (btnA.innerHTML === 'X' && btnB.innerHTML === 'X' && btnC.innerHTML === 'X') {
            alert('Vinst');
        }
    }

    winnScenarios(btn1, btn2, btn3);
}

