/*
 * Add your JavaScript to this file to complete the assignment.  Don't forget
 * to add your name and @oregonstate email address below.
 *
 * Name: Michael Kopcho
 * Email: kopchom@oregonstate.edu
 */
 
 /*================================= Search Functionality =================================*/
 
// Grab the search box
var searchInput = document.getElementById("navbar-search-input")

// Make a "backup" of the current twits
var backup = document.querySelectorAll(".twit")

// Search function
function searchTwits(query) {
	// Store all existing twits
	var twits = document.getElementsByClassName("twit")
	
	// Track the index as an int
	var idx = 0
	
	// Continue to iterate while the index is in bounds
	while(twits.item(idx) !== null) {
		// Convert the text in the current twit to a lowercase string
		var currentTwitText = twits[idx].innerText.toLowerCase()
		
		// If the current twit's text doesn't match the query, remove it
		if(currentTwitText.search(query) === -1) {
			twits[idx].remove()
			/* The proceeding tweets will be moved back to fill the gap,
			   as such there is no need to increment idx */
		}
		// Otherwise, move to the next twit
		else {
			idx += 1
		}
	}
	
}

// Function to clear out all remaining twits
function clearTwits() {
	// Store all existing twits
	var twits = document.getElementsByClassName("twit")
	
	// Repeatedly remove the first tweet until there are none left
	while(twits.item(0) !== null) {
		twits.item(0).remove()
	}
}

// Function to restore an older list of twits
function restoreTwits(twitsBackup) {
	// Grab the twit container
	var twitContainer = document.querySelector("main.twit-container")
	
	// Add each twit in twitsBackup to the container
	for(var i = 0; i < twitsBackup.length; i++) {
		twitContainer.appendChild(twitsBackup[i])
	}
}

// Search behavior for the search bar
searchInput.addEventListener("input", function(event) {
	// Reset the tweets (in case a previous search was made)
	clearTwits()
	
	restoreTwits(backup)
	
	// Save the user's input as a lowercase string
	var query = event.currentTarget.value.toLowerCase()
	
	searchTwits(query)
})

//Grab the search button
var searchButton = document.getElementById("navbar-search-button")

// Search behavior for the search button
searchButton.addEventListener("click", function() {
	// Reset the tweets (in case a previous search was made)
	clearTwits()
	
	restoreTwits(backup)
	
	// Save the user's input as a lowercase string
	var query = searchInput.value.toLowerCase()
	
	searchTwits(query)
})
 
 
 
 /*============================== Create Twit Functionality ==============================*/
 
 // Create variables for the modal and the modal's backdrop
 var modalBackdrop = document.getElementById("modal-backdrop")
 
 var modal = document.getElementById("create-twit-modal")
 
 // Open Modal when create twit button is clicked
 var twitButton = document.getElementById("create-twit-button")
 
 twitButton.addEventListener("click", function() {
	modal.classList.remove("hidden")
	modalBackdrop.classList.remove("hidden")
	
	// Clear the searchbar and restore all tweets
	searchInput.value = ""
	clearTwits()
	restoreTwits(backup)
 })
 
 // Function to hide the modal and clear its data
 function resetModal() {
	// Grab the textareas
	var modalText = document.getElementById("twit-text-input")
	var modalAuthor = document.getElementById("twit-attribution-input")
	
	// Set the content of the textareas to empty
	modalText.value = ""
	modalAuthor.value = ""
	
	// Hide the modal and its background
	modal.classList.add("hidden")
	modalBackdrop.classList.add("hidden")
 }
 
 // Use the reset function when the 'x' or cancel buttons are clicked on the modal
 var xButton = document.querySelector("button.modal-close-button")
 var cancelButton = document.querySelector("button.modal-cancel-button")
 
 xButton.addEventListener("click", resetModal)
 cancelButton.addEventListener("click", resetModal)
 
 // Function for creating a twit
 function createTwit(text, author) {
	// Create the outer twit
	var twit = document.createElement("article")
	twit.classList.add("twit")
	
	// Create the twit icon container
	var twitIcon = document.createElement("div")
	twitIcon.classList.add("twit-icon")
	
	// Create the bullhorn icon and add it to the icon container
	var bullhorn = document.createElement("i")
	bullhorn.classList.add("fa", "fa-bullhorn")
	twitIcon.appendChild(bullhorn)
	
	twit.appendChild(twitIcon)
	
	// Create the twit text container
	var twitContent = document.createElement("div")
	twitContent.classList.add("twit-content")
	
	/* Create the content paragraph, add the user's twit content,
	   and add the paragraph to the text container */
	var twitText = document.createElement("p")
	twitText.classList.add("twit-text")
	twitText.textContent = text
	twitContent.appendChild(twitText)
	
	// Create the author paragraph
	var twitAuthor = document.createElement("p")
	twitAuthor.classList.add("twit-author")
	
	// Create the author link, and fill it w/ the user's author content
	var authorLink = document.createElement("a")
	authorLink.href = "#"
	authorLink.textContent = author
	twitAuthor.appendChild(authorLink)
	twitContent.appendChild(twitAuthor)
	
	twit.appendChild(twitContent)
	
	// Get the twit container and add the new twit
	var twitContainer = document.querySelector("main.twit-container")
	twitContainer.appendChild(twit)
 }
 
// Function to ensure that both fields of the modal are filled
function verifyModalContent() {
	// Grab the textareas
	var modalText = document.getElementById("twit-text-input")
	var modalAuthor = document.getElementById("twit-attribution-input")
	
	// Display an alert if the user has left one of the textareas empty
	if(modalText.value === "" || modalAuthor.value === "") {
		alert("At least one of the fields for your twit is empty. Please try again.")
	}
	// If neither field is empty, call createTwit with their values
	else {
		createTwit(modalText.value, modalAuthor.value)
		// Call the reset function afterwards to "close" and reset the modal
		resetModal()
		// Update the backup with the new twit
		backup = document.querySelectorAll(".twit")
	}
}

// use the verify function when the create twit button is clicked
var createButton = document.querySelector("button.modal-accept-button")

createButton.addEventListener("click", verifyModalContent)
