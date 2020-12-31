console.log("injected");

let entries = document.getElementsByClassName("innerdata")[0];
//console.log(entries)
Array.from(entries.children[0].children).forEach((element, key) => {
    let data = {};
    let comment = element.getElementsByClassName("comment")[0];
    if(comment) {
        //console.log(element)
        let heading = document.getElementById('heading').innerText;
        data.difficulty = heading.includes('Very Hard') ? 'Very Hard' : heading.includes('Hard') ? 'Hard' : 'Normal';
        data.name = heading.split("'")[0];
        data.time = comment.innerText;
        data.comment = comment.title;
        element.addEventListener('click', () => {
            chrome.storage.local.set({tscData: JSON.stringify(data)}, () => {
                console.log("Entry set: "+ JSON.stringify(data))
            });
        })
    }
});
