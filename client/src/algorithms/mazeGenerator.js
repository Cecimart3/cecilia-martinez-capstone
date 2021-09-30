export function generateEllerMaze(gridIn) {
    const grid = gridIn.map(row => row.map(col => {
        return (col.isStart || col.isFinish) ? {...col} :
        {...col, isBarrier: true}}));
    let cells = [];
    for (let y = 0; y < grid.length; y++) {
      if (y % 2 === 0) {continue;}
      let rowSets = {};
      if (!cells[y]) {cells[y] = [];}
      for (let x = 0; x < grid[0].length; x++) {
        if (x % 2 === 0) {
          continue;
        }
        if (!cells[y][x]) {
          let setID = `${y}${x}`;
          let uniqueSet = new Set();
          let cell = { x: x, y: y, set: setID, connections: {} };
          cells[y][x] = cell;
          uniqueSet.add(cell);
          rowSets[setID] = uniqueSet;
        } else {
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
    cells[y].forEach((c) => {
      let rightCell = cells[y][c.x + 2];
      if (rightCell) {
        if (c.set !== rightCell.set) {
          if (removeWall() || y === grid.length - 1) {
            c.connections.right = true;
            let oldSet = rightCell.set;
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
          thisSet.forEach((c) => {
            if (removeWall() || thisSet.size === 1) {
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
          if (connects === 0) {
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
        cells[j].forEach(c => {
            if (grid[c.y][c.x].isStart || grid[c.y][c.x].isFinish) {
              grid[c.y][c.x].isBarrier = false;
              return
            }
            if (c) {
                grid[c.y][c.x].isBarrier = false
                if (c.connections.right) {
                    grid[c.y][c.x+1].isBarrier = false;
                }
                if (c.connections.down) {
                    grid[c.y+1][c.x].isBarrier = false;
                }
            }
        })
        j+=2;
        if (j < cells.length) {
            recursiveDrawMaze()
        }
    }
    recursiveDrawMaze();

    return grid;
}
