const board = document.getElementById('tic-tac-toe-board');
const cells = [];
let currentPlayer = 'X';
let gameEnded = false;

// Create the Tic Tac Toe board
for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.row = i;
        cell.dataset.col = j;
        cell.addEventListener('click', cellClick);
        board.appendChild(cell);
        cells.push(cell);
    }
}

function cellClick(event) {
    if (gameEnded) return;
    
    const cell = event.target;
    if (cell.textContent === '') {
        cell.textContent = currentPlayer;
        cell.style.color = (currentPlayer === 'X') ? 'blue' : 'red';
        if (checkWin()) {
            alert(`Player ${currentPlayer} wins!`);
            gameEnded = true;
        } else if (isBoardFull()) {
            alert('It\'s a tie!');
            gameEnded = true;
        } else {
            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
        }
    }
}

function checkWin() {
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    for (const combo of winCombos) {
        const [a, b, c] = combo;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            return true;
        }
    }

    return false;
}

function isBoardFull() {
    for (const cell of cells) {
        if (cell.textContent === '') {
            return false;
        }
    }
    return true;
}
