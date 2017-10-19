if (document.readyState != 'loading') {
  onDocumentReady();
} else {
  document.addEventListener('DOMContentLoaded', onDocumentReady);
}

// Page is loaded! Now event can be wired-up
function onDocumentReady() {
  console.log('Document ready.');
  videoWidth();
  video.addEventListener("click", pauseVideo, false);
  window.addEventListener("resize", resize, false);
}

// global variables
var video = document.getElementById("video");
var videoPlay = false;
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

//function that toggles the menu
function toggleMenu(x) {
  x.classList.toggle("change");
  $("#barContainer").children().toggleClass("rainbowGradientAnimated");
  $("#barContainer").children().toggleClass("clipBox");
  document.getElementById("menu").classList.toggle("hidden");
  document.body.classList.toggle("noScroll");
}

//function that closes menu after clicking link
function closeMenu() {
  document.getElementById("barContainer").classList.toggle("change");
  $("#barContainer").children().toggleClass("rainbowGradientAnimated");
  $("#barContainer").children().toggleClass("clipBox");
  document.getElementById("menu").classList.toggle("hidden");
}

//function that pauses or plays video
function pauseVideo() {
  console.log("clicked video");
  if (videoPlay === true) {
    video.pause();
    videoPlay = false;
  } else {
    video.play();
    videoPlay = true;
  }
}

//function that resizes video if window is resized
function resize() {
  windowWidth = window.innerWidth;
  console.log("running resize");
  if (windowWidth > 760) {
    video.width = "760";
  } else {
    console.log("resize windowWidth: " + windowWidth);
    video.width = windowWidth;
  }
}

//funtion som körs när sidan laddas och anger videobredd
function videoWidth() {
  console.log("running videoWidth");
  video.width = windowWidth;
  if (windowWidth > 760) {
    video.width = "760";
  } else {
    video.width = windowWidth;
  }
}

//function that checks answer for quiz
function checkAnswer(el, x) {
  console.log("running checkAnswer...");

  //rounding nr to identify case
  var question = Math.floor(x);
  //clicked element container
  var container = el.parentElement;
  //which chldren to remove
  var childrenToRemove;
  //correct answer
  var correctAnswer;

  $(container.children).removeClass("grow");

  switch (question) {
    case 1:
      correctAnswer = $(container).children(".answer:nth-child(1)");
      // console.log(correctAnswer);
      childrenToRemove = $(container).children().not(correctAnswer);
      // console.log(childrenToRemove);
      removeChild(container, correctAnswer, childrenToRemove);
      break;
    case 2:
      correctAnswer = $(container).children(".answer:nth-child(3)");
      // console.log(correctAnswer);
      childrenToRemove = $(container).children().not(correctAnswer);
      // console.log(childrenToRemove);
      removeChild(container, correctAnswer, childrenToRemove);
      break;
    case 3:
      correctAnswer = $(container).children(".answer:nth-child(2)");
      // console.log(correctAnswer);
      childrenToRemove = $(container).children().not(correctAnswer);
      // console.log(childrenToRemove);
      removeChild(container, correctAnswer, childrenToRemove);
      break;
    default:

  }
}

function removeChild(container, correctAnswer, childrenToRemove) {
  console.log(childrenToRemove);

  $(correctAnswer).css("background-color", "lightgreen");
  
  var relativeOffset = anime.timeline();

  relativeOffset
  .add({
    targets: childrenToRemove[0],
    opacity: 0,
    duration: 400,
    easing: 'easeOutExpo',
  })
  .add({
    targets: childrenToRemove[1],
    opacity: 0,
    duration: 400,
    easing: 'easeOutExpo',
    offset: '-=200' // Starts 600ms before the previous animation ends
  })
  .add({
    targets: childrenToRemove[2],
    opacity: 0,
    duration: 400,
    easing: 'easeOutExpo',
    offset: '-=400' // Starts 800ms before the previous animation ends
  })
  .add({
    targets: [childrenToRemove],
    display: 'none'
  });

  var promise = relativeOffset.finished.then(logFinished);

  function logFinished() {
    for (var i = 0; i < childrenToRemove.length; i++) {
      childrenToRemove[i].style.display = "none";
    }
  }

//   var JSarray = anime({
//   targets: [childrenToRemove],
//   display: 'none'
// });

}

function correctAnswer(el) {
  var container = el.parentNode;
  // console.log(container);
  var answers = container.children;
  console.log(answers);
  for (var i = 0; i < answers.length; i++) {
    // console.log(i + answers[i]);
    // console.log(i + container.children[i]);
    console.log("correct answer: " + i + container.children[i].classList.contains("correctAnswer"));
  }
}
