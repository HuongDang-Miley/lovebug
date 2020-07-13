// Lovebug
// A somewhat buggy dating app.
// Fix it up if you can!


// our clients' names, used only for grabbing the right client from the user input
const names = [
  'ladybug',
  'caterpillar',
  'bee',
  'ant',
  'snail',
  'spider',
]

// the data we working with
// rank 1 is best
const clients = [
  '🐞', // rank: 6
  '🐛', // rank: 5
  '🐝', // rank: 4
  '🐜', // rank: 3
  '🐌', // rank: 2
  '🕷', // rank: 1
]


// the command the user wants run
const command = process.argv[2];
// the name they want it run on
const name = process.argv[3]
// the corresponding client
// NOTE SURE what this boolean is for but this bit is wrong:
// 'clients[names.indexOf(name) !== -1]' should be ===> 'name.indexOf(name) !== -1'
const client = clients[names.indexOf(name) !== -1] 


// get a random client from whatever list was passed in
// FIXED: clients.length - 1 -> clients.length
const randomClient = function (clients) {
  return clients[Math.floor(Math.random() * clients.length)];
}

const matchRandomly = function (client) {
  // get our client's location within our system
  // FIXED: clients.indexOf(client) => names.indexOf(client)
  const clientLocation = names.indexOf(client);

  // exclude our client from matches by making an array of everyone else
  // find all the clients before our client in the system
  const clientsBeforeOurClient = clients.slice(0, clientLocation);

  // find all the clients after our client in the system
  // FIXED: clientLocation -> clientLocation + 1
  const clientsAfterOurClient = clients.slice(clientLocation + 1);

  // add them together
  // FIXED: clientsBeforeOurClient + clientsAfterOurClient => clientsBeforeOurClient.concat(clientsAfterOurClient)
  const otherClients = clientsBeforeOurClient.concat(clientsAfterOurClient)


  // return a random client from the remaining pool
  return randomClient(otherClients);
}


const getRank = function (client) {
  // this is backwards or something? they're supposed to be ranked
  // from lowest to highest, and the top one (spider, obvously) should
  // be ranked #1
  // FIXED: replace "return clients.indexOf(client)" with the following codes:
  let clientIndex = names.indexOf(client)
  let rank = 0
  switch (clientIndex) {
    case 0:
      rank = 6
      break;
    case 1:
      rank = 5
      break;
    case 2:
      rank = 4
      break;
    case 3:
      rank = 3
      break;
    case 4:
      rank = 2
      break;
    case 5:
      rank = 1
      break;
  }
  return rank
}



const getMatch = function (client) {
  // get the client's location in our data
  // FIXED: clients.indexOf(client) => names.indexOf(client)
  const clientLocation = names.indexOf(client);

  // find their two nearest neighbors
  let neighbors = []
  let beforeNeighbor = clients[clientLocation - 1]
  let afterNeighbor = clients[clientLocation + 1]
  if (clientLocation === 0) {
    neighbors.push(afterNeighbor)
  } else if (clientLocation === names.length -1 ) {
    neighbors.push(beforeNeighbor)
  } else {
    neighbors.push(beforeNeighbor, afterNeighbor)
  }
  // pick one of them and return it
  // FIXED:  matchRandomly(neighbors) => randomClient(neighbors)
  return randomClient(neighbors)
}

//FIXED: replace all parameters "client" with "name"
if (command === 'random') {
  // match them randomly
  console.log(matchRandomly(name));
} else if (command === 'rate') {
  // get back their rank in the system
  console.log(getRank(name));
} else if (command === 'match') {
  // get one of their neighbors in the ranking
  console.log(getMatch(name));
} else if (command !== 'match') {
  console.log('Please try one of our options:');
  console.log('random [client name] -> a totally random other user');
  console.log('match [client name] -> a match of similar ranking');
  console.log("rate [client name] -> the client's ranking in our system");
}
