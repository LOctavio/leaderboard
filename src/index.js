import './style.css';

function getGameID(gameId) {
  return gameId;
}

async function setGameName(getGameId) {
  const gameId = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/', { 
    method: 'POST',
    body: JSON.stringify({ name: 'my new game' }),
    headers:{
      'Content-Type': 'application/json'
    },
  })
  .then((response) => response.json())
  .then((json) =>  
  { 
    const result = json.result;
    const gameId = result.replace('Game with ID: ', '').replace(' added.','');
    getGameID(gameId); 
  });
}


async function creteNewScore(user, score, getGameID) {
  const gameId = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/'+ getGameID +'/scores/', { 
    method: 'POST',
    body: JSON.stringify({ 
      user: user,
      score: score,
    }),
    headers:{
      'Content-Type': 'application/json'
    },
  })
  .then((response) => response.json())
  .then((json) =>  console.log(json));
}