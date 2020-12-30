let url = document.getElementById('url');

chrome.storage.sync.get('entry', (data) => {
    // changeColor.style.backgroundColor = data.color;
    // changeColor.setAttribute('value', data.color);
    // changeColor.setAttribute('onClick', function(e) {
    //     console.log(e.target.value);
    //     let color = e.target.value;
    //     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //         chrome.tabs.executeScript(
    //             tabs[0].id,
    //             {code: 'document.body.style.backgroundColor = "' + color + '"; console.log("Pressed button");'}
    //         )
    //     })
    // })
})