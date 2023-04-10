
var currentQuestion = 0;
var timeLeft = 75;
var timerInterval;
var score = 0;
var quizDone = false;
var highscores = [];

// get elements
var startButton = document.querySelector(".greeting button");
var questionBox = document.querySelector(".question-box");
var questionText = document.querySelector(".question-box h2");
var answerButtons = document.querySelectorAll(".question-box button");
var endingSection = document.querySelector(".ending");
var scoreText = document.querySelector(".ending p");
var initialsInput = document.querySelector(".ending input");
var highscoresSection = document.querySelector(".highscores");
var highscoresList = document.querySelector(".highscores ol");
var viewHighscoresButton = document.querySelector(".topbar button:first-of-type");
    var timerElement = document.querySelector(".topbar p");
    

// question data
var questions = [
    {
        question: "What does the acronym 'DOM' stand for in JavaScript?",
        answers: [
          { text: "Document Object Model", correct: true },
          { text: "Data Object Manager", correct: false },
          { text: "Desktop Operating Mode", correct: false },
          { text: "Data Object Model", correct: false },
        ],
      },
      {
        question: "Which of the following is NOT a primitive data type in JavaScript?",
        answers: [
          { text: "string", correct: false },
          { text: "number", correct: false },
          { text: "boolean", correct: false },
          { text: "object", correct: true },
        ],
      },
      {
        question: "What is the result of the following code snippet: 5 + '3'?",
        answers: [
          { text: "8", correct: false },
          { text: "53", correct: true },
          { text: "35", correct: false },
          { text: "NaN", correct: false },
        ],
      },
      {
          question: "What is the purpose of the 'var' keyword in JavaScript?",
          answers: [
            { text: "It declares a function", correct: false },
            { text: "It declares a variable", correct: true },
            { text: "It declares an object", correct: false },
            { text: "It declares a loop", correct: false },
          ],
        },
        {
          question: "What does the method 'push' do in JavaScript arrays?",
          answers: [
            { text: "Removes the first element", correct: false },
            { text: "Adds a new element to the end", correct: true },
            { text: "Adds a new element to the beginning", correct: false },
            { text: "Removes the last element", correct: false },
          ],
        },
        {
          question: "What is the output of the following code snippet: console.log(typeof NaN)?",
          answers: [
            { text: "Number", correct: true },
            { text: "String", correct: false },
            { text: "Boolean", correct: false },
            { text: "Object", correct: false },
          ],
        },
        {
          question: "Which of the following is an example of a comparison operator in JavaScript?",
          answers: [
            { text: "=", correct: false },
            { text: "==", correct: false },
            { text: "===", correct: true },
            { text: "*", correct: false },
          ],
        },
        {
          question: "What is the purpose of the 'if' statement in JavaScript?",
          answers: [
            { text: "It declares a function", correct: false },
            { text: "It loops over an array", correct: false },
            { text: "It executes a block of code if a condition is true", correct: true },
            { text: "It removes an element from an array", correct: false },
          ],
        },
        {
          question: "What does the method 'toUpperCase' do in JavaScript?",
          answers: [
            { text: "Converts a string to lowercase", correct: false },
            { text: "Converts a string to uppercase", correct: true },
            { text: "Returns the length of a string", correct: true },
            { text: "Reverses the characters in a string", correct: false },
          ],
        },
        {
          question: "What is the result of the following code snippet: '3' * '4'?",
          answers: [
            { text: "7", correct: false },
            { text: "12", correct: true },
            { text: "'34'", correct: true },
            { text: "NaN", correct: false },
          ],
        },
    ];

// start quiz
function startQuiz() {
  startTimer();
  showQuestion();
}

// start timer
function startTimer() {
  timerInterval = setInterval(function() {
    timeLeft--;
    timerElement.textContent = "Timer " + formatTimeLeft(timeLeft);
    if (timeLeft === 0 || quizDone) {
      endQuiz();
    }
  }, 1000);
}

// format time left
function formatTimeLeft(time) {
  var minutes = Math.floor(time / 60);
  var seconds = time % 60;
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return minutes + ":" + seconds;
}

// show question
function showQuestion() {
    // Display the question
    questionBox.style.display = "block";
    questionText.textContent = questions[currentQuestion].question;
  
        // Display the question
        questionBox.style.display = "block";
        questionText.textContent = questions[currentQuestion].question;
    
        // Loop through the answer buttons and display the answer text
        for (var i = 0; i < answerButtons.length; i++) {
            answerButtons[i].textContent = questions[currentQuestion].answers[i].text;
    
            // Add an event listener to the answer button
            answerButtons[i].addEventListener("click", function() {
                // Check if the answer is correct
                if (questions[currentQuestion].answers[i].correct) {
                    score++;
                } else {
                    timeLeft -= 10;
                }
    
                // Move on to the next question
                currentQuestion++;
                if (currentQuestion < questions.length) {
                    showQuestion();
                } else {
                    endQuiz();
                }
            });
        }
    }

    // Loop through the answer buttons and display the answer choices
    for (var i = 0; i < answerButtons.length; i++) {
      answerButtons[i].textContent = questions[currentQuestion].answers[i].text;
      answerButtons[i].dataset.correct = questions[currentQuestion].answers[i].correct;
    }

// check answer
function checkAnswer(event) {
  if (event.target.textContent === questions[currentQuestion].correctAnswer) {
    score++;
  } else {
    timeLeft -= 10;
  }
  currentQuestion++;
  if (currentQuestion === questions.length) {
    endQuiz();
  } else {
    showQuestion();
  }
}

// end quiz
function endQuiz() {
  quizDone = true;
  clearInterval(timerInterval);
  questionBox.style.display = "none";
  endingSection.style.display = "block";
  scoreText.textContent = "Your score is " + score;
}

// save high score
function saveHighScore(event) {
event.preventDefault();
var initials = initialsInput.value.trim();
if (initials !== "") {
  var highscore = {
    initials: initials,
    score: score
  };
  highscores.push(highscore);
  highscores.sort(function(a, b) {
    return b.score - a.score;
  });
  localStorage.setItem("highscores", JSON.stringify(highscores));} }

// event listeners
  startButton.addEventListener("click", startQuiz);
