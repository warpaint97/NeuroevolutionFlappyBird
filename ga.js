function next_generation() {
  calculateFitness();
  
  if (getBestBird().score > record) {
    bb = getBestBird();
    record = bb.score;
    record_brain = bb.brain.copy();
  }
  //instantiate all birds
  for (let i = 0; i < population_size; i++) {
    birds.push(pickOne());
  }
  birds.splice(0,last_population_size);
  generation++;
  last_population_size = population_size;
  //print("next generation");
}


function mutationRate() {
  //let rate = (5/getBestBird().score);
  return 0.1;
}


function mutate(x) {
  if (random(1) < mutationRate()) {
    let offset = randomGaussian(0,0.1);
    let newx = x + offset;
    return newx;
  } else {
    return x;
  }
}

function pickOne() {
  var index = 0;
  var r = random(1);
  
  while (r > 0) {
    r -= birds[index].fitness;
    index++;
  }
  index--;
  
  let bird = birds[index];
  let child = new Bird(bird.brain);
  child.brain.mutate(mutate);
  return child;
}

function calculateFitness() {
  let sum = 0;
  for (let bird of birds) {
    sum += bird.score;
  }
  for (let bird of birds) {
    bird.fitness = bird.score / sum;
  }
}