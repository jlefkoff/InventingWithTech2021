// Based on the work by:
// Daniel Shiffman
// http://codingrainbow.com/

// All the circles
var circles = [];

function setup() {
  createCanvas(windowWidth, windowHeight, SVG);
  circles.push(new Circle(width / 2, height / 2, min(width, height) / 3));
}

function draw() {
  background(255,255,255);
  
  // All the circles
  for (var i = 0; i < circles.length; i++) {
    var c = circles[i];
    c.show();
    
    // Is it a growing one?
    if (c.growing) {
      c.grow();
      // Does it overlap any previous circles?
      for (var j = 0; j < circles.length; j++) {
        var other = circles[j];
        if (other != c) {
          var d = dist(c.x, c.y, other.x, other.y);
          if (d - 1 < c.r + other.r) {
            c.growing = false;
          }
        }
      }
      
      // Is it stuck to an edge?
      if (c.growing) {
        c.growing = !c.edges();
      }
    }
  }
  
  // Let's try to make a certain number of new circles each frame
  // More later
  var target = 1 + constrain(floor(frameCount / 120), 0, 20);
  // How many
  var count = 0;
  // Try N times
  for (var i = 0; i < 1000; i++) {
    if (addCircle()) {
      count++;
    }
    // We made enough
    if (count == target) {
      break;
    }
  }
  
  // We can't make any more
  if (count < 1) {
    save("cpack4.svg"); // give file name
    noLoop();
    console.log("done!");
  }
}

// Add one circle
function addCircle() {
  // Here's a new circle
  var newCircle = new Circle(random(width), random(height), 1);
  // Is it in an ok spot?
  for (var i = 0; i < circles.length; i++) {
    var other = circles[i];
    var d = dist(newCircle.x, newCircle.y, other.x, other.y);
    if (d < other.r + 4) {
      newCircle = undefined;
      break;
    }
  }
  // If it is, add it
  if (newCircle) {
    circles.push(newCircle);
    return true;
  } else {
    return false;
  }
}

// Circle object
function Circle(x, y, r) {
  this.growing = true;
  this.x = x;
  this.y = y;
  this.r = r;
}

// Check stuck to an edge
Circle.prototype.edges = function() {
  return (this.r > width - this.x || this.r > this.x || this.r > height - this.y || this.r > this.y);
}

// Grow
Circle.prototype.grow = function() {
  this.r += 0.5;
}

// Show
Circle.prototype.show = function() {
  noFill();
  strokeWeight(1);
  stroke('black');
  ellipse(this.x, this.y, this.r * 2);
}