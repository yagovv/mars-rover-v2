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
  for(var j = 9; j>= 0; j--){
    for(var i = 0; i < 10; i++){
      if(Math.random()*100 < obstacles && i != rover.x && j != rover.y){
        grid[i][j] = "[O]";
      }else{
        grid[i][j] = "[ ]";
      }
    }
  }
}
//You can add a rover in the initial position heading north. 
//Rovers as the rover array and grid as the grid.
function addRover(rovers, grid) {
  if(grid[0][0] != "[ ]"){
    console.log("There is already a rover in the initial position! Move it first!");
  }else {
    var rover = {
      direction: "N",
      x: 0,
      y: 0,
      travelLog: ["0 0"]
    };
    rovers.push(rover);
  }
}

//This function shows the actual grid with possible obstacles and rovers
function showGrid(grid) {
  var gridGraph = " ";
  var clear = true;
  var k = 0;
  
  for(var j = 9; j>= 0; j--){
    gridGraph += "\n";
    for(var i = 0; i < 10; i++){
      for(k = 0; k < rovers.length; k++){
        if(i == rovers[k].x && j == rovers[k].y){
          clear = false;
        }
      }
      if(!clear){
        gridGraph += '[';
        gridGraph += rovers[k].direction;
        gridGraph += ']';
      }else{
        gridGraph += grid[i][j];
      }  
    }
  }
  return gridGraph;
}

function turnLeft(rover) {
  switch (rover.direction) {
    case "N":
      rover.direction = "W";
      break;
    case "E":
      rover.direction = "N";
      break;
    case "S":
      rover.direction = "E";
      break;
    case "W":
      rover.direction = "S";
      break;
  }
  console.log("Turned left!");
}

function turnRight(rover) {
  switch (rover.direction) {
    case "N":
      rover.direction = "E";
      break;
    case "E":
      rover.direction = "S";
      break;
    case "S":
      rover.direction = "W";
      break;
    case "W":
      rover.direction = "N";
      break;
  }
  console.log("Turned right!");
}

function moveForward(rover) {
  var offGrid = false;
  var obstacle = false;
  switch (rover.direction) {
    case "N":
      if (rover.y+1 > 9) {
        offGrid = true;
      } else {
        if(grid[rover.x][rover.y+1] == "[O]"){
          obstacle = true;
        }else{
          rover.y++;
        } 
      }
      break;
    case "E":
      if (rover.x+1 > 9) {
        offGrid = true;
      } else {
        if(grid[rover.x+1][rover.y] == "[O]"){
          obstacle = true;
        }else{
          rover.x++;
        }
      }
      break;
    case "S":
      if (rover.y-1 < 0) {
        offGrid = true;
      } else {
        if(grid[rover.x][rover.y-1] == "[O]"){
          obstacle = true;
        }else{
          rover.y--;
        }
      }
      break;
    case "W":
      if (rover.x-1 < 0) {
        offGrid = true;
      } else {
        if(grid[rover.x-1][rover.y] == "[O]"){
          obstacle = true;
        }else{
          rover.x--;
        }
      }
      break;
  }
  if (offGrid) {
    console.log("The rover cannot go forward! Limits of the grid reached!");
  }else if(obstacle){
    console.log("There's an obstacle ahead! Cannot go further!");
  }else {
    console.log("Moved forward!");
    var x = rover.x.toString();
    var space = " ";
    var y = rover.y.toString();
    var coords = x.concat(space);
    rover.travelLog.push(coords.concat(y));
  }
}
function moveBackwards(rover){
  var offGrid = false;
  var obstacle = false;
  switch (rover.direction) {
    case "N":
      if (rover.y-1 < 0) {
        offGrid = true;
      }else if(grid[rover.x][rover.y-1] == "[O]"){
        obstacle = true;
      }else {
        rover.y--;
      }
      break;
    case "E":
      if (rover.x-1 < 0) {
        offGrid = true;
      }else if(grid[rover.x-1][rover.y] == "[O]"){
        obstacle = true;
      }else {
        rover.x--;
      }
      break;
    case "S":
      if (rover.y+1 > 9) {
        offGrid = true;
      }else if(grid[rover.x][rover.y+1] == "[O]"){
        obstacle = true;
      }else {
        rover.y++;
      }
      break;
    case "W":
      if (rover.x+1 > 9) {
        offGrid = true;
      }else if(grid[rover.x+1][rover.y] == "[O]"){
        obstacle = true;
      }else {
        rover.x++;
      }
      break;
  }
  if (offGrid) {
    console.log("The rover cannot go backwards! Limits of the grid reached!");
  }else if(obstacle){
    console.log("There's an obstacle ahead! Cannot go further!");
  }else {
    console.log("Moved backwards!");
    var x = rover.x.toString();
    var space = " ";
    var y = rover.y.toString();
    var coords = x.concat(space);
    rover.travelLog.push(coords.concat(y));
  }

}

function commands(commands) {
  for (var i = 0; i < commands.length; i++) {
    var command = commands[i];
    switch (command) {
      case "f":
        moveForward(rover);
        break;
      case "r":
        turnRight(rover);
        break;
      case "l":
        turnLeft(rover);
        break;
      case "b":
        moveBackwards(rover);
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
