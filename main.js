// Player Factory
function createPlayer(name, mark) {
    return {
        name: name,
        mark: mark,
        board: [],
        points: 0,
        addPoint: function () {
            this.points++;
        },
        resetBoard: function () {
            this.board = [];
        }
    };
}

// Game Module
const Game = (function () {
    let board = [];
    let isGameOver = false;
    let player1, player2;
    let currentPlayer;

    const resultDisplay = document.querySelector("#result");
    const player1Display = document.querySelector("#player1Display");
    const player2Display = document.querySelector("#player2Display");
    const player1PointsDisplay = document.querySelector("#player1Points");
    const player2PointsDisplay = document.querySelector("#player2Points");

    function startGame(p1, p2) {
        player1 = createPlayer(p1, 'X');
        player2 = createPlayer(p2, 'O');
        currentPlayer = player1;

        player1Display.textContent = `Player 1: ${player1.name} (${player1.mark})`;
        player2Display.textContent = `Player 2: ${player2.name} (${player2.mark})`;
        updatePointsDisplay();
        resetGame();
    }

    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ];

        const currentBoard = currentPlayer.board;

        for (let pattern of winPatterns) {
            if (pattern.every(index => currentBoard.includes(index))) {
                resultDisplay.textContent = `${currentPlayer.name} wins! 🎉`;
                currentPlayer.addPoint();
                updatePointsDisplay();
                isGameOver = true;
                return;
            }
        }

        if (board.length === 9 && !isGameOver) {
            resultDisplay.textContent = "It's a tie! 🤝";
            isGameOver = true;
        }
    }

    function updatePointsDisplay() {
        player1PointsDisplay.textContent = `Player 1 Points: ${player1 ? player1.points : 0}`;
        player2PointsDisplay.textContent = `Player 2 Points: ${player2 ? player2.points : 0}`;
    }

    function resetGame() {
        board = [];
        isGameOver = false;
        resultDisplay.textContent = '';
        player1.resetBoard();
        player2.resetBoard();
        document.querySelectorAll(".tic_div").forEach(div => div.textContent = '');
    }

    function getCurrentPlayer() {
        return currentPlayer;
    }

    function setCurrentPlayer(player) {
        currentPlayer = player;
    }

    function getBoard() {
        return board;
    }

    function getPlayer1() {
        return player1;
    }

    function getPlayer2() {
        return player2;
    }

    function isGameOverFunc() {
        return isGameOver;
    }

    return {
        startGame,
        checkWin,
        resetGame,
        getCurrentPlayer,
        setCurrentPlayer,
        getBoard,
        getPlayer1,
        getPlayer2,
        isGameOver: isGameOverFunc,
    };
})();

// Display Controller Module
const DisplayController = (function () {
    let player1Name = "";
    let player2Name = "";

    function showDialog(playerIndex) {
        const dialogBox = document.querySelector("dialog");
        const submitButton = document.querySelector(".submit");
        const closeButton = document.querySelector(".close");
        const nameInput = document.querySelector("#name");

        nameInput.value = "";
        dialogBox.showModal();

        submitButton.onclick = function (event) {
            event.preventDefault();
            if (nameInput.value !== "") {
                if (playerIndex === 1) {
                    player1Name = nameInput.value;
                } else {
                    player2Name = nameInput.value;
                }
                dialogBox.close();
            } else {
                alert("Name can't be empty!");
            }
        };

        closeButton.onclick = function () {
            dialogBox.close();
        };
    }

    function setupGameboard() {
        const cells = document.querySelectorAll(".tic_div");

        cells.forEach(function (cell) {
            cell.addEventListener("click", function () {
                if (Game.isGameOver()) return;

                const index = parseInt(cell.getAttribute("data-index"));
                const currentPlayer = Game.getCurrentPlayer();

                if (!Game.getBoard().includes(index)) {
                    Game.getBoard().push(index);
                    currentPlayer.board.push(index);
                    cell.textContent = currentPlayer.mark;
                    Game.checkWin();

                    Game.setCurrentPlayer(
                        currentPlayer === Game.getPlayer1() ? Game.getPlayer2() : Game.getPlayer1()
                    );
                } else {
                    alert("This cell is already taken! 🚫");
                }
            });
        });

        const resetButton = document.querySelector(".reset");
        resetButton.addEventListener("click", Game.resetGame);
    }

    function startGame() {
        const p1Button = document.querySelector("#player1");
        const p2Button = document.querySelector("#player2");

        p1Button.addEventListener("click", function () {
            showDialog(1);
        });

        p2Button.addEventListener("click", function () {
            showDialog(2);
        });

        const startButton = document.createElement("button");
        startButton.textContent = "Start Game 🎮";
        startButton.classList.add("start-game");
        document.querySelector(".header").appendChild(startButton);

        startButton.addEventListener("click", function () {
            if (player1Name && player2Name) {
                Game.startGame(player1Name, player2Name);
                startButton.disabled = true;
                setupGameboard();
            } else {
                alert("Please enter both player names! ⚠️");
            }
        });
    }

    return {
        startGame,
        setupGameboard,
    };
})();

// Initialize the game
DisplayController.startGame();


