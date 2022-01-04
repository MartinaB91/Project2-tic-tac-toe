let currentPlayer = "not assigned";
let winnerIntervalId; 

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
    writeOutPlayer(true);
  
});

/**Main function that calls other functions and desides the order they are executed in. 
 * Main function is called every time a button on game board is clicked. */
function gameBoardBtnClick() {
    let button = this;
    button.disabled = true; // For making button once clicked not clickable. 
    writeOutPlayer(false); // Writes out who is next in line
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
        button.classList.add('xBtn'); // Add a class to pressed button. Class used to style button in css. 
    } else {
        button.innerHTML = 'O';
        button.classList.add('oBtn'); // Add a class to pressed button. Class used to style button in css. 
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
            btnA.style.backgroundColor = 'rgb(221, 190, 169)'; // Shows the winning scenario by giving it a color. 
            btnB.style.backgroundColor = 'rgb(221, 190, 169)';
            btnC.style.backgroundColor = 'rgb(221, 190, 169)';
            winBtnAnimation(btnA,btnB,btnC);
            setScoreCountWinner();
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

// Hides the start/restart button, reset the buttons and make the buttons clickable. 
function startGame() {
    let startButton = document.getElementById('start-btn');

    /** Removes the start button if it exists, if the start buttons is null 
     * (doesent't exist) remove the restart button. 
     * https://stackoverflow.com/questions/2647867/how-can-i-determine-if-a-variable-is-undefined-or-null*/
    if (startButton !== null) { 
        startButton.style.display = 'none';
    } 
    if(startButton == null) { 
        let restartButton = document.getElementById('restart-btn');
        restartButton.style.display = 'none';
    }
    
    let buttons = document.getElementsByClassName('tile-btn');

    for (let button of buttons) {
        button.disabled = true;
        button.innerHTML = "";
        button.style.boxShadow = 'none';
        button.style.backgroundColor = '#FFE8D6';
         // Clear interval in winBtnAnimation function. 
         // Found solution on: https://www.w3schools.com/jsref/met_win_clearinterval.asp
        clearInterval(winnerIntervalId); // Removes blinking effects.
        button.classList.remove('xBtn', 'oBtn'); // Removes classes xBtn and oBtn added in function setPlayerOnBtn. 
        // Found solution : https://developer.mozilla.org/en-US/docs/Web/API/Element/classList. 
    }

    for (let button of buttons) {
        button.disabled = false;
    }
}

// Prepare the game for restart by changing name on button. 
function restartGame() {
    let startButton = document.getElementById('start-btn');
    let restartButton = document.getElementById('restart-btn');
    if (startButton !== null) { 
        startButton.id = 'restart-btn'; // If start-btn exist rename it to restart-btn.
        startButton.innerHTML = "RESTART";
        startButton.style.display = "block";
        document.getElementById('restart-btn').addEventListener('click', startGame); // Because the button have changed id 
        //a new event listener that listens for the new id is needed. 
    } 
    if (restartButton !== null) {
        restartButton.style.display = "block";
    }
    let buttons = document.getElementsByClassName('tile-btn'); // For making buttons unclickable when player has won. 
    for (let button of buttons) {
        button.disabled = true;
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
    drawBtnAnimation()
    setScoreCountDraw(); 
    restartGame();
    }
}
/** Write out whose turn it is. The first time we want to write out
 *  the current player that is loaded with the DOM so the user can se which player starts playing.
 *  After that we want to write out the next player that is going to play. */ 
function writeOutPlayer(firstTurn) {
    let nextPlayer = document.getElementById('player');

    if (firstTurn) {
        if (currentPlayer === 'O') {
            nextPlayer.innerHTML = 'O';
            nextPlayer.style.color = '#3C4030';
        } else {
            nextPlayer.innerHTML = 'X';
            nextPlayer.style.color = '#60463B';
        }
    } else {
        if (currentPlayer === 'X') {
            nextPlayer.innerHTML = 'O';
            nextPlayer.style.color = '#3C4030';
        } else {
            nextPlayer.innerHTML = 'X';
            nextPlayer.style.color = '#60463B';
        }
    }
}

// Add one point to the winning player.
function setScoreCountWinner() {
    let scorePlayerX = document.getElementById('scoresPlayerX').innerHTML;
    let scorePlayerO = document.getElementById('scoresPlayerO').innerHTML;

    if (currentPlayer === 'X') {
        document.getElementById('scoresPlayerX').innerHTML = ++scorePlayerX;
    } if (currentPlayer === 'O') {
        document.getElementById('scoresPlayerO').innerHTML = ++scorePlayerO;
    }
}

// Add one point to draw.
function setScoreCountDraw() {
    let scoreDraw = document.getElementById('scoresDraw').innerHTML;
    document.getElementById('scoresDraw').innerHTML = ++scoreDraw;
}

/**
 * Making buttons blink when someone wins.
 * Inspiration from: https://www.py4u.net/discuss/301230
 *  */ 
function winBtnAnimation(btnA,btnB,btnC) {
        winnerIntervalId = setInterval(function() {
        btnA.style.backgroundColor = (btnA.style.backgroundColor == 'rgb(221, 190, 169)' ? '#FFE8D6' : 'rgb(221, 190, 169)');
        btnB.style.backgroundColor = (btnB.style.backgroundColor == 'rgb(221, 190, 169)' ? '#FFE8D6' : 'rgb(221, 190, 169)');
        btnC.style.backgroundColor = (btnC.style.backgroundColor == 'rgb(221, 190, 169)' ? '#FFE8D6' : 'rgb(221, 190, 169)');
        
    }, 800); 

}

// Making button blink if game is draw.
function drawBtnAnimation() {

    let btn1 = document.getElementById('btn-tile-1');
    btn1.style.backgroundColor = 'rgb(221, 190, 169)';
    let btn3 = document.getElementById('btn-tile-3');
    btn3.style.backgroundColor = 'rgb(221, 190, 169)';
    let btn5 = document.getElementById('btn-tile-5');
    btn5.style.backgroundColor = 'rgb(221, 190, 169)';
    let btn7 = document.getElementById('btn-tile-7');
    btn7.style.backgroundColor = 'rgb(221, 190, 169)';
    let btn9 = document.getElementById('btn-tile-9');
    btn9.style.backgroundColor = 'rgb(221, 190, 169)';
   
    winnerIntervalId = setInterval(function() {
        btn1.style.backgroundColor = (btn1.style.backgroundColor == 'rgb(221, 190, 169)' ? '#FFE8D6' : 'rgb(221, 190, 169)');
        btn3.style.backgroundColor = (btn3.style.backgroundColor == 'rgb(221, 190, 169)' ? '#FFE8D6' : 'rgb(221, 190, 169)');
        btn5.style.backgroundColor = (btn5.style.backgroundColor == 'rgb(221, 190, 169)' ? '#FFE8D6' : 'rgb(221, 190, 169)');
        btn7.style.backgroundColor = (btn7.style.backgroundColor == 'rgb(221, 190, 169)' ? '#FFE8D6' : 'rgb(221, 190, 169)');
        btn9.style.backgroundColor = (btn9.style.backgroundColor == 'rgb(221, 190, 169)' ? '#FFE8D6' : 'rgb(221, 190, 169)');

    }, 800);
}

