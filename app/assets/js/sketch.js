/*!
 * Online Portfolio
 * Creative Technologist
 * http://lucaslorenzopena.com/
 * @author Lucas Lorenzo Pena
 * @version 2.0
 * Copyright 2017. MIT licensed.
 */
// var cnv;
// function adjustCanvas() {
//   cnv = createCanvas(windowWidth, windowHeight);
//   cnv.position(0, 0);
// }
// function windowResized() {
//   adjustCanvas();
// }
//
// /** VORTEX  **/
// var rings = [];
// var ringsL = 12;
//
//
// /** MS **/
// var ms_particles = [];
// var ms_particlesL = 20;
// var ms_imgs = [];
// var path = 'assets/images/';
//
//
//
// function setup() {
//   adjustCanvas();
//
//   //Rings
//   for (var i = 0; i < ringsL; ++i) {
//     var x = new Rings(i);
//     rings.push(x);
//   }
//   frameRate(30);
// }
//
// // function initMSparticles(){ //needed for optimization of state machine
// //   for (var i = 0; i < ms_particlesL; i++){
// //     ms_imgs.push( loadGif(path + floor(random(1,10)) + '.gif'));
// //   }
// //   for (var i = 0; i < ms_particlesL; i++){
// //     var imgLoc = (floor(random(1,ms_imgs.length)) - 1);
// //     var img = ms_imgs[i];
// //     ms_particles.push(new Particle(random(50,width-50), random(50, height-50), img));
// //   }
// // }
//
// var state;
// function stateMachine(val) {
//   // if (val == state){
//   //   return "sameGiven";
//   // }
//   // switch (val){
//   //   case 2:
//   //     state = 2;
//   //     break;
//   //   default:
//   //     state = 1;
//   // }
//   if (val != null) {
//     state = val;
//     if (state == 1) {
//       initMSparticles();
//     }
//   }
//
//   return state;
// }
//
// function draw() {
//   clear();
//   fill(255, 255, 255, 0);
//   if (state == 1) {
//     // for (var i = 0; i < ms_particlesL; i++){
//     //   ms_particles[i].separate(ms_particles);
//     //   ms_particles[i].update();
//     //   ms_particles[i].display();
//     // }
//   } else if (state == 2) {
//
//   } else if (state == 3) {
//
//   } else if (state == 4) {
//
//   } else if (state == 5) {
//
//   } else if (state == 6) {
//
//   } else {
//     for (var i = 0; i < rings.length; ++i) {
//       var r = rings[i];
//       r.display();
//       fill(255, 255, 255, 0);
//     }
//   }
//
//
// }
