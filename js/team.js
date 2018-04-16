---
---
'use strict';

var Shuffle = window.Shuffle;
var container = document.querySelector('.my-shuffle-container');
var sizer = container.querySelector('.member-card');
var containerHeight = container.clientHeight;

var membersObjArray = {{ site.data.team | jsonify }};

var shuffle = new Shuffle(container, {
  itemSelector: '.picture-item', 
  sizer: null,
  isCentered: true,
  buffer: 0,
  speed: 250
});

function filterTeam(tag) {

  if(tag == "Interested in joining the Team?"){
    $(".callToAction").removeClass("hide-apply-job");
  }else{
    $(".callToAction").addClass("hide-apply-job");
  }

  //Keep history of filtered team department on page refresh
  history.pushState(null, null, '?filter='+tag);

  setActiveCategorie(tag);
  
  setCategoryTitle(tag);

  shuffle.filter(tag);

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


function setCategoryTitle(tag){
  $(".teamlist__title").text(tag);
  $(".dropbtn-text").text(tag);
}


function addMemberDataToHTMLString(member){
  if(!member) return '<div/>';
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

function getURLParam(){
  var param = GetURLParameter('filter');
  return decodeURIComponent(param);
}


/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


var param = getURLParam();


if (param === "undefined"){
  filterTeam("All Ackleners");
} else {
  filterTeam(param);
}

  


