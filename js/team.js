


var Shuffle = window.Shuffle;
var element = document.querySelector('.my-shuffle-container');
var sizer = element.querySelector('.member-card');

var shuffleInstance = new Shuffle(element, {
  itemSelector: '.picture-item', sizer: sizer
});


function filterTeam(tag) {
  shuffleInstance.filter(tag);
}