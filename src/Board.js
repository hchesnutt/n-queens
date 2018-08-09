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
    hasRowConflictAt: function(rowIndex) {
      let row = this.attributes[rowIndex];
      let sum = 0;
      // if sum > 1 there is a conflict at this index
      for (let i = 0; i < row.length; i++) {
        sum += row[i];
      }
      return sum > 1 ? true : false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      let wasTrue = false;
      // if any row on board contains rowConflict return true
      for (let i = 0; i < this.attributes.n; i++) {
        if (this.hasRowConflictAt(i)) {
          wasTrue = true;
          break;
        }
      }
      return wasTrue;
    },
    
    
    
    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      let sum = 0;
      // if sum > 1 there is a conflict at this index
      for (let i = 0; i < this.attributes.n; i++) {
        sum += this.attributes[i][colIndex];
      }
      return sum > 1 ? true : false;
    },
    
    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      let wasTrue = false;
      // if any row on board contains colConflict return true
      for (let i = 0; i < this.attributes.n; i++) {
        if (this.hasColConflictAt(i)) {
          wasTrue = true;
          break;
        }
      }
      return wasTrue;
    },
    
    
    
    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
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
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
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
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      let n = this.attributes.n;
      // if any major Diagonal index on board contains a conflict return true
      // iterate from -(n-1) to n-1 (technically you don't need to hit the corners)
      for (let i = -n + 1; i < n; i++) {
        if (i === -2) {
          debugger;
        }
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
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
