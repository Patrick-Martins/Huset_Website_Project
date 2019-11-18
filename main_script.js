//window.addEventListener("DOMContentLoaded", getData);
//
//function getData() {
//    console.log("getData");
//    fetch("http://liatalony.com/liatalony/wp-json/wp/v2/event?_embed&per_page=100")
//        .then(res => res.json())
//        .then(handleData)
//}
//
//function handleData(myData) {
//    //1 loop
//    myData.forEach(showEvent);
//}
//
//function showEvent(event) {
//    console.log(event);
//
//    //2 clone a template
//    const template = document.querySelector(".postTemplate").content;
//    const eventCopy = template.cloneNode(true);
//
//    //3 textcontent & innerHTML
//
//    const a = eventCopy.querySelector("a");
//    a.href = "sub_script.html?id=" + event.id;
//
//    //    const content=eventCopy.querySelector("section");
//    //    content.innerHTML=event.content.rendered;
//
//
//    const eventImage = eventCopy.querySelector("img");
//    const imagePath = event._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url;
//    eventImage.src = imagePath;
//
//
//    console.log(event.featured_media)
//    console.log(event.event_date)
//
//
//    const eventDate = eventCopy.querySelector("#event_date");
//    eventDate.textContent = `${event.event_date} at ${event.event_time}`;
//
//    console.log("this is the time" + event.event_time)
//
//    const eventPrice = eventCopy.querySelector("#event_price");
//    eventPrice.textContent = `${event.price}`;
//
//    const eventLocation = eventCopy.querySelector("#event_location");
//    eventLocation.textContent = `${event.where}`;
//
//    //     const eventPrice = eventCopy.querySelector("#event_date");
//    //    eventTitle.textContent = event.;
//
//    const eventTitle = eventCopy.querySelector("#event_title");
//    eventTitle.innerHTML = event.title.rendered; //.rendered because it is already rendered in the event post itself
//
//
//    //4 append
//    document.querySelector("#events").appendChild(eventCopy);
//}
//
//
//
//
////////////////////////////////////////////////////BUTTONS
//
//const activityBTN = document.getElementById("activity");
//const activity_container = document.getElementById("activity-container")
//
//console.log(activity_container.style.display);
//
//
//activityBTN.addEventListener("click", function () {
//    if (activity_container.style.display == "none") {
//        activity_container.style.display = "flex";
//
//        console.log("Display is set to FLEX");
//        console.log(activity_container.style.display);
//
//    } else if (activity_container.style.display == "flex") {
//        activity_container.style.display = "none";
//
//        console.log("Display is set to NONE");
//        console.log(activity_container.style.display);
//    } else {
//        activity_container.style.display = "flex";
//    }
//});
//
//
//const musicBTN = document.getElementById("music");
//const movieBTN = document.getElementById("movie");
//const exhibitionBTN = document.getElementById("exhibition");
//const gameBTN = document.getElementById("game");
//
//
//fetch("http://liatalony.com/liatalony/wp-json/wp/v2/categories")
//    .then(res => res.json())
//    .then(handleData)
//
//musicBTN.addEventListener("click", function () {
//    window.location.href = "http://liatalony.com/liatalony/wp-json/wp/v2/event?_embed&per_page=100&category=" + musicBTN.textContent;
//
//
//});
//
//
//






//when the page loads, call the init function
window.addEventListener("DOMContentLoaded", init);

function init() {
    const urlParams = new URLSearchParams(window.location.search);
    //grab search=something from the url (it might not exist)
    const search = urlParams.get("search");
    //grab id=something from the url (it might not exist)
    const id = urlParams.get("id");
    const category = urlParams.get("category");

    if (search) { //if search has a value (I get results from the search)
        getSearchData();
    } else if (id) { //if id has a value
        getEvent();
    } else if (category) {
        //category stuff
        getCategoryData(category);
    } else { // if neither is true, get data from the default fetching of the frontpage
        getFrontpageData();
    } //I want to get the navigation based on the category data in any case
    getNavigation()






    const eventsTAB = document.querySelector(".events_tab");
    const aboutTAB = document.querySelector(".about_tab");

    const about = urlParams.get("about");

    eventsTAB.addEventListener("click", function () {
        //so that the about parameter doesnt disappear in case the user clicks to refresh
        window.location.href = "index.html?about=" + about;
    });
    aboutTAB.addEventListener("click", function () {
        if (about) {
            window.location.href = about;
        } else {
            window.location.href = "about.html?events=" + window.location.href;
        }
    });









}

function getNavigation() {
    fetch("http://liatalony.com/liatalony/wp-json/wp/v2/categories?_embed&per_page=100")
        .then(res => res.json())
        .then(categoryData => {
            //console.log(data)
            categoryData.forEach(addLink)
        })
}

function addLink(oneCategory) {
    //console.log(oneItem)
    //document.querySelector("nav").innerHTML += oneItem.name
    //    if (oneCategory.parent === 14 && oneCategory.count > 0) {
    const link = document.createElement("a");
    link.textContent = oneCategory.name.toUpperCase();
    link.setAttribute("href", "index.html?category=" + oneCategory.id)
    document.querySelector(".sort-container").appendChild(link);
    //    }
}

//function getSearchData(){
//  const urlParams = new URLSearchParams(window.location.search);
//  const search = urlParams.get("search");
//
//  fetch("https://kea-alt-del.dk/t9_2019_autumn/wp-json/wp/v2/book?_embed&search="+search)
//    .then(res=>res.json())
//    .then(handleData)
//}

function getFrontpageData() { //fetch all the default data
    console.log("getData");
    fetch("http://liatalony.com/liatalony/wp-json/wp/v2/event?_embed&per_page=100")
        .then(res => res.json())
        .then(handleData)
}

function getCategoryData(catId) { //fetch all the category data
    console.log(catId)
    fetch("http://liatalony.com/liatalony/wp-json/wp/v2/event?_embed&categories=" + catId)
        .then(res => res.json())
        .then(handleData)
}

function getEvent() { //fetch the data of a specific event
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    fetch("http://liatalony.com/liatalony/wp-json/wp/v2/event/" + id)
        .then(res => res.json())
        .then(showEvent)

    function showEvent(event) {
        document.querySelector("main h1").textContent = event.title.rendered;
    }
}

function handleData(myData) {
    myData.forEach(showPost);
}

function showPost(event) {
    const urlParams = new URLSearchParams(window.location.search);
    const about = urlParams.get("about");
    console.log(event);

    //2 clone a template
    const template = document.querySelector(".postTemplate").content;
    const eventCopy = template.cloneNode(true);

    //3 textcontent & innerHTML

    const a = eventCopy.querySelector("a");
    a.href = "sub_script.html?id=" + event.id + "&about=" + about;

    //    const content=eventCopy.querySelector("section");
    //    content.innerHTML=event.content.rendered;


    const eventImage = eventCopy.querySelector("img");
    const imagePath = event._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;
    eventImage.src = imagePath;


    console.log(event.featured_media)
    console.log(event.event_date)


    const eventDate = eventCopy.querySelector("#event_date");
    eventDate.textContent = `${event.event_date} at ${event.event_time}`;

    console.log("this is the time" + event.event_time)

    const eventPrice = eventCopy.querySelector("#event_price");
    eventPrice.textContent = `${event.price}`;

    const eventLocation = eventCopy.querySelector("#event_location");
    eventLocation.textContent = `${event.where}`;

    //     const eventPrice = eventCopy.querySelector("#event_date");
    //    eventTitle.textContent = event.;

    const eventTitle = eventCopy.querySelector("#event_title");
    eventTitle.innerHTML = event.title.rendered; //.rendered because it is already rendered in the event post itself


    //4 append
    document.querySelector("#events").appendChild(eventCopy);
}









//////////////////////////////////////////////////BUTTONS

const activityBTN = document.getElementById("activity");
const activity_container = document.getElementById("activity-container")

console.log(activity_container.style.display);


activityBTN.addEventListener("click", function () {
    if (activity_container.style.display == "none") {
        activity_container.style.display = "flex";
        activityBTN.style.color = "black";
        activityBTN.style.background = "white";

        console.log("Display is set to FLEX");
        console.log(activity_container.style.display);

    } else if (activity_container.style.display == "flex") {
        activity_container.style.display = "none";
        activityBTN.style.color = "white";
        activityBTN.style.background = "black";

        console.log("Display is set to NONE");
        console.log(activity_container.style.display);
    } else {
        activity_container.style.display = "flex";
        activityBTN.style.color = "black";
        activityBTN.style.background = "white";
    }
});
