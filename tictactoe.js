// board contents
const gameBoard = (() => {
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
    for (const square of board) {
      const divSquare = document.createElement('div');
      divSquare.classList.add('board-square');
      divSquare.textContent = square;
      divContainer.appendChild(divSquare);
    }
  };

  return { displayBoard };
})();
