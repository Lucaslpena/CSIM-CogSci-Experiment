/*!
 * Online Portfolio
 * Creative Technologist
 * http://lucaslorenzopena.com/
 * @author Lucas Lorenzo Pena
 * @version 2.0
 * Copyright 2017. MIT licensed.
 */
// function Vehicle(x,y,m){
//   //setting up physics
//   this.pos = createVector(x,y);
//   this.acc = createVector(0,0);
//   this.vel = createVector(0,0);
//   this.r = 4;               //used for drawing
//   this.mass = random(1,3);  //used for speed * attraction
//   this.isAlone = false;     //used for measuring if lonely :(
//
//   this.setSpeeds = function(){
//     this.maxspeed = this.mass * 1.5;    //top limit
//     this.maxforce = this.maxspeed / 5;  //seeting ability
//   }
//   this.setSpeeds();
//
//   this.changeColor = function(sad){
//     if (sad == true) {
//       if (this.isAlone == false){ // first time changing to true
//         this.isAlone = true;
//         this.mass = random(3,10); // if lonely increase mass which makes faster and steering more rapid ..agitate
//         this.setSpeeds();
//       }
//       this.cl ="#F64F21"          // alter color too
//     } else {
//       if (this.isAlone == true){  // first time changing to true
//         this.isAlone = false;
//         this.mass = random(1,3);  // lower mass and lower max speed and lower turning... calm
//         this.setSpeeds();
//       }
//       this.cl = "#868B82"         // alter color too
//     }
//   }
//   this.changeColor(false);
//
//   this.applyForce = function(force){ //basic apply force with mass
//     var f = force.copy();
//     f.div(this.mass);
//     this.acc.add(f);
//   }
//
//   this.flow = function(target){
//     var desired = target.lookup(this.pos);
//     desired.setMag(this.maxspeed);
//     var steering = p5.Vector.sub(desired, this.vel); //craig reynolds famous formula
//     steering.limit(this.maxforce);
//     this.applyForce(steering);
//   }
//
//
//   this.separate = function(vehicles) {
//     var desiredseparation = 30; // view area is 30 px
//     var sum = createVector();
//     var count = 0;
//     var alone = true; //assume default is alone
//     for (var i = 0; i < vehicles.length; i++) {
//       var d = p5.Vector.dist(this.pos, vehicles[i].pos);
//       if ((d > 0) && (d < desiredseparation)) { //if anyone is within range
//         var diff = p5.Vector.sub(this.pos, vehicles[i].pos); //get the difference between self and others
//         diff.normalize();   //set mag to 1
//         diff.div(d);        // divide by total sum to get average of all in range
//         sum.add(diff);      //add the vector to summ
//         count++;            //increment total vectors that rae in view area
//       }
//       if ((d > 0) && (d < desiredseparation*3)) { //if any are in 3 times view area set alone to false
//         alone = false;
//       }
//     }
//     if (count > 0) {            // calculate average if any are present
//       sum.div(count);           // get average
//       sum.normalize();          // set mag to 1
//       sum.mult(this.maxspeed*2);// how quickly do they move away from the neighbor
//
//       sum.sub(this.velocity);  // setting up craig reynolds famous formula
//       sum.limit(this.maxforce);
//       this.changeColor(false); //make sure is calm
//     }
//     if (alone == true) this.changeColor(true); //if alone agitate
//     this.applyForce(sum.mult(2)); //apply force
//   }
//
//   this.update = function(){ //update physics
//     this.vel.add(this.acc);
//     this.vel.limit(this.maxspeed);
//     this.pos.add(this.vel);
//     this.acc.set(0,0);
//     this.borders();
//   }
//
//   this.borders = function() { //proper borders
//     if (this.pos.x < -this.r) this.pos.x = width+this.r;
//     if (this.pos.y < -this.r) this.pos.y = height+this.r;
//     if (this.pos.x > width+this.r) this.pos.x = -this.r;
//     if (this.pos.y > height+this.r) this.pos.y = -this.r;
//   }
//
//   this.display = function(){ //display arrows
//     var theta = this.vel.heading() + PI / 2;
//     push();
//     fill(this.cl);
//     stroke(this.cl);
//     strokeWeight(1);
//     translate(this.pos.x, this.pos.y);
//     rotate(theta);
//     beginShape();
//     vertex(0, -this.r*1);
//     vertex(-this.r, this.r*2);
//     vertex(0, -this.r * 1);
//     vertex(this.r, this.r*2);
//     endShape(CLOSE);
//     pop();
//   }
// }
