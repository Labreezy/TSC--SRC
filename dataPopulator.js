let form = document.getElementsByTagName('FORM')[3];

// Select the input fields based on the their defined ids
// because that's the best way to select elements mmhmm yes sir
let nameField = document.getElementById('player1field');
let timeHour = document.getElementById('hour');
let timeMinute = document.getElementById('minute');
let timeSecond = document.getElementById('second');
let timeMillisecond = document.getElementById('milliseconds');
let date = document.getElementById('date');
let comment = document.getElementById('comment');
let autoVerify = document.getElementById('autoverify');
let platform = Array.from(document.getElementsByTagName('SELECT')).filter((element) => element.name === 'platform')[0];

// Read the data that is currently saved in tscData and set the value
// of the related input field for each because that's definitely the best way to do that mmmmmmhhhhmmmmmm
chrome.storage.local.get(['tscData'], (data) => {
    const tscData = JSON.parse(data.tscData)
    //console.log(tscData)
    nameField.value = tscData.name;
    comment.value = tscData.comment;
    // Splitting the time string into its sub components
    // hopefully no one ever submits an IL time over an hour on TSC or else we boned here
    timeMinute.value = tscData.time.substring(0, tscData.time.indexOf("'"));
    timeSecond.value = tscData.time.substring(tscData.time.indexOf("'") + 1, tscData.time.indexOf('"'));
    timeMillisecond.value = tscData.time.substring(tscData.time.indexOf('"') + 1);
    
    autoVerify.checked = true; // Checks the box that says verify now instead of submitting for review
    date.value = tscData.date; // Date should already be formatted correctly at this point
    platform.value = 23; // 23 means Xbox360, since we assume majority of people run on Xbox360

    setDifficulty(tscData); // Oh boy, I hope this works
});

// Since SRC sees difficulty as a different variable and values for each story,
// we have to check which story we are looking at in order to determine what the variable name is
// then based on that we set the difficulty to the corresponding difficulty value for that variable
// *i hate this*
const setDifficulty = (tscData) => {
    let character = tscData.storyName;
    let difficulty;
    let value;
    // if there is no difficulty element found then we dont want to mess with that weird jank
    if(character === 'Silver') {
        difficulty = document.getElementById('variable48006');
        tscData.difficulty === 'Normal' ? 
            value = 165260 :
        tscData.difficulty === 'Hard' ?
            value = 165262 :
        tscData.difficulty === 'Very Hard' ?
            value = 165264 : console.log("How is this happening???");
    } else if(character === 'Sonic') {
        difficulty = document.getElementById('variable48003');
        tscData.difficulty === 'Normal' ? 
            value = 165248 :
        tscData.difficulty === 'Hard' ?
            value = 165249 :
        tscData.difficulty === 'Very Hard' ?
            value = 165250 : console.log("What??? The barrier is stopping me!");
    } else if(character === 'Shadow') {
        difficulty = document.getElementById('variable48005');
        tscData.difficulty === 'Normal' ? 
            value = 165256 :
        tscData.difficulty === 'Hard' ?
            value = 165257 :
        tscData.difficulty === 'Very Hard' ?
            value = 165258 : console.log("Thrust increasing.");
    }
    if(difficulty && value) {
        difficulty.value = value;
    }
}