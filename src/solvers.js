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
  }
  //loop through squares in initial board (only first row bc of optimization - )
  for (var i = 0; i < n; i++) {
    //call helper function (board, current square, counter)
    solver(boardObj, 0, i, 0);
    
  }
  solution = solutions[0];
  console.log(solutions)
  
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined;  
  //declare solutions results array
  var solutions = [];
  //create initial board with n
  var boardObj = new Board({n:n}); //not the matrix
  
  var solver = function (boardObj, rowIndex, colIndex, counter) {
    debugger;
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
  console.log(1, solutions)
  //return solutions array.length
  return solutions.length;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
