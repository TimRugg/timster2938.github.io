//	Start and set up variables
var allowedCharacters = "abcdefghijklmnopqrstuvwxyz";
// replace following with multi-array including pictures and sound
// var listOfWords = ["giraffe", "wildebeest", "gazelle", "zebra", "leopard"];
// var themeImage = "africa.jpg";
var listOfWords = ["dachshund", "beagle", "rottweiler", "greyhound", "bullmastiff"];
var themeImage = "dog.jpg";
// var listOfWords = ["arabian", "mustang", "percheron", "appaloosa", "clydesdale"];
// var themeImage = "horse.jpg";
// var listOfWords = ["volleyball", "soccer", "hockey", "football", "baseball"];
// var themeImage = "teamsport.jpg";

//  number of words in list which is the number of games to play
var totalWordsToPlay = listOfWords.length;
//	totalIncorrectGuessesAllowed = 12 // compare against counterIncorrect Guess - use to lose game
var totalIncorrectGuessesAllowed = 12;
//	counterGamesWon = 0 // displays number of games won
var counterGamesWon = 0;
//	counterGamesLost = 0 // displays number of games lost
var counterGamesLost = 0;
//	counterGamesPlayed = 0 // count the games played for current list
var counterGamesPlayed = 0;
//  to reset variables with new words
var gameReset = false;
//	counterDisplayedLetters = 0 // count number of letters displayed - use to indicate game won
var counterDisplayedLetters = 0;
//	counterIncorrectGuesses = 0 // count incorrect guesses
var counterIncorrectGuesses = 0; 
//	string to display incorrect guesses
var incorrectGuessesDisplayed = "";
//  string to hold all guesses
var allGuessedLetters = "";
// pick first word to play
var wordToGuess = listOfWords[counterGamesPlayed];
// transform word to guess into an array
var arrayWordToGuess = wordToGuess.split("");
// start off with word displayed only as underscores
var correctGuessesDisplayed = "_".repeat(wordToGuess.length);
// transform displayed string into an array
var arrayCorrectGuessesDisplayed = correctGuessesDisplayed.split("");
// transform wordToGuess into lower case
var wordToGuessLowerCase = wordToGuess.toLowerCase();

// Start HTML
document.getElementById("gameMessage").innerHTML = "Choose a letter from A to Z to get started!";
document.getElementById("gameCorrectGuessesDisplayed").innerHTML = correctGuessesDisplayed;
document.getElementById("gameNumberOfGuessesRemaining").innerHTML = 12;
document.getElementById("gameIncorrectGuessedDisplayed").innerHTML = ".";
document.getElementById("gameImage").setAttribute("src", "../assets/images/" + themeImage);

// 	Listen for key
document.onkeyup = function(event) {
// 	capture key press
	var userKeyPressed = event.key.toLowerCase();
	console.log("key pressed= " + userKeyPressed);
	if (gameReset)
		{
			if (counterGamesPlayed == totalWordsToPlay)
			{
			document.getElementById("gameMessage").innerHTML = "No more words to guess.";
			document.getElementById("gameCorrectGuessesDisplayed").innerHTML = "";
			document.getElementById("gameNumberOfGuessesRemaining").innerHTML = "";
			document.getElementById("gameIncorrectGuessedDisplayed").innerHTML = ".";
				if (counterGamesWon > counterGamesLost) {
					document.getElementById("gameImage").setAttribute("src", "../assets/images/hangmanWIN.png");
				}
				else {
					document.getElementById("gameImage").setAttribute("src", "../assets/images/hangman12.png");		
				}
			}
			else
			{
			//ignore key selected and reset values
			gameReset = false;
			counterDisplayedLetters = 0;
			counterIncorrectGuesses = 0; 
			incorrectGuessesDisplayed = "";
			allGuessedLetters = "";
			wordToGuess = listOfWords[counterGamesPlayed];
			arrayWordToGuess = wordToGuess.split("");
			correctGuessesDisplayed = "_".repeat(wordToGuess.length);
			arrayCorrectGuessesDisplayed = correctGuessesDisplayed.split("");
			wordToGuessLowerCase = wordToGuess.toLowerCase();
			document.getElementById("gameMessage").innerHTML = "Choose a letter from A to Z to get started!";
			document.getElementById("gameCorrectGuessesDisplayed").innerHTML = correctGuessesDisplayed;
			document.getElementById("gameNumberOfGuessesRemaining").innerHTML = (totalIncorrectGuessesAllowed - counterIncorrectGuesses);
			document.getElementById("gameIncorrectGuessedDisplayed").innerHTML = ".";
			document.getElementById("gameImage").setAttribute("src", "../assets/images/" + themeImage);
			}		
		}	
	else if (allowedCharacters.indexOf(userKeyPressed) < 0) 
		{
			//an invalid character was selected 
			document.getElementById("gameMessage").innerHTML = "Choose a valid letter from A to Z";
		}
	else if (allGuessedLetters.indexOf(userKeyPressed) > -1)
		{
			//a valid but previously selected letter was selected
			document.getElementById("gameMessage").innerHTML = "Choose a letter that has not been selected before.";
		}
	else if (wordToGuessLowerCase.indexOf(userKeyPressed) < 0)
		{
			//letter selected was not in the word to guess  
			document.getElementById("gameMessage").innerHTML = "Try again!";
			allGuessedLetters = allGuessedLetters + userKeyPressed;
			incorrectGuessesDisplayed = incorrectGuessesDisplayed + userKeyPressed; 
			counterIncorrectGuesses++
			document.getElementById("gameIncorrectGuessedDisplayed").innerHTML = incorrectGuessesDisplayed;
			document.getElementById("gameNumberOfGuessesRemaining").innerHTML = (totalIncorrectGuessesAllowed - counterIncorrectGuesses);			
			//display sequence of images
			document.getElementById("gameImage").setAttribute("src", "../assets/images/hangman" + counterIncorrectGuesses + ".png");
			if (totalIncorrectGuessesAllowed == counterIncorrectGuesses)
				{
					// LOSE GAME
					counterGamesLost++
					counterGamesPlayed++
					gameReset = true;
					document.getElementById("gameMessage").innerHTML = "***** GAME OVER ****** Choose any key to reset.";
					document.getElementById("gameScoreLosses").innerHTML = "Losses<br>" + counterGamesLost;				

					// loop through filling in with red missing letters
					correctGuessesDisplayed = "";
					for (i=0; i<wordToGuess.length; i++)
					{
						//find unguessed letters	
					 	if (arrayCorrectGuessesDisplayed[i]=="_")
					 	{
					 		arrayCorrectGuessesDisplayed[i]= "<span style='color:red';>" + arrayWordToGuess[i] + "</span>";
					 	}
					 	//rebuild the string displayed on screen
					 	correctGuessesDisplayed = correctGuessesDisplayed + arrayCorrectGuessesDisplayed[i];
					}
					document.getElementById("gameCorrectGuessesDisplayed").innerHTML = correctGuessesDisplayed;
				}
		}
	else
		{
			//letter selected is in the word to guess
			document.getElementById("gameMessage").innerHTML = "Good going!";
			allGuessedLetters = allGuessedLetters + userKeyPressed;
			// loop through word to guess replacing underscores with valid letters and counting displayed letters
			correctGuessesDisplayed = "";
			for (i=0; i<wordToGuess.length; i++)
			{
				//word to guess has the case as in word list	
			 	if (arrayWordToGuess[i].toLowerCase()==userKeyPressed)
			 	{
			 		arrayCorrectGuessesDisplayed[i]=arrayWordToGuess[i];
			 		counterDisplayedLetters++
			 	}
			 	//rebuild the string displayed on screen
			 	correctGuessesDisplayed = correctGuessesDisplayed + arrayCorrectGuessesDisplayed[i];
			}
			document.getElementById("gameCorrectGuessesDisplayed").innerHTML = correctGuessesDisplayed;
			if (counterDisplayedLetters==wordToGuess.length)
			{
				//WIN GAME
				counterGamesWon++
				counterGamesPlayed++
				gameReset=true;
				document.getElementById("gameMessage").innerHTML = "***** You Won! ****** Choose any key to reset.";
				document.getElementById("gameImage").setAttribute("src", "./assets/images/hangmanWIN.png");
				document.getElementById("gameScoreWins").innerHTML = "Wins<br>" + counterGamesWon;
			}
		}
}