// board contents
const gameBoard = (() => {
  let board = [['', '', ''], ['', '', ''], ['', '', '']];

  const add = (column, row, mark) => {
    board[row][column] = mark;
  };

  return { board, add };
})();

// players
const Player = (username, mark) => {

  return { username, mark };
};

// interfacing
const displayController = (() => {

  let divContainer = document.querySelector('#board-container');
  divContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('board-square')) {
      const row = e.target.getAttribute("row") - 1;
      const column = e.target.getAttribute("column") - 1;
      game.newMark(column, row);
    }
  });

  const displayBoard = () => {
    divContainer.innerHTML = '';

    let board = gameBoard.board.flat();
    for (const [index, square] of board.entries()) {
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

  const getUsernameMock = (num) => {
    let username = '';
    switch (num) {
      case 0:
        username = 'Yves';
        break;
      case 1:
        username = 'Chuu';
        break;
      default:
        username = 'Cocomong';
        break
    }
    return username;
  };

  const displayWinnerMock = (winnerName) => {
    console.log(`${winnerName} won!`);
  };

  const displayCurrentPlayer = (currentPlayer) => {
    console.log(`current player: ${currentPlayer}`);
  };

  return { displayBoard, getUsernameMock, displayWinnerMock, displayCurrentPlayer };
})();

// game control
const game = (() => {
  let currentPlayer;

  const createPlayers = () => {
    let newPlayer = [];
    
    for (let num = 0; num <= 1; num++) {
      newPlayer.push(Player(displayController.getUsernameMock(num), getMark(num)));
    }
    
    return newPlayer;
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
        return '◯';
        break;
      default:
        return '?';
        break;
    }
  };

  const isGameOver = () => {
    if (isHorizontalWin() || isVerticalWin() || isDiagonalWin()) {
      displayController.displayWinnerMock(currentPlayer.username);
      return true;
    } else if (isBoardFull()) {
      displayController.displayWinnerMock('draw');
      return true;
    } else {
      return false;
    }
  };

  const isAllEqual = (arr) => {
    return arr.every(element => element === arr[0] && element !== '');
  };

  const isHorizontalWin = () => {
    if (gameBoard.board.map(arr => isAllEqual(arr)).includes(true)) {
      return true;
    } else {
      return false;
    }
  };

  const isVerticalWin = () => {
    let columns = [];
    for (let i = 0; i < 3; i++) {
      columns.push([gameBoard.board[0][i], gameBoard.board[1][i], gameBoard.board[2][i]]);
    }
    if (columns.map(arr => isAllEqual(arr)).includes(true)) {
      return true;
    } else {
      return false;
    }
  };

  const isDiagonalWin = () => {
    let diagonals = [];
    diagonals.push([gameBoard.board[0][0], gameBoard.board[1][1], gameBoard.board[2][2]]);
    diagonals.push([gameBoard.board[0][2], gameBoard.board[1][1], gameBoard.board[2][0]]);
    if (diagonals.map(arr => isAllEqual(arr)).includes(true)) {
      return true;
    } else {
      return false;
    }
  };

  const isBoardFull = () => {
    const board = gameBoard.board.flat();
    return board.every(isNotEmpty);
  };

  const isNotEmpty = (square) => {
    return square != '';
  };

  const isSquareEmpty = (column, row) => {
    return gameBoard.board[row][column] == '';
  };

  const newMark = (column, row) => {
    console.log(currentPlayer.username, column, row);
    if (!isGameOver() && isSquareEmpty(column, row)) {
      gameBoard.add(column, row, currentPlayer.mark);
      displayController.displayBoard();
      if (isGameOver()) {
        displayController.displayWinnerMock(currentPlayer.username);
      } else {
        switchCurrentPlayer();
        displayController.displayCurrentPlayer(currentPlayer.username);
      }
    }
  };
  
  // game start
  let players = createPlayers();
  const start = () => {
    currentPlayer = players[0];
    displayController.displayBoard();
    displayController.displayCurrentPlayer(currentPlayer.username);
  };

  return { start, players, currentPlayer, newMark }
})();




game.start();
