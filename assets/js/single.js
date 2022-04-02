var issueContainerEl = document.querySelector("#issues-container");

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
      });
    }
    else {
        console.log(response);  
      alert("There was a problem with your request!");
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
//hardcore
getRepoIssues("jennasaikaly/portfolio");