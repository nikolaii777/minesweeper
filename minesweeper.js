document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  cells: generateCells(3)
}

//console.log(board.cells)
//console.log(board.cells[5])

function startGame() {
  // Don't remove this function call: it makes the game work!
  board.cells[1].isMine = true
  board.cells[3].isMine = true
  board.cells[5].isMine = true
  lib.initBoard()
  for (i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  }
  document.addEventListener('click', checkForWin) // call check for win function on click
  document.addEventListener('contextmenu', checkForWin)
}

function generateCells(size) {
  var cells = []
  for (i = 0; i < size; i++) {
    for (j = 0; j < size; j++) {
      cell = {
        row: i,
        col: j,
        isMine: false,
        hidden: true
      }
      cells.push(cell)
    }
  }
  return cells
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin() {
  for (var i = 0; i < board.cells.length; i++) {
    console.log(board.cells[i])
    if (board.cells[i].isMine && board.cells[i].isMarked) {
      return
    }
  }
  for (var i = 0; i < board.cells.length; i++) {
    if (board.cells[i].isMine == false && board.cells[i].hidden) {
      return
    }
  }
  lib.displayMessage('You win!')
}

//if all cells that are not mines are visible && if all mines are marked
//then return lib.displayMessage('You win!')

// You can use this function call to declare a winner (once you've
// detected that they've won, that is!)
//   lib.displayMessage('You win!')

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`:
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through
// them, counting the number of times `cell.isMine` is true.

function countSurroundingMines(cell) {
  var surrounding = lib.getSurroundingCells(cell.row, cell.col)
  var count = 0
  for (i = 0; i < surrounding.length; i++) {
    if (surrounding[i].isMine) {
      count++
    }
  }
  return count
}
