


var Shuffle = window.Shuffle;
var element = document.querySelector('.my-shuffle-container');
var sizer = element.querySelector('.member-card');

var shuffleInstance = new Shuffle(element, {
  itemSelector: '.picture-item', 
  sizer: sizer,
  isCentered: true
});


function filterTeam(tag) {
    setActiveCategorie(tag)
    shuffleInstance.filter(tag);
}

function setActiveCategorie(tag) {
  // loop through all items and remove active class
  var items = document.getElementsByClassName('btn btn--ghost');
  console.log("items: ", items.length)
  for(var i=0; i < items.length; i++) {
    items[i].setAttribute('class', 'btn btn--ghost');
  }

  // set the selected tag's item to active
  var formatedTag = tag.split(" ").join("-").toLowerCase()
  var item = document.getElementById(formatedTag + '-item');
  console.log("Item: ", item)
  if(item) {
    item.setAttribute('class', 'btn btn--ghost btn--ghost-active');
  }
}