document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const message = document.getElementById('message');
    const cells = document.querySelectorAll('.cell');
  
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
  
    const checkWinner = () => {
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
      ];
  
      for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          return gameBoard[a];
        }
      }
  
      return null;
    };
  
    const checkDraw = () => {
      return gameBoard.every(cell => cell !== '');
    };
  
    const endGame = (result) => {
      gameActive = false;
      message.textContent = result ? `${result} wins!` : 'It\'s a draw!';
    };
  
    const handleClick = (index) => {
      if (!gameActive || gameBoard[index] !== '') return;
  
      gameBoard[index] = currentPlayer;
      cells[index].textContent = currentPlayer;
  
      const winner = checkWinner();
      if (winner) {
        endGame(winner);
      } else if (checkDraw()) {
        endGame(null);
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    };
  
    const handleCellClick = (event) => {
      const index = event.target.dataset.index;
      handleClick(index);
    };
  
    const restartGame = () => {
      gameBoard = ['', '', '', '', '', '', '', '', ''];
      gameActive = true;
      message.textContent = '';
      cells.forEach(cell => {
        cell.textContent = '';
      });
    };
  
    cells.forEach(cell => {
      cell.addEventListener('click', handleCellClick);
    });
  
    document.getElementById('board').addEventListener('click', handleCellClick);
  
    document.getElementById('restart-btn').addEventListener('click', restartGame);
  });
  