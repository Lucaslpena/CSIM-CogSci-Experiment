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

  /**
   * Given the parameter in the URL, we have an array of
   * inducements which we map to, through a function
   */

  var mappingArray = ['FC', 'DC', 'CF', 'CD'];
  var mappingInducements_F = ["FreeWill is REAL #1", "FreeWill is REAL #2", "FreeWill is REAL #3", "FreeWill is REAL #4", "FreeWill is REAL #5", "FreeWill is REAL #6"];

  var mappingInducements_D = [
    "1.   Circuits and determining molecular processes exist outside conscious thought. They [...] reinforce the neurohormonal loops that regulate consequent emotional response. [...] The hidden preparation of mental activity gives the illusion of free will. We make decisions for reasons we often sense only vaguely, and seldom if ever understand fully.",
    "2.  We like to believe that we do things we do because we consciously decide to do them. Recent scientific research in psychology, however, demonstrates instances when our actions can be caused by things of which we are not aware.",
    "3.  \"tú\", tus alegrías y tus penas, tus recuerdos y tus ambiciones, tu sentido de la identidad y voluntad personales, no son en el fondo más que la conducta de unas células nerviosas y de sus moléculas asociadas. ",
    "4. \"The initial configuration of the universe may have been chosen by God, or it may itself have been determined by the laws of science. In either case, it would seem that everything in the universe would then be determined by evolution according to the laws of science, so it is difficult to see how we can be masters of our fate.\"",
    "5. \"You will say that I feel free. This is an illusion, which may be compared to that of the fly in the fable, who, upon the pole of a heavy carriage, applauded himself for directing its course. Man, who thinks himself free, is a fly who imagines he has power to move the universe, while he is himself unknowingly carried along by it.\"",
    "6. I do not at all believe in human freedom in the philosophical sense. Everybody acts not only under external compulsion but also in accordance with inner necessity."];

  var mappingInducements_C = [
    "1. La ciudad de Oklahoma es la ciudad mas grande (en superficie) del mundo, 1.607 km².",
    "2. El portero se vistió de rojo. ",
    "3. Potter escribió numerosas sátiras acerca del Cinismo Social.",
    "4. Japón fue aceptado por las naciones unidas casi catorce años después de Pearl Harbor. ",
    "5. El Oriente Express viaja entre París y Estanbul. ",
    "6. La principal planta de Boeing da trabajo a 35.000 personas. "];


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
  var sketchpad7; // page 9
  var sketchpad8; // page 10

  var shape1 = "shapes_01_true.png";
  var shape2 = "shapes_02_true.png";
  var shape3 = "shapes_03_true.png";
  var shape4 = "shapes_04_true.png";
  var shape5 = "shapes_05_false.png";
  var shape6 = "shapes_06_false.png";
  var shape7 = "shapes_07_false.png";
  var shape8 = "shapes_08_false.png";
  var shape9 = "shapes_09_false.png";
  var shape10 = "shapes_10_true.png";
  var shape11 = "shapes_11_false.png";


  var test_order1 = [shape6, shape11, shape10, shape8, shape3, shape7, shape1, shape9];
  var test_order2 = [shape5, shape9, shape10, shape4, shape3, shape7, shape2, shape6];
  var test_order3 = [shape1, shape2, shape7, shape10, shape11, shape6, shape5, shape3];
  var test_order4 = [shape7, shape3, shape2, shape10, shape1, shape11, shape8, shape4];
  var test_order5 = [shape6, shape9, shape11, shape4, shape1, shape3, shape5, shape7];
  var test_order6 = [shape7, shape8, shape9, shape3, shape1, shape6, shape11, shape2];

  var tests = [test_order1, test_order2, test_order3, test_order4, test_order5, test_order6];

  var currentTest;
  var testIndex;
  var practiceTime = 2;
  var drawingTime = 2;
  var preppingTime = 2;
  var inducementTime = 2;

  var sketches;

  $(function () {
    currentExam = getUrlParameter('exam');
    console.log(currentExam);
    currentId = getUrlParameter('id');
    console.log(currentId);

    inducement_sentences = inducements[mappingArray[currentExam]];
    console.log(inducement_sentences);

    testIndex = ((Math.floor(Math.random() * 6) + 1) - 1);
    currentTest = tests[testIndex];

    console.log("testindex: ", testIndex);
    console.log("tests: ", currentTest);

    seedSave();
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
    controller(currentShowing);
  };

  function saveData(num, val) {
    console.log("num:" + num);
    console.log("val:" + val);
    var key = "strokeCount" + num;
    firebase.database().ref('logging/' + currentId + '/drawStroke/' + num).set({
      strokes: val
    });
  }

  function seedSave() {
    var timestamp = new Date();
    firebase.database().ref('logging/' + currentId).set({
      exam: mappingArray[currentExam],
      startTime: timestamp.toUTCString(),
      motorOrder: currentTest
    }).then(function (value) {
      console.log(value);
      console.log('seeded wrote');
    });
    ;
  }

  function controller(val) {
    console.log("currently on:" + val);
    if (val < 5) {
      console.log("intro.. and setup");
    }
    else if (((val >= 5) && ( val <= 10)) || (( val >= 17 ) && ( val <= 22 ))) {
      console.log("inducement first section!");
      var sen = inducement_sentences[0];
      inducement_sentences.shift();
      setTimeout(function (s) {
        setNewInducement(s);
      }, 750, sen);
    }
    else if (((val > 11) && ( val < 16)) || ( (val > 23) && ( val < 28) )) {
      newDrawing();
    }
    else {
      console.log("lost af");
    }
  };

  function newDrawing() {
    $('.countdown').show();
    console.log('drawing');
    var trace = currentTest[0];
    currentTest.shift();
    console.log("drawing", trace);
    setTimeout(function (i) {
      console.log($('.showing').find('canvas'));
      $('.showing').find('canvas').css("background-image", "url('./assets/images/" + i + "')");
    }, 750, trace);

    $('.countdown').timeTo(practiceTime, function () {
      sketches[0].whipe();
      $('.showing').find('p').text("El tiempo de practica se ha terminado. Ahora solo tienes una oportunidad para hacer el dibujo final");
      $('.countdown').timeTo(preppingTime, function () {
        sketches[0].whipe();
        $('.showing').find('p').text("A dibujar!");
        $('.countdown').timeTo(drawingTime, function () {
          console.log("done");
        });
      });
    });

    setTimeout(function () {
      console.log("drawing - done");
      console.log(sketches[0].strokes.length);
      var page = currentShowing < 16 ? currentShowing - 12 : currentShowing - 19;
      saveData(page, sketches[0].strokes.length);
      sketches.shift(); //pop from front :D
      segue();
    }, (preppingTime + practiceTime + drawingTime) * 1000);
  };
  function setNewInducement(s) {
    $('.countdown').show();
    $('.inducement').text(s);
    $('.segueButton').prop("disabled", true);
    // TODO -- make this automatic??!?!?!?!!?!?!?!??!! segue!
    $('.countdown').timeTo(inducementTime, function () {
      $('.segueButton').prop("disabled", false);
      $('.countdown').hide();
    });
    setTimeout(function(){
      segue();
    }, inducementTime);
  };

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

  var width = window.innerWidth;
  console.log("window width", width);

  sketchpad1 = new Sketchpad({
    element: ('#sketchpadPage3'),
    width: width,
    height: 400
  });
  sketchpad2 = new Sketchpad({
    element: ('#sketchpadPage4'),
    width: width,
    height: 400
  });
  sketchpad3 = new Sketchpad({
    element: ('#sketchpadPage5'),
    width: width,
    height: 400
  });
  sketchpad4 = new Sketchpad({
    element: ('#sketchpadPage6'),
    width: width,
    height: 400
  });
  sketchpad5 = new Sketchpad({
    element: ('#sketchpadPage7'),
    width: width,
    height: 400
  });
  sketchpad6 = new Sketchpad({
    element: ('#sketchpadPage8'),
    width: width,
    height: 400
  });
  sketchpad7 = new Sketchpad({
    element: ('#sketchpadPage9'),
    width: width,
    height: 400
  });
  sketchpad8 = new Sketchpad({
    element: ('#sketchpadPage10'),
    width: width,
    height: 400
  });
  console.log('initialized all sketchboards');
  sketches = [sketchpad1, sketchpad2, sketchpad3, sketchpad4, sketchpad5, sketchpad6, sketchpad7, sketchpad8];

})(jQuery, window, document);
