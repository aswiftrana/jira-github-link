function save_options() {
    var jiraHost = document.getElementById('jira-host').value;
    var githubHost = document.getElementById('github-host').value;
    chrome.storage.sync.set({
        jiraHost: jiraHost,
        githubHost: githubHost
    }, function() {
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

function restore_options() {
    chrome.storage.sync.get({
        jiraHost: '',
        githubHost: ''
    }, function(items) {
        document.getElementById('jira-host').value = items.jiraHost;
        document.getElementById('github-host').value = items.githubHost;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);

window.onload=function(){
    document.getElementById('save-options').addEventListener('click', save_options);
}
  
