const readline = require('readline');

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
        },
        _player3: {
            details: {
                name: "Thanasi Kokkinakis",
                age: 28,
                ranking: 45,
            },
            games: [
                { opponent: 'Carlos Alcaraz', setsFor: 2, setsAgainst: 3, result: "Lost" },
                { opponent: 'Stefanos Tsitsipas', setsFor: 3, setsAgainst: 1, result: "Won" },
                { opponent: 'Andrey Rublev', setsFor: 0, setsAgainst: 3, result: "Lost" },
            ]
        }
    },
    get players() {
        return this._players;
    }
}

//App Menu Function
function appMenu(){
    const rlAppMenu = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    console.log("Welcome to the Australian Tennis App.");
    console.log('1. View Player Details');
    console.log('2. Add Player');
    console.log('3. Add Game');
    console.log('4. Exit');
    rlAppMenu.question("Please select an option from the menu below by entering the number corresponding to the option: ", (menu) => {
        switch (parseInt(menu.trim(), 10)) {
            case 1:
                rlAppMenu.close();
                PlayerSearchPage();
                break;
            case 2:
                rlAppMenu.close();
                addPlayer();
                break;
            case 3:
                rlAppMenu.close();
                addGame();
                break;
            case 4:
                rlAppMenu.close();
                console.log("Thank you for using the Australian Tennis App. Goodbye!");
                break;
            default:
                console.log("Invalid input. Please try again.");
                rlAppMenu.close();
                appMenu();
        }
    });
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
            PlayerSearchPage();
        } else if (search.toLowerCase().trim() === "no") {
            rlPlayerSearch.close();
            appMenu();
        } else {
            console.log("Invalid input. Please try again.");
            rlPlayerSearch.close();
            playerSearch();
        }
    });
}
//Add Player Info Function
const addPlayerInfo = (newName, newAge, newRanking) => {
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
// Add Player Function
const addPlayer = () => {
    const rlAddPlayer = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rlAddPlayer.question("Enter the player's name: ", (name) => {
        newName = name;
        rlAddPlayer.question("Enter the player's age: ", (age) => {
            newAge = parseInt(age, 10);
            rlAddPlayer.question("Enter the player's ranking: ", (ranking) => {
                newRanking = parseInt(ranking, 10);
                rlAddPlayer.close();
                addPlayerInfo(newName, newAge, newRanking);
                console.log("Player added successfully!");
                appMenu();
            });
        });
    });
};

// Add Game Function
const addGame = () => {
    const rlAddGame = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rlAddGame.question('Enter the player\'s full name: ', (name) => {
        const playerKey = findPlayerKey(name);
        if (playerKey === null) {
            console.log("Player not found!");
            rlAddGame.close();
            appMenu();
            return;
        }

        rlAddGame.question('Enter the opponent\'s name: ', (opponent) => {
            rlAddGame.question('Enter the number of sets won by the player: ', (setsFor) => {
                rlAddGame.question('Enter the number of sets won by the opponent: ', (setsAgainst) => {
                    rlAddGame.question('Enter the result (Won/Lost): ', (result) => {
                        playerInfo.players[playerKey].games.push({
                            opponent: opponent,
                            setsFor: parseInt(setsFor, 10),
                            setsAgainst: parseInt(setsAgainst, 10),
                            result: result
                        });
                        console.log(`Game added for ${playerInfo.players[playerKey].details.name}.`);
                        rlAddGame.close();

                        // Add another game or return to menu
                        const rlGameAddition = readline.createInterface({
                            input: process.stdin,
                            output: process.stdout
                        });
                        rlGameAddition.question("\nWould you like to enter another game? (yes/no):", (gameAdd) => {
                            if (gameAdd.toLowerCase().trim() === "yes") {
                                rlGameAddition.close();
                                addGame();
                            } else if (gameAdd.toLowerCase().trim() === "no") {
                                rlGameAddition.close();
                                appMenu();
                            } else {
                                console.log("Invalid input. Please try again.");
                                rlGameAddition.close();
                                appMenu();
                            }
                        });
                    });
                });
            });
        });
    });
};

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
const PlayerSearchPage = () => {
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
            PlayerSearchPage();
        
        }});
    };
    

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
                appMenu();
            } else {
                console.log("Invalid Username or Password. Please try again.");
                login();
            }
        });
    });
}
console.log("Hello there! please enter your Details to login.");
login();
