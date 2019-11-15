const urlParams = new URLSearchParams(window.location.search);
//grab search=something from the url (it might not exist)
const search = urlParams.get("search");
//grab id=something from the url (it might not exist)
const id = urlParams.get("id");
const category = urlParams.get("category");
const events = urlParams.get("events");







const aboutLINK = document.getElementById("about_link");
aboutLINK.addEventListener("click", function () {
    window.location.href = "about.html?events="+events;
});
const contactLINK = document.getElementById("contact_link");
contactLINK.addEventListener("click", function () {
    window.location.href = "contact.html?events="+events;
});
const findLINK = document.getElementById("find_link");
findLINK.addEventListener("click", function () {
    window.location.href = "find.html?events="+events;
});
const jobsLINK = document.getElementById("jobs_link");
jobsLINK.addEventListener("click", function () {
    window.location.href = "jobs.html?events="+events;
});
const scheduleLINK = document.getElementById("schedule_link");
scheduleLINK.addEventListener("click", function () {
    window.location.href = "schedule.html?events="+events;
});


//////////////////////////////////////////////////BUTTONS

const aboutOptBTN = document.getElementById("about_BT");
const about_container = document.getElementById("options-about-container")



aboutOptBTN.addEventListener("click", function () {
    if (about_container.style.display == "none") {
        about_container.style.display = "flex";

        console.log("Display is set to FLEX");
        console.log(about_container.style.display);

    } else if (about_container.style.display == "flex") {
        about_container.style.display = "none";

        console.log("Display is set to NONE");
        console.log(about_container.style.display);
    } else {
        about_container.style.display = "flex";
    }
});



const eventsTAB = document.querySelector(".events_tab");
const aboutTAB = document.querySelector(".about_tab");

eventsTAB.addEventListener("click", function () {
    if (events) {
        window.location.href = events;
    } else {
        window.location.href = "index.html?about=" + window.location.href;
    }
});
aboutTAB.addEventListener("click", function () {
    window.location.href = "about.html?events="+events;
});
