window.onload = function () {
    var xhr = new XMLHttpRequest(), data;
    xhr.open('get', 'http://www.softomate.net/ext/employees/list.json', true);
    xhr.send();
    xhr.onload = function () {
        if (xhr.status != 200) {
            console.log(xhr.status + ':' + xhr.statusText);
        } else {
            data = JSON.parse(xhr.responseText);
        }
        for (var i = 0; i < data.length; i++) {
            const list = document.querySelector('.site-list__list');
            const item = document.createElement('li');
            item.setAttribute('class', 'site-list__item');
            const link = document.createElement('a');
            link.setAttribute('class', 'site-list__link');
            link.setAttribute('href', 'https://www.' + data[i].domain);
            link.setAttribute('target', '_blank');
            link.innerHTML = data[i].name;

            item.appendChild(link);
            list.appendChild(item);
        }
    };

    var name = location.hostname;
    var port = chrome.runtime.connect();
    var showMessage = false;
    var confirmedMessage = false;

    port.postMessage({site: name});
    port.onMessage.addListener(function(msg){
        if(!showMessage){
            var block = createElement('div');
            block.setAttribute('class', 'message__block');
            var body = document.querySelector('body');


            var text = document.createElement('h3');
            text.innerHTML = msg + 'Кликните "Закрыть" и этого сообщения больше не будет';
            block.appendChild(text);

            var ok = document.createElement('a');
            ok.setAttribute('class', 'message__button');
            ok.setAttribute('href', '#close');
            ok.innerHTML = 'Закрыть';

            ok.onclick = function(){
                confirmedMessage = true;
                body.removeChild(block);
                port.postMessage({site: name, flag: confirmedMessage});
                var dataJson = [];
                var newDataJson = [];

                function newDataJsonItem(site, flag, counter) {
                    this.site = site;
                    this.flag = flag;
                    this.counter = counter;
                }

                function updateJson() {
                    for(var i = 0; i < data.length; i++) {
                        dataJson[i] = data[i];
                        console.log(data);
                    }
                }


                setInterval(updateJson, 3600000);

                setTimeout(function () {
                    for (var i = 0; i < dataJson.length; i++) {
                        newDataJson[i] = new newDataJsonItem(dataJson[i], false, 0);
                    }
                }, 2500);

                chrome.runtime.onConnect.addListener(function (port) {
                    port.onMessage.addListener(function (msg) {
                        for (var i = 0; i < newDataJson.length; i++) {
                            if (msg.site == 'www.' + newDataJson.site.domain) {
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
            };
            block.appendChild(ok);

            var button_postpone = document.createElement('a');
            button_postpone.setAttribute('href', '#postpone');
            button_postpone.setAttribute('class', 'message__button');
            button_postpone.innerHTML = 'Отложить';
            button_postpone.onclick = function(){
                confirmedMessage = false;
                body.removeChild(block);
                port.postMessage({site: name, flag:confirmedMessage});

            };

            block.appendChild(button_postpone);
            body.appendChild(block);
            showMessage = true;

        }
    });


};
