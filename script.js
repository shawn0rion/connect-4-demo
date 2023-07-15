const boardElement = document.querySelector("#board");

const player = {
  color: "red",
  hasTurn: true,
};

const computer = {
  color: "yellow",
  hasTurn: false,
};

const board = {
  spaces: [],
  numRows: 6,
  numCols: 7,
};

const space = {
  row: null,
  col: null,
  // if not occupied, then player is null
  player: null,
};

const createBoard = () => {
  for (let r = 0; r < board.numRows; r++) {
    board.spaces[r] = [];
    for (let c = 0; c < board.numCols; c++) {
      const spaceElement = document.createElement("div");
      spaceElement.classList.add("space");
      spaceElement.dataset.row = r;
      spaceElement.dataset.col = c;
      spaceElement.addEventListener("click", handleSpaceClick);
      boardElement.appendChild(spaceElement);
      // add event lister to each spaceElemeent
      board.spaces[r][c] = { player: null, row: r, col: c };
    }
  }
  console.log(board.spaces);
};

const handleSpaceClick = (event) => {
  const { row, col } = event.target.dataset;
  const selectedSpace = board.spaces[row][col];
  // handle a click on an occupied space
  if (selectedSpace.player !== null) return;

  const currentPlayer = player.hasTurn ? player : computer;

  // set color
  const spaceElement = document.querySelector(`[data-row=
        "${row}"][data-col="${col}"]`);
  spaceElement.style.backgroundColor = currentPlayer.color;

  // set player
  selectedSpace.player = currentPlayer;
  changePlayerTurn();

  // check game over
  if (checkGameOver(selectedSpace)) {
    alert(`${currentPlayer.color} wins!`);
    return;
  }
};

const changePlayerTurn = () => {
  player.hasTurn = !player.hasTurn;
  computer.hasTurn = !computer.hasTurn;
};

const checkGameOver = (space) => {
  const directions = {
    topLeft: { row: 1, col: -1 },
    top: { row: 1, col: 0 },
    topRight: { row: 1, col: 1 },
    right: { row: 0, col: +1 },
    bottomRight: { row: -1, col: 1 },
    bottom: { row: -1, col: 0 },
    bottomLeft: { row: -1, col: -1 },
    left: { row: 0, col: -1 },
  };
  console.log(directions);
  let counter = 1;
  for (let direction of Object.values(directions)) {
    console.log(direction);
    // dynamic row and col
    let newRow = direction.row + space.row;
    let newCol = direction.col + space.col;

    // this handles when the direction is out of bounds
    if (
      newRow < 0 ||
      newRow > board.numRows - 1 ||
      newCol < 0 ||
      newCol > board.numCols - 1
    ) {
      continue;
    }

    // check if up to 4 spaces in this direction has the same player
    while (
      checkDirection({ row: newRow, col: newCol }, space.player) &&
      counter < 4
    ) {
      counter++;
      newRow += direction.row;
      newCol += direction.col;
      if (
        newRow < 0 ||
        newRow > board.numRows - 1 ||
        newCol < 0 ||
        newCol > board.numCols - 1
      ) {
        break;
      }
    }
    if (counter === 4) {
      break;
    }
  }
  console.log(`counter: ${counter}`);
  return counter === 4;
};

const checkDirection = (direction, player) => {
  console.log(`check direction: ${direction.row}, ${direction.col}`);

  return board.spaces[direction.row][direction.col].player === player;
};

createBoard();
