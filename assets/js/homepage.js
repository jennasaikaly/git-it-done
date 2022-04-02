//form variables
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

//display repository variable
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");



//request and receive data from server
var getUserRepos = function(username) {
  // format the github api url
  var apiUrl = "https://api.github.com/users/" + username + "/repos";

  // make a request to the url
  fetch(apiUrl)
  .then(function(response) {
    // request was successful
    if (response.ok) {     //'ok' property is bundled in the response object from fetch ()
      response.json().then(function(data) { // json() formats data to JSON and then() capture actual data
        displayRepos(data, username);  //sends data to displayRepos ()
      });
    } else {
      alert("Error: GitHub User Not Found"); //prevents error 404 screen from popping up (ERROR HANDLING)
    }
  })
  .catch(function(error) {
    // Notice this `.catch()` getting chained onto the end of the `.then()` method
    alert("Unable to connect to GitHub");  
  });
};


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

//function to display repos
var displayRepos = function(repos, searchTerm) {
// check if api returned any repos; will let user know that none were found
// instead of just displaying an empty page
if (repos.length === 0) {
  repoContainerEl.textContent = "No repositories found.";
  return;
}


 // clear old content
repoContainerEl.textContent = "";
repoSearchTerm.textContent = searchTerm;

// loop over repos to display repository data 
for (var i = 0; i < repos.length; i++) {
  // format appearance of the name and repository name
  var repoName = repos[i].owner.login + "/" + repos[i].name;

  // create and style a div element (container) for each repo
  var repoEl = document.createElement("div");
  repoEl.classList = "list-item flex-row justify-space-between align-center";

  // create a span element to hold repository name
  var titleEl = document.createElement("span");
  titleEl.textContent = repoName;

  // append to container
  repoEl.appendChild(titleEl);

  //***************************//
  // INSERTED INTO FOR LOOP
// create a status element
var statusEl = document.createElement("span");
statusEl.classList = "flex-row align-center";

// check if current repo has issues or not
if (repos[i].open_issues_count > 0) {
  statusEl.innerHTML =
    "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
} else {
  statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
}
// append to container
repoEl.appendChild(statusEl);
//***************** */
  // append container to the dom
  repoContainerEl.appendChild(repoEl);
}

};


userFormEl.addEventListener("submit", formSubmitHandler);

