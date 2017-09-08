var dataJson = [];
var newDataJson = [];

function updateJson() {
    var xhr = new XMLHttpRequest(), data;
    xhr.open('get', 'https://www.softomate.net/ext/employees/list.json', true);
    xhr.send();
    xhr.onload = function () {
        if (xhr.status != 200) {
            console.log(xhr.status + ':' + xhr.statusText);
        } else {
            data = JSON.parse(xhr.responseText);
        }
        for (var i = 0; i < data.length; i++) {
            dataJson[i] = data[i];
        }
    }
};

function newDataJsonItem(site, flag, counter) {
    this.site = site;
    this.flag = flag;
    this.counter = counter;
}

updateJson();

setInterval(updateJson, 3600000);

setTimeout(function () {
    for (var i = 0; i < dataJson.length; i++) {
        newDataJson[i] = new newDataJsonItem(dataJson[i], false, 0);
    }
}, 2500);

chrome.runtime.onConnect.addListener(function (port) {
    port.onMessage.addListener(function (msg) {
        for (var i = 0; i < newDataJson.length; i++) {
            if (msg.site == 'www.' + newDataJson[i].site.domain) {
                newDataJson[i].counter++;
                if (msg.flag) {
                    newDataJson[i].flag = true;
                }
                else if ((newDataJson[i].counter <= 6) && (!newDataJson[i].flag)) {
                    port.postMessage(newDataJson[i].site.message);
                }
            }
        }
    });
});