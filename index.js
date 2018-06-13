/*
If anything there is anything that we are not using, such as hide modal
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
then open an HTTP request to express at this route:
/:className/:instructor/addReply

It will then grab the reply content, author and grade from the modal with the
IDs "content", "author", "grade", which can be changed.

This will then be formed into a JSON body with the following structure:

{
  content: replyContent,
  author: replyAuthor,
  grade: replyGrade
}

This will make the information the user typed into the modal available in the
'req' argument in express. There needs to be a middleware function in express
to handle the /:className/:instructor/addReply route.

From there the data can be posted to the mondoDB
*/
function sendPostInfoToExpress(){
  let replyContent = document.getElementById("content").value.trim();
  let replyAuthor = document.getElementById("author").value.trim();
  let replyGrade = document.getElementById("grade").value.trim();
  let classNumber = getClassNumberFromURL();
  let instructor = getInstructorFromURL();

  let request = new XMLHttpRequest();
  let url = "/" + classNumber + "/" + instructor + "/addReply";
  request.open("POST", url);

  let requestBody = JSON.stringify({
    content: replyContent,
    author: replyAuthor,
    grade: replyGrade
  });


  //if we are going to let express render the new reply, then
  //this should be all we need.
  request.addEventListener('load', function(event){
    if(event.target.status !== 200){
      let message = event.target.response;
      alert("Errpr storing photo in database: " + message);
    } else {
      console.log("Post successful! " + message);
    }
  })

  request.setRequestHeader('Content-Type', 'application/json');
  request.send(requestBody);
}

/*
Once the DOM content is loaded, this event handler will append event listeners
to the post reply button, which will show a modal, accept button which will
send the user provided data to express, and a hide modal button.

If we instead only have a post reply button that displays a modal and thats
it, I can get rid of anything extra we dont need.
*/
window.addEventListener("DOMContentLoaded", function(){
  let postReplyButton = document.getElementsByClassName("post reply")[0];
  postReplyButton.addEventListener('click', showModal);

  let modalAcceptButton = document.getElementById("modal accept");
  modalAcceptButton.addEventListener('click', sendPostInfoToExpress);

  let modalHideButton = document.getElementById("modal hide");
  modalHideButton.addEventListener('click', hideModal);
})
