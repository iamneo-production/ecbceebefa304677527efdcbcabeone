// Variables to keep track of the game state
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Elements
const resultContainer = document.querySelector('.result-container');
const gridCells = document.querySelectorAll('.btn');
const resetButton = document.getElementById('reset-btn');

// Function to handle a player's move
function handleMove(cell, index) {
    if (gameBoard[index] === '' && gameActive) {
        cell.value = currentPlayer;
        gameBoard[index] = currentPlayer;
        cell.readOnly = true;
        checkWin();
        togglePlayer();
    }
}

// Function to toggle between X and O
function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    resultContainer.textContent = `Player ${currentPlayer}'s turn`;
}

// Function to check for a win
function checkWin() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            resultContainer.textContent = `Player ${currentPlayer} wins!`;
            resetButton.disabled = false;
            break;
        }
    }

    if (!gameBoard.includes('') && gameActive) {
        gameActive = false;
        resultContainer.textContent = "It's a draw!";
        resetButton.disabled = false;
    }
}

// Function to reset the game
function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    gridCells.forEach((cell) => {
        cell.value = '';
        cell.readOnly = false;
    });

    resultContainer.textContent = `Player ${currentPlayer}'s turn`;
    resetButton.disabled = true;
}

// Event listeners
gridCells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        handleMove(cell, index);
    });
});

resetButton.addEventListener('click', () => {
    resetGame();
});

// Initial message
resultContainer.textContent = `Player ${currentPlayer}'s turn`;
