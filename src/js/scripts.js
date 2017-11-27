(function ($, window, document, undefined) {

  'use strict';

  var mappingArray = {'FC': 1, 'DC': 2, 'CF': 3, 'CD': 4};

  var currentExam = 0;
  var currentId = 0;

  var currentShowing = 0;

  $(function () {
    currentExam = getUrlParameter('exam');
    console.log(currentExam);
    currentId = getUrlParameter('id');
    console.log(currentId);

    $('.countdown').timeTo(100, function(){ console.log("finished") });

    sketchpad = new Sketchpad({
      element: '#sketchpad',
      width: window.innerWidth,
      height: window.innerHeight,
    });

  });

  $( ".segueButton" ).click(function() {
    // alert( "Handler for .click() called." );
    animateForward(currentShowing);
    currentShowing += 1;
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
