chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({color: '#3aa757'}, () => {
        console.log("The color is green");
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {urlContains: 'www.soniccenter.org'},
            })],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });



// End
});