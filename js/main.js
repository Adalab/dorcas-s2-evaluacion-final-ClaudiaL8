'use strict';

var boton = document.querySelector('.buscador__boton');
var input = document.querySelector('.buscador__input');
var ul = document.querySelector('.secondSection__listado');
var li;



function resetear() {
  ul.innerHTML = '';
}
function buscaSerie() {
  resetear();
  fetch('https://api.tvmaze.com/search/shows?q=' + input.value)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {

      var series = json;

      for (var i = 0; i < series.length; i++) {

        li = document.createElement('li');
        var h2 = document.createElement('h2');
        var image = document.createElement('img');
        var content = document.createTextNode(series[i].show.name);
        // crear atributo y meter el id
        var id = (series[i].show.id);
        li.setAttribute('data-id', id);
        // -----------------------------
        li.classList.add('listado__items');
        h2.classList.add('items__title');
        image.classList.add('imagen');
        li.appendChild(image);
        h2.appendChild(content);
        ul.appendChild(li);
        li.appendChild(h2);
        
        li.addEventListener('click', favorito);
        
        if (series[i].show.image !== null) {
          image.src = series[i].show.image.medium;
        } else {
          image.src = ('https://via.placeholder.com/210x295/cccccc/666666/?text=TV');
        }
      }
    });
}
// function guardar() {
//   fetch('https://api.tvmaze.com/search/shows?q=' + input.value)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (json) {

//       var series = json;

//       for (var i = 0; i < series.length; i++) {
//         var li = document.createElement('li');
//         var id = (series[i].show.id);
//         li.setAttribute('data-id', series[i].show.id);
//         localStorage.setItem('favorito', data-id);
//       }
//     });
// }
function favorito(event) { //esta función recibe como parámetro un evento que ha sido disparado e identifica quién lo disparó para añadirle o quitarle una clase.
  // li.classList.toggle('listado__items--favorito'); --> para poner/quitar una clase en caso de que no la tenga (o sí).
  // event.currentTarget; --> identifica el elemento que ha llamado a la función. 
  event.currentTarget.classList.toggle('listado__items--favorito');
}

// elementoFavorito.addEventListener('click', guardar);



boton.addEventListener('click', buscaSerie);