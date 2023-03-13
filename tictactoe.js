// board contents
const gameBoard = (() => {
  let boardArray = [['', '', ''], ['', '', ''], ['', '', '']];

  const add = (column, row, mark) => {
    boardArray[row][column] = mark;
  };

  const reset = () => {
    boardArray = [['', '', ''], ['', '', ''], ['', '', '']];
  };

  const board = () => {
    return boardArray;
  }

  return { board, add, reset };
})();

// players
const Player = (username, mark) => {

  return { username, mark };
};

// interfacing
const displayController = (() => {

  let divContainer = document.querySelector('#board-container');
  divContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('board-square') && game.getPlayers().length != 0) {
      const row = e.target.getAttribute("row") - 1;
      const column = e.target.getAttribute("column") - 1;
      game.newMark(column, row);
    }
  });

  const modal = document.getElementById('new-modal');
  const modalBtn = document.getElementById('btn-restart');
  const modalClose = document.getElementById('btn-close');
  modalBtn.onclick = function() {
    modal.style.display = "block";
  }

  modalClose.onclick = function() {
    modal.style.display = 'none';
  }
  
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }

  const form = document.querySelector('#form-new-game');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    game.createPlayers([form.elements['player-one'].value, form.elements['player-two'].value]);
    gameBoard.reset();
    modal.style.display = 'none';
  });

  const displayBoard = () => {
    divContainer.innerHTML = '';
    let board = gameBoard.board();
    for (const [index, square] of board.flat().entries()) {
      const divSquare = document.createElement('div');
      divSquare.classList.add('board-square');
      divSquare.setAttribute('column', indexToColumn(index));
      divSquare.setAttribute('row', indexToRow(index));
      divSquare.textContent = square;
      divContainer.appendChild(divSquare);
    }
  };

  const indexToColumn = (index) => {
    return index % 3 + 1;
  };

  const indexToRow = (index) => {
    return Math.ceil((index + 1) / 3);
  };

  const displayGameStart = () => {
    const divPlayer = document.querySelector('#current-player');
    divPlayer.textContent = 'Welcome! Click the button below to start!';
  };

  const displayWinner = (opt, winnerName) => {
    const divPlayer = document.querySelector('#current-player');
    switch (opt) {
      case 1:
        divPlayer.textContent = `${winnerName} won!`;
        break;
      default:
        divPlayer.textContent = `It's a draw :/`;
        break;
    }
  };

  const displayCurrentPlayer = (username, mark) => {
    const divPlayer = document.querySelector('#current-player');
    divPlayer.textContent = `${username}'s turn! Mark: ${mark}`;
  };

  return { displayBoard, displayGameStart, displayWinner, displayCurrentPlayer };
})();

// game control
const game = (() => {
  let currentPlayer;
  let players = [];

  const getPlayers = () => players;

  const createPlayers = (playerNames) => {
    let newPlayer = [];
    
    for (let num = 0; num <= 1; num++) {
      newPlayer.push(Player(playerNames[num], getMark(num)));
    }
    players = newPlayer;
    currentPlayer = players[0];
    //start game
    gameBoard.reset();
    displayController.displayCurrentPlayer(currentPlayer.username, currentPlayer.mark);
    displayController.displayBoard();
  };

  const switchCurrentPlayer = () => {
    if (currentPlayer == players[0]) {
      currentPlayer = players[1]
    } else {
      currentPlayer = players[0]
    }
  };
  
  const getMark = (num) => {
    switch (num) {
      case 0:
        return '✕';
        break;
      case 1:
        return '⭘';
        break;
      default:
        return '?';
        break;
    }
  };

  const isGameOver = () => {
    if (isHorizontalWin() || isVerticalWin() || isDiagonalWin()) {
      displayController.displayWinner(1, currentPlayer.username);
      return true;
    } else if (isBoardFull()) {
      displayController.displayWinner(2, 'draw');
      return true;
    } else {
      return false;
    }
  };

  const isAllEqual = (arr) => {
    return arr.every(element => element === arr[0] && element !== '');
  };

  const isHorizontalWin = () => {
    let board = gameBoard.board();
    if (board.map(arr => isAllEqual(arr)).includes(true)) {
      return true;
    } else {
      return false;
    }
  };

  const isVerticalWin = () => {
    let columns = [];
    let board = gameBoard.board();
    for (let i = 0; i < 3; i++) {
      columns.push([board[0][i], board[1][i], board[2][i]]);
    }
    if (columns.map(arr => isAllEqual(arr)).includes(true)) {
      return true;
    } else {
      return false;
    }
  };

  const isDiagonalWin = () => {
    let diagonals = [];
    let board = gameBoard.board();
    diagonals.push([board[0][0], board[1][1], board[2][2]]);
    diagonals.push([board[0][2], board[1][1], board[2][0]]);
    if (diagonals.map(arr => isAllEqual(arr)).includes(true)) {
      return true;
    } else {
      return false;
    }
  };

  const isBoardFull = () => {
    let board = gameBoard.board();
    return board.flat().every(isNotEmpty);
  };

  const isNotEmpty = (square) => {
    return square != '';
  };

  const isSquareEmpty = (column, row) => {
    let board = gameBoard.board();
    return board[row][column] == '';
  };

  const newMark = (column, row) => {
    if (!isGameOver() && isSquareEmpty(column, row)) {
      gameBoard.add(column, row, currentPlayer.mark);
      displayController.displayBoard();
      if (isGameOver()) {
        // idk
      } else {
        switchCurrentPlayer();
        displayController.displayCurrentPlayer(currentPlayer.username, currentPlayer.mark);
      }
    }
  };
  
  // game start
  const start = () => {
    displayController.displayBoard();
    displayController.displayGameStart();
  };

  return { start, getPlayers, currentPlayer, newMark, createPlayers }
})();

game.start();