var getUserRepos = function(jennasaikaly) {
  // format the github api url
  var apiUrl = "https://api.github.com/users/" + "jennasaikaly" + "/repos";

  // make a request to the url
  fetch(apiUrl).then(function(response) {
    response.json().then(function(data) {
      console.log(data);
    });
  });
};
  getUserRepos();