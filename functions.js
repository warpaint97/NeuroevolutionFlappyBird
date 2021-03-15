function managePipes() {
  period = width/panSpeed;

  //spawn pipes
  if (timer >= period/2.8) {
        timer = 0;
        pipes.push(new Pipe());
        //print("pipe added");
      }
  
  //despawn pipes
  if (pipes[0].x < -pipes[0].width) {
        pipes.shift();
        //print("pipe deleted");
      }
  
  //pan all pipes
  for (var i = 0; i < pipes.length; i++) {
    pipes[i].update();
  }
  
  timer += 1;
}


//return nearest pipe object
function nearestPipe() {
  min_dist = Infinity;
  pipe_index = 0;
  for (var i = 0; i < pipes.length; i++) {
    _dist = abs(birds[0].x - pipes[i].x);

    if (_dist <= min_dist) {
          min_dist = _dist;
          pipe_index = i;
        }
  }
  return pipes[pipe_index];
}

function rectCollision(x1,y1,w1,h1,x2,y2,w2,h2) {
  if (x1 + w1 > x2 && x1 < x2 + w2 && y1 + h1 > y2 && y1 < y2 + h2) {
    return true;
  } 
  return false;
}

function birdPipeCollision(bird, np) {
  if (rectCollision(bird.x-bird.size/2,bird.y-bird.size/2,bird.size,bird.size,np.x,np.y,np.width,height-np.y) || rectCollision(bird.x-bird.size/2,bird.y-bird.size/2,bird.size,bird.size,np.x,0,np.width,np.y-np.gap_size)) {
    return true;
  }
  return false;
}


function init() {
  pipes.length = 0;
  birds.length = 0;
  pipes.push(new Pipe());
  
  last_population_size = population_size;
  //instantiate all birds
  for (let i = 0; i < population_size; i++) {
    birds.push(new Bird());
  }
  
  generation = 0;
  //record = 0;
  timer = 0;
}


function restart() {
  pipes.length = 0;
  pipes.push(new Pipe());
  
  next_generation();
  
  timer = 0;
}

function allDead() {
  for (let bird of birds) {
    if (bird.alive) {
        return false;
    }
  }
  return true;
}


function manageDeath() {
  //dying
  let np = nearestPipe();

  for (let i = birds.length-1; i >= 0; i--) {
    if (birdPipeCollision(birds[i], np)||birds[i].y < 0||birds[i].y > height) {
      birds[i].alive = false;
      //bird died
    }
  }

  if (allDead()) {
    restart();    
  }
}

function getBestBird() {
  let best_bird = null;
  let best_score = 0;
  for (let bird of birds) {
    if (bird.score > best_score) {
      best_score = bird.score;
      best_bird = bird;
    }
  }
  return best_bird;
}

function loadRecordBird() {
  pipes.length = 0;
  birds.length = 0;
  pipes.push(new Pipe());
  
  last_population_size = 1;
  
  //instantiate best bird
  birds.push(new Bird(record_brain));
  
  timer = 0;
}


