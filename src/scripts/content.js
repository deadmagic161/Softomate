var name = location.hostname;
var port = chrome.runtime.connect();
var showMessage = false;
var confirmedMessage = false;

port.postMessage({site: name});
port.onMessage.addListener(function (msg) {
    if (!showMessage) {
        var messageWrapper = document.createElement('div');
        var messageButtonContainer = document.createElement('div');
        messageButtonContainer.setAttribute('class', 'message__button-container');
        messageWrapper.setAttribute('class', 'message__block');
        var body = document.querySelector('body');


        var text = document.createElement('h3');
        text.innerHTML = msg + 'Кликните "Закрыть" чтобы не видеть этого сообщения';
        messageWrapper.appendChild(text);

        var ok = document.createElement('a');
        ok.setAttribute('class', 'message__button');
        ok.setAttribute('href', '#close');
        ok.innerHTML = 'Закрыть';

        ok.onclick = function () {
            confirmedMessage = true;
            body.removeChild(messageWrapper);
            port.postMessage({site: name, flag: confirmedMessage});

        };
        messageButtonContainer.appendChild(ok);

        var button_postpone = document.createElement('a');
        button_postpone.setAttribute('href', '#postpone');
        button_postpone.setAttribute('class', 'message__button');
        button_postpone.innerHTML = 'Отложить';
        button_postpone.onclick = function () {
            confirmedMessage = false;
            body.removeChild(messageWrapper);
            port.postMessage({site: name, flag: confirmedMessage});

        };

        messageButtonContainer.appendChild(button_postpone);
        messageWrapper.appendChild(messageButtonContainer);
        body.appendChild(messageWrapper);
        showMessage = true;
    }
});
