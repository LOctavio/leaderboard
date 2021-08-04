import './style.css';

async function getGameID() {
  const gameId = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/', { 
  method: 'POST',
  body: JSON.stringify({ name: 'my new game' }),
  headers:{
    'Content-Type': 'application/json'
  },
})
  .then((response) => response.json())
  .then((json) =>  { 
    const result = json.result;
    const gameId = result.replace('Game with ID: ', '').replace(' added.','');
    return gameId; 
   });
  }