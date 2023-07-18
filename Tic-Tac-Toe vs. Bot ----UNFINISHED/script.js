'use strict'

//TODO: Implement bot player ++
//TODO: Implement winning algorhitm ++
//TODO: Switch players ++
//TODO: Update Scores ++
//TODO: Check for draw ++
//TODO: Animate bot's action on the board ++
//TODO: Add span in UI that writes who won or if its draw ++ ==> FIX!!! (works for bot, not for player)
//TODO: Add span for player turns ++
//TODO: Fix CSS
//TODO: OPTIONAL(Try adding dice roll of who goes first when game starts)
//TODO: Fix indenting
//TODO: Add separate div that shows who is X and who is O
//TODO: Bot sometimes skips its turn ++
//TODO: Disable clicking on the field while it is bot's turn.

const mainFunction = function() {

    const fieldsAll = Array.from(document.querySelectorAll('.field'));
    const mainDiv = document.querySelector('.main');
    const optionsDiv = document.querySelector('.options');
    const spanWinner = document.querySelector('#winner');
    let isRunningGame = true;
    let positions = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer;
    let playerChoice = '';
    let bot = '';
    let botTime;
    let xScore = 0;
    let oScore = 0;
    let fieldArray = [];
    fieldsAll.forEach((field, index) => field.setAttribute('id', index));

    //Targeting the current field on the grid
    const targetField = function (e) {
        
        let mainEl = e.target;
        if(!mainEl.classList.contains('field')) return;
        if(playerChoice === '') return;
        mainEl.textContent = playerChoice;
        fieldArray.push(mainEl.textContent);
        currentPlayer = playerChoice;
        playerChoice === 'X' ? mainEl.style.color = 'blue' : mainEl.style.color = 'lime';
        popualteWinConditionsArr(mainEl.id);

        checkForWin();

        if (!isRunningGame) setTimeout(clearGame, 2000);
        playerChoice === 'X' ? bot = 'O' : bot = 'X';
        updateText(`${bot}'s turn.`);
        if (isRunningGame) {
            currentPlayer = 'Bot';
            botTime = setTimeout(() => {
            setBotPlayer(bot);
            }, 1000);   
        }  
    }


    const updateText = function (outputText) {
        spanWinner.textContent = outputText;
    }

    updateText('First choose X or O to start the game!');
    //Replacing the element in "positions" array by mainEl(clicked button) id or random generated bot number
    const popualteWinConditionsArr = function (spliceStart) {
        positions.splice(Number(spliceStart), 1, currentPlayer);
    }

    //Targeting the selected symbol for the player
    const targetSelectedOptions = function (e) {
        isRunningGame = true;
        let mainEl = e.target;
        if(!mainEl.classList.contains('btn')) return;
        mainEl.style.backgroundColor = 'purple';
        updateText('');

        mainEl.id === 'x' ? playerChoice = 'X' : playerChoice = 'O';
        optionsDiv.querySelectorAll('.btn').forEach(button => button.setAttribute('disabled', 'disabled'));
    }

    mainDiv.addEventListener('click', targetField);
    optionsDiv.addEventListener('click', targetSelectedOptions);
    
    //Initializing bot player and its choice based on user's choice (always opposite choice of user's choice)
    const setBotPlayer = function (botChoice) {
        updateText(`${playerChoice}'s turn`);
        let randomBotField;
        for(let i = 0 ; i <= fieldsAll.length ; i++) {
            randomBotField = Math.floor(Math.random() * fieldsAll.length);

            // if(fieldsAll[randomBotField].textContent !== '') continue;
                
            if(fieldsAll[randomBotField].textContent === '') {
                currentPlayer = botChoice

                popualteWinConditionsArr(randomBotField);

                fieldsAll[randomBotField].textContent = botChoice;
                fieldArray.push(botChoice);
                botChoice === 'X' ? fieldsAll[randomBotField].style.color = 'blue' : fieldsAll[randomBotField].style.color = 'lime';
                break;
            }
        }
        checkForWin();
        if (!isRunningGame) setTimeout(clearGame, 2000);
    }

//Checking for win or draw
const checkForWin = function() {

const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2],
    ];

    for (const [condition, _value] of winConditions.entries()) { 
        const x = winConditions[condition][0]; 
        const y = winConditions[condition][1]; 
        const z = winConditions[condition][2]; 
        
        

        if (positions[x] !== '' && positions[y] !== '' && positions[z] !== '') { 
        if (positions[x] !== positions[y] && positions[x] !== positions[z]) continue;
        else if (positions[x] === positions[y] && positions[x] === positions[z]) {
                updateScore(currentPlayer);
                updateLines(x, y, z);
                updateText(`${currentPlayer} Won !`);
                isRunningGame = false;
                break;
            }
        }
        if(fieldArray.length === fieldsAll.length) {
            updateText('Draw!');
            setTimeout(() => {
            isRunningGame = false;
            clearGame();
            },3000)
        }
    }
}

//Reseting and clearing the game, except scores
const clearGame = function () {
    clearTimeout(botTime);
    playerChoice = '';
    bot = '';
    positions = ['', '', '', '', '', '', '', '', ''];
    fieldArray = [];
    spanWinner.textContent = '';
    fieldsAll.forEach(field => {
        field.textContent = field.style.color = '';
        field.style.backgroundColor = 'crimson';
    });
    optionsDiv.querySelectorAll('.btn').forEach(button => {
        button.removeAttribute('disabled');
        button.style.backgroundColor = 'crimson';
    });
    updateText('First choose X or O to start the game!');
}

//Coloring the winning line
const updateLines = function (x, y, z) {
    for (const [_index, _value] of fieldsAll.entries()) {
        fieldsAll[x].style.backgroundColor = fieldsAll[y].style.backgroundColor = fieldsAll[z].style.backgroundColor = 'white';
        break;
        }
    }

//Updating score 
const updateScore = function (currentWinner) {
    const scores = Array.from(document.querySelectorAll('.scores .score'));
    scores.forEach(score => {
        switch(score.id) {
            case "x-score":
                if (currentWinner === 'X') {
                    xScore++;
                    score.textContent = xScore;
                };
                break;
            case "o-score":
                if (currentWinner === 'O') {
                    oScore++;
                    score.textContent = oScore;
                };
                break;
            default: 0;
        }
    })
}


}
mainFunction();