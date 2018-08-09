// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    // accepts a row index
    hasRowConflictAt: function(rowIndex) {
<<<<<<< HEAD
      let row = this.attributes[rowIndex];
      let sum = 0;
      // if sum > 1 there is a conflict at this index
      for (let i = 0; i < row.length; i++) {
        sum += row[i];
      }
      return sum > 1 ? true : false;
=======
      // retrieve row with rowIndex
      var row = this.get(rowIndex);
      // initialize sum
      var sum = 0;
      // loop through row, add each to sum  
      for (var i = 0; i < row.length; i++) {
        sum += row[i];
      }
      // if sum < 2 return false 
      return sum >= 2;
>>>>>>> df6d645eba8361be04913733c9a65003023f056e
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
<<<<<<< HEAD
      let wasTrue = false;
      // if any row on board contains rowConflict return true
      for (let i = 0; i < this.attributes.n; i++) {
        if (this.hasRowConflictAt(i)) {
          wasTrue = true;
          break;
        }
      }
      return wasTrue;
=======
      var board = this.rows();
      // for each row, test each row
      for (var rowInd = 0; rowInd < board.length; rowInd++) {
        // if one row returns true return true 
        if(this.hasRowConflictAt(rowInd)) {
          return true;
        }
      }
      return false;
>>>>>>> df6d645eba8361be04913733c9a65003023f056e
    },
    
    
    
    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
<<<<<<< HEAD
      let sum = 0;
      // if sum > 1 there is a conflict at this index
      for (let i = 0; i < this.attributes.n; i++) {
        sum += this.attributes[i][colIndex];
      }
      return sum > 1 ? true : false;
=======
      
      var sum = 0;
      var rows = this.rows();
      for (var i = 0; i < rows.length; i++) {
        var square = rows[i][colIndex];
        sum += square;
      }
      return sum >= 2; // fixme
>>>>>>> df6d645eba8361be04913733c9a65003023f056e
    },
    
    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
<<<<<<< HEAD
      let wasTrue = false;
      // if any row on board contains colConflict return true
      for (let i = 0; i < this.attributes.n; i++) {
        if (this.hasColConflictAt(i)) {
          wasTrue = true;
          break;
        }
      }
      return wasTrue;
=======
      
      var firstRow = this.get(0);
      for (var i = 0; i < firstRow.length; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
>>>>>>> df6d645eba8361be04913733c9a65003023f056e
    },
    
    
    
    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
<<<<<<< HEAD
    hasMajorDiagonalConflictAt: function(diag) {
      let sum = 0;
      let n = this.attributes.n;
      let startRow = Math.max(-diag, 0);
      let endRow = Math.min(n - diag - 1, n - 1);
      let startCol = Math.max(diag, 0);
      let endCol = Math.min(n + diag - 1, n - 1);
      console.log('Columns', startCol, endCol);
      console.log('Rows', startRow, endRow);
      for (let i = startRow; i < endRow + 1; i++) {
        for (let j = startCol; j < endCol + 1; j++) {
          if (j - i === diag) {
            sum += this.attributes[i][j];
          }
        }
      }
      console.log(diag, sum, sum > 1 ? true : false);
      return sum > 1 ? true : false;
    },
    
    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      let wasTrue = false;
      let n = this.attributes.n;
      // if any major Diagonal index on board contains a conflict return true
      // iterate from -(n-1) to n-1 (technically you don't need to hit the corners)
      for (let i = -n + 1; i < n; i++) {
        // if (i === -2) {
        //   debugger;
        // }
        if (this.hasMajorDiagonalConflictAt(i)) {
          wasTrue = true;
          break;
        }
      }
      return wasTrue;
=======
    hasMajorDiagonalConflictAt: function(diagonalId) {
      //create diagonal array
      var diagonal = [];
      var board = this.rows();
      //loop through every row on board
      for (var row = 0; row < board.length; row ++) {
        //loop through each square in the row
        for (var col = 0; col < board.length; col++) {
          //if diff in square's col-row === parameter
          if (col - row === diagonalId) {
            //add the value of that square to diagonal array;  
            diagonal.push(board[row][col]);
          }
        }
      }
      //create sum var   
      var sum = 0;
      //loop through diagonal array
      for (var i = 0; i < diagonal.length; i++) {
        //sum up values in array
        sum += diagonal[i];
      }
      //return true if sum >= 2;
      return sum >= 2;
    },

    // test if any major diagonals on this board contain conflicts (column - row)
    hasAnyMajorDiagonalConflicts: function() {
      //max id is (total # of rows on board -1)
      var maxId = this.rows().length;
      //min id is -(total # of rows on board-1)
      var minId = -maxId + 1;
      //loop through -id to positive id
      for (var i = minId; i < maxId; i++) {
        //call hasMajorDiagonalConflictAt with the id
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
>>>>>>> df6d645eba8361be04913733c9a65003023f056e
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
<<<<<<< HEAD
    hasMinorDiagonalConflictAt: function(diag) {
      let sum = 0;
      let n = this.attributes.n;

      let startRow = Math.max(diag, 0);
      let endRow = Math.min(n + diag - 1, n - 1);
      let startCol = Math.max(-diag, 0);
      let endCol = Math.min(n - diag - 1, n - 1);
      console.log('Columns', startCol, endCol);
      console.log('Rows', startRow, endRow);
      for (let i = startRow; i < endRow + 1; i++) {
        for (let j = startCol; j < endCol + 1; j++) {
          if (j + i === diag) {
            sum += this.attributes[i][j];
          }
        }
      }
      console.log(diag, sum, sum > 1 ? true : false);
      return sum > 1 ? true : false;
=======
    hasMinorDiagonalConflictAt: function(diagonalId) {
      //create diagonal array
      var diagonal = [];
      var board = this.rows();
      //loop through every row on board
      for (var row = 0; row < board.length; row ++) {
        //loop through each square in the row
        for (var col = 0; col < board.length; col++) {
          //if diff in square's col-row === parameter
          if (col + row === diagonalId) {
            //add the value of that square to diagonal array;  
            diagonal.push(board[row][col]);
          }
        }
      }
      //create sum var   
      var sum = 0;
      //loop through diagonal array
      for (var i = 0; i < diagonal.length; i++) {
        //sum up values in array
        sum += diagonal[i];
      }
      //return true if sum >= 2;
      return sum >= 2; 
>>>>>>> df6d645eba8361be04913733c9a65003023f056e
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
<<<<<<< HEAD
      let n = this.attributes.n;
      // if any major Diagonal index on board contains a conflict return true
      // iterate from -(n-1) to n-1 (technically you don't need to hit the corners)
      for (let i = -n + 1; i < n; i++) {
        if (i === -2) {
          debugger;
        }
=======
      //max id is sum of bottom right square coordinates aka (# of rows-1, # of rows-1)
      var maxId = (this.rows().length - 1) * 2;
      //min id is 0
      var minId = 0;
      //loop from min id to max
      for (var i = minId; i <= maxId; i++) {
        //call hasMinorDiagonalConflictAt with the id
>>>>>>> df6d645eba8361be04913733c9a65003023f056e
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
<<<<<<< HEAD
=======
      //if true, return true 
>>>>>>> df6d645eba8361be04913733c9a65003023f056e
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
