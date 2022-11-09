
function Sketch(p5) {
  let onSpinStart;
  let onSpinComplete;
  let watchedList

  p5.updateWithProps = props => { 
    onSpinStart = props.onSpinStart;
    onSpinComplete = props.onSpinComplete; 
    watchedList = props.watchedList;
  }
  
  let spinning = false;
  const valOfVisualStoppage = 0.018 //
  const wheelDiam = 500; // diameter of wheel
  const wheelRadius = wheelDiam/2;
  const totalSlices = 250; // total slices of wheel
  const sliceDegIncrement = 360 / totalSlices; //difference in degrees of each slice (all slices equidistant)

  // create array of degree points a half way points between sliceDegIncrement to place text on wheel
  let numPosAngles = new Array(totalSlices).fill(sliceDegIncrement /2) //~80% of sliceDegIncrement (1.152 @ 1.44 deg difference between slices)
  // modify numPosAngles to increment each slice angle
  for (var i = 1; i < numPosAngles.length; i++) {
    numPosAngles[i] = numPosAngles[i-1] + sliceDegIncrement
  }

  let nums = new Array(totalSlices).fill(1).map((x,i) => {return i+1});
  let canvasSizeX = window.innerWidth/2 ; //650;
  let canvasSizeY = window.innerHeight ; //500;

  //easing math
  let x = 0; // actual position
  let targetX = 0; // target position
  let easing = 0.055; //speed at which animation eases to stop (default 0.025)
  let lastDegRotation = 0;

  p5.setup = () => {  
    
        p5.createCanvas(canvasSizeX, canvasSizeY);
        createWheelNeedle()
  }

  p5.draw = async () => {
    // p5.background(100);
    // translate(width/2, height / 2)
    p5.translate(-7000, p5.height / 2); //-7000 for 30 scale / -9500 for 40 scale
    
    p5.scale(30) //30 default
    p5.rotate(-p5.radians(x)); //set positi 
    let dx = targetX - x;
    x += dx * easing;

    // if dx is at a level where the spinner cannot visually be determined to be moving any further
    if (dx < valOfVisualStoppage && spinning){ 
      await onSpinComplete();
      spinning = false;
    } 
    pieChart(wheelDiam, totalSlices)
    wordsPie(nums, numPosAngles)
  }

  p5.windowResized = () => {
    p5.resizeCanvas(canvasSizeX, canvasSizeY);
    p5.redraw()
  }

  function wordsPie(wordsArray, angles){
    const textPlacement = 0.96 //percent distance from center of circle in relation to outer edge
    wordsArray.forEach((x,i) =>{   
      if (i % 2 !== 0){ // set color
        p5.fill(246,199,0) //imdb yellow
      } else {p5.fill("black")}
      
      p5.textSize(4);
      p5.textAlign(p5.LEFT,p5.CENTER);

      p5.push()
      p5.rotate(p5.radians(angles[i]));
      p5.text(x,(wheelRadius) * textPlacement, 0)  
        p5.pop()
    });
    
  }

  function pieChart(diameter, totalSlices) {
    let lastAngle = 0; // change to start rotated on each load
    for (let i = 0; i < totalSlices; i++) {

      if (i % 2 === 0){ // set color
        p5.fill(246,199,0)
      } else {p5.fill("black")}
      
      p5.arc(
        0,
        0,
        diameter,
        diameter,
        lastAngle,
        lastAngle + p5.radians(sliceDegIncrement) 
      );
      
      lastAngle += p5.radians(sliceDegIncrement);
      
    }  
  }

  function drawDot(){
    p5.push()
      p5.fill("white")
      p5.stroke("green")
      p5.triangle(wheelRadius, 0, (wheelRadius)+3, -3, (wheelRadius)+3, 3);
    p5.pop()
  }

  function createWheelNeedle(){  
    const pin = p5.createImg('./src/assets/img/pinwhite214x165.png', "Pin wheel needle");
    pin.position(wheelRadius+172, (p5.height / 2)-82.5);
    pin.mousePressed(wheelSpinAction)

    const div = p5.createDiv();
    const line1 = p5.createP("CLICK");
    const line2 = p5.createP("TO");
    const line3 = p5.createP("SPIN");
    div.child(line1).child(line2).child(line3)

    div.mousePressed(wheelSpinAction)
    div.addClass("spinButton")
    div.addClass("buttonAnimation")

    div.position(wheelRadius + 266, p5.height/2-38)
  }

  function wheelSpinAction(){
    const step = p5.random(720,1440); //amount of degrees to rotate
    spinning = true;
    targetX += step;
    const expectedLandedNumber = getEstimatedEndPosition(step)
    onSpinStart(expectedLandedNumber);
  }

  function getEstimatedEndPosition(step){
    //lastDegRotation compensates for current position for subsequent spins
    const sub360DegRotation = (lastDegRotation+step) % 360;
    const rawQuotient = sub360DegRotation / sliceDegIncrement;
    const roundedUp = Math.ceil(rawQuotient);
  
    lastDegRotation = sub360DegRotation;
    
    return roundedUp;
  }
}

export default Sketch 