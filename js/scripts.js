var $_ = function (selector, node = document) {
  return node.querySelector(selector);
};

var $$_ = function (selector, node = document) {
  return node.querySelectorAll(selector);
};

var displayPokemons = function(array, output) {
  var elTemplateCard = $_('.card-template').content;  //card template
  output.innerHTML = '';


  var foundPakemonsFragment = document.createDocumentFragment()
  array.forEach(function (arrayItem) {
    var foundPokemonsItem = elTemplateCard.cloneNode(true);

    $_(`.js-card-link`, foundPokemonsItem).dataset.id = arrayItem.id;
    $_(`.js-pokemon-img`, foundPokemonsItem).dataset.id = arrayItem.id;
    $_(`.js-pokemon-img`, foundPokemonsItem).src = arrayItem.img;
    $_(`.js-pokemon-name`, foundPokemonsItem).textContent = arrayItem.name;
    $_(`.js-pokemon-name`, foundPokemonsItem).textContent = arrayItem.name;

    for(var i = 0; i < arrayItem.type.length; i++) {
      var elSpan = document.createElement('span');
      elSpan.setAttribute('class', 'mr-3 font-weight-bold text-card-info');
      elSpan.textContent = arrayItem.type[i];
      $_('.js-spanbox', foundPokemonsItem).appendChild(elSpan);
    }
    foundPakemonsFragment.appendChild(foundPokemonsItem)
  });
  output.appendChild(foundPakemonsFragment)
}



var createElement = function (tagName, className, text) {
  var element = document.createElement(tagName);
  element.setAttribute('class', className);

  if (text) {
    element.textContent = text;
  }

  return element;
};
// Elementlarni tanlab oluvchi va yangi element tuzuvchi funksiyalar


var categories = [];


// DOM ga oid elementlar.

var elForm = $_('.js-from');
var elSearchInput = $_('.js-search-input');
var elTypeBtn = $_('.js-type-link');
var elCotigoryPokemonsList = $_('.js-catigories-list');
var elAllPokemonsList = $_('.js-pokemons-list');
var elModalWrapper = $_('.js-madal-wrapper');
var elTemplateCatigory = $_('.catigorya-template').content; //categories template

// var elModal = $_('.load-more-btn');

displayPokemons(pokemons, elAllPokemonsList);
pokemons.forEach(function(pokemon) {
  pokemon.type.forEach(function(category){
    if (!categories.includes(category)) {
      categories.push(category);
    }
  });
});

var elCotigoryFragment = document.createDocumentFragment()
categories.forEach (function (category) {
  var catigoryItem = elTemplateCatigory.cloneNode(true);

  $_(`.js-catigories-item`, catigoryItem).textContent = category;
  $_(`.js-catigories-item`, catigoryItem).dataset.id = category;

  elCotigoryFragment.appendChild(catigoryItem);

});
elCotigoryPokemonsList.appendChild(elCotigoryFragment)

elForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
});
elForm.addEventListener(`keyup`, function() {
  var inputValue = new RegExp(elSearchInput.value, `gi`);


  var foundPokemons = pokemons.filter(function (pokemon){
    return pokemon.name.match(inputValue);
  });

  displayPokemons(foundPokemons, elAllPokemonsList);

});

// type lari boyicha filtr qilish
elCotigoryPokemonsList.addEventListener('click', function(evt) {

  if(evt.target.matches('a')) {
    var newSelect = pokemons.filter(function(pokemon) {
      return pokemon.type.includes(evt.target.dataset.id);
    })
  }
  displayPokemons(newSelect, elAllPokemonsList);
});



elAllPokemonsList.addEventListener('click', function(evt) {
  if (evt.target.matches('.js-card-link') || evt.target.matches(`img`)){
    var pokemonCardItem = pokemons.find(function (pokemon){
      return Number(evt.target.dataset.id) === pokemon.id;
    })
    console.log(pokemonCardItem)
    $_('.js-modal-img').src = pokemonCardItem.img;
    $_('.js-modal-img').alt = pokemonCardItem.name;
    $_('.js-m-pokemon-title').textContent = pokemonCardItem.name;
    $_('.js-modal-img').textContent = pokemonCardItem.type.join('  |  ');
  }
});