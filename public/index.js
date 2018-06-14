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


function getGrade(){

}

/*
This function is going to get the class number and instructor from the urlbar,
then open an HTTP request to express at this route:
/:className/:instructor/addReply

It will then grab the reply content, author and grade from the modal with the
IDs "content", "author", "grade", which can be changed.

This will then be formed into a JSON body with the following structure:

{
  reply: replyContent,
  author: replyAuthor,
  grade: replyGrade
}

This will make the information the user typed into the modal available in the
'req' argument in express. There needs to be a middleware function in express
to handle the /:className/:instructor/addReply route.

From there the data can be posted to the mondoDB
*/
function sendPostInfoToExpress(event){
  let replyContent = event.target;
  let replyAuthor = document.getElementById("reply-author-input").value.trim();
  let replyGrade = document.getElementById("grade").value.trim();
  let classNumber = getClassNumberFromURL();
  let instructor = getInstructorFromURL();

  let request = new XMLHttpRequest();
  let url = "/" + classNumber + "/" + instructor + "/addReply";
  request.open("POST", url);

  let requestBody = JSON.stringify({
    reply: replyContent,
    author: replyAuthor,
    grade: replyGrade
  });


  //if we are going to let express render the new reply, then
  //this should be all we need.
  request.addEventListener('load', function(event){
    if(event.target.status !== 200){
      let message = event.target.response;
      alert("Error storing photo in database: " + message);
    } else {
      console.log("Post successful! " + message);
    }
  })

  request.setRequestHeader('Content-Type', 'application/json');
  request.send(requestBody);
}

function showModal(event){
  let modalBackDrop = document.getElementById("modal-backdrop");
  let modalElement = document.getElementById("post-reply-modal");

  modalBackDrop.classList.remove("hidden");
  modalElement.classList.remove("hidden");

  let modalAcceptButton = document.getElementsByClassName("modal-accept-butto");
  modalAcceptButton.addEventListener('click', sendPostInfoToExpress);
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
window.addEventListener("DOMContentLoaded", function(){
  let postReplyButton = document.getElementById("post-reply-button");
  postReplyButton.addEventListener('click', showModal);



  let modalCancelButton = document.getElementsByClassName("modal-cancel-button");
  modalCancelButton.addEventListener('click', hideModal);

  let modalCloseButton = document.getElementsByClassName("modal-close-button");
  modalCloseButton.addEventListener('click', hideModal);
})
