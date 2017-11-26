/*!
 * Online Portfolio
 * Creative Technologist
 * http://lucaslorenzopena.com/
 * @author Lucas Lorenzo Pena
 * @version 2.0
 * Copyright 2017. MIT licensed.
 */
// function FlowField(r){
//   this.field;
//   this.resolution = r;
//   this.col = width / this.resolution;
//   this.row = width / this.resolution;
//
//   this.init = function(){
//     this.field = [];
//
//     while(this.field.length > 0) { //make new field
//       this.field.pop();
//     }
//     noiseSeed(Math.floor(random(50))); //used for reseeting noise taken from lectures
//     var xOff = 0;
//     for (var j = 0; j < this.col; j++) {
//       var yOff = 0;
//       var column = [];
//       for (var k = 0; k < this.row; k++) {
//         var theta = map(noise(xOff, yOff), 0, 1, 0, TWO_PI);
//         var vector;
//         vector = createVector(cos(theta), sin(theta));
//         column.push(vector);
//         yOff += 0.1;
//       }
//       this.field.push(column);
//       xOff += 0.1;
//     }
//   };
//
//   this.display = function() { // sourced from lectures
//     for (var i = 0; i < this.col; i++) {
//       for (var j = 0; j < this.row; j++) {
//         drawVector(this.field[i][j], i * this.resolution, j * this.resolution, this.resolution - 50);
//         // pass grid variables to the draw according to the resolution
//       }
//     }
//   };
//
//   this.lookup = function(lookup) { // find mag from locations of surface vehicles according to 2d array value
//     var column = Math.floor(constrain(lookup.x / this.resolution, 0, this.col - 1));
//     var row = Math.floor(constrain(lookup.y / this.resolution, 0, this.row - 1));
//     return this.field[column][row].copy();
//   };
//
//   //draws line pointing to direction of vector
//   var drawVector = function(v, x, y, scale) {
//     push();
//     translate(x, y);
//     stroke('#120906');
//     fill('#120906');
//     strokeWeight(1);
//     rotate(v.heading());
//     var len = v.mag() * scale;
//     rect(0, 0, len, 1);
//     pop();
//   };
//
// }
