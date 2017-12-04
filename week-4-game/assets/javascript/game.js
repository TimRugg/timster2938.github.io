//	Start and set up variables
var gameNumberToGuess = 0;
var counterWins = 0;
var counterLosses = 0;
var gameCurrentGuess = 0;
var totalCurrentGuess = 0;
var gem1Value = 0;
var gem2Value = 0;
var gem3Value = 0;
var gem4Value = 0;
// Write initial values to screen
$('#gameWins').html("Wins " + counterWins);
$('#gameLosses').html("Losses " + counterLosses);
resetGame();
//at start and after win and lose
function resetGame() {
	totalCurrentGuess = 0;
	//random number to guess
	gameNumberToGuess = Math.floor((Math.random() * 101) + 19);
	randomGemValues();
	//Write inital or reset values to screen
	$('#gameNumberToGuess').html(gameNumberToGuess);
	$('#gameCurrentGuess').html(totalCurrentGuess);
	$('#gameMessage').html("Pick a gem.");
	$("#gameReset").hide();
}
//create an array of unique random numbers
function randomGemValues() {
	var tempNumber = 0;
	var tempArray = [];
	for (var i = 0; i < 4; i++) {
		do {tempNumber = Math.floor((Math.random() * 12) + 1);
		} while(tempArray.includes(tempNumber))
		tempArray.push(tempNumber); //add unique number to array
	}
	gem1Value = tempArray[0];
	gem2Value = tempArray[1];
	gem3Value = tempArray[2];
	gem4Value = tempArray[3];
}
//check for win and execute win, lose, or keep going
function checkForWin() {
	if (totalCurrentGuess == gameNumberToGuess) {
		//WIN
		counterWins++
		$('#gameWins').html("Wins " + counterWins);
		$('#gameMessage').html("You Won!!!");
		$("#gameReset").show();
	} else if (totalCurrentGuess > gameNumberToGuess) {
		//LOSE
		counterLosses++
		$('#gameLosses').html("Losses " + counterLosses);
		$('#gameMessage').html("You lost!");
		$("#gameReset").show();
	};
}
// Listen for click on crystals
$('#gem1').on('click', function() 
{
	if (totalCurrentGuess < gameNumberToGuess) 
	{
	$('#gameCurrentGuess').html(totalCurrentGuess += gem1Value);
	checkForWin();
	}
});
$('#gem2').on('click', function() 
{
	if (totalCurrentGuess < gameNumberToGuess) 
	{
	$('#gameCurrentGuess').html(totalCurrentGuess += gem2Value);
	checkForWin();
	}
});
$('#gem3').on('click', function() 
{
	if (totalCurrentGuess < gameNumberToGuess) 
	{
	$('#gameCurrentGuess').html(totalCurrentGuess += gem3Value);
	checkForWin();
	}
});
$('#gem4').on('click', function() 
{
	if (totalCurrentGuess < gameNumberToGuess) 
	{
	$('#gameCurrentGuess').html(totalCurrentGuess += gem4Value);
	checkForWin();
	}
});
// Listen for click on reset
$('#gameReset').on('click', function() 
{
	resetGame();
});

