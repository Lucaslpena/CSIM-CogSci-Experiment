/*!
 * Online Portfolio
 * Creative Technologist
 * http://lucaslorenzopena.com/
 * @author Lucas Lorenzo Pena
 * @version 2.0
 * Copyright 2017. MIT licensed.
 */
/**
 * Created by Lucian on 4/27/17.
 */
// some help https://www.nayuki.io/res/triangle-solver-javascript/triangle-solver.js
function solveSide(a,th,b){ //side angle side
  th = radians(th);
  if (th > 0.001)
    return Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(th));
  else  // Explained in https://www.nayuki.io/page/numerically-stable-law-of-cosines
    return Math.sqrt((a - b) * (a - b) + a * b * th * th * (1 - th * th / 12));
}
function solveSide2(a, b, th1){ // side side angle
  var A = th1;
  var B, C, c;
  var knownSide, knownAngle, partialSide;
  if (a != null && A != null) { knownSide = a; knownAngle = A; }
  if (b != null && B == null) partialSide = b;
  var ratio = knownSide / Math.sin(radians(knownAngle));
  var temp = partialSide / ratio;  // sin(partialAngle)
  var partialAngle, unknownSide, unknownAngle;
  partialAngle = degrees(Math.asin(temp));
  unknownAngle = 180 - knownAngle - partialAngle;
  unknownSide = ratio * Math.sin(radians(unknownAngle));  // Law of sines
  if (a != null && A == null) A = partialAngle;
  if (b != null && B == null) B = partialAngle;
  if (c != null && C == null) C = partialAngle;
  if (a == null && A == null) { a = unknownSide; A = unknownAngle; }
  if (b == null && B == null) { b = unknownSide; B = unknownAngle; }
  if (c == null && C == null) { c = unknownSide; C = unknownAngle; }
  return c;
}

function Rings(o){ //inits
  var orderNum = o;
  var radius;
  var tupleNodesL;
  var endLength;
  var outDistance;

  var theta;
  var rotation = 0;

  this.init = function(){
    radius = calculateRadius();
    tupleNodesL = calculateTupleNotesL(radius);
    theta = 360 / tupleNodesL;
    endLength = calculateNodeDistance(tupleNodesL);
    rotation += calculateThetaOffset();
    //console.log("starting", rotation, "offset", calculateThetaOffset());
    outDistance = solveSide2(radius, endLength/2, 90);
    //console.log(outDistance);

    outDistance = solveSide(radius, (90 - theta / 2), endLength/2);
    // console.log(outDistance);
    // console.log(endLength);

    //calculate ordersize compared to standard set in vortex
    //console.log('init');
  };
  this.init();
  //values



  this.display = function(){
    fill(150,150,150, 10);
    stroke(0,255,255, 0);
    var rote = theta;
    push();
    translate(width/2, height/2);
    rotate(rotation);
    for (var j = 0; j < tupleNodesL; j++){ // tupleNodesL
      push();
      //translate(width/2, height/2);
      rotate(radians(rote * j));
      line(endLength*.5, outDistance, endLength*-.5, outDistance);
      rect(endLength, outDistance, -endLength*2, outDistance/2);
      pop();
    }
    rotation += ( .001 * (ringsL+1 - orderNum));
    pop();
  };


  function calculateRadius(){
    ///something with base space and screen size//
    return 25 * orderNum + 80;
  }
  function calculateThetaOffset(){
    return 360/(ringsL*1/3) * (orderNum + 1);   //lines with canvas theta offset in loop for number of objects... theta based off of lines
  }
  function calculateTupleNotesL(radius){
    if (radius < 200){
      return 7;
    } else if (radius < 300){
      return 8;
    } else if (radius < 300){
      return 8;
    } else if (radius < 400){
      return 9;
    } else if (radius < 475){
      return 10;
    } else if (radius < 550){
      return 11;
    } else if (radius < 600){
      return 12;
    } else if (radius < 800){
      return 13;
    }
  }
  function calculateNodeDistance(nodeL){
    //get current node limit and use some trig to get length
    var degree = 360 / nodeL;
    return solveSide(radius, degree, radius);
  }
}
