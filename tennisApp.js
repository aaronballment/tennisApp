const readline = require('readline');
let loginCondition = false;

const playerInfo = {
    _players: {
        _player1: {
            details: {
                name: "Alex De Minaur",
                age: 26,
                ranking: 10,
            },
            games: [
                    { opponent: 'Jannik Sinner', setsFor: 1, setsAgainst: 3, result: "Lost" },
                    { opponent: 'Ben Shelton', setsFor: 3, setsAgainst: 2, result: "Won" },
                    { opponent: 'Roger Federer', setsFor: 0, setsAgainst: 3, result: "Lost" },
            ]
            
        },
        _player2: {
            details: {
                name: "Alexei Popyrin",
                age: 25,
                ranking: 27,
            },
            games: [
                { opponent: 'Jack Draper', setsFor: 1, setsAgainst: 3, result: "Lost" },
                { opponent: 'Novak Djokovic', setsFor: 3, setsAgainst: 1, result: "Won" },
                { opponent: 'Daniil Medvedev', setsFor: 3, setsAgainst: 2, result: "Won" },
            ]
        }
    },
    get players() {
        return this._players;
    }
}

//Player Search Loop Function
const playerSearch = () => {
    const rlPlayerSearch = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rlPlayerSearch.question("\nWould you like to search for another player? (yes/no):", (search) => {
        if (search.toLowerCase().trim() === "yes") {
            rlPlayerSearch.close();
            appLoop();
        } else if (search.toLowerCase().trim() === "no") {
            console.log("Thank you for using the Australian Tennis App.");
            rlPlayerSearch.close();
        } else {
            console.log("Invalid input. Please try again.");
            rlPlayerSearch.close();
            playerSearch();
        }
    });
}
// Add Player Function
const addPlayer = (newName, newAge, newRanking) => {
    let playerKey = `player${Object.keys(playerInfo.players).length + 1}`;
    playerInfo.players[playerKey] = {
      details: {
        name: newName,
        age: newAge,
        ranking: newRanking,
      },
      games: []
    };
}

// Add Game Function
const addGame = (playerKey, opponent, setsFor, setsAgainst, result) => {
    if (playerInfo.players[playerKey]) {
      playerInfo.players[playerKey].games.push({ opponent, setsFor, setsAgainst, result });
    } else {
      console.log("Player not found!");
    }
}


//find player key
function findPlayerKey(name) {
    let entry = Object.entries(playerInfo.players).find(([key, player]) => 
        player.details.name.toLowerCase() === name.toLowerCase()
    );
    return entry ? entry[0] : 'Player not found!';
}

//Player Info return function
function infoReturn(player) {
    const playerKey = findPlayerKey(player);
    if (playerKey !== 'Player not found!') {
        console.log(`\nPlayer Name: ${playerInfo.players[playerKey].details.name}\n\nAge: ${playerInfo.players[playerKey].details.age}\n\nRanking: ${playerInfo.players[playerKey].details.ranking}`);
        console.log("\nMatch History:");
        playerInfo.players[playerKey].games.forEach((game, index) => {
            console.log(`\nGame ${index + 1}: vs ${game.opponent} | Sets Won: ${game.setsFor} | Sets Lost: ${game.setsAgainst} | Result: ${game.result}`);
        });
    } else {
        console.log("Player not found!");
    }
}


//Player Info Function
const appLoop = () => {
    const rlPlayerInfo = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rlPlayerInfo.question("Which player's details would you like to view?", (PlayerName) => {
        const trimmedPlayerName = PlayerName.trim();
        if (trimmedPlayerName) {
            infoReturn(trimmedPlayerName);
            rlPlayerInfo.close();
            playerSearch();
        } else {
            console.log("Player not found. Please try again.");
            rlPlayerInfo.close();
            appLoop();
        }
    });
}

//Admin Login Details
const setUsername = "admin";
const setPassword = "admin123";

//Login Function
function login () {
    let username;
    let userPassword;

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Enter your Username: ', (name) => {
        username = name;
        rl.question('Enter your Password: ', (password) => {
            userPassword = password;
            rl.close();
            if (username === setUsername && userPassword === setPassword) {
                console.log("Login Successful!");
                console.log("Welcome to the Australian Tennis App.");
                loginCondition = true;
            

                //App Content
                if (loginCondition === true) {
                    appLoop();
                }
            } else {
                console.log("Invalid Username or Password. Please try again.");
                login();
            }
        });
    });
}
console.log("Hello there! please enter your Details to login.");
login();
