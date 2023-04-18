
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
          "Document Object Model",
          "Data Object Manager",
          "Desktop Operating Mode", 
          "Data Object Model",
        ],
        correct: 0
      },
      {
        question: "Which of the following is NOT a primitive data type in JavaScript?",
        answers: [
          "string",
          "number",
          "boolean",
          "object",
        ],
        correct: 3
      },
      {
        question: "What is the result of the following code snippet: 5 + '3'?",
        answers: [
          "8",
          "53",
          "35",
          "NaN",
        ],
        correct: 1
      },
      {
          question: "What is the purpose of the 'var' keyword in JavaScript?",
          answers: [
            "It declares a function",
            "It declares a variable",
            "It declares an object", 
            "It declares a loop", 
          ],
          correct: 1
        },
        {
          question: "What does the method 'push' do in JavaScript arrays?",
          answers: [
            "Removes the first element",
            "Adds a new element to the end",
            "Adds a new element to the beginning",
            "Removes the last element",
          ],
          correct: 1
        },
        {
          question: "What is the output of the following code snippet: console.log(typeof NaN)?",
          answers: [
            "Number",
            "String",
            "Boolean",
            "Object",
          ],
          correct: 0
        },
        {
          question: "Which of the following is an example of a comparison operator in JavaScript?",
          answers: [
            "=",
            "==", 
            "===",
            "*", 
          ],
          correct: 2
        },
        {
          question: "What is the purpose of the 'if' statement in JavaScript?",
          answers: [
            "It declares a function",
            "It loops over an array",
            "It executes a block of code if a condition is true",
            "It removes an element from an array",
          ],
          correct: 2
        },
        {
          question: "What does the method 'toUpperCase' do in JavaScript?",
          answers: [
            "Converts a string to lowercase",
            "Converts a string to uppercase", 
            "Returns the length of a string",
            "Reverses the characters in a string",
          ],
          correct: 1
        },
        {
          question: "What is the result of the following code snippet: '3' * '4'?",
          answers: [
            "7",
            "12",
            "'34'",
            "NaN",
          ],
          correct: 1
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
              singleanswerButton.innerText = answer;
              singleanswerButton.classList.add("answer");
              if (answer.correct) {
                singleanswerButton.dataset.correct = true;
              }
              singleanswerButton.addEventListener("click", selectAnswer);
            }
          }
          
          function selectAnswer(event) {
            var selectedButton = event.target;
            var correct = currentQuestion[questionIndex].correct;
            if (selectedButton === correct) {
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
