
function createRain() {
  const canvas = document.getElementById('bg_animation_rain');
  const ctx = canvas.getContext('2d');
  
  function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  let raindrops = [];
  let animationFrameId;

  class Raindrop {
      constructor(x, y, length, speed) {
          this.x = x;
          this.y = y;
          this.length = length;
          this.speed = speed;
      }

      fall() {
          this.y += this.speed;
          if (this.y > canvas.height) {
              this.y = 0;
              this.x = Math.random() * canvas.width;
          }
      }

      draw() {
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(this.x, this.y + this.length);
          ctx.strokeStyle = 'rgba(174,194,224,0.5)';
          ctx.lineWidth = 1;
          ctx.lineCap = 'round';
          ctx.stroke();
      }
  }

  function createRaindrops(count) {
      for (let i = 0; i < count; i++) {
          let x = Math.random() * canvas.width;
          let y = Math.random() * canvas.height;
          let length = Math.random() * 20 + 50;
          let speed = Math.random() * 10 + 15;
          raindrops.push(new Raindrop(x, y, length, speed));
      }
  }

  function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      raindrops.forEach((raindrop) => {
          raindrop.fall();
          raindrop.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
  }
  let animationRunning = false;

  function clearCanvas() {
      cancelAnimationFrame(animationFrameId);
      raindrops = []; 
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      animationRunning = false;
  }


  function startAnimationRain(){
    if (!animationRunning) {
        animationRunning = true;
  createRaindrops(100);
  animate();
    }
  }

  return { clearCanvas, startAnimationRain };
}



// --------------------------------

function createThunder() {
  const canvas = document.getElementById("bg_animation_thunder");
  const context = canvas.getContext('2d');
  const lightningStrikeOffset = 5;
  const lightningStrikeLength = 100;
  const lightningBoltLength = 5;
  const lightningThickness = 4;
  const canvasHeight = canvas.height;
  const canvasWidth = canvas.width;
  
  const createVector = function(x, y) { return { x, y } }
  
  const getRandomFloat = function(min, max) {
      const random = Math.random() * (max - min + 1) + min;
      return random;
  }
  
  const getRandomInteger = function(min, max) {
      return Math.floor(getRandomFloat(min, max)); 
  }
  
  const clearCanvasArea = function(x, y, height, width) {
      let rectX = x || 0;
      let rectY = y || 0;
      let rectHeight = height || canvasHeight;
      let rectWidth = width || canvasWidth;
      context.clearRect(rectX, rectY, rectWidth, rectHeight);
      context.beginPath();
  }
  
  const line = function(start, end, thickness, opacity) {
      context.beginPath();
      context.moveTo(start.x, start.y);
      context.lineTo(end.x, end.y);
      context.lineWidth = thickness;
      context.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
      context.shadowBlur = 30;
      context.shadowColor = "white";
      context.stroke();
      context.closePath();
  }
  
  class Lightning {
      constructor(x1, y1, x2, y2, thickness, opacity) {
          this.start = createVector(x1, y1);
          this.end = createVector(x2, y2);
          this.thickness = thickness;
          this.opacity = opacity;
      }
      draw() {
          return line(this.start, this.end, this.thickness, this.opacity);
      }
  }
  
  const interval = 2000;
  let lightning = [];
  let animationFrameId;
  let intervalId;
  
  const createLightning = function() {
      lightning = [];
      let lightningX1 = getRandomInteger(2, canvasWidth - 2);
      let lightningX2 = getRandomInteger(lightningX1 - lightningStrikeOffset, lightningX1 + lightningStrikeOffset);
      lightning[0] = new Lightning(lightningX1, 0, lightningX2, lightningBoltLength, lightningThickness, 1);
      for (let l = 1; l < lightningStrikeLength; l++) {
          let lastBolt = lightning[l - 1];
          let lx1 = lastBolt.end.x;
          let lx2 = getRandomInteger(lx1 - lightningStrikeOffset, lx1 + lightningStrikeOffset);
          lightning.push(new Lightning(
              lx1, 
              lastBolt.end.y, 
              lx2, 
              lastBolt.end.y + lightningBoltLength, 
              lastBolt.thickness, 
              lastBolt.opacity
          ));
      }
  }
  
  const setup = function() {
      createLightning();
      for (let i = 0 ; i < lightning.length ; i++) {
          lightning[i].draw();
      }
  }
  
  const animate = function() {
      clearCanvasArea();
  
      for (let i = 0 ; i < lightning.length ; i++) {
          lightning[i].opacity -= 0.01;
          lightning[i].thickness -= 0.09;
          if (lightning[i].thickness <= 2) {
              lightning[i].end.y -= 0.09;
          }
          lightning[i].draw();
      }
  
      animationFrameId = requestAnimationFrame(animate);
  }
  
  let animationRunning = false;


  function startAnimation(){
    if (!animationRunning) {
        animationRunning = true;
  setup();
  animationFrameId = requestAnimationFrame(animate);
  intervalId = setInterval(function() {
      createLightning();
  }, interval);
}
  }
  function clearCanvas() {
      cancelAnimationFrame(animationFrameId);
      clearInterval(intervalId);
      lightning = [];
      clearCanvasArea();
      context.clearRect(0, 0, canvas.width, canvas.height);
   animationRunning = false;

  }

  return { clearCanvas, startAnimation };
}


// -------------

function createClouds() {
  const canvas = document.getElementById('bg_animation_clouds');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let cloudArray = [];
  const numberOfClouds = 6;
  const cloudSpeed = 0.08;
  let animationFrameId;

  function drawRoundedCloud(x, y, width, height, radius) {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.arcTo(x + width, y, x + width, y + height, radius);
      ctx.arcTo(x + width, y + height, x, y + height, radius);
      ctx.arcTo(x, y + height, x, y, radius);
      ctx.arcTo(x, y, x + width, y, radius);
      ctx.closePath();
  }

  class Cloud {
      constructor() {
          this.width = Math.random() * 40 + 60;
          this.height = this.width / 0.7;
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.speed = cloudSpeed + Math.random() * 0.5;
          this.borderRadius = Math.random() * 5 + 10;
      }

      draw() {
          ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
          ctx.shadowBlur = 20;
          ctx.shadowOffsetX = 10;
          ctx.shadowOffsetY = 10;
          drawRoundedCloud(this.x, this.y, this.width, this.height, this.borderRadius);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
          ctx.fill();
          ctx.shadowColor = 'transparent';
      }

      update() {
          this.x += this.speed;
          if (this.x > canvas.width + this.width) {
              this.x = -this.width;
          }
          this.draw();
      }
  }

  function initClouds() {
      cloudArray = [];
      for (let i = 0; i < numberOfClouds; i++) {
          cloudArray.push(new Cloud());
      }
  }

  function animateClouds() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cloudArray.forEach(cloud => cloud.update());
      animationFrameId = requestAnimationFrame(animateClouds);
  }

  window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initClouds();
  });

  let animationRunning = false;

  function startAnimation() {
    if (!animationRunning) {
      animationRunning = true;
      initClouds();
      animateClouds();
    }
  }
  function clearCanvas() {
      cancelAnimationFrame(animationFrameId); 
      cloudArray = []; 
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      animationRunning = false;
  }

  return { clearCanvas, startAnimation };
}


// ------------


function createStars() {
  const canvas = document.getElementById('bg_animation_stars');
  const ctx = canvas.getContext('2d');

  function adjustCanvasSize() {
      const devicePixelRatio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(devicePixelRatio, devicePixelRatio);
  }

  let starsArray = [];
  const numberOfStars = 150;
  const twinkleInterval = 10000;
  let animationFrameId;

  class Star {
      constructor(isGolden = false) {
          this.x = Math.random() * canvas.width / (window.devicePixelRatio || 1);
          this.y = Math.random() * canvas.height / (window.devicePixelRatio || 1);
          this.size = isGolden ? Math.random() * 2 + 4 : Math.random() * 2 + 1;
          this.color = isGolden ? 'gold' : '#fffbd4';
          this.opacity = Math.random();
          this.isGolden = isGolden;
          this.twinkleTime = Math.random() * twinkleInterval;
      }

      draw() {
          ctx.globalAlpha = this.opacity;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();
          ctx.globalAlpha = 1;
      }

      update(deltaTime) {
          this.twinkleTime -= deltaTime;
          if (this.twinkleTime <= 0) {
              this.opacity = Math.random();
              this.twinkleTime = Math.random() * twinkleInterval;
          }
          this.draw();
      }
  }

  function initStars() {
      starsArray = [];
      for (let i = 0; i < numberOfStars; i++) {
          if (i < 2) {
              starsArray.push(new Star(true));
          } else {
              starsArray.push(new Star());
          }
      }
  }

  let lastTime = 0;
  function animateStars(timestamp) {
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      starsArray.forEach(star => star.update(deltaTime));
      animationFrameId = requestAnimationFrame(animateStars);
  }

  window.addEventListener('resize', () => {
      adjustCanvasSize();
      initStars();
  });

  let animationRunning = false;


  function startAnimation(){
    if (!animationRunning) {
        animationRunning = true;

  adjustCanvasSize();
  initStars();
  animationFrameId = requestAnimationFrame(animateStars);
}
  }

  function clearCanvas() {
      cancelAnimationFrame(animationFrameId);
      starsArray = [];
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      animationRunning = false;
  }

  return { clearCanvas, startAnimation };
}


// --------------------


function createFog() {
  const canvas = document.getElementById('bg_animation_fog');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let cloudArray = [];
  const numberOfClouds = 5;
  const cloudSpeed = 0.01;
  let animationFrameId;

  function drawRoundedCloud(x, y, width, height, radius) {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.arcTo(x + width, y, x + width, y + height, radius);
      ctx.arcTo(x + width, y + height, x, y + height, radius);
      ctx.arcTo(x, y + height, x, y, radius);
      ctx.arcTo(x, y, x + width, y, radius);
      ctx.closePath();
  }

  class Cloud {
      constructor() {
          this.width = Math.random() * 200 + 100;
          this.height = this.width / 2;
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.speed = cloudSpeed + Math.random() * 0.5;
          this.borderRadius = Math.random() * 5 + 10;
      }

      draw() {
          ctx.shadowColor = '#99885f80';
          ctx.shadowBlur = 20;
          ctx.shadowOffsetX = 20;
          ctx.shadowOffsetY = 10;
          drawRoundedCloud(this.x, this.y, this.width, this.height, this.borderRadius);
          ctx.fillStyle = '#99885f1a';
          ctx.fill();
          ctx.shadowColor = 'transparent';
      }

      update() {
          this.x += this.speed;
          if (this.x > canvas.width + this.width) {
              this.x = -this.width;
          }
          this.draw();
      }
  }

  function initClouds() {
      cloudArray = [];
      for (let i = 0; i < numberOfClouds; i++) {
          cloudArray.push(new Cloud());
      }
  }

  function animateClouds() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cloudArray.forEach(cloud => cloud.update());
      animationFrameId = requestAnimationFrame(animateClouds);
  }

  window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initClouds();
  });

  let animationRunning = false;

  function startAnimation(){
    if (!animationRunning) {
        animationRunning = true;

  initClouds();
  animateClouds();
    }
  }
  function clearCanvas() {
      cancelAnimationFrame(animationFrameId); 
      cloudArray = []; 
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      animationRunning = false;
  }

  return { clearCanvas, startAnimation };
}


// -------------

function createSnow() {
  const canvas = document.getElementById('bg_animation_snow');
  const ctx = canvas.getContext('2d');

  function adjustCanvasSize() {
      const devicePixelRatio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * devicePixelRatio;
      canvas.height = window.innerHeight * devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(devicePixelRatio, devicePixelRatio);
  }

  let snowflakesArray = [];
  const numberOfSnowflakes = 150;
  let animationFrameId;

  class Snowflake {
      constructor() {
          this.x = Math.random() * canvas.width / (window.devicePixelRatio || 1);
          this.y = Math.random() * canvas.height / (window.devicePixelRatio || 1);
          this.size = Math.random() * 3 + 2;
          this.speedY = Math.random() * 1 + 0.5;
          this.speedX = Math.random() * 1 - 0.5;
          this.opacity = Math.random() * 0.8 + 0.2;
      }

      draw() {
          ctx.globalAlpha = this.opacity;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = 'white';
          ctx.fill();
          ctx.globalAlpha = 1;
      }

      update() {
          this.y += this.speedY;
          this.x += this.speedX;

          if (this.y > canvas.height / (window.devicePixelRatio || 1)) {
              this.y = -this.size;
              this.x = Math.random() * canvas.width / (window.devicePixelRatio || 1);
          }

          if (this.x > canvas.width / (window.devicePixelRatio || 1)) {
              this.x = -this.size;
          } else if (this.x < -this.size) {
              this.x = canvas.width / (window.devicePixelRatio || 1);
          }

          this.draw();
      }
  }

  function initSnowflakes() {
      snowflakesArray = [];
      for (let i = 0; i < numberOfSnowflakes; i++) {
          snowflakesArray.push(new Snowflake());
      }
  }

  function animateSnowflakes() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      snowflakesArray.forEach(snowflake => snowflake.update());
      animationFrameId = requestAnimationFrame(animateSnowflakes);
  }

  window.addEventListener('resize', () => {
      adjustCanvasSize();
      initSnowflakes();
  });

  let animationRunning = false;

  function startAnimation(){
    if (!animationRunning) {
        animationRunning = true;
    adjustCanvasSize();
  initSnowflakes();
  animateSnowflakes();
    }
  }
  
  function clearCanvas() {
      cancelAnimationFrame(animationFrameId);
      snowflakesArray = [];
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      animationRunning = false;
  }

  return { clearCanvas, startAnimation };
}

// leaves

function createFallingLeaves() {
    const leafSVG = new Image();
    leafSVG.src = 'icons/leaf.png';

    const canvas = document.getElementById('bg_animation_leaves');
    const ctx = canvas.getContext('2d');

    function adjustCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    let leaves = [];
    const leafCount = 8;
    const windSpeedControl = document.getElementById('windSpeed');
    let baseWindSpeed = parseFloat(windSpeedControl.value);
    let animationFrameId;

    for (let i = 0; i < leafCount; i++) {
        leaves.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            speed: Math.random() * 2 + 1,
            size: Math.random() * 0.01 + 0.2,
            angle: Math.random() * Math.PI * 2,
            angularSpeed: Math.random() * 0.1 - 0.05
        });
    }

    let windTime = 0;

    function getRandomWindSpeed(baseSpeed) {
        const waveFrequency = 0.01;
        const randomFactor = Math.random() * 0.5;
        windTime += 0.01;
        return baseSpeed + Math.sin(windTime) * 2 + randomFactor;
    }

    function drawLeaves() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const windSpeed = getRandomWindSpeed(baseWindSpeed);

        leaves.forEach((leaf) => {
            leaf.y += leaf.speed;
            leaf.x += windSpeed;
            leaf.angle += leaf.angularSpeed;

            if (leaf.y > canvas.height) leaf.y = -leafSVG.height * leaf.size;
            if (leaf.x > canvas.width) leaf.x = -leafSVG.width * leaf.size;
            if (leaf.x < -leafSVG.width * leaf.size) leaf.x = canvas.width;

            ctx.save();
            ctx.translate(leaf.x, leaf.y);
            ctx.rotate(leaf.angle);
            ctx.drawImage(
                leafSVG,
                -leafSVG.width * leaf.size / 2,
                -leafSVG.height * leaf.size / 2,
                leafSVG.width * leaf.size,
                leafSVG.height * leaf.size
            );
            ctx.restore();
        });

        animationFrameId = requestAnimationFrame(drawLeaves);
    }

    window.addEventListener('resize', () => {
        adjustCanvasSize();
        initLeaves();
    });

    function initLeaves() {
        leaves = [];
        for (let i = 0; i < leafCount; i++) {
            leaves.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                speed: Math.random() * 2 + 1,
                size: Math.random() * 0.01 + 0.2,
                angle: Math.random() * Math.PI * 2,
                angularSpeed: Math.random() * 0.1 - 0.05
            });
        }
    }

    let animationRunning = false;

    function startAnimation() {
        if (!animationRunning) {
            animationRunning = true;
            adjustCanvasSize();
            initLeaves();
            drawLeaves();
        }
    }

    function clearCanvas() {
        cancelAnimationFrame(animationFrameId);
        leaves = [];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        animationRunning = false;
    }

    return { clearCanvas, startAnimation };
}


// ------------------


function createDrizzle() {
    const canvas = document.getElementById('bg_animation_drizzle');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let raindrops = [];
    let animationFrameId;

    class Raindrop {
        constructor(x, y, length, speed) {
            this.x = x;
            this.y = y;
            this.length = length;
            this.speed = speed;
        }

        fall() {
            this.y += this.speed;
            if (this.y > canvas.height) {
                this.y = 0;
                this.x = Math.random() * canvas.width;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x, this.y + this.length);
            ctx.strokeStyle = 'rgba(174,194,224,0.5)';
            ctx.lineWidth = 1;
            ctx.lineCap = 'round';
            ctx.stroke();
        }
    }

    function createRaindrops(count) {
        for (let i = 0; i < count; i++) {
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            let length = Math.random() * 20 + 50;
            let speed = Math.random() * 10 + 15;
            raindrops.push(new Raindrop(x, y, length, speed));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        raindrops.forEach((raindrop) => {
            raindrop.fall();
            raindrop.draw();
        });
        animationFrameId = requestAnimationFrame(animate);
    }
    let animationRunning = false;

    function clearCanvas() {
        cancelAnimationFrame(animationFrameId);
        raindrops = [];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        animationRunning = false;
    }


    function startAnimationdrizzle(){
      if (!animationRunning) {
          animationRunning = true;
    createRaindrops(20);
    animate();
      }
    }

    return { clearCanvas, startAnimationdrizzle };
  }



const snowAnimation = createSnow();
const RainFallAnimation = createRain();
const cloudsAnimation = createClouds();
const thunderAnimation = createThunder();
const starsAnimation = createStars();
const fogAnimation = createFog();
const leavesAnimation = createFallingLeaves();
const DrizzleAnimation = createDrizzle();



// display animations

var anim1Drizzle

function displayDrizzle(){
    DrizzleAnimation.startAnimationdrizzle()

        var animationContainer1 = document.getElementById('background_animation');
        var animationContainer2 = document.getElementById('foreground_animation');
            animationContainer1.innerHTML = ''
          animationContainer2.innerHTML = ''

        var animationData1 = 'lottie_animations/mostly_cloudy_background.json';


        anim1Drizzle = bodymovin.loadAnimation({
            container: animationContainer1,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: animationData1,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        });
}


function displayRain(){
  RainFallAnimation.startAnimationRain()
}

function displaySnow(){
  snowAnimation.startAnimation()
}

var anim1Cloud;

function displayClouds(){
    var animationContainer1 = document.getElementById('background_animation');
    var animationContainer2 = document.getElementById('foreground_animation');


        if (anim1Cloud) {
            anim1Cloud.destroy();
        }



        animationContainer1.innerHTML = ''
        animationContainer2.innerHTML = ''

    var animationData1 = 'lottie_animations/mostly_cloudy_background.json';


     anim1Cloud = bodymovin.loadAnimation({
        container: animationContainer1,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: animationData1,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    });


}

function displayStars(){
  starsAnimation.startAnimation()
}


var anim1fog

function displayFog(){

  var animationContainer1 = document.getElementById('background_animation');
  var animationContainer2 = document.getElementById('foreground_animation');

      if (anim1fog) {
          anim1fog.destroy();
      }

      animationContainer1.innerHTML = ''
      animationContainer2.innerHTML = ''

  var animationData1 = 'lottie_animations/haze_smoke_foreground.json';


   anim1fog = bodymovin.loadAnimation({
      container: animationContainer1,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: animationData1,
      rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
      }
  });
}

function displayThunder(){
  thunderAnimation.startAnimation()
}

var anim1;
var anim2;

function displayLeaves() {
    var animationContainer1 = document.getElementById('background_animation');
    var animationContainer2 = document.getElementById('foreground_animation');

        if (anim1) {
            anim1.destroy();
        }

        if (anim2) {
            anim2.destroy();
        }

        animationContainer1.innerHTML = ''
        animationContainer2.innerHTML = ''

    var animationData1 = 'lottie_animations/sunny_background.json';
    var animationData2 = 'lottie_animations/sunny_foreground.json';

    anim1 = bodymovin.loadAnimation({
        container: animationContainer1,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: animationData1
    });

    anim2 = bodymovin.loadAnimation({
        container: animationContainer2,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: animationData2
    });
}

var anim1CloudFull
  var anim2CloudFull

  function displayCloudsFull(){
    var animationContainer1 = document.getElementById('background_animation');
    var animationContainer2 = document.getElementById('foreground_animation');


        if (anim1CloudFull) {
            anim1CloudFull.destroy();
        }



        animationContainer1.innerHTML = ''
        animationContainer2.innerHTML = ''

    var animationData1 = 'lottie_animations/mostly_cloudy_background.json';
    var animationData2 = 'lottie_animations/mostly_cloudy_background.json';



    anim1CloudFull = bodymovin.loadAnimation({
        container: animationContainer1,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: animationData1,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    });

    anim2CloudFull = bodymovin.loadAnimation({
        container: animationContainer2,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: animationData2,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    });

  }

// remove animations


function removeRain(){
  RainFallAnimation.clearCanvas()
}

function removeSnow(){
  snowAnimation.clearCanvas()
}

function removeClouds(){
    if (anim1Cloud) anim1Cloud.destroy();
}

function removeStars(){
  starsAnimation.clearCanvas()
}

function removeFog(){
  if (anim1fog) anim1fog.destroy();
}

function removeThunder(){
  thunderAnimation.clearCanvas()
}


function removeDrizzle(){
    DrizzleAnimation.clearCanvas()

    if (anim1Drizzle) anim1Drizzle.destroy();
  }


function removeLeaves(){
    if (anim1) anim1.destroy();
    if (anim2) anim2.destroy();
  }

function removeCloudsFull(){
    if (anim1CloudFull) anim1CloudFull.destroy();
    if (anim2CloudFull) anim2CloudFull.destroy();
}