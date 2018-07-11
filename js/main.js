'use strict';

var boton = document.querySelector('.buscador__boton');
var input = document.querySelector('.buscador__input');
var ul = document.querySelector('.secondSection__listado');

function buscaSerie() {
  fetch('http://api.tvmaze.com/search/shows?q=' + input.value)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      var series = json;
      for (var i = 0; i < series.length; i++) {
        var li = document.createElement('li');
        var h2 = document.createElement('h2');
        var content = document.createTextNode(series[i].show.name);
        h2.appendChild(content);
        li.appendChild(h2);
        ul.appendChild(li);
        var image = document.createElement('img');
        li.appendChild(image);
        image.src = series[i].show.image.medium;
      }
    });
}

boton.addEventListener('click', buscaSerie);

