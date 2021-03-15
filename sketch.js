//hyper parameters
let population_slider;
let population_size;
let last_population_size;


let generation = 1;
let cycles = 1;
let record = 0;
let record_brain;
//variables
let height = 9*55;
let width = 16*55  ;
let g = 9.81/20;
let panSpeed = 4;
let timer = 0;

let birds = [];
let pipes = [];

let bg_img;
let bird_img;
let bird_flap_img;
let pipe_img;
let pipe_top_img;


function setup() {
  createCanvas(width, height);
  bg_img = loadImage("assets/bg.png");

  bird_img = loadImage("assets/bird.png");
  bird_flap_img = loadImage("assets/bird_flap.png");
  pipe_img = loadImage("assets/pipe.png");
  pipe_top_img = loadImage("assets/pipe_top.png");
  
  cycles = createSlider(1,50,1);
  population_slider = createSlider(1,500,500);
  
  let button1 = createButton('load best bird');
  button1.position(0, height+20);
  button1.mousePressed(loadRecordBird);
  
  let button2 = createButton('reset');
  button2.position(135, height+20);
  button2.mousePressed(init);
  
  population_size = population_slider.value();
  last_population_size = population_size;
  init();
}

function draw() {
  //game logic
  for (let n = 0; n < cycles.value(); n++) {
    population_size = population_slider.value();
    for (let i = 0; i < birds.length; i++) {
      birds[i].update();
    }
    managePipes();
    manageDeath();
  }
  
  
  //drawing
  background(bg_img);
  for (let i = 0; i < birds.length; i++) {
    if (birds[i].alive)
      birds[i].draw();
  }
  for (let i = 0; i < pipes.length; i++) {
    pipes[i].draw();
  }
  
  //show text
  textFont("Monospace");
  textSize(20);
  text(cycles.value() + "x speed", 0,0,100,50);
  text("Population: " + population_size, 0,18,200,50);
  text("Generation: " + generation, 0,36,200,50);
  text("Record: " + record, 0,54,200,50);
}


function keyPressed() {
  if (keyCode === 32) {
    birds[0].jump();
    //print("jump");
  }
}
