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
  var currentShowing = 11;
  var inducement_sentences;

  var sketchpad1; // page 3
  var sketchpad2; // page 4
  var sketchpad3; // page 5
  var sketchpad4; // page 6
  var sketchpad5; // page 7
  var sketchpad6; // page 8

  var practiceTime = 5;
  var drawingTime = 5;
  var preppingTime = 5;
  var inducementTime = 5;

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
      height: 400
    });
    sketchpad2 = new Sketchpad({
      element: ('#sketchpadPage4'),
      width: window.innerWidth,
      height: 400
    });
    sketchpad3 = new Sketchpad({
      element: ('#sketchpadPage5'),
      width: window.innerWidth,
      height: 400
    });
    sketchpad4 = new Sketchpad({
      element: ('#sketchpadPage6'),
      width: window.innerWidth,
      height: 400
    });
    sketchpad5 = new Sketchpad({
      element: ('#sketchpadPage7'),
      width: window.innerWidth,
      height: 400
    });
    sketchpad6 = new Sketchpad({
      element: ('#sketchpadPage8'),
      width: window.innerWidth,
      height: 400
    });
    console.log('initialized all sketchboards');
    seedSave();
    sketches = [sketchpad1, sketchpad2, sketchpad3, sketchpad4, sketchpad5, sketchpad6]
  });

  $(".segueButton").click(function () {
    segue();
  });


  $(".backButton").on("click", function () {
    animateBackward(currentShowing);
    currentShowing -= 1;
    console.log(sketchpad1.strokes.length);
    console.log(sketches[0].strokes.length);
  });

  function segue() {
    animateForward(currentShowing);
    currentShowing += 1;
    // console.log(sketchpad1);
    controller(currentShowing);
  };

  function saveData(num, val) {
    console.log("num:" + num);
    console.log("val:" + val);
    var key = "strokeCount" + num;
    firebase.database().ref('logging/' + currentId + 'drawStroke/' + num).set({
      strokes: val
    });
  }
  function seedSave(){
    var timestamp = new Date();
    firebase.database().ref('logging/' + currentId).set({
      exam: mappingArray[currentExam],
      startTime: timestamp.toUTCString()
    });
  }

  function controller(val) {
    console.log("currently on:" + val);
    if (val < 5) {
      console.log("intro.. and setup");
    }
    else if ( ((val >= 5) && ( val <= 10)) || (( val >= 16 ) && ( val <= 20 )) ) {
      console.log("inducement first section!");
      var sen = inducement_sentences[0];
      inducement_sentences.shift();
      setTimeout(function (s) {
        setNewInducement(s);
      }, 750, sen);
    }
    else if (val > 11) {
     newDrawing();
    }
    else {
      console.log("lost af");
    }
  };

  function newDrawing(){
    $('.countdown').show();
    console.log('drawing');
    $('.countdown').timeTo(practiceTime, function () {
      sketches[0].whipe();
      $('.showing').find('p').text("Now that practice is over you will have 20 seconds to draw the geometric shape without lifting the pen and without tracing the same line more than once. Get ready!");
      $('.countdown').timeTo(preppingTime, function () {
        sketches[0].whipe();
        $('.showing').find('p').text("Draw!");
        $('.countdown').timeTo(drawingTime, function () {
          console.log("done");
        });
      });
    });

    setTimeout(function () {
      console.log("drawing - done");
      console.log(sketches[0].strokes.length);
      saveData(currentShowing, sketches[0].strokes.length);
      sketches.shift(); //pop from front :D
      segue();
    },(preppingTime + practiceTime + drawingTime)*1000);
  };
  function setNewInducement(s) {
    $('.countdown').show();
    $('.inducement').text(s);
    $('.segueButton').prop("disabled", true);
    $('.countdown').timeTo(inducementTime, function () {
      $('.segueButton').prop("disabled", false);
      $('.countdown').hide();
    });
  };

})(jQuery, window, document);

function animateForward(val) {
  $('.contentWrapper').eq(val).removeClass('showing');
  $('.contentWrapper').eq(val).addClass('hiding');

  setTimeout(function (i) {
    $('.contentWrapper').eq(i).removeClass('hiding');
    $('.contentWrapper').eq(i).addClass('hidden');

    $('.contentWrapper').eq(i + 1).addClass('showing');
  }, 750, val);
}
function animateBackward(val) {
  $('.contentWrapper').eq(val).removeClass('showing');
  $('.contentWrapper').eq(val).addClass('hiding');

  setTimeout(function (i) {
    $('.contentWrapper').eq(i).removeClass('hiding');
    $('.contentWrapper').eq(i).addClass('hidden');

    $('.contentWrapper').eq(i - 1).addClass('showing');
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
