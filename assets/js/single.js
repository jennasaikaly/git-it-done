var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");
var repoNameEl = document.querySelector("#repo-name");

var getRepoName = function (){
    //stores the query string in a variable
    var queryString = document.location.search;
    //splits the string into 2 arrays and then gives us the second item
    var repoName = queryString.split("=")[1];
    //console.log(repoName);

    //checks for valid values before passing them into their respective function calls (ERROR HANDLING)
    if(repoName) {
        //displays repo name on the homepage
        repoNameEl.textContent = repoName;
        getRepoIssues(repoName);
      }

      //redirects user back to main page if no repo was given
      else {
        document.location.replace("./index.html");
      }  
}
var getRepoIssues = function(repo) {   
    // 1) create variable to hold the query
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
 // 2) build out a basic HTTP request to hit this endpoint and check the information returned in the response.
       //  fetch(apiUrl);  (this is a test, once confirmed moved to step 3)     

    //3 ) update fetch request to receive and handle the server's response (bc fetch is asynchronous)
 fetch(apiUrl).then(function(response) {
    // request was successful
    if (response.ok) {
      response.json().then(function(data) {
          // 5) initially was a console.log but was updated once displayIssues () was created.
       //console.log(data);
          displayIssues(data);  

          // check if api has paginated issues
        if (response.headers.get("Link")) {
            displayWarning(repo);
      }
      });
    }
    else {
        //if not successful, redirect to homepage
        document.location.replace("./index.html");
    }
  });
  };
  
  // 4) Create displayIssues function that receives 'issues' as a paramenter;
// 5) update getRepoInfo () to call this function 
  var displayIssues = function(issues) {
 //8)  if a repo has no open issues
    if (issues.length === 0) {
       issueContainerEl.textContent = "This repo has no open issues!";
        return;
      }  
 // 6)  loop over the response data and create an <a> element for each issue
 for (var i = 0; i < issues.length; i++) {
    // create a link element to take users to the issue on github
    // issue objects have an html_url property that we can link to
    var issueEl = document.createElement("a");
    issueEl.classList = "list-item flex-row justify-space-between align-center";
    issueEl.setAttribute("href", issues[i].html_url);
    //opens link in new tab
    issueEl.setAttribute("target", "_blank");
  

  //7) logic to add content to elements
// create span to hold issue title
var titleEl = document.createElement("span");
titleEl.textContent = issues[i].title;

// append to container
issueEl.appendChild(titleEl);

// create a type element
var typeEl = document.createElement("span");

// check if issue is an actual issue or a pull request
if (issues[i].pull_request) {
  typeEl.textContent = "(Pull request)";
} else {
  typeEl.textContent = "(Issue)";
}

// append to container
issueEl.appendChild(typeEl);


issueContainerEl.appendChild(issueEl);
 }
};


var displayWarning = function(repo) {
    // add text to warning container
    limitWarningEl.textContent = "To see more than 30 issues, visit ";

    var linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");
  
    // append to warning container
    limitWarningEl.appendChild(linkEl);
  };
  

  getRepoName();
  //hardcode
//getRepoIssues("expressjs/express");
