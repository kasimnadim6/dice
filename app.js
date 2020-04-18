/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var score, roundScore, activePlayer, gamePlaying;
init();

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.querySelector('.dice').style.display = 'none';

    document.querySelector(`#name-0`).textContent = 'Player - 1';
    document.querySelector(`#name-1`).textContent = 'Player - 2';
    document.querySelector(`.player-0-panel`).classList.remove('winner');
    document.querySelector(`.player-1-panel`).classList.remove('winner');
    document.querySelector(`.player-0-panel`).classList.remove('active');
    document.querySelector(`.player-1-panel`).classList.remove('active');

    document.querySelector(`.player-0-panel`).classList.add('active');
}

document.querySelector('.btn-roll').addEventListener('click', () => {

    if (gamePlaying) {
        // Random Number
        let dice = Math.floor(Math.random() * 6) + 1;

        // Display the result
        let diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = `dice-${dice}.png`;
        document.querySelector(`#current-${activePlayer}`).textContent = dice;

        // Update the round score  if the rolled number was NOT 1
        if (dice != 1) {
            roundScore += dice;
            document.getElementById(`current-${activePlayer}`).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }
})

document.querySelector('.btn-hold').addEventListener('click', () => {
    if (gamePlaying) {
        scores[activePlayer] += roundScore;
        document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];
        if (scores[activePlayer] >= 10) {
            document.querySelector(`#name-${activePlayer}`).textContent = 'Winner !';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');

            gamePlaying = false;
        }
        else {
            nextPlayer();
        }
    }
})

function nextPlayer() {
    roundScore = 0;
    document.getElementById(`current-0`).textContent = 0;
    document.getElementById(`current-1`).textContent = 0;

    activePlayer = !!activePlayer ? 0 : 1;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}


document.querySelector('.btn-new').addEventListener('click', init);
