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
let level = Array.from(document.getElementsByTagName('SELECT')).filter((element) => element.name === 'level')[0];
let levels = ["WindyHill", "DesertRuins", "TropicalCoast", "FrozenFactory", "SilentForest", "SkyRoad", "LavaMountain"];
let base_var = 140229;
let catgegory = document.getElementById('category');
// Read the data that is currently saved in tscData and set the value
// of the related input field for each because that's definitely the best way to do that mmmmmmhhhhmmmmmm
chrome.storage.local.get(['tscData'], (data) => {
    const tscData = JSON.parse(data.tscData)
    console.log(tscData)
    nameField.value = tscData.name;
    comment.value = tscData.comment;
    // Splitting the time string into its sub components
    // hopefully no one ever submits an IL time over an hour on TSC or else we boned here
    let splittime = tscData.time.split(":")
    timeMinute.value = splittime[0];
    timeSecond.value = splittime[1];
    
    timeMillisecond.value = parseInt(splittime[2])*10;
    
    autoVerify.checked = true; // Checks the box that says verify now instead of submitting for review
    date.value = tscData.date; // Date should already be formatted correctly at this point
    //wii u only happened in 2015
    let year = tscData.date.substring(0,4);
    if(parseInt(year) <= 2015){
        platform.value = 7;
    } else {
        platform.value = 31; // 31 is PC, 7 is wii u, assume people run here in the current year
    }
    let levelidx = levels.indexOf(tscData.level);
    if(levelidx >= 0){
        level.value = base_var + levelidx; //lol hax
    } else {
        console.log("zoned out :)");
    }
    category.value = "Zone_" + tscData.zone;
});

// Since SRC sees difficulty as a different variable and values for each story,
// we have to check which story we are looking at in order to determine what the variable name is
// then based on that we set the difficulty to the corresponding difficulty value for that variable
// *i hate this* (me too wike, me too)

