/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  // return value
  var solution = undefined;
  //declare solutions results array
  var solutions = [];
  //create initial board with n
  var boardObj = new Board({n:n}); //not the matrix
  
  var solver = function (boardObj, rowIndex, colIndex, counter) {
  //helper function (board, nextPieceCoordinates)
    // togglePiece: function(rowIndex, colIndex) 
    boardObj.togglePiece(rowIndex, colIndex);
    //check for conflicts
    //check for row and column conflicts
    if (boardObj.hasAnyRowConflicts() || boardObj.hasAnyColConflicts()) {
      //if conflicts, toggle piece back 
      boardObj.togglePiece(rowIndex, colIndex);
      //return (out of function)
      return;
    } else {
      //increment counter
      counter++;
      //if counter < n
      if (counter < n) {
        //loop through next row //optimization:
        for (var i = 0; i < n; i++) {
          //call helper function on new potential piece (board, potentialPiece, counter+1)
          //skip same column
          if (i !== colIndex) {
            var solved = solver(boardObj, rowIndex + 1, i, counter);
            if (solved) {
              return solved;
            }
          }
        }
        //untoggle 
        boardObj.togglePiece(rowIndex, colIndex);
      } else if (counter === n) {
                // for deep copy of array
        let solutionsBoard = JSON.parse(JSON.stringify(boardObj.rows()));
        //push board to solutions
        return solutionsBoard;
        //untoggle 
        boardObj.togglePiece(rowIndex, colIndex);
      }       
    }
  }
  //loop through squares in initial board (only first row bc of optimization - )
  for (var i = 0; i < n; i++) {
    //call helper function (board, current square, counter)
    return solver(boardObj, 0, i, 0);
  } 
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined;  
  //declare solutions results array
  var solutions = [];
  //create initial board with n
  var boardObj = new Board({n:n}); //not the matrix
  
  var solver = function (boardObj, rowIndex, colIndex, counter) {
  //helper function (board, nextPieceCoordinates)
    // togglePiece: function(rowIndex, colIndex) 
    boardObj.togglePiece(rowIndex, colIndex);
    //check for conflicts
    //check for row and column conflicts
    if (boardObj.hasAnyRowConflicts() || boardObj.hasAnyColConflicts()) {
      //if conflicts, toggle piece back 
      boardObj.togglePiece(rowIndex, colIndex);
      //return (out of function)
      return;
    } else {
      //increment counter
      counter++;
      //if counter < n
      if (counter < n) {
        //loop through next row //optimization:
        for (var i = 0; i < n; i++) {
          //call helper function on new potential piece (board, potentialPiece, counter+1)
          //skip same column
          if (i !== colIndex) {
            solver(boardObj, rowIndex + 1, i, counter);
          }
        }
        //untoggle 
        boardObj.togglePiece(rowIndex, colIndex);
      } else if (counter === n) {
        // for deep copy of array
        let solutionsBoard = JSON.parse(JSON.stringify(boardObj.rows()));
        //push board to solutions
        solutions.push(solutionsBoard);
        //untoggle 
        boardObj.togglePiece(rowIndex, colIndex);
      }       
    }
  };
  
  //loop through squares in initial board (only first row bc of optimization - )
  for (var i = 0; i < n; i++) {
    //call helper function (board, current square, counter)
    solver(boardObj, 0, i, 0);
  }
  console.log('Number of solutions for ' + n + ' rooks:', solutions.length);
  //return solutions array.length
  return solutions.length;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined;
  //declare solutions results array
  var solutions = [];
  //create initial board with n
  var boardObj = new Board({n:n}); //not the matrix
  if (n === 0) return 0;
  //helper function (board, nextPieceCoordinates)
  var solver = function (boardObj, rowIndex, colIndex, counter) {
    // togglePiece: function(rowIndex, colIndex) 
    boardObj.togglePiece(rowIndex, colIndex);
    //check for conflicts
    //check for row and column conflicts
    if (boardObj.hasAnyQueensConflicts()) {
      //if conflicts, toggle piece back 
      boardObj.togglePiece(rowIndex, colIndex);
      //return (out of function)
      return;
    } else {
      //increment counter
      counter++;
      //if counter < n
      if (counter < n) {
        //loop through next row //optimization:
        for (var i = 0; i < n; i++) {
          //call helper function on new potential piece (board, potentialPiece, counter+1)
          //skip same column
          if (i !== colIndex) {
            var solved = solver(boardObj, rowIndex + 1, i, counter);
            if (solved) {
              return solved;
            }
          }
        }
        //untoggle 
        boardObj.togglePiece(rowIndex, colIndex);
      } else if (counter === n) {
        // for deep copy of array
        let solutionsBoard = JSON.parse(JSON.stringify(boardObj.rows()));
        //push board to solutions
        //untoggle 
        boardObj.togglePiece(rowIndex, colIndex);
        return solutionsBoard;
      }       
    }
  }
  //loop through squares in initial board (only first row bc of optimization - )
  for (var i = 0; i < n; i++) {
    var solved = solver(boardObj, 0, i, 0);
    if (solved) {
      //call helper function (board, current square, counter)
      return solved;
    }
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  if (solved === undefined) {
    //create an array of n rows and cols
    //fill with 0
    var board = new Board({n: n});
    return board.rows();
  }
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  // if n = 0 return 1 for who knows why
  if (n === 0) return 1;  
  //create new board with n
  var boardObj = new Board({n: n});
  //declare solver function (boardobj, rowindex, colindex, counter, exploredColsObj)
  var solver = function(boardObj, rowInd, colInd, counter, exploredColsObj) {
    //toggle the piece with row and col
    boardObj.togglePiece(rowInd, colInd);
    //if conflicts on row/col/major/minor
    if (boardObj.hasAnyQueensConflicts()) {
      //untoggle 
      boardObj.togglePiece(rowInd, colInd);
      //return out
      return;
    //if no conflicts
    } else {
      //increment counter
      counter++;
      //if counter is less than n
      if (counter < n) {
        // store in exploredColsObj
        exploredColsObj[colInd] = true;
        //for each in next row
        for (var i = 0; i < n; i++) {
          //if i is not in explored
          solver(boardObj, rowInd + 1, i, counter, exploredColsObj)
        }
        //untoggle piece & falsify col in exploredColsObj
        boardObj.togglePiece(rowInd, colInd);
        boardObj[colInd] = false;
      }
      //if counter is n
      if (counter === n) {
        //increment solutionCount
        solutionCount++;
        //untoggle piece & falsify col in exploredColsObj
        boardObj.togglePiece(rowInd, colInd);
        boardObj[colInd] = false;
      }
    }
  }
  //invoke solver on each in first row
  for (var i = 0; i < n; i++) {
    solver(boardObj, 0, i, 0, {})
  }
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
