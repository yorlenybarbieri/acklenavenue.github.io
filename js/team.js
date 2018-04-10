---
---
'use strict';

var Shuffle = window.Shuffle;
var container = document.querySelector('.my-shuffle-container');
var sizer = container.querySelector('.member-card');
var containerHeight = container.clientHeight;
var cardsAdded = [];
var filteredJson = [];
// Load the JSON file containing all _data/team.json
var membersObjArray = {{ site.data.team | jsonify }};
var limit = 12;

// Create a new instance of the class ShuffleJs (External Class for filtering)
var shuffle = new Shuffle(container, {
  itemSelector: '.picture-item', 
  sizer: null,
  isCentered: true,
  buffer: 0,
  easing: 'ease'
});

// When user click on team-members-filter.html where Acklen Avenue differents department are
function filterTeam(tag) {

  if(tag == "All Ackleners"){
    filteredJson = membersObjArray
    $(".callToAction").addClass("hide-apply-job");
  }
  else if(tag == "Interested in joining the Team?"){
    filteredJson = [];
  
    $(".callToAction").removeClass("hide-apply-job");
  }
  else{
    filteredJson = findByDepartment(membersObjArray, tag);
    $(".callToAction").addClass("hide-apply-job");
  
  }

  //Keep history of filtered team department on page refresh
  history.pushState(null, null, '?filter='+tag);

  setActiveCategorie(tag);
  
  setCategoryTitle(tag);

  reloadContainer(filteredJson)

}

function setActiveCategorie(tag) {
  // loop through all items and remove active class
  var items = document.getElementsByClassName('btn-team');

  for(var i=0; i < items.length; i++) {
    items[i].setAttribute('class', 'btn-team');
  }

  // set the selected tag's item to active
  var formatedTag = tag.split(" ").join("-").toLowerCase()
  var item = document.getElementById(formatedTag + '-item');

  if(item) {
    item.setAttribute('class', 'btn-team team-active');
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
var isFetchingMembers = false,
    shouldFetchMembers = true,
    membersToLoad = limit,
    loadNewMembersThreshold = containerHeight;

function reloadContainer(members){
  enableFetching();

  // Remove all children from the shuffle container
  cleanContainer(container);

  // Load only the first 12 members max(limit)
  loadFirstMembers(container, members, limit);

};

function cleanContainer(container){
  shuffle.remove(container.children);
}

function loadFirstMembers(container, members, limit){
  // Create an array of cards-members
  var _limit = members.length < 12 ? members.length : limit;

  if(members.length < 12){
    disableFetching();
  }
  var cardElements = [];  

  if(members.length == 0) return;
  // Loop trough the 12 only members loaded and push to cardElements array
  for (var i = 0; i < _limit; i++) {

    var cardToBeAdded = addMemberDataToHTMLString(members[i]);

    var newElement = htmlStringToDOM(cardToBeAdded);
    newElement = newElement[0]

    cardElements.push(newElement)
    // Add each member-card to the container class '.my-shuffle-container'
    container.appendChild(newElement);
  }
  
  // Notice to shuffle about the new elements added to the DOM (Required by shuffle)
  shuffle.add(cardElements);
  encodeGravatarEmails();

}

// If there aren't any more members available to load than already visible, disable fetching
if (membersObjArray.length <= membersToLoad)
  disableFetching();

// If there's no spinner, it's not a page where members should be fetched
if ($(".infinite-spinner").length < 1)
  shouldFetchMembers = false;

// Are we close to the end of the page? If we are, load more members
$(window).scroll(function(e){

  if (!shouldFetchMembers || isFetchingMembers) return;
  
  var windowHeight = $(window).height(),
      windowScrollPosition = $(window).scrollTop(),
      bottomScrollPosition = windowHeight + windowScrollPosition,
      documentHeight = $(document).height();


  // If we've scrolled past the loadNewMembersThreshold, fetch posts
  if((documentHeight - loadNewMembersThreshold) < bottomScrollPosition) {
    fetchMembers();
  }
});

// Fetch a chunk of members
function fetchMembers() {
  // Exit if membersObjArray haven't been loaded
  if (!filteredJson) return;
  
  isFetchingMembers = true;
  
  // Load as many posts as there were present on the page when it loaded
  // After successfully loading a post, load the next one
  var loadedMembers = 0,
      memberCount = $(".teamlist").children().length,
      callback = function() {
        loadedMembers++;
        // Load members by limit=12
        var memberIndex = memberCount + loadedMembers;
        
        if (memberIndex > filteredJson.length-1) {
          disableFetching();
          return;
        }
        
        if (loadedMembers < membersToLoad) {
          fetchMemberWithIndex(memberIndex, callback);
        } else {
          isFetchingMembers = false;
        }
      };
  
  fetchMemberWithIndex(memberCount + loadedMembers, callback);
}

function fetchMemberWithIndex(index, callback) {
  if(filteredJson.length === 0 ){
    disableFetching();
    return;
  } 

  var member = filteredJson[index];

  var cardToBeAdded = addMemberDataToHTMLString(member)

  var elements = htmlStringToDOM(cardToBeAdded);

  for (var i = 0; i < elements.length; i++) {
    // Add each member-card to the container class '.my-shuffle-container'
    container.appendChild(elements[i]);
    cardsAdded.push(elements[i])
  }
  
  // Notice to shuffle about the new elements added to the DOM (Required by shuffle)
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

  shouldFetchMembers = false;
  isFetchingMembers = false;
  $(".infinite-spinner").fadeOut();

}

function enableFetching() {
  shouldFetchMembers = true;
  isFetchingMembers = false;
  $(".infinite-spinner").fadeIn();

}

function encodeGravatarEmails(){
  //team gravatar
  $(".member-card .member-card__img-container .member-card__img").each(function () {
    $(this).attr("src", "https://www.gravatar.com/avatar/" + md5($(this).attr("alt")) + "?s=400&d=mm");
  });
}


/* ============ Keep Filters on Page Reload  ============= */
// Add tags to browser url in order to keep team filter by department on page refresh
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

if (param === "undefined"){
  filterTeam("All Ackleners");
} else {
  filterTeam(param);
}


  


