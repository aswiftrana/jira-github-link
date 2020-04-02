chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.storage.sync.get({
        jiraHost: '',
        githubHost: ''
    }, function(items) {
        if (!!items.jiraHost && !!items.githubHost) {
            linkToGithub(items.jiraHost, items.githubHost)
        } else {
            showSettings()
        }
    });
});

function showSettings() {
    chrome.tabs.create({url: "../options/options.html"})
}

function linkToGithub(jiraHost, githubHost) {
    chrome.tabs.query({active: true,currentWindow: true },
        function(tabs) {
            var url = new URL(tabs[0].url)
            console.log(url)
            if (url.hostname != jiraHost) { return }

            const re = new RegExp('[A-Z]+-[0-9]+')
            var match = url.pathname.match(re)[0]

            chrome.tabs.create({url: "https://" + githubHost + "/pulls?q=" + match})
        }
    );
}