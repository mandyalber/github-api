/*display a list of repos belonging to a particular GitHub handle.*/

function handleSubmitClicked(){
//The user must be able to search for a GitHub user handle. The user must be able to make multiple searches and see only the results for the current search
    //listen for submit event
    $('form').submit(event => {
        event.preventDefault()
        let githubHandle = $('#input').val() 
        $('#input').val('')
        console.log(githubHandle)
        //clear out the prior results from the DOM 
        getGithubRepoList(githubHandle)     
    })
        
}

function getGithubRepoList(githubHandle){
    //The search must trigger a call to GitHub's API.
    fetch(`https://api.github.com/users/${githubHandle}/repos`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
      console.log(response)
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    })
}

function displayResults(responseJson){
    //The repos associated with that handle must be displayed on the page.
    let repos = []
        //use a for loop to append to a ul 
        for (let i = 0; i < responseJson.length; i++){
            repos.push(`<li><h5>${responseJson[i].name}</h5><a href="${responseJson[i].html_url}">Repo Link</a></li>`)
            console.log(repos)
        }
    //You must display the repo name and link to the repo URL.
    $('.search-results').empty().append(repos)
    $('section').removeClass('hidden')
}

$(handleSubmitClicked)