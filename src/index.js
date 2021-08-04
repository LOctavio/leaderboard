import './style.css';

function getGameID(gameId) {
  return gameId;
}

async function setGameName(getGameID) {
  await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/', {
    method: 'POST',
    body: JSON.stringify({ name: 'my new game' }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((json) => {
      const { result } = json;
      const gameId = result.replace('Game with ID: ', '').replace(' added.', '');
      getGameID(gameId);
    });
}

async function creteNewScore(user, score, getGameID) {
  await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${getGameID}/scores/`, {
    method: 'POST',
    body: JSON.stringify({
      user,
      score,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json());
}

document.querySelector('.submit-button').addEventListener('click', () => {
  const user = document.querySelector('.user').value;
  const score = document.querySelector('.score').value;
  creteNewScore(user, score, getGameID);
});

function printScoresList() {
  const container = document.querySelector('.scores-list ul');
  fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${getGameID}/scores/`)
    .then((response) => response.json())
    .then((json) => {
      container.innerHTML = '';
      json.result.forEach((element) => {
        const score = document.createElement('li');
        score.innerHTML = `${element.user}: ${element.score}`;
        container.appendChild(score);
      });
    });
}

document.querySelector('.refresh').addEventListener('click', () => {
  printScoresList();
});

window.onload = () => {
  setGameName(getGameID);
  printScoresList();
};