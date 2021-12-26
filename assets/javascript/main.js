let currentPlayer = "not assigned";

//Add eventlistener first when DOM is finish loading. 
document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByClassName('tile-btn')

    for (button of buttons) {
        button.addEventListener('click', setPlayerOnBtn);
    }

});


// Using the global variable currentPlayer to set the player on the button. 
 
function setPlayerOnBtn() {

    if (currentPlayer === 'X') {
        this.innerHTML = 'X';
        currentPlayer = 'O';
    } else {
        this.innerHTML = 'O';
        currentPlayer = 'X';
    }

}

// Randomize which player is first out to play X or O. 
function getRandomPlayer() {
    const players = ['X', 'O'];
    const randomPlayer = Math.floor(Math.random() * players.length);
    currentPlayer = (players[randomPlayer]);
}

getRandomPlayer();