//Setup the HTML and Style
// #gameDisplay create the divs and then apply the css to them. The game execution updates the content.
$('#gameDisplay').append("<div id='gameTitle' class='text-center'><h1>Play Trivia!</h1></div>");
$('#gameDisplay').append("<div class='row'><div id='gameIncorrect' class='col-md-4 text-right'></div><div id='gameTimeRemaining' class='col-md-4 text-center'></div><div id='gameCorrect' class='col-md-4 text-left'></div>");
$('#gameDisplay').append("<div id='gameQuestionDisplay' class='text-center'></div>");
$('#gameDisplay').append("<div id='gameMessage' class='text-center'>Game will start automatically.</div>");
$('#gameDisplay').append("<div id='gameChoicesDisplay' class='text-center'></div>");
$('#gameChoicesDisplay').append("<button id='gameButton1' class='gameAnswerButton' value='1'></button>");
$('#gameChoicesDisplay').append("<button id='gameButton2' class='gameAnswerButton' value='2'></button>");
$('#gameChoicesDisplay').append("<button id='gameButton3' class='gameAnswerButton' value='3'></button>");
$('#gameChoicesDisplay').append("<button id='gameButton4' class='gameAnswerButton' value='4'></button>");
$('#gameChoicesDisplay').append("<button id='gameButton0' class='gameAnswerButton' value='0' disabled></button>");
$('.gameAnswerButton').hide();
// apply CSS
$('*').css({"font-family": "Audiowide, cursive"});
$('#gameTitle').css({"color": "blue", "background-color": "lightblue", "border": "solid 9px blue", "padding": "18px"});
$('#gameIncorrect').css({"color": "black", "font-size": "22px", "margin-top": "28px", "height": "36px"});
$('#gameTimeRemaining').css({"color": "red", "font-size": "24px", "margin-top": "28px", "height": "36px"});
$('#gameCorrect').css({"color": "black", "font-size": "22px", "margin-top": "28px", "height": "36px"});
$('#gameQuestionDisplay').css({"color": "black", "margin-top": "28px", "font-size": "28px", "font-weight": "bold", "padding": "18px"});
$('#gameMessage').css({"color": "darkblue", "font-size": "28px", "height": "56px", "margin": "12px"});
$('#gameChoicesDisplay').css({"color": "blue", "font-size": "24px", "width": "66%", "margin":"auto"});
$('.gameAnswerButton').css({"padding": "12px", "margin": "6px", "width": "100%"});

//global game variables
var timerDisplay = 6; //countdown will start at 5
var counterCorrect = 0; //questions answered correctly
var counterIncorrect = 0; //questions answered incorrectly
var counterQuestion = 0; //keep track through array of questions
var gameQuestionToDisplay = ""; //will be the displayed question
var gameCorrectAnswer = ""; //will be the correct answer for question
var gameQuestionType = ""; //will be multiple or boolean (multiple choice / true and false)
var gameAnswers = []; //will be an array of incorrect answers
var booleanLastQuestion = false; //used to test completion of questions
// gameQuestionsAvailable[] is in app0.js

//following will display ready...set...go!!! before the game starts
window.onload = function() {
	gameDisplayStartMessages()
}

function gameDisplayStartMessages() {
	setTimeout(gameStartMessage1,1000*2);
	setTimeout(gameStartMessage2,1000*3);
	setTimeout(gameStartMessage3,1000*4);
	setTimeout(gameStart,1000*5);
}

function gameStartMessage1() {
	$('#gameMessage').html("Ready...");
}

function gameStartMessage2() {
	$('#gameMessage').html("Set...");
}

function gameStartMessage3() {
	$('#gameMessage').html("Go!!!");
}

function gameTimerStop() {
	clearInterval(intervalId);
	$('#gameTimeRemaining').html("");
}

function gameTimerStart() {
	//update time remaining every second
	intervalId = setInterval(gameCountdown, 1000);
}

function gameCountdown() {
	//every second countdown the timer
	timerDisplay --;
	$('#gameTimeRemaining').html(timerDisplay);
	//if timer runs out, send to incorrect function
	if (timerDisplay === 0) {
		gameTimerStop();
		gameAnswerIncorrect(false); //answer not incorrect - just timed out
	}
}

function gameStart () {
	//clear game message and hide correct answer
	$('#gameMessage').html("");
	$('#gameButton0').hide(); //correct answer

	//Get data from the next question in array 
	gameQuestionToDisplay = gameQuestionsAvailable[counterQuestion].question;
	gameCorrectAnswer = gameQuestionsAvailable[counterQuestion].correct_answer;
	gameQuestionType = gameQuestionsAvailable[counterQuestion].type;
	gameAnswers = gameQuestionsAvailable[counterQuestion].incorrect_answers;

	//randomly insert correct answer into list of choices
	if (gameQuestionType == "multiple") {
		gameCorrectAnswerIndex = Math.floor((Math.random() * 4));
	} else {
		//else true and false
		gameCorrectAnswerIndex = Math.floor((Math.random() * 2));
		};
	//insert into indexed position
	gameAnswers.splice(gameCorrectAnswerIndex, 0, gameCorrectAnswer);

// console.log(gameCorrectAnswerIndex + " " + gameAnswers);

	//prepare for next question - this funcion not used if at end of array
	counterQuestion++;
	booleanLastQuestion = counterQuestion == gameQuestionsAvailable.length;
	//display the question selected
	displayNextQuestion();
	timerDisplay = 6;
	gameTimerStart();
}

function displayNextQuestion () {
	$('#gameTimeRemaining').html(5);
	$('#gameQuestionDisplay').html(gameQuestionToDisplay);
	$('#gameButton1').show();
	$('#gameButton1').text(gameAnswers[0]);
	$('#gameButton2').show();
	$('#gameButton2').text(gameAnswers[1]);
	if (gameQuestionType == "multiple") {
		$('#gameButton3').show();
		$('#gameButton3').text(gameAnswers[2]);
		$('#gameButton4').show();
		$('#gameButton4').text(gameAnswers[3]);
	//else true and false	
	} else {
		$('#gameButton3').hide();
		$('#gameButton4').hide();
	}
}

$(".gameAnswerButton").on("click", function() {
		//stop timer
		gameTimerStop();
		//check answers - the answer index is 1 less than the button values
		if ($(this).val() == gameCorrectAnswerIndex + 1) {
			gameAnswerCorrect();
		} else {
			gameAnswerIncorrect(true); //answer was incorrect
		};
});

function gameAnswerCorrect() {
	counterCorrect++;
	$('#gameCorrect').html("Correct: " + counterCorrect);
	$('#gameMessage').html("Great! That is correct.");
	$('.gameAnswerButton').hide();
	//Display the correct answer...
	$('#gameButton0').show();
	$('#gameButton0').text(gameCorrectAnswer);
	// gameCompleteCheck()
	setTimeout(gameCompleteCheck,1000*3);  //show correct answer for several seconds				
} 

function gameAnswerIncorrect(gameAnsweredIncorrect) {
	counterIncorrect++;
	$('#gameIncorrect').html("Incorrect: " + counterIncorrect);	
	if (gameAnsweredIncorrect) {
			$('#gameMessage').html("Too bad. That is incorrect. The correct answer is...");
		} else {
			$('#gameMessage').html("Time's up! Missed answers count as incorrect...");
		};
	$('.gameAnswerButton').hide();
	//Display the correct answer...
	$('#gameButton0').show();
	$('#gameButton0').text(gameCorrectAnswer);
	// gameCompleteCheck()
	setTimeout(gameCompleteCheck,1000*3);  //show correct answer for several seconds				

}

function gameCompleteCheck() {

	//was this the last question
	if (booleanLastQuestion) {
		//finish game
		$('#gameButton0').hide();
		$('#gameQuestionDisplay').html("");		
		if (counterIncorrect > counterCorrect) {
			$('#gameMessage').html("Sorry but you lost.");	
		} else {
			$('#gameMessage').html("You won!!!");
		}
		//display replay button
		$('#gameMessage').append("<br><button id='gamePlay'>Play Again</button>");
		$('#gamePlay').css({"padding": "12px", "margin": "12px", "width": "20%"});
	} else {
		gameStart();  //go to another question				
	};
}

$("#gamePlay").on("click", function() {
// console.log("reset game");
	timerDisplay = 6;
	counterCorrect = 0;
	counterIncorrect = 0;
	counterQuestion = 0;
	gameQuestionToDisplay = "";
	gameCorrectAnswer = "";
	gameAnswers = [];
	booleanLastQuestion = false;
	gameDisplayStartMessages();
});