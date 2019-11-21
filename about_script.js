const urlParams = new URLSearchParams(window.location.search);
//grab search=something from the url (it might not exist)
const search = urlParams.get("search");
//grab id=something from the url (it might not exist)
const id = urlParams.get("id");
const category = urlParams.get("category");
const events = urlParams.get("events");







const aboutLINK = document.getElementById("about_link");
aboutLINK.addEventListener("click", function () {
    window.location.href = "about.html?events=" + events;
});
const contactLINK = document.getElementById("contact_link");
contactLINK.addEventListener("click", function () {
    window.location.href = "contact.html?events=" + events;
});
const findLINK = document.getElementById("find_link");
findLINK.addEventListener("click", function () {
    window.location.href = "find.html?events=" + events;
});
const jobsLINK = document.getElementById("jobs_link");
jobsLINK.addEventListener("click", function () {
    window.location.href = "jobs.html?events=" + events;
});
const scheduleLINK = document.getElementById("schedule_link");
scheduleLINK.addEventListener("click", function () {
    window.location.href = "schedule.html?events=" + events;
});


//////////////////////////////////////////////////BUTTONS

const aboutOptBTN = document.getElementById("about_BT");
const aboutHeader = document.querySelector("#about_BT h2");
const about_container = document.getElementById("options-about-container");




aboutOptBTN.addEventListener("click", function () {
    if (about_container.style.display == "none") {
        about_container.style.display = "flex";

        aboutHeader.style.color = "black";
        aboutOptBTN.style.background = "white";

        console.log("Display is set to FLEX");
        console.log(about_container.style.display);

    } else if (about_container.style.display == "flex") {
        about_container.style.display = "none";

        aboutHeader.style.color = "white";
        aboutOptBTN.style.background = "black";

        console.log("Display is set to NONE");
        console.log(about_container.style.display);
    } else {
        about_container.style.display = "flex";

        aboutHeader.style.color = "black";
        aboutOptBTN.style.background = "white";
    }
});



const eventsTAB = document.querySelector(".events");
const aboutTAB = document.querySelector(".about");

eventsTAB.addEventListener("click", function () {
    window.location.href = "index.html";

//    if (events) {
//        window.location.href = events + "?about=about.html";
//    } else {
//        window.location.href = "index.html?about=about.html";
//    }
});
aboutTAB.addEventListener("click", function () {
    window.location.href = "about.html";
//    window.location.href = "about.html?events=" + events;
});
