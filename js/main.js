'use strict';

var boton = document.querySelector('.buscador__boton');
var input = document.querySelector('.buscador__input');
var ul = document.querySelector('.secondSection__listado');

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

      var series = json;

      for (var i = 0; i < series.length; i++) {

        var li = document.createElement('li');
        var h2 = document.createElement('h2');
        var image = document.createElement('img');
        var content = document.createTextNode(series[i].show.name);

        li.classList.add('listado__items');
        h2.classList.add('items__title');
        li.appendChild(image);
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
function favorito(event) { //esta función recibe como parámetro un evento que ha sido disparado e identifica quién lo disparó para añadirle o quitarle una clase.
  // li.classList.toggle('listado__items--favorito'); --> el último es sobre quien actúa la función.
  // event.currentTarget; --> identifica el elemento que ha llamado a la función. 
  event.currentTarget.classList.toggle('listado__items--favorito');
}

boton.addEventListener('click', buscaSerie);

