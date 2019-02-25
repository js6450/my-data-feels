class NewFeeling{
  constructor(){
    this.pixels = [];
    this.render = this.render.bind(this);
  }

  render(sketch){
    sketch.setup = function(){
      let cvs = sketch.createCanvas(window.innerWidth, window.innerHeight);
      cvs.id('feeling-input');
      sketch.background(255);
      sketch.noStroke();
      sketch.fill(255, 255, 0);
      sketch.ellipse(sketch.width / 2, sketch.height / 2, sketch.width * 3 / 4, sketch.width * 3 / 4);
    };

    let pixels = [];

    sketch.draw = function(){

      if(sketch.mouseIsPressed){
        if(sketch.dist(sketch.mouseX, sketch.mouseY, sketch.width / 2, sketch.height / 2) < sketch.width * 3 / 8){
          sketch.fill(255);
          sketch.ellipse(sketch.mouseX, sketch.mouseY, 50, 50);
          pixels.push({x: sketch.mouseX, y: sketch.mouseY});
        }
      }
    };

    // sketch.windowResized = function(){
    //   sketch.resizeCanvas(window.innerWidth, window.innerHeight);
    // };

    this.pixels = pixels;
  }
}
