console.log("now utilizing wike's fabulous semi-automatic data collector");
let nameConversion = {
    PsyBorg: "PsyborgTSC",
    nick1373: "Nick867",
    ['JeraCyclo Daniel']: "VolcanoTheBat",
    Parax: "Aruki",
    FocusSight64: "FocusSight",
    InferSaime: "SaimeZX",
    N: "wakarimasen",
    Venick409: "Venick",
    Nim: "Nimputs",
    Gamepro011: "Gpro",
    Thorn: "ThornDracorn",
    RPGnutter: "ARRPEEGEE",
    Arch: "ArchTSC",
    ['AC-Tygo']: "Yeeves",
    ['Shadow Jacky']: "ShadowJacky",
    Zip: "ZipTSC",
    ['The Kid . 130']: "The_Kid"
}
console.log(nameConversion);
let entries = document.getElementsByClassName("innerdata")[0];
//console.log(entries)
Array.from(entries.children[0].children).forEach((element, key) => {
    let data = {};
    let comment = element.getElementsByClassName("comment")[0];
    if(!comment) {
        comment = Array.from(element.children)[2].children[0];
    }
    // The last item in the row is the run date
    let dateElement = Array.from(element.children)[3];
    // The second item in the row is TSC runner name
    let nameElement = Array.from(element.children)[1];
    let heading = document.getElementById('heading').innerText;
    data.difficulty = heading.includes('Very Hard') ? 'Very Hard' : heading.includes('Hard') ? 'Hard' : 'Normal';
    data.time = comment.innerText;
    data.comment = comment.title + " [Time Taken (with permission) from https://www.soniccenter.org/ ]";

    // Determine if name needs to change based on nameConversion.json chart
    let name = nameElement.children[0].innerText;
    if(nameConversion[name]) {
        name = nameConversion[name];
    }
    data.name = name;
    // Format date the way it appears on SRC
    let date = dateElement.innerText;
    let formattedDate = `20${date.substring(date.length - 2)}-${date.substring(0, 2)}-${date.substring(date.indexOf("-") + 1, date.indexOf("-") + 3)}`;
    data.date = formattedDate;

    // Create a button which copies all row data to chrome local storage when clicked
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
