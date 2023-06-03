
var start = document.querySelector("#start");
var startButton = document.querySelector("#startButton");
var startPage =document.querySelector("#startPage");

var questionSection = document.querySelector("#questionSection");
var currentQuestion = document.querySelector("#currentQuestion");

var answerButtons = document.querySelectorAll(".answer");
var answer1 = document.querySelector("#answer1");
var answer2 = document.querySelector("#answer2");
var answer3 = document.querySelector("#answer3");
var answer4 = document.querySelector("#answer4");

var evaluation = document.querySelector("#evaluation");
var endPage = document.querySelector("#endPage");
var endScore = document.querySelector("#endScore");
var nickname =document.querySelector("#nickname");

var submitButton =document.querySelector("#submitButton");
var highscoresPage =document.querySelector("#highscoresPage");
var highestScores =document.querySelector("#highestScores");
var viewHighscores =document.querySelector("#viewHighscores");
var finish =document.querySelector("#finish");

var returnButton =document.querySelector("#returnButton");
var clearButton=document.querySelector("#clearButton");

var timeLeft = document.getElementById("timer");

var secondsLeft = 60;
var questionNumber = 0;
var totalScore = 0;
var questionCount = 1;

// question data

  var questions = [
    {
        question: "Question 1 : What does the acronym 'DOM' stand for in JavaScript?",
        choices: ["a. Document Object Model", "b. Data Object Manager", "c. Desktop Operating Mode", "d. Data Object Model"],
        answer: "a"
    },
    {
      question: "Question 2 : Which of the following is NOT a primitive data type in JavaScript?",
      choices: ["a. string", "b. number", "c. boolean", "d. object"],
      answer: "d"
    },
    {
      question: "What is the result of the following code snippet: 5 + '3'?",
      choices: ["a. 8", "b. 53", "c. 35", "d. NaN"],
      answer: "b"
    },
    {
      question: "What is the purpose of the 'var' keyword in JavaScript?",
      choices: ["a. It declares a function", "b. It declares a variable", "c. It declares an object", "d. It declares a loop"],
      answer: "b"
    },
    {
      question: "What does the method 'push' do in JavaScript arrays?",
      choices: ["a. Removes the first element", "b. Adds a new element to the end", "c. Adds a new element to the beginning", "d. Removes the last element"],
      answer: "b"
    },
    {
      question: "What is the output of the following code snippet: console.log(typeof NaN)?",
      choices: ["a. Number", "b. String", "c. Boolean", "d. Object"],
      answer: "a"
    },
    {
      question: "Which of the following is an example of a comparison operator in JavaScript?",
      choices: ["a. =", "b. ==", "c. ===", "d. *"],
      answer: "c"
    },
    {
      question: "What is the purpose of the 'if' statement in JavaScript?",
      choices: ["a. It declares a function", "b. It loops over an array", "c. It executes a block of code if a condition is true", "d.It removes an element from an array"],
      answer: "c"
    },
    {
      question: "What does the method 'toUpperCase' do in JavaScript?",
      choices: ["a. Converts a string to lowercase", "b. Converts a string to uppercase", "c. Returns the length of a string", "d.Reverses the characters in a string"],
      answer: "b"
    },
    {
      question: "What is the result of the following code snippet: '3' * '4'?",
      choices: ["a. 7", "b. 12", "c. '34'", "d. Nan"],
      answer: "b"
    },
];

function countdown() {
        
  var timerInterval = setInterval(function () {

    secondsLeft--;
    timeLeft.textContent = "Time left: " + secondsLeft + "seconds";

      if (secondsLeft <= 0){
          clearInterval(timerInterval);
          timeLeft.textContent = "Time's up"; 
          finish.textContent = "Time's up";
          gameOver();

      } else  if(questionCount >= questions.length +1) {
          clearInterval(timerInterval);
          gameOver();
          } 
}, 1000);
}

function startQuiz () {
  startPage.style.display = "none";
  questionSection.style.display = "block";
  questionNumber = 0
  countdown();
  showQuestion(questionNumber);
}

function showQuestion (n) {
  currentQuestion.textContent = questions[n].question;
  answer1.textContent = questions[n].choices[0];
  answer2.textContent = questions[n].choices[1];
  answer3.textContent = questions[n].choices[2];
  answer4.textContent = questions[n].choices[3];
  questionNumber = n;
}

function checkAnswer(event) {
event.preventDefault();
evaluation.style.display = "block";
setTimeout(function () {
  evaluation.style.display = 'none';
}, 1000);

if (questions[questionNumber].answer == event.target.value) {
  evaluation.textContent = "Correct"; 
  totalScore = totalScore + 1;

} else {
  secondsLeft = secondsLeft - 10;
  evaluation.textContent = "Wrong, the right answer is " + questions[questionNumber].answer + ".";
}
if (questionNumber < questions.length -1 ) {
  showQuestion(questionNumber +1);
} else {
gameOver();
}
questionCount++;
}
function gameOver() {

  questionSection.style.display = "none";
  endPage.style.display = "block";
  console.log(endPage);
  endScore.textContent = "Your final score is :" + totalScore ;
  timeLeft.style.display = "none"; 
};

function getScore () {
var currentList =localStorage.getItem("ScoreList");
if (currentList !== null ){
  freshList = JSON.parse(currentList);
  return freshList;
} else {
  freshList = [];
}
return freshList;
};


function renderScore () {
highestScores.innerHTML = "";
highestScores.style.display ="block";
var highScores = sort();   
var topFive = highScores.slice(0,5);
for (var i = 0; i < topFive.length; i++) {
  var item = topFive[i];
var li = document.createElement("li");
li.textContent = item.user + " - " + item.score;
li.setAttribute("data-index", i);
highestScores.appendChild(li);
}
};

function sort () {
var unsortedList = getScore();
if (getScore == null ){
  return;
} else{
unsortedList.sort(function(a,b){
  return b.score - a.score;
})
return unsortedList;
}};

function addItem (n) {
var addedList = getScore();
addedList.push(n);
localStorage.setItem("ScoreList", JSON.stringify(addedList));
};

function saveScore () {
var scoreItem ={
  user: nickname.value,
  score: totalScore
}
addItem(scoreItem);
renderScore();
}

/* event listeners*/
startButton.addEventListener("click", startQuiz);

answerButtons.forEach(function(click){

click.addEventListener("click", checkAnswer);
});

submitButton.addEventListener("click", function(event) {
event.preventDefault();
endPage.style.display = "none";
startPage.style.display = "none";
highscoresPage.style.display = "block";
questionSection.style.display ="none";
saveScore();
});

viewHighscores.addEventListener("click", function(event) {
event.preventDefault();
endPage.style.display = "none";
startPage.style.display = "none";
highscoresPage.style.display = "block";
questionSection.style.display ="none";
renderScore();
});

returnButton.addEventListener("click",function(event){
  event.preventDefault();
  endPage.style.display = "none";
  startPage.style.display = "block";
  highscoresPage.style.display = "none";
  questionSection.style.display ="none";
  location.reload();
});

clearButton.addEventListener("click",function(event) {
event.preventDefault();
localStorage.clear();
renderScore();
});