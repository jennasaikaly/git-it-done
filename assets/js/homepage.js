//form variables
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");


//Adds functionality to search form
var formSubmitHandler = function(event) {
  event.preventDefault();
  // get value from input element
var username = nameInputEl.value.trim();  

if (username) {   //checks that there is a value in that username variable
  getUserRepos(username); //passes the username value data to the getUserRepos function as an argument
  nameInputEl.value = ""; //to clear the form, we clear out the input element's value
} else {
  alert("Please enter a GitHub username");
}
};

//request and receive data from server
var getUserRepos = function(username) {
  // format the github api url
  var apiUrl = "https://api.github.com/users/" + username + "/repos";

  // make a request to the url
  fetch(apiUrl).then(function(response) {
    response.json().then(function(data) {
      console.log(data);
    });
  });
};
userFormEl.addEventListener("submit", formSubmitHandler);

