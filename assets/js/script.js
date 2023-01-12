document.addEventListener('DOMContentLoaded', (event) => {

	//variables used
	const initialTime = 100;
	let time = 100;
	let score = 0;
	let questionCount = 0;
	let timeset;
	let answers = document.querySelectorAll('#quizSection button');


	let recordsArray = [];
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
 //records highScore
	let recordsHtmlReset = () => {
		queryElement('#highScores div').innerHTML = "";
		var i = 1;
		recordsArray.sort((a, b) => b.score - a.score);
		Array.from(recordsArray).forEach(check =>
		{
			var scores = document.createElement("div");
			scores.innerHTML = i + ". " + check.initialRecord + " - " + check.score;
			queryElement('#highScores div').appendChild(scores);
			i = i + 1
		});
		i = 0;
		Array.from(answers).forEach(answer => {
			answer.classList.remove('disable');
		});
	}

//This will allow you to filter through the questions
	let setQuestionData = () => {
		queryElement('#quizSection p').innerHTML = questions[questionCount].question;
		queryElement('#quizSection button:nth-of-type(1)').innerHTML = `1. ${questions[questionCount].options[0]}`;
		queryElement('#quizSection button:nth-of-type(2)').innerHTML = `2. ${questions[questionCount].options[1]}`;
		queryElement('#quizSection button:nth-of-type(3)').innerHTML = `3. ${questions[questionCount].options[2]}`;
		queryElement('#quizSection button:nth-of-type(4)').innerHTML = `4. ${questions[questionCount].options[3]}`;
	}

	let quizUpdate = (answerCopy) => {
		queryElement('#scoreIndicator p').innerHTML = answerCopy;
		queryElement('#scoreIndicator').classList.remove('invisible', scoreIndicator());
		Array.from(answers).forEach(answer =>
		{
			answer.classList.add('disable');
		});

		//returns the a score of correct questions
		setTimeout(() => {
			if (questionCount === questions.length) {
				onlyDisplaySection("#complete");
				time = 0;
				queryElement('#time').innerHTML = time;
			} else {
				setQuestionData();
				Array.from(answers).forEach(answer => {
					answer.classList.remove('disable');
				});
			}
		}, 1000);
	}

	let myTimer = () => {
		if (time > 0) {
			time = time - 1;
			queryElement('#time').innerHTML = time;
		} else {
			clearInterval(clock);
			queryElement('#score').innerHTML = score;
			onlyDisplaySection("#complete");
		}
	}
//begins quiz
	let clock;
	queryElement(".start-quiz").addEventListener("click", (e) => {
		setQuestionData();
		onlyDisplaySection("#quizSection");
		clock = setInterval(myTimer, 1000);
	});

	let scoreIndicator = () => {
		clearTimeout(timeset);
		timeset = setTimeout(() => {
		    queryElement('#scoreIndicator').classList.add('invisible');
		}, 1000);
	}
//rule for what happens if an answer is right or wrong
	Array.from(answers).forEach(check => {
		check.addEventListener('click', function (event) {
			if (this.innerHTML.substring(3, this.length) === questions[questionCount].answer) {
				score = score + 1;
				questionCount = questionCount + 1;
				quizUpdate("Correct");
			}else{
				time = time - 10;
				questionCount = questionCount + 1;
				quizUpdate("Wrong");
			}
		});
	});

	//set expectations for inserting intials
	queryElement("#records button").addEventListener("click", () => {
		let initialsRecord = queryElement('#initials').value;
		if (initialsRecord === ''){
			queryElement('#errorIndicator p').innerHTML = "You need at least 1 character";
			queryElement('#errorIndicator').classList.remove('invisible', errorIndicator());
			queryElement('#errorIndicator').classList.remove('invisible', errorIndicator());
		} else {
			recordsArray.push({
				"initialRecord": initialsRecord,
				"score": score
			});
			localStorage.setItem('recordsArray', JSON.stringify(recordsArray));
			queryElement('#highScores div').innerHTML = '';
			onlyDisplaySection("#highScores");
			recordsHtmlReset();
			queryElement("#initials").value = '';
		}
	});

	queryElement("#clearScores").addEventListener("click", () => {
		recordsArray = [];
		queryElement('#highScores div').innerHTML = "";
		localStorage.removeItem('recordsArray');
	});

	queryElement("#reset").addEventListener("click", () => {
		time = initialTime;
		score = 0;
		questionCount = 0;
		onlyDisplaySection("#main-font");
	});

	queryElement("#scores").addEventListener("click", (e) => {
		e.preventDefault();
		clearInterval(clock);
		queryElement('#time').innerHTML = 0;
		time = initialTime;
		score = 0;
		questionCount = 0;
		onlyDisplaySection("#highScores");
		recordsHtmlReset();
	});

});

//Quiz Questions
var questions = [
    {
      question: "Inside which HTML element do we put the JavaScript?",
      options: ["script", "js", "javascript", "scripting"],
      answer: "script"
    },
    {
      question: "How can you add a comment in a JavaScript?",
      options: ["*!this is a comment--*", "//This is a comment", "'This is a comment", "$This is a comment"],
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
	{
	  question: "How does a FOR loop start?",
	  options: ["for (i=0; i <=5; i++)","for (i <=5; i++)", "for i=1 to 5", "for (i=0; i<=5)"],
	  answer: "for (i=0; i <=5; i++)"
	},
  ];