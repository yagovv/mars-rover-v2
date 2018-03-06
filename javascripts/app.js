// Rover Object Goes Here
// ======================
var rovers = [];
var grid = new Array(10);
for (var i = 0; i < 10; i++) {
  grid[i] = new Array(10);
}
//Obstacles are 'O'. Rover is represented by its direction.
// ======================
//grid as the grid to initialize, obstacles as the probability of obstacle to appear from 1 to 100
function initializeGrid(grid, obstacles) {
  for (var j = 9; j >= 0; j--) {
    for (var i = 0; i < 10; i++) {
      if (Math.random() * 100 < obstacles && i != 0 && j != 0) {
        grid[i][j] = "[O]";
      } else {
        grid[i][j] = "[ ]";
      }
    }
  }
}
function showRovers(rovers) {
  return rovers;
}
//You can add a rover in the initial position heading north.
//Rovers as the rover array and grid as the grid.
function addRover(rovers, grid) {
  var clear = true;
  rovers.forEach(function(element) {
    if (element.x == 0 && element.y == 0) {
      clear = false;
    }
  });
  if (!clear) {
    console.log(
      "There is already a rover in the initial position! Move it first!"
    );
  } else {
    var rover = {
      direction: "N",
      x: 0,
      y: 0,
      travelLog: ["0 0"]
    };
    rovers.push(rover);
    console.log("Brand new rover ready in initial position!");
  }
}

//This function shows the actual grid with possible obstacles and rovers
function showGrid(grid, rovers) {
  var gridGraph = " ";
  var clear;
  var k;

  for (var j = 9; j >= 0; j--) {
    clear = true;
    gridGraph += "\n";
    for (var i = 0; i < 10; i++) {
      clear = true;
      rovers.forEach(function(element, index) {
        if (element.x == i && element.y == j) {
          clear = false;
          k = index;
        }
      });
      if (!clear) {
        gridGraph += "[";
        gridGraph += rovers[k].direction;
        gridGraph += "]";
      } else {
        gridGraph += grid[i][j];
      }
    }
  }
  return gridGraph;
}

function turnLeft(rovers, i) {
  switch (rovers[i].direction) {
    case "N":
      rovers[i].direction = "W";
      break;
    case "E":
      rovers[i].direction = "N";
      break;
    case "S":
      rovers[i].direction = "E";
      break;
    case "W":
      rovers[i].direction = "S";
      break;
  }
  console.log("Rover number " + i + " turned left!");
}

function turnRight(rovers, i) {
  switch (rovers[i].direction) {
    case "N":
      rovers[i].direction = "E";
      break;
    case "E":
      rovers[i].direction = "S";
      break;
    case "S":
      rovers[i].direction = "W";
      break;
    case "W":
      rovers[i].direction = "N";
      break;
  }
  console.log("Turned right!");
}

function moveForward(rovers, i) {
  var offGrid = false;
  var obstacle = false;
  var roverAhead = false;
  switch (rovers[i].direction) {
    case "N":
      if (rovers[i].y + 1 > 9) {
        offGrid = true;
      } else if (grid[rovers[i].x][rovers[i].y + 1] == "[O]") {
        obstacle = true;
      } else if (checkAhead(rovers[i], grid)) {
        roverAhead = true;
      } else {
        rovers[i].y++;
      }

      break;
    case "E":
      if (rovers[i].x + 1 > 9) {
        offGrid = true;
      } else if (grid[rovers[i].x + 1][rovers[i].y] == "[O]") {
          obstacle = true;
        } else if (checkAhead(rovers[i], grid)) {
          roverAhead = true;
        } else {
          rovers[i].x++;
        }
      
      break;
    case "S":
      if (rovers[i].y - 1 < 0) {
        offGrid = true;
      } else if (grid[rovers[i].x][rovers[i].y - 1] == "[O]") {
          obstacle = true;
        } else if (checkAhead(rovers[i], grid)) {
          roverAhead = true;
        } 
        else {
          rovers[i].y--;
        }
      
      break;
    case "W":
      if (rovers[i].x - 1 < 0) {
        offGrid = true;
      } else if (grid[rovers[i].x - 1][rovers[i].y] == "[O]") {
          obstacle = true;
        } else if (checkAhead(rovers[i], grid)) {
          roverAhead = true;
        }
        else {
          rovers[i].x--;
        }
      
      break;
  }
  if (offGrid) {
    console.log("The rover cannot go forward! Limits of the grid reached!");
  } else if (obstacle) {
    console.log("There's an obstacle ahead! Cannot go further!");
  } else if (roverAhead) {
    console.log("There's a rover ahead. *Horn* Get out of the way! ");
  } else {
    console.log("Moved forward!");
    var x = rovers[i].x.toString();
    var space = " ";
    var y = rovers[i].y.toString();
    var coords = x.concat(space);
    rovers[i].travelLog.push(coords.concat(y));
  }
}
function moveBackwards(rovers, i) {
  var rover = rovers[i];
  var offGrid = false;
  var obstacle = false;
  var roverBehind = false;

  switch (rover.direction) {
    case "N":
      if (rover.y - 1 < 0) {
        offGrid = true;
      } else if (grid[rover.x][rover.y - 1] == "[O]") {
        obstacle = true;
      } else if (checkBehind){
        roverBehind = true;
      }
      else {
        rover.y--;
      }
      break;
    case "E":
      if (rover.x - 1 < 0) {
        offGrid = true;
      } else if (grid[rover.x - 1][rover.y] == "[O]") {
        obstacle = true;
      } else if (checkBehind){
        roverBehind = true;
      } 
      else {
        rover.x--;
      }
      break;
    case "S":
      if (rover.y + 1 > 9) {
        offGrid = true;
      } else if (grid[rover.x][rover.y + 1] == "[O]") {
        obstacle = true;
      } else if (checkBehind){
        roverBehind = true;
      }
      else {
        rover.y++;
      }
      break;
    case "W":
      if (rover.x + 1 > 9) {
        offGrid = true;
      } else if (grid[rover.x + 1][rover.y] == "[O]") {
        obstacle = true;
      } else if (checkBehind){
        roverBehind = true;
      } 
      else {
        rover.x++;
      }
      break;
  }
  if (offGrid) {
    console.log("The rover cannot go backwards! Limits of the grid reached!");
  } else if (obstacle) {
    console.log("There's an obstacle behind! Cannot go further!");
  } else if (roverBehind){
    console.log("There's a rover behind! Careful! It's watching us...");
  } else {
    console.log("Moved backwards!");
    var x = rover.x.toString();
    var space = " ";
    var y = rover.y.toString();
    var coords = x.concat(space);
    rover.travelLog.push(coords.concat(y));
  }
}
//True if there is a rover ahead
//the grid does not store the rover position, so the check should be based on a foreach checking the positions of each rover.
function checkAhead(rover, grid) {
  var ahead = false;
  switch (rover.direction) {
    case "N":
      rovers.forEach(function(element) {
        if (element.x == rover.x && element.y == rover.y+1) {
          ahead = true;
        }
      });
      break;
    case "E":
      rovers.forEach(function(element) {
        if (element.x == rover.x+1 && element.y == rover.y) {
          ahead = true;
        }
      });
      break;
    case "S":
      rovers.forEach(function(element) {
        if (element.x == rover.x && element.y == rover.y-1) {
          ahead = true;
        }
      });
      break;
    case "W":
      rovers.forEach(function(element) {
        if (element.x == rover.x-1 && element.y == rover.y) {
          ahead = true;
        }
      });
      break;
  }
  return ahead;
}
function checkBehind(rover, grid) {
  var ahead = false;
  switch (rover.direction) {
    case "N":
      rovers.forEach(function(element) {
        if (element.x == rover.x && element.y == rover.y-1) {
          ahead = true;
        }
      });
      break;
    case "E":
      rovers.forEach(function(element) {
        if (element.x == rover.x-1 && element.y == rover.y) {
          ahead = true;
        }
      });
      break;
    case "S":
      rovers.forEach(function(element) {
        if (element.x == rover.x && element.y == rover.y+1) {
          ahead = true;
        }
      });
      break;
    case "W":
      rovers.forEach(function(element) {
        if (element.x == rover.x+1 && element.y == rover.y) {
          ahead = true;
        }
      });
      break;
  }
  return ahead;
}
function commands(commands, rovers, index) {
  var rover = rovers[index];
  for (var i = 0; i < commands.length; i++) {
    var command = commands[i];
    switch (command) {
      case "f":
        moveForward(rovers, index);
        break;
      case "r":
        turnRight(rovers, index);
        break;
      case "l":
        turnLeft(rovers, index);
        break;
      case "b":
        moveBackwards(rovers, index);
        break;
      default:
        console.log("Unknown command!");
        break;
    }
  }
  for (var loggedCoord in rover.travelLog) {
    console.log("loggedCoord: " + rover.travelLog[loggedCoord]);
  }
}
