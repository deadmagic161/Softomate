window.onload = function () {
    var xhr = new XMLHttpRequest(), data;
    xhr.open('get', 'https://www.softomate.net/ext/employees/list.json', true);
    xhr.send();
    xhr.onload = function () {
        if (xhr.status != 200) {
            console.log(xhr.status + ':' + xhr.statusText);
        } else {
            data = JSON.parse(xhr.responseText);
        }
        for (let i = 0; i < data.length; i++) {
            let list = document.querySelector('.site-list__list');
            let item = document.createElement('li');
            item.setAttribute('class', 'site-list__item');
            let link = document.createElement('a');
            link.setAttribute('class', 'site-list__link');
            link.setAttribute('href', 'https://www.' + data[i].domain);
            link.setAttribute('target', '_blank');
            link.innerHTML = data[i].name;

            item.appendChild(link);
            list.appendChild(item);
        }
    };
};
