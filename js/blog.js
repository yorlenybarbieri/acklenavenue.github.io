if(window.location.hash) {
  var tag = window.location.hash.split('#')[1];
  filter(tag);
}

function filter(tag) {
  setActiveTag(tag);
  showContainer(tag);
}

function setActiveTag(tag) {
  // loop through all items and remove active class
  var items = document.getElementsByClassName('chips');
  for(var i=0; i < items.length; i++) {
    items[i].setAttribute('class', 'chips');
  }

  // set the selected tag's item to active
  var item = document.getElementById(tag + '-item');
  if(item) {
    item.setAttribute('class', 'chips active');
  }
}

function showContainer(tag) {
  // loop through all lists and hide them
  var lists = document.getElementsByClassName('blog-feed__container');
  for(var i=0; i < lists.length; i++) {
    lists[i].setAttribute('class', 'blog-feed__container hidden');
  }

  // remove the hidden class from the list corresponding to the selected tag
  var list = document.getElementById(tag + '-container');
  if(list) {
    list.setAttribute('class', 'blog-feed__container');
  }

  // loop through all lists and hide them
  var lists = document.getElementsByClassName('blog-count-posts');
  for(var i=0; i < lists.length; i++) {
    lists[i].setAttribute('class', 'blog-count-posts hidden');
  }

  // remove the hidden class from the list corresponding to the selected tag
  var list = document.getElementById(tag + '-label');
  if(list) {
    list.setAttribute('class', 'blog-count-posts');
  }
}

$(document).scroll(function() {
  var y = $(this).scrollTop();
  if (y > 600) {
    $('.share-bar').fadeIn();
  } else {
    $('.share-bar').fadeOut();
  }
});
