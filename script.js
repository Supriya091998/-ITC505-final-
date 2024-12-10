document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("grid");
    const gridSize = 5;
    const cells = [];
    let playerName = "";
    let moveCount = 0;
    let startTime;
    let timer;

    const moveCountElement = document.getElementById("moveCount");
    const timeElapsedElement = document.getElementById("timeElapsed");
    const restartButton = document.getElementById("restartButton");

    // Prompt the user to enter their name
    function askPlayerName() {
        playerName = prompt("Welcome to Lights Out! Please enter your name:");
        if (!playerName) {
            playerName = "Player"; // Default name if none is entered
        }
        alert(`Hi ${playerName}, let's play Lights Out!`);
    }

    askPlayerName();

    // Create the grid
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", () => toggleCell(i));
        grid.appendChild(cell);
        cells.push(cell);
    }

    // Function to toggle a cell and its neighbors
    function toggleCell(index) {
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;

        toggle(row, col);
        toggle(row - 1, col); // Top
        toggle(row + 1, col); // Bottom
        toggle(row, col - 1); // Left
        toggle(row, col + 1); // Right

        moveCount++;
        moveCountElement.textContent = moveCount;

        if (checkWin()) {
            clearInterval(timer);
            setTimeout(() => {
                alert(`${playerName}, you won the game in ${moveCount} moves and ${timeElapsedElement.textContent} seconds!`);
                randomizeBoard();
            }, 100);
        }
    }

    // Helper function to toggle a single cell
    function toggle(row, col) {
        if (row >= 0 && row < gridSize && col >= 0 && col < gridSize) {
            const index = row * gridSize + col;
            cells[index].classList.toggle("is-off");
        }
    }

    // Function to initialize the board with some lights OFF
    function initializeBoard() {
        moveCount = 0;
        moveCountElement.textContent = moveCount;
        cells.forEach(cell => cell.classList.remove("is-off")); // Turn all lights ON

        // Toggle a few random cells to create an initial state
        const initialToggles = 10; // Number of random cells to toggle
        for (let i = 0; i < initialToggles; i++) {
            const randomIndex = Math.floor(Math.random() * cells.length);
            toggleCellWithoutNeighbors(randomIndex); // Only toggle this cell, not neighbors
        }

        // Start the timer
        startTimer();
    }

    // Toggle a single cell without affecting neighbors
    function toggleCellWithoutNeighbors(index) {
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;
        toggle(row, col);
    }

    // Function to check if the game is won
    function checkWin() {
        return cells.every(cell => !cell.classList.contains("is-off"));
    }

    // Timer functions
    function startTimer() {
        clearInterval(timer);
        let secondsElapsed = 0;
        timeElapsedElement.textContent = secondsElapsed;

        timer = setInterval(() => {
            secondsElapsed++;
            timeElapsedElement.textContent = secondsElapsed;
        }, 1000);
    }

    // Restart the game
    restartButton.addEventListener("click", () => {
        initializeBoard();
    });

    // Initialize the board with a random configuration
    initializeBoard();
});
