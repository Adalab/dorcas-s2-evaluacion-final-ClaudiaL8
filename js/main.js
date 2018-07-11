'use strict';

var boton = document.querySelector('.buscador__boton');
var input = document.querySelector('.buscador__input');
var ul = document.querySelector('.secondSection__listado');
var series;
var li;

function resetear() {
  ul.innerHTML = '';
}
function buscaSerie() {
  resetear();
  fetch('http://api.tvmaze.com/search/shows?q=' + input.value)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      series = json;
      for (var i = 0; i < series.length; i++) {
        li = document.createElement('li');
        li.classList.add('listado__items');
        var image = document.createElement('img');
        li.appendChild(image);
        var h2 = document.createElement('h2');
        var content = document.createTextNode(series[i].show.name);
        h2.appendChild(content);
        ul.appendChild(li);
        li.appendChild(h2);
        li.addEventListener('click', favorito);
        if (series[i].show.image === null) {
          image.src = ('https://via.placeholder.com/210x295/cccccc/666666/?text=TV');
        } else {
          image.src = series[i].show.image.medium;
        }
      }
    });
}
function favorito() {
  li.classList.toggle('listado__items--favorito');
}

boton.addEventListener('click', buscaSerie);

