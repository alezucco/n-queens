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
  var board = new Board({n:n});
  var solution = board.rows();
  var count = 0;
  // check the board:
  // if (board.hasAnyRowConflicts() && board.hasAnyColConflicts() ) // passes
  //
  // board.togglePiece(row,col); toggles piece
  //

 for (var i = 0; i < n; i++) {
  for (var j = 0; j < n; j++) {
    board.togglePiece(i,j);
    if (!board.hasAnyRowConflicts() && !board.hasAnyColConflicts()) {
    // leave the new rook
    count++
    } else {
      // put it back to empty space
      board.togglePiece(i,j);
    }
    if (count === n) {
      var solution = board.rows();
    }
  }
 }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;

  var unpack = function(arr) {
    var len = n;
    var matrix = [];
    for (var i = 0; i < len; i++) {
      matrix.push([]);
      for (var j = 0; j < len; j++) {
        if (arr[i] !== undefined && arr[i] === j) {
          matrix[i].push(1);
        } else {
          matrix[i].push(0);
        }
      }
    }
    return new Board(matrix);
  };

  var recurse = function(row, col, state) {
    // take the state and rebuild board
    var board = unpack(state);
    // toggle this row, col
    board.togglePiece(row,col);

    if (!board.hasAnyRowConflicts() && !board.hasAnyColConflicts()) {
      // the index of state tracks the row, the number pushed is the col of the rook
      state.push(col);
      if (row === n - 1) {
        solutionCount++;
      } else {
        // for i position in the next row,
        // if i !== col
        // recurse(next row, i, state)
        for (var i = 0; i < n; i++) {
          if (i !== col) {
            recurse(row+1,i,state.slice(0));
          }
        }
      }
    }
  };

  for (var i = 0; i < n; i++) {
    var stateTracker = [];
    recurse(0,i,stateTracker)
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;

  // at each point of decision
  // recurse
  // if conflicts do nothing
  // if n number of rooks, and no conflicts, add to solution count

};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {

  var unpack = function(arr) {
    var len = n;
    var matrix = [];
    for (var i = 0; i < len; i++) {
      matrix.push([]);
      for (var j = 0; j < len; j++) {
        if (arr[i] !== undefined && arr[i] === j) {
          matrix[i].push(1);
        } else {
          matrix[i].push(0);
        }
      }
    }
    return new Board(matrix);
  };

  var recurse = function(row, col, state) {
    // take the state and rebuild board
    var board = unpack(state);
    // toggle this row, col
    board.togglePiece(row,col);

    if (!board.hasAnyRowConflicts() &&
     !board.hasAnyColConflicts() &&
     !board.hasAnyMajorDiagonalConflicts() &&
      !board.hasAnyMinorDiagonalConflicts()) {
      // the index of state tracks the row, the number pushed is the col of the rook
      state.push(col);
      if (row === n - 1) {
        solutionCount++;
      } else {
        // for i position in the next row,
        // if i !== col
        // recurse(next row, i, state)
        for (var i = 0; i < n; i++) {
          if (i !== col) {
            recurse(row+1,i,state.slice(0));
          }
        }
      }
    }
  };

  var solutionCount = 0;
  // if even number
  if (n % 2 === 0) {
    // recurse half and double count
    for (var i = 0; i < (n/2); i++) {
      var stateTracker = [];
      recurse(0,i,stateTracker);
    }
    solutionCount *= 2;

  // if odd number
  } else {
    // recurse the first half and double count
    // recurse median index by itself and do not double count
    for (var i = 0; i < Math.floor(n/2); i++) {
      var stateTracker = [];
      recurse(0,i,stateTracker);
    }
    solutionCount *= 2;
    var stateTracker = [];
    recurse(0,Math.floor(n/2),stateTracker);
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solutionCount));
  return solutionCount;
};
