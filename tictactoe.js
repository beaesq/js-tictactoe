// board contents
const gameBoard = (() => {
  // let board = [['X', 'O', 'X'], ['X', 'O', 'O'], ['O', 'X', 'X']];
  let board = [['', '', ''], ['', '', ''], ['', '', '']];
  return { board };
})();

// players
const Player = (username, mark) => {

  return { username, mark };
};

// game control
const game = (() => {

})();

const displayController = (() => {
  const displayBoard = () => {
    let divContainer = document.querySelector('#board-container');
    divContainer.innerHTML = '';

    let board = gameBoard.board.flat();
    for (const [index, square] of board.entries()) {
      const divSquare = document.createElement('div');
      divSquare.classList.add('board-square');
      divSquare.setAttribute('column', indexToColumn(index));
      divSquare.setAttribute('row', indexToRow(index));
      console.log(index, indexToColumn(index), indexToRow(index));
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

  return { displayBoard };
})();

displayController.displayBoard();