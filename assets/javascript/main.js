
let buttons = document.getElementsByClassName('tile-btn')

for (button of buttons) {
    button.addEventListener('click', showButton);
}


function setPlayerOnBtn() {
    this.innerHTML = "X";

}

// Randomize which player if first out to play X or O. 
function getRandomPlayers() {
    const players = ['X', 'O'];
    const randomPlayer = Math.floor(Math.random() * players.length);
    console.log(players[randomPlayer]);

}

getRandomPlayers();