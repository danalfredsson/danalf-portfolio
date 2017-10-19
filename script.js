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
var quizStarted = false;
var currentScore = 0;
var quizClicks = 0;

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
  document.body.classList.toggle("noScroll");
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

  //calculate x to get which quiz initiated + clicked answer
  var question = Math.floor(x);
  var answer = String(x).slice(-1);
  console.log("answer: " + answer);
  //clicked element container
  var container = el.parentElement;
  //which chldren to remove
  var childrenToRemove;
  //correct answer
  var correctElement;

  $(container.children).removeClass("grow");

  switch (question) {
    case 1:
      correctAnswer = 1;
      correctElement = $(container).children(".answer:nth-child(" + correctAnswer + ")");
      console.log(correctElement);
      childrenToRemove = $(container).children().not(correctElement);
      // console.log(childrenToRemove);
      removeChild(container, correctElement, childrenToRemove);
      if (answer == correctAnswer) {
        quizScore(1, question);
      } else {
        quizScore(0, question);
      }
      break;
    case 2:
      correctAnswer = 3;
      correctElement = $(container).children(".answer:nth-child(" + correctAnswer + ")");
      // console.log(correctElement);
      childrenToRemove = $(container).children().not(correctElement);
      // console.log(childrenToRemove);
      removeChild(container, correctElement, childrenToRemove);
      if (answer == correctAnswer) {
        quizScore(1, question);
      } else {
        quizScore(0, question);
      }
      break;
    case 3:
      correctAnswer = 3;
      correctElement = $(container).children(".answer:nth-child(" + correctAnswer + ")");
      // console.log(correctElement);
      childrenToRemove = $(container).children().not(correctElement);
      // console.log(childrenToRemove);
      removeChild(container, correctElement, childrenToRemove);
      if (answer == correctAnswer) {
        quizScore(1, question);
      } else {
        quizScore(0, question);
      }
      break;
    case 4:
      correctAnswer = 2;
      correctElement = $(container).children(".answer:nth-child(" + correctAnswer + ")");
      // console.log(correctElement);
      childrenToRemove = $(container).children().not(correctElement);
      // console.log(childrenToRemove);
      removeChild(container, correctElement, childrenToRemove);
      console.log("answer: " + answer);
      if (answer == correctAnswer) {
        quizScore(1, question);
      } else {
        quizScore(0, question);
      }
      break;
    default:

  }
}

//function that create score for quiz
function quizScore(correct, nr) {
  //check if this is first question answered
  if (quizStarted === false) {
    var score = document.getElementById("scoreContainer");
    quizStarted = true;
    if (score.classList.contains("hidden")) {
      score.classList.remove("hidden");
    }
  }
  console.log("correct:" + correct);
  var scores = document.querySelectorAll("#score .score");
  nr = nr - 1;
  var clickedElement = scores[(nr)];

  if (correct == 1) {
    console.log("adding to score");
    currentScore++;
    console.log(currentScore);
    //function that waits 400 millis and add to score
    window.setTimeout(function() {
      document.getElementById("currentScore").innerHTML = currentScore;
      clickedElement.classList.add("correctAnswer");
    }, 400);
    console.log(scores);
    console.log(clickedElement);
  }
  else {
    window.setTimeout(function() {
      document.getElementById("currentScore").innerHTML = currentScore;
      clickedElement.classList.add("wrongAnswer");
    }, 400);
  }
}

//function that animates and removes quiz answers that aren't correct
function removeChild(container, correctElement, childrenToRemove) {
  console.log(childrenToRemove);

  $(correctElement).css("background-color", "lightgreen");

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

  // REMOVE CHILDREN AFTER FADING OUT
  var promise = relativeOffset.finished.then(logFinished);

  function logFinished() {
    for (var i = 0; i < childrenToRemove.length; i++) {
      childrenToRemove[i].style.display = "none";
    }
  }

}
