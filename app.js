/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, previousDiceRoll1, previousDiceRoll2, winningScore, dice1, dice2;

dice1 = document.getElementById('dice-1');
dice2 = document.getElementById('dice-2');

init();

document.querySelector('#winningPointsForm').addEventListener('submit', submitWinningPoints);
function submitWinningPoints(event){
    winningScore = document.getElementById('winningScore').value;
    console.log(winningScore);
}


document.querySelector('.btn-roll').addEventListener('click', function () {
    if(gamePlaying){
        var diceRoll1 = Math.floor(Math.random() * 6 + 1);
        var diceRoll2 = Math.floor(Math.random() * 6 + 1);
        showDices();
        dice1.src = 'dice-' + diceRoll1 + '.png';
        dice2.src = 'dice-' + diceRoll2 + '.png';

        if((previousDiceRoll1 == 6 || previousDiceRoll2 == 6) && (diceRoll1 == 6 || diceRoll2 == 6)){
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = 0;
            switchPlayer();
        }

        else{
            if (diceRoll1 !== 1 && diceRoll2 !== 1) {
                roundScore += diceRoll1 + diceRoll2;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            }

            else {
                switchPlayer();
            }
        }

        previousDiceRoll1 = diceRoll1;
        previousDiceRoll2 = diceRoll2;
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if(gamePlaying){
        scores[activePlayer] += roundScore;

        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner';
            showDices();
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            gamePlaying = false;
        }
        else {
            switchPlayer();
        }
    }

});

function switchPlayer() {
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    roundScore = 0;
    document.querySelector('#current-' + activePlayer).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    previousDiceRoll1 = 0;
    previousDiceRoll2 = 0;
}

document.querySelector('.btn-new').addEventListener('click', init)

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';

    hideDices();

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    winningScore = 100;
    document.getElementById('winningScore').value = '100';
}

function showDices() {
    dice1.style.visibility = 'visible';
    dice2.style.visibility = 'visible';
}

function hideDices() {
    dice1.style.visibility = 'hidden';
    dice2.style.visibility = 'hidden';
}

/*
var x = document.querySelector('#score-0').textContent;
console.log(x);*/
