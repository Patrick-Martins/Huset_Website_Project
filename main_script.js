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






    const eventsTAB = document.querySelector(".events");
    const aboutTAB = document.querySelector(".about");

    const about = urlParams.get("about");

    eventsTAB.addEventListener("click", function () {
        //so that the about parameter doesnt disappear in case the user clicks to refresh
        window.location.href = "index.html";
    });
    aboutTAB.addEventListener("click", function () {

        window.location.href = "about.html";
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


    if (oneCategory.name == "Games" || oneCategory.name == "Movies" || oneCategory.name == "Music") {
        const link = document.createElement("a");
        link.textContent = oneCategory.name.toUpperCase();
        link.setAttribute("href", "index.html?category=" + oneCategory.id);
        link.setAttribute("id", "categoryid" + oneCategory.id);
        console.log("CATEGORY ID is categoryid" + oneCategory.id)
        document.querySelector(".sort-container").appendChild(link);
    }
    //    }
}

function getSearchData() {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");

    fetch("http://liatalony.com/liatalony/wp-json/wp/v2/event?_embed&search=" + search)
        .then(res => res.json())
        .then(handleData)
}

function getFrontpageData() { //fetch all the default data
    console.log("getData");
    fetch("http://liatalony.com/liatalony/wp-json/wp/v2/event?_embed&per_page=100")
        .then(res => res.json())
        .then(handleData)
}

function getCategoryData(catId) { //fetch all the category data
    console.log("THIS IS A CATEGORY " + catId)

    fetch("http://liatalony.com/liatalony/wp-json/wp/v2/event?_embed&categories=" + catId)
        .then(res => res.json())
        .then(handleData)
}

function getEvent() { //fetch the data of a specific event
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    fetch("http://liatalony.com/liatalony/wp-json/wp/v2/event/" + id + "?_embed")
        .then(res => res.json())
        .then(showEvent)

    function showEvent(oneEvent) {

        const main_EventPage = document.querySelector("#event_page");

        document.querySelector("#event_page h1").textContent = oneEvent.title.rendered;

        const eventImage = main_EventPage.querySelector("img");
        const imagePath = oneEvent._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;
        eventImage.src = imagePath;



        console.log("TRYING IMAGE URL IS " + oneEvent._embedded["wp:featuredmedia"]);
        console.log(oneEvent.event_date)


        const eventDate = main_EventPage.querySelector("#event_date");
        eventDate.textContent = `${oneEvent.event_date} at ${(oneEvent.event_time).slice(0, -3)}`;

        console.log("this is the time" + oneEvent.event_time)

        const eventPrice = main_EventPage.querySelector("#event_price");
        eventPrice.textContent = `${oneEvent.price}`;

        const eventLocation = main_EventPage.querySelector("#event_location");
        eventLocation.textContent = `${oneEvent.where}`;

        const longDescription = document.querySelector("#description-container");
        longDescription.innerHTML = oneEvent.content.rendered;
    }
}

function handleData(myData) {
    myData.forEach(showPost);
}

function showPost(event) {
    const urlParams = new URLSearchParams(window.location.search);
    const about = urlParams.get("about");
    const category = urlParams.get("category");
    const activityOptn = document.querySelector("#activity h2");



    //if there is a category then it executes the following code
    if (category) {
        //Select the element which has the id "categoryid14", for example
        const categoryid = document.querySelector(".sort-container #categoryid" + category);
        //adds a class called "active_option" that highlights the link
        categoryid.classList.add('active_option');
        activityOptn.textContent = categoryid.textContent;
    } else {
        const all_option = document.getElementById("all_optn");
        //if there's not a category it means it is showing all the content so the
        //link with id "all_optn" receives the class "active_option" to be highlighted
        all_option.classList.add('active_option');
        activityOptn.textContent = "All";
    }

    console.log(event);

    //2 clone a template
    const template = document.querySelector(".postTemplate").content;
    const eventCopy = template.cloneNode(true);

    //3 textcontent & innerHTML

    const eventImage = eventCopy.querySelector("img");


    const a = eventCopy.querySelector("a");
    a.href = "sub_page.html?id=" + event.id;
    eventImage.addEventListener("click", function () {
        window.location.href = "sub_page.html?id=" + event.id;
    })


    const imagePath = event._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;
    eventImage.src = imagePath;

    console.log("WORKING IMAGE URL IS " + event._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)


    console.log(event.featured_media)
    console.log(event.event_date)


    const eventDate = eventCopy.querySelector("#event_date");
    eventDate.textContent = `${event.event_date} at ${(event.event_time).slice(0, -3)}`;

    console.log("this is the time" + event.event_time)

    const eventPrice = eventCopy.querySelector("#event_price");
    eventPrice.textContent = `${event.price}`;

    const eventLocation = eventCopy.querySelector("#event_location");
    eventLocation.textContent = `${event.where}`;


    const eventTitle = eventCopy.querySelector("#event_title");
    eventTitle.innerHTML = event.title.rendered; //.rendered because it is already rendered in the event post itself


    //4 append
    document.querySelector("#events_main").appendChild(eventCopy);
}









//////////////////////////////////////////////////BUTTONS for the options container

const activityBTN = document.getElementById("activity");
const activityHeader = document.querySelector("#activity h2");
const activity_container = document.getElementById("activity-container")

console.log(activity_container.style.display);


activityBTN.addEventListener("click", function () {
    if (activity_container.style.display == "none") {
        activity_container.style.display = "flex";
        activityHeader.style.color = "black";
        activityBTN.style.background = "white";

        console.log("Display is set to FLEX");
        console.log(activity_container.style.display);

    } else if (activity_container.style.display == "flex") {
        activity_container.style.display = "none";
        activityHeader.style.color = "white";
        activityBTN.style.background = "black";

        console.log("Display is set to NONE");
        console.log(activity_container.style.display);
    } else {
        activity_container.style.display = "flex";
        activityHeader.style.color = "black";
        activityBTN.style.background = "white";
    }
});
