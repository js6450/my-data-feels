let canvasSize = window.innerWidth / 5;

class Feel{
  constructor(_data){
    this.data = _data;
    this.render = this.render.bind(this);
  }

  render(sketch){
    const data = this.data;
    console.log(data);
    const w = canvasSize;

    let particles = [];

    sketch.setup = function(){
      let cvs = sketch.createCanvas(w, w);
      cvs.class('feels');
      sketch.background(255);
      sketch.colorMode(sketch.HSB, 360, 100, 100, 100);

      let totalParticles = sketch.int(data.total * 200);
      let mouthParticles = sketch.int(totalParticles / 2);
      let eyebrowParticles = sketch.int(mouthParticles * data.eyebrow);

      for(let i = 0; i < totalParticles; i++){
        if(i < mouthParticles){
          particles.push(new Particle(sketch, 0, data.mouth));
        }else if(i >= mouthParticles && i < mouthParticles + eyebrowParticles){
          particles.push(new Particle(sketch, 1, data.eyebrow));
        }else{
          particles.push(new Particle(sketch, 2, data.eye));
        }
      }
    };

    sketch.draw = function(){
      if(sketch.mouseIsPressed ){
        sketch.background(0, 0, 100, 5);
        for(let i = 0; i < particles.length; i++){
          particles[i].update();
          particles[i].display();
        }
      }else{
        sketch.background(0, 0, 100);

        sketch.noStroke();
        sketch.fill(60, 100, 100);
        sketch.ellipse(sketch.width / 2, sketch.height / 2, sketch.width * 3 / 4, sketch.width * 3 / 4);
        sketch.fill(0, 0, 100);
        for(let i = 0; i < data.pixels.length; i++){
          let p = data.pixels[i];
          let newX = sketch.map(p.x, 0, data.width * 2, 0, sketch.width);
          let newY = sketch.map(p.y, 0, data.width * 2, 0, sketch.height);
          sketch.ellipse(newX, newY, 10, 10);
        }
      }
    }

  }
}

class Particle{
  constructor(sketch, type, emotion){
    this.sketch = sketch;

    this.x = sketch.random(sketch.width);
    this.y = sketch.random(sketch.height);
    this.type = type;
    this.emotion = emotion;
    this.size = sketch.map(this.emotion, 0, 1, 5, 20) + sketch.random(5);
    this.xSpeed = sketch.map(this.emotion, 0, 1, 0.1, 3) + sketch.random(0.5);
    this.ySpeed = sketch.map(this.emotion, 0, 1, 0.1, 3) + sketch.random(0.5);
    if(this.type == 0){
      this.sketch.constrain(this.emotion, 0, 1);
      this.hue = sketch.map(this.emotion, 0, 1, 0, 60);
      //this.sketch.constrain(this.hue, 0, 60);
     // this.hue = 60;
    }else if(this.type == 1){
      this.hue = sketch.map(this.emotion, 0, 1, 0, 270) + sketch.random(-10, 10);
    }else{
      this.hue = sketch.map(this.emotion, 0, 1, 300, 330) + sketch.random(-10, 10);
    }
  }

  update(){
    if(this.x < 0 || this.x > this.sketch.width){
      this.xSpeed *= -1;
    }
    if(this.x < 0){
      this.x = 0;
    }
    if(this.x > this.sketch.width){
      this.x = this.sketch.width;
    }
    if(this.y < 0 || this.y > this.sketch.height){
      this.ySpeed *= -1;
    }
    if(this.y < 0){
      this.y = 0;
    }
    if(this.y > this.sketch.height){
      this.y = this.sketch.height;
    }

    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  display(){
    this.sketch.fill(this.hue, 100, 100, 50);
    this.sketch.ellipse(this.x, this.y, this.size, this.size);
  }
}
