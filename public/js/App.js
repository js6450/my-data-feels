class App{

  constructor(_views){
    this.views = _views;
    this.submitFeeling = this.submitFeeling.bind(this);
    this.newFeeling;
  }

  setup(){
    document.addEventListener('click', async ev => {
      switch(ev.target.id){
        case 'signup':{
          const user = this.getCredentials();
          await this.signup(user);
          await this.login(user);
          break;
        }
        case 'login':{
          const user = this.getCredentials();
          await this.login(user);
          break;
        }
        case 'logout': {
          await client.logout();
          document.getElementById('app').innerHTML = views.loginHTML;
          break;
        }
        case 'submitFeeling':{
          await this.submitFeeling();
          break;
        }
        case 'admin': {
          await this.showAdmin();
          break;
        }
        case 'vis': {
          // await client.authenticate();
          await this.showVisual();
          break;
        }
      }
    });
  }

  getCredentials() {
    const user = {
      email: document.querySelector('[name="email"]').value,
      password: document.querySelector('[name="password"]').value
    };
    return user;
  }

  showLogin(){
    document.getElementById('app').innerHTML = this.views.loginHTML;
  }

  async login(credentials) {
    try {
      if (!credentials) {
        await client.authenticate();
      } else {
        const payload = Object.assign({
          strategy: 'local'
        }, credentials);
        await client.authenticate(payload);
      }

      this.showAdmin();
    } catch (error) {
      this.showLogin(error);
    }
  }

  async signup(credentials) {
    try {
      await client.service('users').create(credentials, {
        headers: {
          'X-Requested-With': 'FeathersJS'
        }
      });
    } catch (error) {
      this.showLogin(error);
    }
  }

  showAdmin(){
    document.getElementById('app').innerHTML = views.adminHTML;
    this.newFeeling = new NewFeeling();
    new p5(this.newFeeling.render, 'admin-panel');
  }

  async submitFeeling(e){
    console.log(this.newFeeling.pixels.length);

    let totalPixels = this.newFeeling.pixels.length;

    let w = window.innerWidth / 2;

    let leftEyeX = [];
    let leftEyeY = [];

    let rightEyeX = [];
    let rightEyeY = [];

    let leftEyebrowX = [];
    let leftEyebrowY = [];

    let rightEyebrowX = [];
    let rightEyebrowY = [];

    let mouthX = [];
    let mouthY = [];

    for(let i = 0; i < totalPixels; i++){
      let f = this.newFeeling.pixels[i];
      //lower half of face
      if(f.y > window.innerHeight / 2){
        mouthX.push(f.x);
        mouthY.push(f.y);
      }
      //upper half of face
      if(f.y <= window.innerHeight / 2 && f.y > window.innerHeight / 2 - w / 4){
        if(f.x < window.innerWidth / 2){
          leftEyeX.push(f.x);
          leftEyeY.push(f.y);
        }else{
          rightEyeX.push(f.x);
          rightEyeY.push(f.y);
        }
      }

      if(f.y <= window.innerHeight / 2 - w / 4){
        if(f.x < window.innerWidth / 2){
          leftEyebrowX.push(f.x);
          leftEyebrowY.push(f.y);
        }else{
          rightEyebrowX.push(f.x);
          rightEyebrowY.push(f.y);
        }
      }
    }

    let mouthMin = window.innerHeight;
    let mouthMinIndex = 0;
    for(let i = 0; i < mouthY.length; i++){
      if(mouthY[i] < mouthMin) {
        mouthMin = mouthY[i];
        mouthMinIndex = i;
      }
    }

    let mouthMinX = mouthX[mouthMinIndex];
    let mouthMinDist = Math.abs(window.innerWidth / 2 - mouthMinX);

    // console.log("mouthMinDist", mouthMinDist);

    let mouthWidth = this.calculateDist(mouthX);
    let mouthHeight = this.calculateDist(mouthY);

    // console.log("mouthWidth", mouthWidth);
    // console.log("mouthHeight", mouthHeight);

    let leftEyeWidth = this.calculateDist(leftEyeX);
    let leftEyeHeight = this.calculateDist(leftEyeY);

    let rightEyeWidth = this.calculateDist(rightEyeX);
    let rightEyeHeight = this.calculateDist(rightEyeY);

    let avgEyeWidth = (leftEyeWidth + rightEyeWidth) / 2;
    let avgEyeHeight = (leftEyeHeight + rightEyeHeight) / 2;

    console.log("avgEyeWidth", avgEyeWidth);
    console.log("avgEyeHeight", avgEyeHeight);

    let leftEyebrowMin = window.innerHeight;
    let leftEyebrowMinIndex = 0;
    for(let i = 0; i < leftEyebrowY.length; i++){
      if(leftEyebrowY[i] > leftEyebrowMin) {
        leftEyebrowMin = leftEyebrowY[i];
        leftEyebrowMinIndex = i;
      }
    }

    let leftEyebrowMinX = leftEyebrowX[leftEyebrowMinIndex];

    let rightEyebrowMin = window.innerHeight;
    let rightEyebrowMinIndex = 0;
    for(let i = 0; i < rightEyebrowY.length; i++){
      if(rightEyebrowY[i] > rightEyebrowMin) {
        rightEyebrowMin = rightEyebrowY[i];
        rightEyebrowMinIndex = i;
      }
    }

    let rightEyebrowMinX = rightEyebrowX[rightEyebrowMinIndex];

    let avgEyebrowMinDistance = ((window.innerWidth / 2 - leftEyebrowMinX) + (rightEyebrowMinX - window.innerWidth / 2)) / 2;

    //console.log("avgEyebrowMinDistance: " + avgEyebrowMinDistance);

    let leftEyebrowWidth = this.calculateDist(leftEyebrowX);
    let leftEyebrowHeight = this.calculateDist(leftEyebrowY);

    let rightEyebrowWidth = this.calculateDist(rightEyebrowX);
    let rightEyebrowHeight = this.calculateDist(rightEyebrowY);

    let avgEyebrowWidth = (leftEyebrowWidth + rightEyebrowWidth) / 2;
    let avgEyebrowHeight = (leftEyebrowHeight + rightEyebrowHeight) / 2;

    //console.log("avgEyebrowWidth", avgEyebrowWidth);
    //console.log("avgEyebrowHeight", avgEyebrowHeight);

    let totalEmotion = totalPixels / w;
    console.log("total", totalEmotion);

    let mouthEmotion = (mouthMinDist / (w / 2)) * (mouthHeight * 3 / mouthWidth);
    console.log("mouth", mouthEmotion);

    let eyebrowEmotion = (avgEyebrowMinDistance / (w / 2));
    console.log("eyebrow", eyebrowEmotion);

    let eyebrowIntensity = avgEyebrowHeight / avgEyebrowWidth;
    console.log("eyebrow intensity", eyebrowIntensity);

    let eyeEmotion = (avgEyeWidth + avgEyeHeight) / (w / 2);
    console.log("eye", eyeEmotion);

    try{
      const payload = {
        width: w,
        total: totalEmotion,
        mouth: mouthEmotion,
        eyebrow: eyebrowEmotion,
        eyebrowIntensity: eyebrowIntensity,
        eye: eyeEmotion,
        pixels: this.newFeeling.pixels
      }

      // await client.authenticate();
      let newData = await feelings.create(payload);
      console.log("success");

      await this.showVisual();

    }catch(error){
      return error;
    }
  }

  calculateDist(array){
    array.sort(function(a, b){return b - a});
    return array[0] - array[array.length - 1];
  }


  async showVisual(){
    document.getElementById('app').innerHTML = this.views.visHTML;

    let dataFeelings = await client.service('feelings').find({
      query: {
        $sort: {
          createdAt: -1
        },
        $limit: false,
      }
    });

    this.createDataFeelings(dataFeelings)
  }

  createDataFeelings(_dataFeelings){
    _dataFeelings.data.forEach((item, idx) => {
      let newSketch = new Feel(item);
      let newDiv = document.createElement('DIV');
      let divId = `vis-${idx}`;
      document.getElementById('vis-grid').appendChild(newDiv);
      newDiv.setAttribute("class", 'grid-item');
      newDiv.id = divId;
      newDiv.innerHTML = `<small style="font-size:9px">${item.createdAt}</small>`
      new p5(newSketch.render, divId);
    })
  }

}
