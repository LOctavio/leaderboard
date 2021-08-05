import './style.css';

const getGameID = (gameId) => gameId;

const setGameName = async (getGameID) => {
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
};

const creteNewScore = async (user, score, getGameID) => {
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
};

document.querySelector('.submit-button').addEventListener('click', () => {
  const user = document.querySelector('.user');
  const score = document.querySelector('.score');
  creteNewScore(user.value, score.value, getGameID);
  user.value = '';
  score.value = '';
});

const printScoresList = () => {
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
};

document.querySelector('.refresh').addEventListener('click', () => {
  printScoresList();
});

window.onload = () => {
  setGameName(getGameID);
  printScoresList();
};