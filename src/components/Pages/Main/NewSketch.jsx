import React, { useEffect, useState } from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";
import smNeedleImgFile from './pinwhite142x110.png'
import lgNeedleImgFile from './pinwhite214x165.png'
import {breakpointData, positioning} from '../../../assets/js/sketchUtils'

let onSpinStart;
let onSpinComplete;
let watchedRemovedMovieList;
let full250List;
let removeWatchedFromWheel;
let watchedList;

function sketch(p5) {

    p5.updateWithProps = props => { 
      full250List = props.full250List
      if (props.watchedRemovedMovieList) watchedRemovedMovieList = props.watchedRemovedMovieList;
      if (props.removeWatchedFromWheel) removeWatchedFromWheel = props.removeWatchedFromWheel
      resetWheel()
    }

    let b = positioning(window.innerWidth)
    let smNeedleImg;
    let lgNeedleImg;
    const canvasWidthDividend = 2;
    let canvasSizeX = b.canvX //window.innerWidth/canvasWidthDividend;
    let canvasSizeY = window.innerHeight;
    let spinning = false;
    const valOfVisualStoppage = 0.018 //
    const wheelDiam = 500; // diameter of wheel
    const wheelRadius = wheelDiam/2;
    let listToDraw = (removeWatchedFromWheel) ? watchedRemovedMovieList : full250List
    let totalSlices = listToDraw.length//250; // total slices of wheel
    let sliceDegIncrement = 360 / totalSlices; //difference in degrees of each slice (all slices equidistant)
  
    // create array of degree points a half way points between sliceDegIncrement to place text on wheel
    let numPosAngles = new Array(totalSlices).fill(sliceDegIncrement /2) //~80% of sliceDegIncrement (1.152 @ 1.44 deg difference between slices)
    // modify numPosAngles to increment each slice angle
    for (var i = 1; i < numPosAngles.length; i++) {
      numPosAngles[i] = numPosAngles[i-1] + sliceDegIncrement
    }
    
    //easing math
    let x = 0; // actual position
    let targetX = 0; // target position
    let easing = 0.055; //speed at which animation eases to stop (default 0.055), higher number = faster spin
    let lastDegRotation = 0;
  
  
    p5.preload = () => {  
      smNeedleImg = p5.loadImage(smNeedleImgFile);
      lgNeedleImg = p5.loadImage(lgNeedleImgFile);
    }
  
    p5.setup = () => {  
      p5.createCanvas(canvasSizeX, canvasSizeY);  
      let needleImgInfo = (b.pinSize === "l") ? lgNeedleImg : smNeedleImg
      let needleImgFile = (b.pinSize === "l") ? lgNeedleImgFile : smNeedleImgFile
      createWheelNeedle(needleImgInfo , needleImgFile )
      resetWheel()
    }
  
    p5.draw = async () => {
      p5.translate(b.translate, p5.height / 2); //-7000 for 30 scale / -9500 for 40 scale     
      p5.scale(b.scale)
      p5.rotate(-p5.radians(x)); //set position
      let dx = targetX - x;
      x += dx * easing;
  
      // if dx is at a level where the spinner cannot visually be determined to be moving any further
      if (dx < valOfVisualStoppage && spinning){ 
        await onSpinComplete();
        spinning = false;
  
        if (window.innerWidth < 860){ //Auto scroll to results when screen is ta
          let resultElem = document.querySelector(".results")
          setTimeout(()=> {
            resultElem.scrollIntoView({behavior: "smooth"})
          } ,1000)      
        }
      } 
  
      pieChart(wheelDiam, totalSlices)
      wordsPie(listToDraw, numPosAngles)
    }
  
    function createWheelNeedle(imageInfo,imageFile, scale){  
  
      const pin = p5.createImg(imageFile);
      pin.id('needle')
      const halfPinImgHeight = imageInfo.height/2
      const wheelPerimeterOffset = b.wheelPerimeterOffset;
  
      pin.position(wheelRadius + wheelPerimeterOffset, (p5.height / 2) - halfPinImgHeight);
      pin.mousePressed(wheelSpinAction)
  
      const div = p5.createDiv();
      const line1 = p5.createP("CLICK");
      const line2 = p5.createP("TO");
      const line3 = p5.createP("SPIN");
      div.child(line1).child(line2).child(line3)
  
      div.mousePressed(wheelSpinAction)
      div.addClass("spinButton")
      div.addClass("buttonAnimation")
  
      div.position(wheelRadius + b.btnXTextOffset, p5.height/2 - 37)
    }
  
    p5.windowResized = () => {
      b = positioning(window.innerWidth)
      let needleImgInfo = (b.pinSize === "l") ? lgNeedleImg : smNeedleImg;
      let needleImgFile = (b.pinSize === "l") ? lgNeedleImgFile : smNeedleImgFile;
  
      canvasSizeX = b.canvX
      canvasSizeY = window.innerHeight; //500;
      p5.resizeCanvas(canvasSizeX, canvasSizeY);
      
      const halfPinImgHeight = needleImgInfo.height/2
      const wheelPerimeterOffset = b.wheelPerimeterOffset;
      p5.select("#needle").remove();
      p5.select(".spinButton").remove();
      createWheelNeedle(needleImgInfo , needleImgFile )
      // p5.select("#needle").position(wheelRadius + wheelPerimeterOffset, (p5.height / 2) - halfPinImgHeight);
      // p5.select(".spinButton").position(wheelRadius + b.btnXTextOffset, p5.height/2 - 38)
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
        p5.text(x.rank,(wheelRadius) * textPlacement, 0)  
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
          lastAngle + p5.radians(sliceDegIncrement) ,
        );
        
        lastAngle += p5.radians(sliceDegIncrement);
        
      }  
    }
  
    function wheelSpinAction(){
      const step = p5.random(720,1440); //amount of degrees to rotate
      spinning = true;
      targetX += step;
      const expectedLandedNumber = getEstimatedEndPosition(step) -1
      onSpinStart(expectedLandedNumber);
    }
  
  
    //wheel math to deduce what positon when spin complete
    function getEstimatedEndPosition(step){
      //lastDegRotation compensates for current position for subsequent spins
      const sub360DegRotation = (lastDegRotation+step) % 360;
      const rawQuotient = sub360DegRotation / sliceDegIncrement;
      const roundedUp = Math.ceil(rawQuotient);
    
      lastDegRotation = sub360DegRotation;
      
      return roundedUp;
    }
  
    function resetWheel(){
      listToDraw = (removeWatchedFromWheel) ? watchedRemovedMovieList : full250List
      totalSlices = listToDraw.length
      sliceDegIncrement = 360 / totalSlices;
      numPosAngles = new Array(totalSlices).fill(sliceDegIncrement /2)
  
      for (var i = 1; i < numPosAngles.length; i++) {
        numPosAngles[i] = numPosAngles[i-1] + sliceDegIncrement
      }
      p5.redraw()
    }
  
  }

export default function NewSketch(props) {
  const [rotation, setRotation] = useState(0);
  onSpinStart = props.onSpinStart;
  onSpinComplete = props.onSpinComplete; 
  full250List = props.full250List
  watchedRemovedMovieList = props.watchedRemovedMovieList;
  removeWatchedFromWheel = props.removeWatchedFromWheel;
  watchedList = props.watchedList;

  // useEffect(() => {
    // console.log(watchedRemovedMovieList)
    // console.log("sketch loaded compete")

    // const interval = setInterval(
    //   () => setRotation(rotation => rotation + 100),
    //   100
    // );

    // return () => {
    // //   clearInterval(interval);
    // };
  // }, [props.watchedRemovedMovieList, props.removeWatchedFromWheel]);

  return <ReactP5Wrapper 
            sketch={sketch} 
            rotation={rotation} 
            watchedList={watchedList}
            watchedRemovedMovieList={watchedRemovedMovieList}
            full250List={full250List}
            removeWatchedFromWheel={removeWatchedFromWheel}
            />;
}