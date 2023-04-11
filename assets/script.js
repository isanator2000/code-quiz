
// get elements
var intro = document.querySelector('.greeting');
var startButton = document.querySelector(".greeting button");
var main = document.querySelector(".quiz-end-score");
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
var questionIndex = 0
var score = 0

    

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
            { text: "Returns the length of a string", correct: false },
            { text: "Reverses the characters in a string", correct: false },
          ],
        },
        {
          question: "What is the result of the following code snippet: '3' * '4'?",
          answers: [
            { text: "7", correct: false },
            { text: "12", correct: true },
            { text: "'34'", correct: false },
            { text: "NaN", correct: false },
          ],
        },
    ];

  function startQuiz() {
        // hide the intro section
        intro.style.display = 'none';
      
        // show the quiz section
        main.style.display = 'block';
        questionBox.style.display ='block';
      
        // start the timer
        startTimer();
      
        // display the first question
        displayQuestion();
      }

    function startTimer() {
            var time = 300; // 5 minutes in seconds
            var timerElement = setInterval(function() {
              var minutes = Math.floor(time / 60);
              var seconds = time % 60;
              document.querySelector(".topbar p").textContent = `Timer ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
              time--;
          
              if (time < 0) {
                clearInterval(timerElement);
                endGame();
              }
            }, 1000);
          }
  
          function displayQuestion() {
            var currentQuestion = questions[questionIndex];
            questionText.innerText = currentQuestion.question;
            
            var answerButtons = document.querySelectorAll(".question-box button");
            answerButtons.innerHTML = "";
            
            for (var i = 0; i < currentQuestion.answers.length; i++) {
              var answer = currentQuestion.answers[i];
              var singleanswerButton = answerButtons[i];
              singleanswerButton.innerText = answer.text;
              singleanswerButton.classList.add("answer");
              if (answer.correct) {
                singleanswerButton.dataset.correct = true;
              }
              singleanswerButton.addEventListener("click", selectAnswer);
            }
          }
          
          function selectAnswer(event) {
            var selectedButton = event.target;
            var correct = selectedButton.dataset.correct;
            if (correct) {
              score++;
            } else {
              timerElement= -10;
            }
            if (questionIndex< questions.length - 1) {
              questionIndex++;
              displayQuestion();
            } else {
              endQuiz();
            }
          }

  function endQuiz() {
    // stop the timer, hide the quiz section, and show the ending section
        clearInterval(timerElement);
        questionBox.style.display = "none";
        endingSection.style.display = "block";
        scoreText.textContent = "Final score: " + score;
      }
  
  function saveScore() {
    // save the player's initials and score to local storage
        var initials = initialsInput.value.trim(); // remove leading/trailing white space
        if (initials === "") {
          alert("Please enter your initials to save your score.");
          return;
        }
        
        var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
        highScores.push({ initials: initials, score: score });
        highScores.sort(function(a, b) {
          return b.score - a.score; // sort scores in descending order
        });
        localStorage.setItem("highScores", JSON.stringify(highScores));
      }
  
  function showHighscores() {
    // retrieve the highscores from local storage and display them
            endingSection.style.display = "none";
            highScoresSection.style.display = "block";
  }
  
// event listeners
  startButton.addEventListener("click", startQuiz);
