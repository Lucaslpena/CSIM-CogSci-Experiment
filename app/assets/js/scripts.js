/*!
 * csim-cogsci-experiment
 * 
 * 
 * @author 
 * @version 1.0.0
 * Copyright 2017. ISC licensed.
 */
(function ($, window, document, undefined) {

  'use strict';

  var mappingArray = {'FC': 1, 'DC': 2, 'CF': 3, 'CD': 4};

  var currentExam = 0;
  var currentId = 0;

  var currentShowing = 0;

  var sketchpad1; // page 3
  var sketchpad2; // page 4
  var sketchpad3; // page 5
  var sketchpad4; // page 6
  var sketchpad5; // page 7
  var sketchpad6; // page 8

  var sketches;

  $(function () {
    currentExam = getUrlParameter('exam');
    console.log(currentExam);
    currentId = getUrlParameter('id');
    console.log(currentId);


    sketchpad1 = new Sketchpad({
      element: ('#sketchpadPage3'),
      width: window.innerWidth,
      height: 600
    });
    sketchpad2 = new Sketchpad({
      element: ('#sketchpadPage4'),
      width: window.innerWidth,
      height: 600
    });
    sketchpad3 = new Sketchpad({
      element: ('#sketchpadPage5'),
      width: window.innerWidth,
      height: 600
    });
    sketchpad4 = new Sketchpad({
      element: ('#sketchpadPage6'),
      width: window.innerWidth,
      height: 600
    });
    sketchpad5 = new Sketchpad({
      element: ('#sketchpadPage7'),
      width: window.innerWidth,
      height: 600
    });
    sketchpad6 = new Sketchpad({
      element: ('#sketchpadPage8'),
      width: window.innerWidth,
      height: 600
    });

    sketches = [sketchpad1, sketchpad2, sketchpad3, sketchpad4, sketchpad5, sketchpad6]
  });

  $( ".segueButton" ).click(function() {
    animateForward(currentShowing);
    currentShowing += 1;
    $('.countdown').timeTo(100, function(){ console.log("finished") });
    console.log(sketchpad1);
  });

  $( ".backButton" ).on( "click", function() {
    animateForward(currentShowing);
    currentShowing -= 1;
    console.log(sketchpad1.strokes.length);
    console.log(sketches[0].strokes.length);
  });


})(jQuery, window, document);


function animateForward(val){
  $('.contentWrapper').eq(val).removeClass('showing');
  $('.contentWrapper').eq(val).addClass('hiding');

  setTimeout(function(i){
    $('.contentWrapper').eq(i).removeClass('hiding');
    $('.contentWrapper').eq(i).addClass('hidden');

    $('.contentWrapper').eq(i+1).addClass('showing');
  }, 750, val);
}

function animateForward(val){
  $('.contentWrapper').eq(val).removeClass('showing');
  $('.contentWrapper').eq(val).addClass('hiding');

  setTimeout(function(i){
    $('.contentWrapper').eq(i).removeClass('hiding');
    $('.contentWrapper').eq(i).addClass('hidden');

    $('.contentWrapper').eq(i-1).addClass('showing');
  }, 750, val);
}

var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
};
