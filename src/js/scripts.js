(function ($, window, document, undefined) {

  'use strict';

  /**
   * Given the parameter in the URL, we have an array of
   * inducements which we map to, through a function
   */

  var mappingArray = ['FC', 'DC', 'CF', 'CD'];
  var mappingInducements_F = [
    "1. \"El ser humano esta dotado de libre albedrio, y puede elegir entre el bien y el mal. si solo puede actuar bien o solo puede actuar mal, no sera mas que una naranja mecanica\"",
    "2.\"Los humanos no solo son libres sino que están condenados a ser libres. Condenados a crearse a ellos mismos y su propia realidad.\"",
    "3. \"En cualquier momento la decisión que tome puede cambiar el curso de su vida para siempre\".",
    "4. \"El hombre es lo que hace de sí mismo.\"",
    "5. \"Usted dice: yo no soy libre. Pero he subido y bajado el brazo. Todo el mundo entiende que esta respuesta ilógica es una prueba irrefutable de la libertad.\"",
    "5. \" Soy el amo de mi destino: Soy el capitán de mi alma.\""];

  var mappingInducements_D = [
    "1.  \"No hay en la mente ninguna voluntad absoluta o libre, sino que la mente está determinada a querer esto o aquello por una causa, que también es determinada por otra, y ésta a su vez por otra, y así hasta el infinito.\"",
    "2.  \"Nuestras elecciones están dictadas por nuestro deseos y necesidades; la libertad de elección es una ilusión, ya que sólo obedecemos a deseos establecidos por procesos que no controlamos.\"",
    "3. \"tú, tus alegrías y tus penas, tus recuerdos y tus ambiciones, tu sentido de la identidad y voluntad personales, no son en el fondo más que la conducta de unas células nerviosas y de sus moléculas asociadas.\"",
    "4.\"Los hombres se equivocan, en cuanto piensan que son libres; y esta opinión sólo consiste en que son conscientes de sus acciones e ignorantes de las causas por las que son determinados. (...) Su idea de la libertad es, pues, esta: que no conocen causa alguna de sus acciones.\"",
    "5. \"No creo, en el sentido filosófico del término, en la libertad del hombre. Cada uno obra no sólo por una coacción exterior, sino también por una necesidad interior.\"",
    "6. \"El hombre no es libre en ninguno de los instantes de su vida. No es dueño de su configuración, la cual la ha recibido de la naturaleza. No es dueño de sus ideas o de las modificaciones de su cerebro, que se deben a causas que, a pesar suyo y sin saberlo, actúan continuamente sobre él.\""];

  var mappingInducements_C = [
    "1. La ciudad de Oklahoma es la ciudad mas grande (en superficie) del mundo, 1.607 km².",
    "2. El portero se vistió de rojo.",
    "3. Potter escribió numerosas sátiras acerca del Cinismo Social.",
    "4. Japón fue aceptado por las naciones unidas casi catorce años después de Pearl Harbor.",
    "5. El Oriente Express viaja entre París y Estanbul.",
    "6. La principal planta de Boeing da trabajo a 35.000 personas."];


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
  // var practiceTime = 35;
  // var drawingTime = 10;
  // var inducementTime = 40;

  var practiceTime = 10;
  var drawingTime = 10;
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
    $(window).scrollTop(0);
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
    }).then(function (value) {
      console.log("stroke count: ", val);
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
    $(".clearButton").show();
    $(".clearButton").on("click", function () {
      sketches[0].undo();
    });

    $('.countdown').show();
    console.log('drawing');
    var trace = currentTest[0];
    currentTest.shift();
    console.log("drawing", trace);
    setTimeout(function (i) {
      // console.log($('.showing').find('canvas'));
      $('.showing').find('canvas').css("background-image", "url('./assets/images/" + i + "')");

      var canvas = $('.showing').find('canvas')[0];
      var ctx = canvas.getContext("2d");
      ctx.font = "28px Palanquin";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.fillText("Ahora puedes practicar. Cuando se acabe el tiempo de práctica solo ", canvas.width/2, canvas.height * .08);
      ctx.fillText("tendras una oportunidad para dibujar la figura final en x segundos", canvas.width/2, canvas.height * .18);

    }, 750, trace);


    $('.countdown').timeTo(practiceTime, function () {
      $(".clearButton").hide();
        sketches[0].whipe();
          var canvas = $('.showing').find('canvas')[0];
          var ctx = canvas.getContext("2d");
          ctx.font = "30px Palanquin";
          ctx.fillStyle = "green";
          ctx.textAlign = "center";
          ctx.fillText("Dibujo Final!", canvas.width/2, canvas.height * .1);


      $('.countdown').timeTo(drawingTime, function () {
          console.log("done");
      });
    });

    setTimeout(function () {
      console.log("drawing - done");
      console.log(sketches[0].strokes.length);
      var page = currentShowing < 16 ? currentShowing - 12 : currentShowing - 19;
      saveData(page, sketches[0].strokes.length);
      sketches.shift(); //pop from front :D
      segue();
    }, (practiceTime + drawingTime) * 1000);
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
    }, inducementTime * 1000);
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
