class Pipe {
  constructor() {
    this.width = width/8;
    this.gap_size = height/3;
    this.x = width;
    this.y = random(this.gap_size+50, height-50);
  }
  
  pan() {
    this.x -= panSpeed;
  }
  
  draw() {
    //fill("green");
    //stroke("black");
    //strokeWeight(4);
    //rect(this.x,this.y,this.width,height-this.y);
    //rect(this.x,0,this.width,this.y-this.gap_size);
    noSmooth();
    image(pipe_img, this.x, this.y, this.width, height);
    image(pipe_top_img,this.x,this.y-height-this.gap_size,this.width,height);
    smooth();
  }
  
  update() {
    this.pan();
    //this.draw();
  }
}