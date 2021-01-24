console.log("injected");

let entries = document.getElementsByClassName("innerdata")[0];
//console.log(entries)
Array.from(entries.children[0].children).forEach((element, key) => {
    let data = {};
    let comment = element.getElementsByClassName("comment")[0];
    if(!comment) {
        comment = Array.from(element.children)[2].children[0];
    }
    let dateElement = Array.from(element.children)[3];
    let nameElement = Array.from(element.children)[1];
    let heading = document.getElementById('heading').innerText;
    data.difficulty = heading.includes('Very Hard') ? 'Very Hard' : heading.includes('Hard') ? 'Hard' : 'Normal';
    data.name = nameElement.children[0].innerText;
    data.time = comment.innerText;
    data.comment = comment.title + " [Time Taken (with permission) from https://www.soniccenter.org/ ]";
    data.date = dateElement.innerText;

    // Create a button which copies all collected data to chrome local storage
    newTableCol = document.createElement('td');
    newTableCol.style = 'width: "200px";'
    clickToCopy = document.createElement('button');
    clickToCopy.addEventListener('click', (e) => {
        chrome.storage.local.set({tscData: JSON.stringify(data)}, () => {
            console.log("Entry set: "+ JSON.stringify(data))
        });
        e.target.disabled = true;
    });
    clickToCopy.innerText = 'Copy Data';
    newTableCol.appendChild(clickToCopy);
    element.appendChild(newTableCol);
});
