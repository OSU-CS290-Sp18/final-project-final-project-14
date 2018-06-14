let postTitle;

/*
If there is anything that we are not using, such as hide modal
buttons, and this code does not match up to what we have please let me know.
Im doing a lot of guessing here.
*/

function getClassNumberFromURL(){
  let path = window.location.pathname;
  let pathParts = path.split("/");
  return pathParts[1];
}

function getInstructorFromURL(){
  let path = window.location.pathname;
  let pathParts = path.split("/");
  return pathParts[2];
}


/*
This function is going to get the class number and instructor from the urlbar,
then open an HTTP request to express at this route: "/addReply"
It will then grab the reply content, author and grade from the modal with the
IDs "content", "author", "grade", and then get the post title of the post with
the user click reply to ... in theory.
This will then be formed into a JSON body with the following structure:
{
  content: replyContent,
  author: replyAuthor,
  postTitle: postTitle
}
This will make the information the user typed into the modal available in the
'req' argument in express. There needs to be a middleware function in express
to handle the /addReply route.
From there the data can be posted to the mondoDB
*/
function sendReplyInfoToExpress(){
  let replyContent = document.getElementById("reply-text-input").value.trim();
  let replyAuthor = document.getElementById("reply-author-input").value.trim();

  let request = new XMLHttpRequest();
  let url = "/addReply";
  request.open("POST", url);

  let requestBody = JSON.stringify({
    content: replyContent,
    author: replyAuthor,
    postTitle: postTitle
  });


  //if we are going to let express render the new reply, then
  //this should be all we need.
  request.addEventListener('load', function(event){
    if(event.target.status !== 200){
      let message = event.target.status;
      alert("Error storing post in database: " + message);
    } else {
      console.log("Post successful! " + message);
    }
  })

  request.setRequestHeader('Content-Type', 'application/json');
  request.send(requestBody);
}


/*
Theres going to need to be another route to handle the search input from the
search bar. Once the user clicks on the search icon this will open a GET request
with express and it will work similar to the one above.
This one needs express to handle a request for the path "/search".
This will pass in to the req argument the search term the user typed in
the search bar.
*/
function sendSearchInfoToExpress(){
  console.log("SEARCHING!!");
  let searchTerm = document.getElementById("navbar-search-input").value.trim();
  let request = new XMLHttpRequest();
  let url = "/search";
  request.open("POST", url, true);

  let requestBody = JSON.stringify({
    searchTerm: searchTerm
  });

  request.addEventListener('load', function(event){
    console.log("Returned status: " + event.target.status);
    if(event.target.status !== 200){
      let message = event.target.status;
      alert("Error, class NOT in database: " + message);
    } else {
		let message = event.target.status;
		console.log("Class search successful! " + message);
    }
  })
  console.log("Sending request for page: ", requestBody);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(requestBody);
}

function showModal(event){
  let modalBackDrop = document.getElementById("modal-backdrop"); //get modal backdrop element
  let modalElement = document.getElementById("post-reply-modal"); //get reply modal element

  modalBackDrop.classList.remove("hidden"); //unhide the backdrop
  modalElement.classList.remove("hidden"); //unhide the modal

  //get the nearest element with the id of "post-title", this should be the H tag with
  //the unique title
  let postTitleElement = event.currentTarget.closest("#post-title");
  postTitle = postTitleElement.textContent; //assign the H tag's text to the global variable
}

function hideModal(){
  let modalBackDrop = document.getElementById("modal-backdrop");
  let modalElement = document.getElementById("post-reply-modal");

  modalBackDrop.classList.add("hidden");
  modalElement.classList.add("hidden");
}


/*
Once the DOM content is loaded, this event handler will append event listeners
to the post reply button, which will show a modal, accept button which will
send the user provided data to express, and a hide modal button.
If we instead only have a post reply button that displays a modal and thats
it, I can get rid of anything extra we dont need.
*/

try{
  let searchBarButton = document.getElementById("navbar-search-button");
  searchBarButton.addEventListener('click', sendSearchInfoToExpress);
} catch(error) {
  console.log("Navbar search wasn't on this page, and thats ok! " + error);
}
try{
  let modalAcceptButton = document.getElementById("modal-accept-button");
  modalAcceptButton.addEventListener('click', sendReplyInfoToExpress);
} catch (error) {
  console.log("Modal accept probably not on this page, and thats ok! " + error);
}

try {
  let modalHideButton = document.getElementById("modal-cancel-button");
  modalHideButton.addEventListener('click', hideModal);
} catch (error) {
  console.log("Modal cancel probably not on this page, and thats ok! " + error);
}

try {
  let postReplyButton = document.getElementsByClassName("post-reply-button")[0];
  postReplyButton.addEventListener('click', showModal);
} catch (error) {
  console.log("post reply button not on this page, and thats ok! " + error);
}
