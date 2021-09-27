export function generateEllerMaze(gridIn) {
    const grid = gridIn.map(row => row.map(col => {
        return (col.isStart || col.isFinish) ? {...col} :
        {...col, isBarrier: true}}));
    // grid[19][1].isStart = true;
    // grid[1][39].isFinish = true;
    let cells = [];
    //Generate Maze
    for (let y = 0; y < grid.length; y++) {
      //Skip every other row
      if (y % 2 === 0) {continue;}
      //Reset sets for the current row
      let rowSets = {};
      //Step 1: Initialize empty row if it doesn't exist
      if (!cells[y]) {cells[y] = [];}
      for (let x = 0; x < grid[0].length; x++) {
        //Skip every other column
        if (x % 2 === 0) {
          continue;
        }
        if (!cells[y][x]) {
          //Step 2: create each cell in this row and if it doesn't exist yet, assign a unique set
          let setID = `${y}${x}`;
          let uniqueSet = new Set();
          let cell = { x: x, y: y, set: setID, connections: {} };
          cells[y][x] = cell;
          //add to set
          uniqueSet.add(cell);
          //add to row sets
          rowSets[setID] = uniqueSet;
        } else {
          //add existing cells to row sets
          let cell = cells[y][x];
          if (rowSets[cell.set]) {
            rowSets[cell.set].add(cell);
          } else {
            let uniqueSet = new Set();
            uniqueSet.add(cell);
            rowSets[cell.set] = uniqueSet;
          }
        }
      }

    function removeWall() {return Math.random() > 0.5;}
    //Step 3: Create right connections
    cells[y].forEach((c) => {
      let rightCell = cells[y][c.x + 2];
      //if current and right cell are in different sets, check remove wall
      if (rightCell) {
        if (c.set !== rightCell.set) {
          if (removeWall() || y === grid.length - 1) {
            //open the right path
            c.connections.right = true;
            let oldSet = rightCell.set;
            //merge right cell's set into left cell's set
            rowSets[oldSet].forEach((rc) => {
              rc.set = c.set;
              rowSets[c.set].add(rc);
            });
            delete rowSets[oldSet];
          }
        }
      }
    });
    if (y < grid.length - 1) {
        Object.entries(rowSets).forEach((kv) => {
          let connects = 0;
          let last;
          let thisSet = kv[1];
          let thisSetID = kv[0];
          //if set only has one entry, create a path down
          thisSet.forEach((c) => {
            //check removeWall or if this is the last row of the maze
            if (removeWall() || thisSet.size === 1) {
              //open the down path
              c.connections.down = true;
              connects += 1;
              if (!cells[y + 2]) {cells[y + 2] = [];}
              let downCell = {
                x: c.x,
                y: y + 2,
                set: thisSetID,
                connections: {}
              };
              cells[y + 2][c.x] = downCell;
            }
            last = c;
          });
          //make sure at least one connects
          if (connects === 0) {
            //open the down path
            last.connections.down = true;
            if (!cells[y + 2]) {cells[y + 2] = [];}
            let downCell = {
              x: last.x,
              y: y + 2,
              set: thisSetID,
              connections: {}
            };
            cells[y + 2][last.x] = downCell;
          }
        });
      }
    }

    let j = 1;
    function recursiveDrawMaze() {
        // console.log('recurring');
        cells[j].forEach(c => {
            if (grid[c.y][c.x].isStart || grid[c.y][c.x].isFinish) {
              grid[c.y][c.x].isBarrier = false;
              return
            }
            if (c) {
                // offScreenCTX.clearRect(c.x,c.y,1,1);
                grid[c.y][c.x].isBarrier = false
                if (c.connections.right) {
                    // offScreenCTX.clearRect(c.x+1,c.y,1,1);
                    grid[c.y][c.x+1].isBarrier = false;
                }
                if (c.connections.down) {
                    // offScreenCTX.clearRect(c.x,c.y+1,1,1);
                    grid[c.y+1][c.x].isBarrier = false;
                }
            }
        })
        j+=2;
        // source = offScreenCVS.toDataURL();
        // renderImage();
        if (j < cells.length) {
            recursiveDrawMaze()
        }
    }
    recursiveDrawMaze();

    // console.log(cells);
    return grid;
}

// // generateEllerMaze(gridModel())
// console.log(generateEllerMaze(gridModel()))