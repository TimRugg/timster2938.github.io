	//create variables
	var topics = ["baseball","soccer","basketball","hockey","tennis","bowling"];
	var apiKey = "OAJw0fyFvlk0O3cfeAOeBttFwgm67zS9";
	var apiResponseArray = [];

	displayButtons();

	function displayButtons() {
		$("#displayButtons").empty();
		//loop through the array displaying a button for each element in the topics array
		for (var i=0; i<topics.length; i++) {
// console.log("displayButtons function");
// console.log("index: " + i + " number of topics:" + topics.length + " topics:" + topics[i]);
			//create a variable and build the html for each button using jquery
			var buildButton = $("<button>");			//jquery will also insert the end tag
			buildButton.addClass("topicButton");		//insert a class of topicButton into each button
			buildButton.attr("topicValue", topics[i]); 	//insert a new attr named topicValue and set to current topic
			buildButton.text(topics[i]);				//text is the displayed lable on the button
			$("#displayButtons").append(buildButton);	//add button to display or to end of displayed buttons
			//the following one line works too but the previous would be easier to edit
			// $('#displayButtons').append("<button class='topicButton' value=" + i + ">" + topics[i] + "</button>;");
		}
	}; //end of displayButtons


	//display images on page from giphy
	//clicking any of the topic buttons...
	// $(".topicButton").on("click", function(event) {
	$("#displayButtons").on("click", ".topicButton", function(event) {
// console.log("topicButton clicked");
		//get the topicValue for the clicked button
		var topicValue = $(this).attr("topicValue");
		//use the topicValue in the query for an ajax get
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topicValue + "&api_key=" + apiKey + "&limit=10";
		//GET the search API from giphy using button clicked as search term
	    $.ajax({
	      url: queryURL,
	      method: 'GET'
	    }).done(function(response) {
// console.log("response:",response);
			apiResponseArray = response.data;	//the data part of the API response is an array
			displayImages();					//function used for clarity - code in function could be here
// console.log("apiResponseArray:", apiResponseArray);
// console.log("length: ",apiResponseArray.length);
	    });
	});

	//listen for click on submit button
	$("#submitTopic").on("click", function(event) {
// console.log("submitTopic clicked");
		// event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();
		//temp variable to hold value typed into form
		var newTopic = $("#inputTopic").val().trim();
		//append to the array of topics
		topics.push(newTopic);
		$("#inputTopic").val("");
		//display buttons with new topic
		displayButtons();
	});

	//loop through the list of gifs and display on screen
	function displayImages() {
// console.log("displayImages function");
	$("#displayGifs").empty(); //clear any images already displayed
// console.log("apiResponseArray:", apiResponseArray);
// console.log("length: ",apiResponseArray.length);
		for (var i=0; i<apiResponseArray.length; i++) {
			//html for the rating and gifs
			var buildImageContainer = $("<container>");
			buildImageContainer.addClass("gifContainer");
			buildImageContainer.attr("id", "gifContainer" + i);
			var buildImageRating = $("<p>");
			// buildImageRating.attr("id", "gifRating" + i);
			buildImageRating.text("Rating: " + apiResponseArray[i].rating);
			//html for the gifs
			var buildImageDisplay = $("<img>");				//build an image container for the array of gifs
			// buildImageDisplay.attr("id", "image-" + i);	//each image will have a unique buildImageDisplay
			buildImageDisplay.addClass("gif");				//all images will be in same class for on click function
			buildImageDisplay.attr("src", apiResponseArray[i].images.original_still.url);
			// buildImageDisplay.attr("height","200px");
			// buildImageDisplay.attr("width","300px");
			//create attributes to make an image animated or still
			buildImageDisplay.attr("img-state", "still");  //toggles between still and animated
			//store both the still and animated image source
			buildImageDisplay.attr("img-src-still", apiResponseArray[i].images.original_still.url);
			buildImageDisplay.attr("img-src-animated", apiResponseArray[i].images.original.url);
// console.log("displayGifs: ",buildImageDisplay);
			// $("#displayGifs").append(buildImageDisplay);//add image to display
			$("#displayGifs").append(buildImageContainer);	//add gif rating to display
			$("#gifContainer"+i).append(buildImageRating);
			$("#gifContainer"+i).append(buildImageDisplay);	//add gif to the rating container
		} //end of the for loop displaying images

			//listen for when an image is clicked and swap src values
			$(".gif").on("click", function() {
// console.log("Gif clicked.");
				var state = $(this).attr("img-state"); //save the value of data-state on clicked gif
				if (state == "still") {
					//animate
					$(this).attr("src",$(this).attr("img-src-animated"));	//change the src to the animated gif
					$(this).attr("img-state","animated");					//change the state to animated
				} else {
					//stop animation
					$(this).attr("src",$(this).attr("img-src-still"));	//change the src to the still gif
					$(this).attr("img-state","still");					//change the state to still
				};
			}); //end of gif on click
	} //end of display image function