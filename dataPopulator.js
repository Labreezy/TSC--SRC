let form = document.getElementsByTagName('FORM')[3];
console.log(form)
let nameField = document.getElementById('player1field');
let timeHour = document.getElementById('hour');
let timeMinute = document.getElementById('minute');
let timeSecond = document.getElementById('second');
let timeMillisecond = document.getElementById('milliseconds');
let difficulty = document.getElementById('variable48006');
let date = document.getElementById('date');
let comment = document.getElementById('comment');
let autoVerify = document.getElementById('autoverify');
let platform = Array.from(document.getElementsByTagName('SELECT')).filter((element) => element.name === 'platform')[0];

chrome.storage.local.get(['tscData'], (data) => {
    const tscData = JSON.parse(data.tscData)
    //console.log(tscData)
    nameField.value = tscData.name;
    comment.value = tscData.comment;
    timeMinute.value = tscData.time.substring(0, tscData.time.indexOf("'"));
    timeSecond.value = tscData.time.substring(tscData.time.indexOf("'") + 1, tscData.time.indexOf('"'));
    timeMillisecond.value = tscData.time.substring(tscData.time.indexOf('"') + 1);
    tscData.difficulty === 'Normal' ? 
        difficulty.value = 165260 :
    tscData.difficulty === 'Hard' ?
        difficulty.value = 165262 :
    tscData.difficulty === 'Very Hard' ?
        difficulty.value = 165264 : console.log("No difficulty found");
    autoVerify.checked = true;
    date.value = tscData.date;
    platform.value = 23;
    //console.log(reformattedDate);
    //console.log(platform)
});