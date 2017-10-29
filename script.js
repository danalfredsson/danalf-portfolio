//global variables
var slidingText;
var video;
var windowWidth;
var windowHeight;
var quizStarted = false;
var currentScore = 0;
var quizClicks = 0;
var menuOpen = false;
var quiz = [{
    question: "Daniel lives in Malmö today, but where did he grow up?",
    alternatives: [
      "In the big city – Stockholm",
      "Trick question – Malmö",
      "Former crime city – Borlänge",
      "Swedens most southern town – Trelleborg"
    ],
    correct: 3,
    text: "Daniel grew up in the heart of Sweden – Dalarna. He can't think of a place more beautiful but god damn it's boring up there. So he moved to Malmö in 2014."
  },
  {
    question: "What particular area of interaction design is Daniel particularly interested in?",
    alternatives: [
      "User reasearch",
      "Web design & animations",
      "Iteration & prototyping",
      "Interactive art"
    ],
    correct: 2,
  },
  {
    question: "",
    answers: {
      1: "",
      2: "",
      3: "",
      4: ""
    }
  },
  {
    question: "",
    answers: {
      1: "",
      2: "",
      3: "",
      4: ""
    }
  }
];
var quizIndex = 0;
var quizAnswers;
var slideIndex = 0;
var videoPlay = false;

if (document.readyState != 'loading') {
  onDocumentReady();
} else {
  document.addEventListener('DOMContentLoaded', onDocumentReady);
}

// Page is loaded! Now event can be wired-up
function onDocumentReady() {
  console.log('Document ready.');

  // global variables
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  if (document.title == "Daniel Alfredsson") {
    console.log("Hej Daniel");
    slidingText = document.getElementById("slidingText");
    // slideText(slidingText);
    showSlides();
    window.addEventListener("resize", resize, false);
  }

  if (document.title == "About") {
    console.log("Hej About");
    // global variables
    video = document.getElementById("video");
    quizAnswers = document.getElementById("quizAnswers");
    videoWidth();
    createQuiz();
    video.addEventListener("click", pauseVideo, false);
    quizAnswers.addEventListener("click", clickedQuiz, false);
  }
}

//function that slides text
function slideText() {
  console.log("slidingText width: " + slidingText.scrollWidth);
  var scrollWidth = (slidingText.scrollWidth) - windowWidth;
  var pos = 0;
  var id = setInterval(moveText, 8);

  function moveText() {
    console.log("pos: " + pos);
    console.log("scrollWidth: " + scrollWidth);
    if (pos == scrollWidth) {
      clearInterval(id);
    } else {
      pos++;
      slidingText.style.marginLeft = "-" + pos + 'px';
    }
  }
}

//function that runs when quiz is clicked
function clickedQuiz(e) {
  var clickedItem;
  if (e.target !== e.currentTarget) {
    clickedItem = e.target;
    if (clickedItem.tagName === "P") {
      clickedItem = clickedItem.parentNode;
    }
    console.log("Clicked item " + clickedItem);
  }

  e.stopPropagation();

  $(clickedItem.parentNode.children).removeClass("grow");

  var child = clickedItem;
  var emoji;
  var i = 0;

  while ((child = child.previousSibling) != null) {
    i++;
  }

  if (i === quiz[quizIndex].correct) {
    console.log("yay, correct answer");
    console.log("clicked item nr: " + i);
    clickedItem.style.backgroundColor = "#74ecca";
    emoji = document.createElement("h2");
    emoji.classList.add("emoji");
    emoji.innerHTML = "👏";
    animateEmoji(emoji, clickedItem);
  } else {
    console.log("sorry, wrong answer");
    console.log("clicked item nr: " + i);
    clickedItem.style.backgroundColor = "orangered";
    emoji = document.createElement("h2");
    emoji.classList.add("emoji");
    emoji.innerHTML = "😞";
    animateEmoji(emoji, clickedItem);
  }
  addAboutText();
  console.log(quiz[quizIndex].text);
  quizAnswers.removeEventListener("click", clickedQuiz, false);
  quizIndex++;
}

function addAboutText() {
  var container = document.getElementById("aboutText");
  var textEl = document.createElement("span");
  textEl.innerHTML = quiz[quizIndex].text;
  container.appendChild(textEl);
}

//function that create quiz-question
function createQuiz() {
  console.log("running createQuiz...");
  //get the element containing the quiz-question and write question to it
  document.getElementById("quizQuestion").innerHTML = quiz[quizIndex].question;
  //get container to put alternatives in
  var answersContainer = document.getElementById("quizAnswers");

  //create as many answers as there are alternatives in the quiz-object for current index
  for (var i = 0; i < (quiz[quizIndex].alternatives.length); i++) {
    //create element, fill with text from quiz-object alternatives > append to container
    var answerContainer = document.createElement("div");
    $(answerContainer).addClass("answer grow");
    var answer = document.createElement("p");
    answer.innerHTML = quiz[quizIndex].alternatives[i];
    answersContainer.appendChild(answerContainer);
    answerContainer.appendChild(answer);
  }
}


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
  console.log(menuItems[0].attributes);

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

  if (menuOpen) {
    menuOpen = false;
    // remove children after fade out
    var promise = basicTimeline.finished.then(() => {
      for (var i = 0; i < menuItems.length; i++) {
        console.log("setting opacity of menu item " + (i + 1) + " to 0");
        menuItems[i].style.opacity = "0";
      }
    });
  } else if (!menuOpen) {
    menuOpen = true;
  }

}

//set the opacity of the menu back to 0
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
    menuItems[i].style.opacity = "0";
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
  if (document.title == "About") {
    if (windowWidth > 760) {
      video.width = "760";
    } else {
      console.log("resize windowWidth: " + windowWidth);
      video.width = windowWidth;
    }
  } else {
    console.log("docuement title: " + document.title + ", not 'About.'");
  }
}

//funtion som körs när sidan laddas och anger videobredd
function videoWidth() {
  console.log("running videoWidth");
  if (document.title == "About") {

  }
  video.width = windowWidth;
  if (windowWidth > 760) {
    video.width = "760";
  } else {
    video.width = windowWidth;
  }
}

//function that finds ancestor with specific class
// function findAncestor(el, cls) {
//   while ((el = el.parentElement) && !el.classList.contains(cls));
//   return el;
// }
//
// //function that checks answer for quiz
// function checkAnswer(el, x) {
//   //calculate x to get which quiz initiated + clicked answer
//   var question = Math.floor(x);
//   var answer = String(x).slice(-1);
//   correctAnswer = quiz.answers[(question)];
//   //console.log("answer: " + answer);
//   //console.log("correct answer: " + correctAnswer);
//
//   //clicked element, container to that element + element respresenting correct answer
//   var element = el;
//   var container = el.parentElement;
//   var quizContainer = findAncestor(element, "quizContainer");
//   console.log("quizContainer: " + quizContainer);
//   correctElement = $(container).children(".answer:nth-child(" + correctAnswer + ")");
//   //which chldren to remove
//   var childrenToRemove;
//   //correct answer
//   var correctElement;
//
//   $(container.children).removeClass("grow");
//
//   switch (question) {
//     case 1:
//       //turn off onclick on correct answer
//       $(correctElement).prop('onclick', null).off('click');
//       childrenToRemove = $(container).children().not(correctElement);
//       removeChild(container, correctElement, childrenToRemove);
//       if (answer == correctAnswer) {
//         var emoji = document.createElement("h2");
//         emoji.classList.add("emoji");
//         emoji.innerHTML = "👏";
//         animateEmoji(emoji, quizContainer);
//         quizScore(1, question, element);
//       } else {
//         var emoji = document.createElement("h2");
//         emoji.classList.add("emoji");
//         emoji.innerHTML = "😞";
//         animateEmoji(emoji, quizContainer);
//         quizScore(0, question, element);
//       }
//       break;
//     case 2:
//       //turn off onclick on correct answer
//       $(correctElement).prop('onclick', null).off('click');
//       childrenToRemove = $(container).children().not(correctElement);
//       removeChild(container, correctElement, childrenToRemove);
//       if (answer == correctAnswer) {
//         var emoji = document.createElement("h2");
//         emoji.classList.add("emoji");
//         emoji.innerHTML = "👏";
//         animateEmoji(emoji, quizContainer);
//         quizScore(1, question, element);
//       } else {
//         var emoji = document.createElement("h2");
//         emoji.classList.add("emoji");
//         emoji.innerHTML = "😞";
//         animateEmoji(emoji, quizContainer);
//         quizScore(0, question, element);
//       }
//       break;
//     case 3:
//       //turn off onclick on correct answer
//       $(correctElement).prop('onclick', null).off('click');
//       childrenToRemove = $(container).children().not(correctElement);
//       removeChild(container, correctElement, childrenToRemove);
//       if (answer == correctAnswer) {
//         var emoji = document.createElement("h2");
//         emoji.classList.add("emoji");
//         emoji.innerHTML = "👏";
//         animateEmoji(emoji, quizContainer);
//         quizScore(1, question, element);
//       } else {
//         var emoji = document.createElement("h2");
//         emoji.classList.add("emoji");
//         emoji.innerHTML = "😞";
//         animateEmoji(emoji, quizContainer);
//         quizScore(0, question, element);
//       }
//       break;
//     case 4:
//       //turn off onclick on correct answer
//       $(correctElement).prop('onclick', null).off('click');
//       childrenToRemove = $(container).children().not(correctElement);
//       removeChild(container, correctElement, childrenToRemove);
//       if (answer == correctAnswer) {
//         var emoji = document.createElement("h2");
//         emoji.classList.add("emoji");
//         emoji.innerHTML = "👏";
//         animateEmoji(emoji, quizContainer);
//         quizScore(1, question, element);
//       } else {
//         var emoji = document.createElement("h2");
//         emoji.classList.add("emoji");
//         emoji.innerHTML = "😞";
//         animateEmoji(emoji, quizContainer);
//         quizScore(0, question, element);
//       }
//       break;
//     default:
//       console.log("couldn't determine question for checkAnswer()");
//
//   }
// }

function animateEmoji(obj, container) {
  console.log(obj);
  container.appendChild(obj);

  var fadeOpac = anime({
    targets: obj,
    opacity: 1,
    scale: 1.5,
    translateY: -60,
    duration: 800
  });
  //remove children after fade out
  var promise = fadeOpac.finished.then(removeEmoji);

  function removeEmoji() {
    console.log("removing emoji...");
    obj.remove();
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

    //function that waits 400 millis and add to score
    window.setTimeout(function() {
      document.getElementById("currentScore").innerHTML = currentScore;
      // clickedElement.classList.add("correctAnswer");
      $(clickedElement).prop('onclick', null).off('click');
    }, 400);
  } else {
    el.classList.add("wrongAnswer");
    window.setTimeout(function() {
      document.getElementById("currentScore").innerHTML = currentScore;
      // clickedElement.classList.add("wrongAnswer");
    }, 400);
  }
}

//function that animates and removes quiz answers that aren't correct
function removeChild(container, correctElement, childrenToRemove) {
  console.log(childrenToRemove);
  console.log(correctElement);
  correctElement[0].classList.add("correctAnswer");
  //$(correctElement).css("background-color", "forest1green");

  var relativeOffset = anime.timeline();

  relativeOffset
    .add({
      targets: childrenToRemove[0],
      opacity: 0,
      duration: 400,
      easing: 'easeOutExpo'
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
    });

  //remove children after fade out
  var promise = relativeOffset.finished.then(logFinished);

  function logFinished() {
    for (var i = 0; i < childrenToRemove.length; i++) {
      childrenToRemove[i].style.display = "none";
    }
  }
}

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("work");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}
