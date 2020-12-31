let dataDiv = document.getElementById('dataPreview');
let bigButton = document.getElementById('bigButton');
let dataButton = document.getElementById('dataButton');

let getData = (func) => {
    chrome.storage.local.get('tscData', (data) => {
        data = JSON.parse(data.tscData);
        //console.log(data)
        func(data);
    })
};
bigButton.addEventListener('click', () => {
    getData((data) => {
        console.log("this is the part where we auto-populate data :)")
        //console.log(data);
        console.log(document.children)
    });
})

dataButton.addEventListener('click', () => {
    getData((data) => {
        dataDiv.childNodes.forEach(node => removeChild(node))
        //console.log(data);
        if(data) {
            for(dataPoint in data) {
                let dataPointElement = document.createElement('div');
                dataPointElement.innerText = `${dataPoint}: ${data[dataPoint]}`;
                dataDiv.appendChild(dataPointElement);
            }
        }
    })
});