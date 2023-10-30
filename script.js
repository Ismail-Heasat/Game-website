// Initialize variables
let secretNumber = generateRandomNumber();
let tries = 10;
let score = 0;

// Retrieve or initialize leaderboard data from local storage
let leaderboardData = JSON.parse(localStorage.getItem('leaderboard')) || [];

// Function to generate a random number between 1 and 100
function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

// Function to update leaderboard and display it
function updateLeaderboard() {
    leaderboardData.push({ name: document.getElementById('name').value, score });
    leaderboardData.sort((a, b) => b.score - a.score);
    leaderboardData = leaderboardData.slice(0, 10); // Keep only the top 10 scores
    localStorage.setItem('leaderboard', JSON.stringify(leaderboardData));

    let leaderboardList = document.getElementById('leaderboard');
    leaderboardList.innerHTML = '';

    leaderboardData.forEach((entry, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${entry.name}: ${entry.score}/10`;
        leaderboardList.appendChild(listItem);
    });
}

// Function to check the user's guess
function checkGuess() {
    const guess = parseInt(document.getElementById('guess').value);
    
    if (guess === secretNumber) {
        alert(`Congratulations, you guessed the number! It was ${secretNumber}.`);
        score++;
        secretNumber = generateRandomNumber();
        tries = 10;
        updateLeaderboard();
    } else {
        tries--;
        if (tries === 0) {
            alert(`Game over! The secret number was ${secretNumber}. Your final score: ${score}/10`);
            secretNumber = generateRandomNumber();
            tries = 10;
            score = 0;
            updateLeaderboard();
        } else if (guess < secretNumber) {
            alert(`Try higher! Tries left: ${tries}`);
        } else {
            alert(`Try lower! Tries left: ${tries}`);
        }
    }

    // Update the displayed score and tries left
    document.getElementById('score').textContent = score;
    document.getElementById('tries').textContent = tries;
}

// Initialize the leaderboard when the page loads
updateLeaderboard();

