let currentPlayer = "not assigned";
const playerOColor = '#3C4030';
const playerXColor = '#60463B';
const playerOText = 'O';
const playerXText = 'X';
const restartButtonText = 'RESTART';
const restartButtonLayout ='block';
const tileButtonShadow = 'inset 0 5px 15px 0 rgba(0,0,0, .15)';
const colorWinningBtns = 'rgb(221, 190, 169)';
let winnerIntervalId; 

/* Add eventlistener first when DOM is finish loading. */ 
document.addEventListener("DOMContentLoaded", function () {
    /* Eventlistener click for start button */
    document.getElementById('start-btn').addEventListener('click', startGame);

    /* Eventlisteners click for game board buttons. */
    let buttons = document.getElementsByClassName('tile-btn');

    for (let button of buttons) {
        button.addEventListener('click', gameBoardBtnClick);
        button.disabled = true; /* To make the buttons unclickable before game is started. */
    }

    /* Initialize currentPlayer */
    generateRandomPlayer();

    /* Shows witch player starts playing. */
    writeOutPlayer(true);
});

/**
 * Main function that calls other functions and desides the order they are executed in. 
 * Main function is called every time a button on game board is clicked. */
function gameBoardBtnClick() {
    let button = this;
    button.disabled = true; /* For making button once clicked not clickable. */
    writeOutPlayer(false); /* Writes out who is next in line. */
    setPlayerOnBtn(button) /* Set player X/O on the button. */
    checkIfWin(); /* Checks if someone has won or if the game is draw. */
    changePlayer(); /* Change player. */
}

/* Randomize which player is first out to play X or O. */
function generateRandomPlayer() {
    const players = ['X', 'O'];
    const randomPlayer = Math.floor(Math.random() * players.length);
    currentPlayer = (players[randomPlayer]);
}

/* Using the global variable currentPlayer to set the player on the button. */ 
function setPlayerOnBtn(button) {  
    if (currentPlayer === playerXText) {
        button.innerHTML = playerXText;
        button.classList.add('xBtn'); /* Add a class to pressed button. Class used to style button in css. */
        button.style.boxShadow = tileButtonShadow;
    } else {
        button.innerHTML = playerOText;
        button.classList.add('oBtn'); /* Add a class to pressed button. Class used to style button in css. */
        button.style.boxShadow = tileButtonShadow; 
    }
}

/* Changes who plays. */
function changePlayer() {
    if (currentPlayer === playerXText) {
        currentPlayer = playerOText;
    } else {
        currentPlayer = playerXText;
    }
}

/* Checks all the differents ways the player can win to se if someone has won. */
function checkIfWin() {
    let btn = document.getElementsByClassName('tile-btn');

    function winScenarios(btnA, btnB, btnC) {
        if (btnA.innerHTML === currentPlayer && btnB.innerHTML === currentPlayer && btnC.innerHTML === currentPlayer) {
            btnA.style.backgroundColor = colorWinningBtns; /* Shows the winning scenario by giving it a color. */
            btnB.style.backgroundColor = colorWinningBtns;
            btnC.style.backgroundColor = colorWinningBtns;
            winBtnAnimation(btnA,btnB,btnC);
            setScoreCountWinner();
            restartGame();
            return 1;
        }
        return 0;
    }
    let winCount = 0;

    winCount += winScenarios(btn[0], btn[1], btn[2]); /* First row horizontal. */
    winCount += winScenarios(btn[3], btn[4], btn[5]); /* Second row horizontal. */
    winCount += winScenarios(btn[6], btn[7], btn[8]); /* Third row horizontal. */
    winCount += winScenarios(btn[0], btn[3], btn[6]); /* First row vertical. */
    winCount += winScenarios(btn[1], btn[4], btn[7]); /* Second row vertical. */
    winCount += winScenarios(btn[2], btn[5], btn[8]); /* Second row vertical. */
    winCount += winScenarios(btn[2], btn[4], btn[6]); /* Diagonally right to bottom. */
    winCount += winScenarios(btn[0], btn[4], btn[8]); /* Diagonally left to bottom */

    /**
     * To prevent draw happening if someone wins at the last turn.
     * The checkIfDraw function is only called when someone hasen't won  */
    if (winCount === 0) {
        checkIfDraw();
    }
}

/* Hides the start/restart button, reset the buttons and make the buttons clickable. */ 
function startGame() {
    let startButton = document.getElementById('start-btn');

    /** 
     * Removes the start button if it exists, if the start buttons is null 
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
        /** 
         * Clear interval in winBtnAnimation function. Removes blinking effects.
         * Found solution on: https://www.w3schools.com/jsref/met_win_clearinterval.asp  */
        clearInterval(winnerIntervalId); 
        button.classList.remove('xBtn', 'oBtn'); 
        /**
         * Removes classes xBtn and oBtn added in function setPlayerOnBtn.
         * Found solution : https://developer.mozilla.org/en-US/docs/Web/API/Element/classList. 
          */
    }

    for (let button of buttons) {
        button.disabled = false;
    }
}

/* Prepare the game for restart by changing name on button. */
function restartGame() {
    let startButton = document.getElementById('start-btn');
    let restartButton = document.getElementById('restart-btn');
    if (startButton !== null) { 
        startButton.id = 'restart-btn'; /* If start-btn exist rename it to restart-btn. */
        startButton.innerHTML = restartButtonText;
        startButton.style.display = restartButtonLayout; 
        /**
         * Because the button have changed id
         * a new event listener that listens for the new id is needed. 
         */
        document.getElementById('restart-btn').addEventListener('click', startGame); 
    } 
    if (restartButton !== null) {
        restartButton.style.display = restartButtonLayout;
    }
    let buttons = document.getElementsByClassName('tile-btn'); /* For making buttons unclickable when player has won. */
    for (let button of buttons) {
        button.disabled = true;
    }
}
  
/* Checks if every button is claimed. If they are the result is draw. */
function checkIfDraw() {
    const allClickableTiles = 9; 
    let buttons = document.getElementsByClassName('tile-btn');
    let countClickedButtons = 0;

    for (let button of buttons) {

        if (button.disabled === true) {
            countClickedButtons++;
        }
    }

    if (countClickedButtons === allClickableTiles) {
    drawBtnAnimation()
    setScoreCountDraw(); 
    restartGame();
    }
}
/** 
 * Write out whose turn it is. The first time we want to write out
 *  the current player that is loaded with the DOM so the user can se which player starts playing.
 *  After that we want to write out the next player that is going to play. 
 *  Help from mentor with structuring function.*/ 
 function writeOutPlayer(firstTurn) {
    let nextPlayer = document.getElementById('player');
    let nextPlayerText;
    let nextPlayerColor;

    if ((firstTurn && currentPlayer === playerOText) || (!firstTurn && currentPlayer === playerXText)) {
        nextPlayerText = playerOText;
        nextPlayerColor = playerOColor;
    } else {
        nextPlayerText = playerXText;
        nextPlayerColor = playerXColor;
    }

    nextPlayer.innerHTML = nextPlayerText;
    nextPlayer.style.color = nextPlayerColor;
}

/* Add one point to the winning player. */
function setScoreCountWinner() {
    let scorePlayerX = document.getElementById('scoresPlayerX').innerHTML;
    let scorePlayerO = document.getElementById('scoresPlayerO').innerHTML;

    if (currentPlayer === playerXText) {
        document.getElementById('scoresPlayerX').innerHTML = ++scorePlayerX;
    } if (currentPlayer === playerOText) {
        document.getElementById('scoresPlayerO').innerHTML = ++scorePlayerO;
    }
}

/* Add one point to draw. */
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
        btnA.style.backgroundColor = (btnA.style.backgroundColor == colorWinningBtns ? '#FFE8D6' : colorWinningBtns);
        btnB.style.backgroundColor = (btnB.style.backgroundColor == colorWinningBtns ? '#FFE8D6' : colorWinningBtns);
        btnC.style.backgroundColor = (btnC.style.backgroundColor == colorWinningBtns ? '#FFE8D6' : colorWinningBtns);
        
    }, 800); 

}

/* Making button blink if game is draw. */
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

