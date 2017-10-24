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
var menuOpen = false;
var quizAnswers = {
  1: 1,
  2: 3,
  3: 3,
  4: 2
};

//function that toggles the menu
function toggleMenu(x) {
  x.classList.toggle("change");
  $("#barContainer").children().toggleClass("rainbowGradientAnimated");
  $("#barContainer").children().toggleClass("clipBox");
  document.getElementById("menu").classList.toggle("hidden");
  document.body.classList.toggle("noScroll");
  animateMenu();
}

function animateMenu() {
  var menuItems = $(".menuContainer").children();
  menuItems = $(menuItems).find("h2");
  console.log(menuItems);
  //get the children of the children
  var basicTimeline = anime.timeline();

basicTimeline
  .add({
    targets: menuItems[0],
    opacity: 1,
    duration: 100,
    easing: 'easeOutExpo'
  })
  .add({
    targets: menuItems[1],
    opacity: 1,
    duration: 100,
    easing: 'easeOutExpo'
  })
  .add({
    targets: menuItems[2],
    opacity: 1,
    duration: 100,
    easing: 'easeOutExpo'
  })
  .add({
    targets: menuItems[3],
    opacity: 1,
    duration: 100,
    easing: 'easeOutExpo'
  });

  console.log(menuOpen);

  if (menuOpen) {
    menuOpen = false;
    // remove children after fade out
    var promise = basicTimeline.finished.then(()=>{
      for (var i = 0; i < menuItems.length; i++) {
        console.log("opacity");
        menuItems[i].style.opacity = "0";
      }
    });
  } else if (!menuOpen) {
    menuOpen = true;
  }

}

//set th eopacity of the menu back to 0
function setOpacity() {
  for (var i = 0; i < menuItems.length; i++) {
    console.log("opacity");
    menuItems[i].style.opacity = "0";
  }
}

//function that closes menu after clicking link
function closeMenu() {
  document.getElementById("barContainer").classList.toggle("change");
  $("#barContainer").children().toggleClass("rainbowGradientAnimated");
  $("#barContainer").children().toggleClass("clipBox");
  document.getElementById("menu").classList.toggle("hidden");
  document.body.classList.toggle("noScroll");
  var menuItems = $(".menuContainer").children();
  menuItems = $(menuItems).find("h2");
  console.log(menuItems);
  for (var i = 0; i < menuItems.length.length; i++) {
    menuItems[i].style.opacity  = "0";
    menuOpen = false;
  }
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
  //clicked element + container
  var element = el;
  var container = el.parentElement;
  //which chldren to remove
  var childrenToRemove;
  //correct answer
  var correctElement;

  $(container.children).removeClass("grow");

  switch (question) {
    case 1:
      correctAnswer = quizAnswers[(question)];
      correctElement = $(container).children(".answer:nth-child(" + correctAnswer + ")");
      console.log(correctElement);
      $(correctElement).prop('onclick',null).off('click');
      childrenToRemove = $(container).children().not(correctElement);
      // console.log(childrenToRemove);
      removeChild(container, correctElement, childrenToRemove);
      if (answer == correctAnswer) {
        quizScore(1, question, element);
      } else {
        quizScore(0, question, element);
      }
      break;
    case 2:
      correctAnswer = quizAnswers[(question)];
      correctElement = $(container).children(".answer:nth-child(" + correctAnswer + ")");
      $(correctElement).prop('onclick',null).off('click');
      // console.log(correctElement);
      childrenToRemove = $(container).children().not(correctElement);
      // console.log(childrenToRemove);
      removeChild(container, correctElement, childrenToRemove);
      if (answer == correctAnswer) {
        quizScore(1, question, element);
      } else {
        quizScore(0, question, element);
      }
      break;
    case 3:
      correctAnswer = quizAnswers[(question)];
      correctElement = $(container).children(".answer:nth-child(" + correctAnswer + ")");
      $(correctElement).prop('onclick',null).off('click');
      // console.log(correctElement);
      childrenToRemove = $(container).children().not(correctElement);
      // console.log(childrenToRemove);
      removeChild(container, correctElement, childrenToRemove);
      if (answer == correctAnswer) {
        quizScore(1, question, element);
      } else {
        quizScore(0, question, element);
      }
      break;
    case 4:
      correctAnswer = quizAnswers[(question)];
      correctElement = $(container).children(".answer:nth-child(" + correctAnswer + ")");
      $(correctElement).prop('onclick',null).off('click');
      // console.log(correctElement);
      childrenToRemove = $(container).children().not(correctElement);
      // console.log(childrenToRemove);
      removeChild(container, correctElement, childrenToRemove);
      console.log("answer: " + answer);
      if (answer == correctAnswer) {
        quizScore(1, question, element);
      } else {
        quizScore(0, question, element);
      }
      break;
    default:

  }
}

//function that create score for quiz
function quizScore(correct, nr, el) {
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
    // console.log(clickedElement);
    // clickedElement.onclick = null;
    //function that waits 400 millis and add to score
    window.setTimeout(function() {
      document.getElementById("currentScore").innerHTML = currentScore;
      clickedElement.classList.add("correctAnswer");
      $(clickedElement).prop('onclick',null).off('click');
    }, 400);
    // console.log(scores);
    // console.log(clickedElement);
  }
  else {
    el.classList.add("wrongAnswer");
    window.setTimeout(function() {
      document.getElementById("currentScore").innerHTML = currentScore;
      clickedElement.classList.add("wrongAnswer");
    }, 400);
  }
}

//function that animates and removes quiz answers that aren't correct
function removeChild(container, correctElement, childrenToRemove) {
  console.log(childrenToRemove);

  $(correctElement).css("background-color", "forest1green");

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

  // remove children after fade out
  var promise = relativeOffset.finished.then(logFinished);

  function logFinished() {
    for (var i = 0; i < childrenToRemove.length; i++) {
      childrenToRemove[i].style.display = "none";
    }
  }

}
