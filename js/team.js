
var Shuffle = window.Shuffle;
var element = document.querySelector('.my-shuffle-container');
var sizer = element.querySelector('.member-card');

var shuffleInstance = new Shuffle(element, {
  itemSelector: '.picture-item', 
  sizer: null,
  isCentered: true,
  buffer: 1,

});


function filterTeam(tag) {
    setActiveCategorie(tag)
    setCategoryTitle(tag)
    shuffleInstance.filter(tag);
}

function setActiveCategorie(tag) {
  // loop through all items and remove active class
  var items = document.getElementsByClassName('btn btn--ghost');

  for(var i=0; i < items.length; i++) {
    items[i].setAttribute('class', 'btn btn--ghost');
  }

  // set the selected tag's item to active
  var formatedTag = tag.split(" ").join("-").toLowerCase()
  var item = document.getElementById(formatedTag + '-item');

  if(item) {
    item.setAttribute('class', 'btn btn--ghost btn--ghost-active');
  }
}

function setCategoryTitle(tag){

    //$(".teamlist__title").text(tag);
    document.getElementById('teamlist__title').textContent = tag;

}

filterTeam("All Ackleners");
