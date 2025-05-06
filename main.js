

function createGame() {
  let gameBoard = {
    board: ["", "", "", "", "", "", "", "", ""], // empty strings can be filled with x or O to track player moves
  };
}

function createPlayer(name, symbol) { // creates player objects
  return { name, symbol };
}


function GameController() {
  // Two players created
    const playerOne = createPlayer("Player 1", "X");
    const playerTwo = createPlayer("Player 2", "O");
  
    let currentPlayer = playerOne; // Tracks whose turn it is
  
    // Tracks current board state
    const gameBoard = {
      board: ["", "", "", "", "", "", "", "", ""]
    };
  
    let gameOver = false; // prevents extra move after win or tie
  
    function playRound(index) {
      if (gameBoard.board[index] !== "" || gameOver) return; // prevents playing in taken cells
  
      gameBoard.board[index] = currentPlayer.symbol; // updates board with current players symbol
  
      if (checkWinner(currentPlayer.symbol)) { // looks for a 3-in-a-row matches
        alert(`${currentPlayer.name} wins!`);
        gameOver = true;
        return;
      }
  
      if (gameBoard.board.every(cell => cell !== "")) {
        alert("It's a tie!"); // if the board is full it is a tie
        gameOver = true;
        return;
      }
  
      switchPlayer();
    }
  
    function checkWinner(symbol) {
      const b = gameBoard.board;
  
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
      ];
  
      return winPatterns.some(pattern =>
        pattern.every(index => b[index] === symbol)
      );
    }
  
    function switchPlayer() {
      currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne; // flips turn between X and O
    }
  
    function getCurrentPlayer() {
      return currentPlayer;
    }
  
    function resetGame() {
      gameBoard.board = ["", "", "", "", "", "", "", "", ""];
      currentPlayer = playerOne;
      gameOver = false;
    }
  
    return {
      playRound,
      getCurrentPlayer,
      resetGame,
      gameBoard
    };
  }
  
  

  const game = GameController();

const cells = document.querySelectorAll('.cell');

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const index = parseInt(cell.getAttribute('data-index')); // gets the cell index
    
    if (game.gameBoard.board[index] !== "") return; // plays a round via game.playRound(index)

    game.playRound(index);
    cell.textContent = game.gameBoard.board[index]; // updates the ui
  });
});


const resetBtn = document.getElementById('reset-btn');

resetBtn.addEventListener('click', () => {
  game.resetGame(); // resets the game state
  cells.forEach(cell => {
    cell.textContent = ""; // clears the board
  });
});
