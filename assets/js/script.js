document.addEventListener('DOMContentLoaded', (event) => {
// Initial variables
const initialTime = 75;
let time = 75;
let score = 0;
let questionCount = 0;
let timeset;
let answers = document.querySelectorAll('#quizSection button')

//Sets array then if local storage exists it populates it into the array of records.
let recordsArray = [];
// Retrieve data if it exists or keep empty array otherwise.
(localStorage.getItem('recordsArray')) ? recordsArray = JSON.parse(localStorage.getItem('recordsArray')): recordsArray = [];

let queryElement = (element) => {
  return document.querySelector(element);
}

let onlyDisplaySection = (element) => {
  let sections = document.querySelectorAll("section");
  Array.from(sections).forEach((userItem) => {
    userItem.classList.add('hide');
  });
  queryElement(element).classList.remove('hide');
}

//var startQuizBtn = document.querySelector('.start-quiz');
//var highScore = document.querySelector('.high-score');
//var timeElement = document.querySelector('#timer');

//Quiz Questions
var questions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    options: ["<script>", "<js>", "<javascript>", "<scripting>"],
    answer: "<script>"
  },
  {
    question: "How does a FOR loop start?",
    options: ["for (i <=5; i++)", "for i=1 to 5", "for (i=0; i <=5; i++)", "for (i=0; i<=5)"],
    answer: "for (i=0; i <=5; i++)"
  },
  {
    question: "How can you add a comment in a JavaScript?",
    options: ["<!this is a comment-->", "//This is a comment", "'This is a comment", "$This is a comment"],
    answer: "//This is a comment"
  },
  {
    question: "What is the correct way to write a JavaScript array?",
    options: ["var colors = {'red', 'green', 'blue'}", "var colors = ['red', 'green', 'blue']", "var colors = 'red', 'green', 'blue'", "var colors = ['1=red', '2=green', '3=blue']"],
    answer: "var colors = ['red', 'green', 'blue']"
  },
  {
    question: "How do you find the number with the highest value of x and y?",
    options: ["Math.ceil(x,y)", "top(x,y)", "ceil(x,y)", "Math.max(x,y)"],
    answer: "Math.max(x,y)"
  },
];

let setQuestionData = () => {
  queryElement('#quizSection p').innerHTML = questions[questionCount].question;
  queryElement('#quizSection button:nth-of-type(1)').innerHTML = `1. ${questions[questionCount].options[0]}`;
}


/*function countdown() {
  var startTime = 75;
  var timeInterval = setInterval(function () {
      startTime--; {
      timeElement.textContent = 'Time: ' + startTime;

    }
  }, 1000)*/
}
})