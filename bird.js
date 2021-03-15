class Bird {
  constructor(brain) {
    this.score = 0;
    this.fitness = 0;
    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(4,4,1);
    }
    this.alive = true;
    
    this.x = width/3;
    this.y = height/2;
    this.size = 40;
    this.vel_y = 0;
    //print("a bird was born");
  }
  
  fall() {
    if (this.y < height || this.vel_y < 0) {
      this.vel_y += g;
      this.y += this.vel_y;
    } else {
      this.vel_y = 0;
      this.y = height;
    }
  }
  
  jump() {
    this.vel_y -= 10+this.vel_y/1.3   ;
  }
  
  think() {
    let np = nearestPipe();
    
    let inputs = [];
    inputs.push(this.y / height);
    inputs.push(np.y / height);
    //inputs.push(np.y-np.gap_size / height);
    inputs.push(np.x / width);
    inputs.push(this.vel_y/18);
    
    let output = this.brain.predict(inputs);
    if (output < 0.5) {
          this.jump();
        }
  }
  
  
  draw() {
    //fill("yellow");
    //stroke("black");
    //strokeWeight(2);
    //ellipse(this.x,this.y,this.size,this.size);
    noSmooth();
    if (this.vel_y > 0 ) {
    image(bird_img,this.x-this.size/1.4,this.y-this.size/1.3,this.size*1.5,this.size*1.5);
    } else {
      image(bird_flap_img,this.x-this.size/1.4,this.y-this.size/1.3,this.size*1.5,this.size*1.5);
    }
    smooth();
  }
  
  update() {
    if (this.alive) {
      this.think();
      this.fall();
      //this.draw();
      this.score += 1;
    }
  }
}