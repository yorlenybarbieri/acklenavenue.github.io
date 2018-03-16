---
---
'use strict';

var Shuffle = window.Shuffle;
var container = document.querySelector('.my-shuffle-container');
var sizer = container.querySelector('.member-card');
var containerHeight = container.clientHeight;
var cardsAdded = [];
var selectedFilter = "";
var filteredJson = [];
// Load the JSON file containing all URLs
var membersObjArray = {{ site.data.team | jsonify }};
var limit = 12;
$(window).unbind('scroll');

var shuffle = new Shuffle(container, {
  itemSelector: '.picture-item', 
  sizer: null,
  isCentered: true,
  buffer: 0,
  easing: 'ease'
});

function filterTeam(tag) {

  if(tag == "All Ackleners"){
    filteredJson = membersObjArray
  }
  else{
    filteredJson = findByDepartment(membersObjArray, tag);
  }

  history.pushState(null, null, '?filter='+tag);

  selectedFilter = tag

  setActiveCategorie(tag);
  
  setCategoryTitle(tag);

  reloadContainer(filteredJson)

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

function findByDepartment(members, tag){
  return membersObjArray.filter(function(member) {
    return member.department.indexOf(tag) > -1;
  });
}

function setCategoryTitle(tag){
  $(".teamlist__title").text(tag);
  //document.getElementById('teamlist__title').textContent = tag;
}

////******Infinite Scrolling Logic*******//////
var isFetchingPosts = false,
    shouldFetchPosts = true,
    postsToLoad = limit,
    loadNewPostsThreshold = containerHeight;



function reloadContainer(members){
  //remove all children from the shuffle container
  cleanContainer(container);

  //load only the first 12 members (limit)
  loadFirstMembers(container, members, limit);

};

function cleanContainer(container){
  shuffle.remove(container.children);
}

function loadFirstMembers(container, members, limit){

  var cardElements = [];  

  if(members.length == 0) return;

  for (var i = 0; i < limit; i++) {

    var cardToBeAdded = addMemberDataToHTMLString(members[i]);

    var newElement = htmlStringToDOM(cardToBeAdded);
    newElement = newElement[0]

    cardElements.push(newElement)

    container.appendChild(newElement);
  }
  
  shuffle.add(cardElements);
  encodeGravatarEmails();

}

// If there aren't any more posts available to load than already visible, disable fetching
if (membersObjArray.length <= postsToLoad)
  disableFetching();


// If there's no spinner, it's not a page where posts should be fetched
if ($(".infinite-spinner").length < 1)
  shouldFetchPosts = false;

// Are we close to the end of the page? If we are, load more posts
$(window).scroll(function(e){
  if (!shouldFetchPosts || isFetchingPosts) return;
  
  var windowHeight = $(window).height(),
      windowScrollPosition = $(window).scrollTop(),
      bottomScrollPosition = windowHeight + windowScrollPosition,
      documentHeight = $(document).height();


  // If we've scrolled past the loadNewPostsThreshold, fetch posts
  if((documentHeight - loadNewPostsThreshold) < bottomScrollPosition) {
    fetchPosts();
  }
});

// Fetch a chunk of posts
function fetchPosts() {
  // Exit if membersObjArray haven't been loaded
  if (!filteredJson) return;
  
  isFetchingPosts = true;
  
  // Load as many posts as there were present on the page when it loaded
  // After successfully loading a post, load the next one
  var loadedPosts = 0,
      postCount = $(".teamlist").children().length,
      callback = function() {
        loadedPosts++;
        var postIndex = postCount + loadedPosts;
        console.log('postIndex: ', postIndex);
        
        if (postIndex > filteredJson.length-1) {
          disableFetching();
          return;
        }
        
        if (loadedPosts < postsToLoad) {
          fetchPostWithIndex(postIndex, callback);
        } else {
          isFetchingPosts = false;
        }
      };
  
  fetchPostWithIndex(postCount + loadedPosts, callback);
}

function fetchPostWithIndex(index, callback) {
  if(filteredJson.length === 0 ){
    disableFetching();
    return;
  } 


  var member = filteredJson[index];

  //if(member.department.indexOf(selectedFilter) === -1) return;

  var cardToBeAdded = addMemberDataToHTMLString(member)

  var elements = htmlStringToDOM(cardToBeAdded);

  for (var i = 0; i < elements.length; i++) {
    container.appendChild(elements[i]);
    cardsAdded.push(elements[i])
  }
  
  shuffle.add(elements);
  encodeGravatarEmails();
  callback();


}


function addMemberDataToHTMLString(member){
  return `<div class="member-card picture-item lazy" data-groups='"${member.department}"'>
    <div class="member-card__img-container">
      <div class="member-card__quote">
        <p>${member.quote}</p>
      </div>
      <img class="member-card__img" alt="${member.gravatarEmail}">
    </div>
  
    <div class="member-card__info">
      <p class="member-card__name">
        ${ member.name  } ${ member.lastName }
      </p>
      <p class="member-card__position">
        ${ member.position }
      </p>
      <p class="member-card__location">
        ${ member.location }
      </p>
      <div class="member-card__icons">
        {% unless member.twitter == ''  %}
          <a href="${member.twitter}"><svg class="icon icon-twittergreen"><use xlink:href="img/external-links.svg#icon-twittergreen"></use></svg></a>
        {% endunless %}

        {% unless member.facebook == '' %}
          <a href="${member.facebook}"><svg class="icon icon-facebookgreen"><use xlink:href="img/external-links.svg#icon-facebookgreen"></use></svg></a>
        {% endunless %}

        {% unless member.linkedin == ''  %}
          <a href="${member.linkedin}"><svg class="icon icon-linkedingreen"><use xlink:href="img/external-links.svg#icon-linkedingreen"></use></svg></a>
        {% endunless %}
    
        {% unless member.github == ''  %}
          <a href="${member.github}"><svg class="icon icon-githubgreen"><use xlink:href="img/external-links.svg#icon-githubgreen"></use></svg></a>
        {% endunless %}
      </div>    
    </div>

  </div>`
}


function htmlStringToDOM(string){
  return $.parseHTML(string);
}

function disableFetching() {

  shouldFetchPosts = false;
  isFetchingPosts = false;
  $(".infinite-spinner").fadeOut();

}

function encodeGravatarEmails(){
  //team gravatar
  $(".member-card .member-card__img-container .member-card__img").each(function () {
    $(this).attr("src", "https://www.gravatar.com/avatar/" + md5($(this).attr("alt")) + "?s=400&d=mm");
  });
}

function GetURLParameter(sParam){

  var sPageURL = window.location.search.substring(1);

  var sURLVariables = sPageURL.split('&');

  for (var i = 0; i < sURLVariables.length; i++){

      var sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] == sParam)

      {

          return sParameterName[1];

      }

  }

}

var param = GetURLParameter('filter');

param = decodeURIComponent(param);

if(param === "undefined"){
  filterTeam("All Ackleners");
}else{
  filterTeam(param);
}


  


