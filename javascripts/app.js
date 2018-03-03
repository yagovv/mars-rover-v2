// Rover Object Goes Here
// ======================
var rover = {
  direction: "N",
  x: 0,
  y: 0,
  travelLog: ["0 0"]
};
// ======================
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
  switch (rover.direction) {
    case "N":
      if (rover.y+1 > 9) {
        offGrid = true;
      } else {
        rover.y++;
      }
      break;
    case "E":
      if (rover.x+1 > 9) {
        offGrid = true;
      } else {
        rover.x++;
      }
      break;
    case "S":
      if (rover.y-1 < 0) {
        offGrid = true;
      } else {
        rover.y--;
      }
      break;
    case "W":
      if (rover.x-1 < 0) {
        offGrid = true;
      } else {
        rover.x--;
      }
      break;
  }
  if (offGrid) {
    console.log("The rover cannot go forward! Limits of the grid reached!");
  } else {
    console.log("Moved forward!");
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
    }
  }
  for (var loggedCoord in rover.travelLog) {
    console.log("loggedCoord: " + rover.travelLog[loggedCoord]);
  }
}
