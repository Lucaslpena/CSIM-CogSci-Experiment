(function ($, window, document, undefined) {

  'use strict';

  /**
   * Given the parameter in the URL, we have an array of
   * inducements which we map to, through a function
   */

  var mappingArray = ['FC', 'DC', 'CF', 'CD'];
  var mappingInducements_F = ["FreeWill is REAL #1", "FreeWill is REAL #2", "FreeWill is REAL #3", "FreeWill is REAL #4", "FreeWill is REAL #5", "FreeWill is REAL #6"];
  var mappingInducements_D = ["FreeWill is FAKE #1", "FreeWill is FAKE #2", "FreeWill is FAKE #3", "FreeWill is FAKE #4", "FreeWill is FAKE #5", "FreeWill is FAKE #6"];
  var mappingInducements_C = ["meh #1", "meh #2", "meh #3", "meh #4", "meh #5", "meh #6"];


  var inducements = {
    'FC': mappingInducements_F.concat(mappingInducements_C),
    'DC': mappingInducements_D.concat(mappingInducements_C),
    'CF': mappingInducements_C.concat(mappingInducements_F),
    'CD': mappingInducements_C.concat(mappingInducements_D)
  };

  var currentExam = 0;
  var currentId = 0;
  var currentShowing = 0;
  var inducement_sentences;

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

    inducement_sentences = inducements[mappingArray[currentExam]];
    console.log(inducement_sentences);

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
    // $('.countdown').timeTo(100, function(){ console.log("finished") });
    // console.log(sketchpad1);

    controller(currentShowing);
  });

  $( ".backButton" ).on( "click", function() {
    animateBackward(currentShowing);
    currentShowing -= 1;
    console.log(sketchpad1.strokes.length);
    console.log(sketches[0].strokes.length);
  });

  function controller(val){
    if (val < 5){
      console.log("intro.. and setup");
    }
    else if ((val >= 5)&&( val <= 12)){
      console.log("inducement first section!");
      var sen = inducement_sentences[0];
      inducement_sentences.shift();
      setTimeout(function(s){
        setNewInducement(s);
      }, 750, sen);
    }
    else {
      console.log("lost af");
    }
  };

  function setNewInducement(s){
    $('.inducement').text(s);
    $('.segueButton').prop("disabled",true);
    $('.countdown').timeTo(10, function(){
      $('.segueButton').prop("disabled",false);
    });
  };

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
function animateBackward(val){
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
