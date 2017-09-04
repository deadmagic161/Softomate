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
